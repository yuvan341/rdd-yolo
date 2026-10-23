import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  Activity, BarChart3, Brain, Database, FlaskConical, HardDrive, History, LayoutDashboard, Map, Menu, Scale, ScanSearch,
  Settings, X,
} from 'lucide-react'
import { apiGet } from '../lib/api'
import { STATIC } from '../lib/staticMode'
import type { Health } from '../lib/types'
import { cx } from './ui'

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/detect', label: 'Image Detection', icon: ScanSearch },
  { to: '/map', label: 'Damage Map', icon: Map },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/history', label: 'Detection History', icon: History },
  { to: '/model', label: 'Model', icon: Brain },
  { to: '/comparison', label: 'Model Comparison', icon: Scale },
  { to: '/training', label: 'Training & Experiments', icon: FlaskConical },
  { to: '/datasets', label: 'Datasets', icon: Database },
  { to: '/storage', label: 'Storage', icon: HardDrive },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Layout() {
  const [health, setHealth] = useState<Health | null>(null)
  const [down, setDown] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const poll = () => apiGet<Health>('/health').then((h) => { setHealth(h); setDown(false) }).catch(() => setDown(true))
    poll()
    const t = setInterval(poll, 15000)
    return () => clearInterval(t)
  }, [])

  const status = down
    ? { dot: 'bg-red-500', text: 'Backend offline' }
    : !health ? { dot: 'bg-slate-400', text: 'Connecting…' }
      : health.model_loaded ? { dot: 'bg-emerald-500', text: health.model_version }
        : { dot: 'bg-amber-500', text: 'No model loaded' }

  const sidebar = (
    <nav className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white">
          <Activity className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">RDD-YOLO</div>
          <div className="text-[11px] text-slate-400">Road Damage Detection</div>
        </div>
      </div>
      <div className="flex-1 space-y-0.5 px-3 overflow-y-auto">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}
            className={({ isActive }) => cx('flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              isActive ? 'bg-white/10 font-medium text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white')}>
            <Icon className="h-4 w-4" /> {label}
          </NavLink>
        ))}
      </div>

      {/* Model Benchmark Comparison Section in Sidebar */}
      <div className="mx-3 my-2 rounded-lg border border-slate-700/60 bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-3 text-xs shadow-inner">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-700/50">
          <span className="font-semibold text-slate-200">Model Comparison</span>
          <span className="text-[10px] text-orange-400 font-mono font-medium">mAP@50</span>
        </div>
        <div className="mt-2.5 space-y-2">
          <div>
            <div className="flex justify-between text-[11px] mb-0.5">
              <span className="font-medium text-orange-400">RDD-YOLO (Ours)</span>
              <span className="font-mono text-white font-bold">64.2%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-700/60 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: '64.2%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[11px] mb-0.5">
              <span className="text-slate-300">YOLOv8</span>
              <span className="font-mono text-slate-300">59.7%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-700/60 rounded-full overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full" style={{ width: '59.7%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[11px] mb-0.5">
              <span className="text-slate-400">Faster R-CNN</span>
              <span className="font-mono text-slate-400">52.4%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-700/60 rounded-full overflow-hidden">
              <div className="h-full bg-slate-500 rounded-full" style={{ width: '52.4%' }} />
            </div>
          </div>
        </div>
        <NavLink to="/comparison" onClick={() => setOpen(false)}
          className="mt-2.5 flex items-center justify-between text-[11px] font-medium text-orange-400 hover:text-orange-300 transition-colors pt-1.5 border-t border-slate-700/30">
          <span>Detailed comparison</span>
          <span>→</span>
        </NavLink>
      </div>

      <div className="m-3 rounded-lg bg-white/5 p-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className={cx('h-2 w-2 rounded-full', status.dot)} />
          <span className="truncate font-medium text-white" title={status.text}>{status.text}</span>
        </div>
        {health && (
          <div className="mt-1.5 text-slate-400">
            {health.cuda_available ? 'CUDA GPU' : 'CPU'} · DB {health.database} · v{health.version}
          </div>
        )}
      </div>
    </nav>
  )

  return (
    <div className="flex h-full">
      <aside className="hidden w-64 shrink-0 bg-slate-900 lg:block">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-[2000] flex lg:hidden">
          <div className="w-64 bg-slate-900">{sidebar}</div>
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
          <span className="font-semibold">RDD-YOLO</span>
        </header>
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {STATIC && (
              <div className="mb-5 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
                <b>Live browser demo.</b> The trained YOLO26s model runs entirely in your browser (WebGPU / WebAssembly) — no
                server; your images and detections stay in this browser. First use downloads the 38 MB model. For GPU speed and the
                full Python backend, run the project locally — <a className="font-medium underline" href="https://github.com/ethical0101/RDD-YOLO" target="_blank" rel="noreferrer">source on GitHub</a>.
              </div>
            )}
            {health && !health.model_loaded && (
              <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <b>Inference unavailable:</b> {health.model_error}
              </div>
            )}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
