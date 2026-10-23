import { Activity, AlertTriangle, Award, Check, CheckCircle2, Cpu, Eye, Gauge, Layers, ShieldCheck, Zap } from 'lucide-react'
import { Card, PageHeader, StatCard } from '../components/ui'

export default function Comparison() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Model Benchmark & Architecture Comparison"
        subtitle="Side-by-side empirical comparison of RDD-YOLO against standard one-stage (YOLOv8) and two-stage (Faster R-CNN) object detectors on the RDD2022 road damage test split."
      />

      {/* Top Headline Highlights */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="mAP@50 Accuracy"
          value={<span className="text-orange-600 font-bold">64.23%</span>}
          hint="+4.57 pp over YOLOv8 · +11.83 pp over Faster R-CNN"
          icon={<Award className="h-4 w-4 text-orange-500" />}
          accent="#f97316"
        />
        <StatCard
          label="Inference Latency"
          value="14.2 ms"
          hint="5.5× faster than Faster R-CNN (70.4 FPS on GPU)"
          icon={<Zap className="h-4 w-4 text-amber-500" />}
          accent="#eab308"
        />
        <StatCard
          label="Model Compactness"
          value="9.95 M"
          hint="4.2× fewer parameters than Faster R-CNN (19.4 MB)"
          icon={<Cpu className="h-4 w-4 text-emerald-500" />}
          accent="#10b981"
        />
        <StatCard
          label="Fine Crack Sensitivity"
          value="72.2%"
          hint="Longitudinal crack precision (SimAM + Bilinear neck)"
          icon={<Eye className="h-4 w-4 text-sky-500" />}
          accent="#0ea5e9"
        />
      </div>

      {/* Visual Bar Comparison of Per-Class Accuracy */}
      <Card title="Damage Classification Breakdown (mAP@50 per Class)" subtitle="Evaluated on 2,023 held-out road damage images across all weather, lighting, and surface conditions">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ClassBarCard
            code="D00"
            title="Longitudinal Crack"
            rdd={72.2}
            yolo8={66.1}
            frcnn={57.3}
            note="Bilinear upsampling preserves linear continuity along fine crack lines without staircase pixelation."
          />
          <ClassBarCard
            code="D10"
            title="Transverse Crack"
            rdd={62.1}
            yolo8={57.7}
            frcnn={51.8}
            note="SimAM energy function boosts horizontal edge gradients against perpendicular tire marks."
          />
          <ClassBarCard
            code="D20"
            title="Alligator Crack"
            rdd={68.5}
            yolo8={66.6}
            frcnn={59.4}
            note="Complex mesh pattern segmentation benefits from full-resolution multi-scale feature fusion."
          />
          <ClassBarCard
            code="D40"
            title="Pothole"
            rdd={54.2}
            yolo8={45.9}
            frcnn={41.2}
            note="+8.3 pp gain over YOLOv8 due to shadow suppression and 800 px high-res spatial fine-tuning."
          />
        </div>
      </Card>

      {/* Main Detailed Comparison Matrix */}
      <Card title="Full Architectural & Performance Matrix" subtitle="Direct feature-by-feature evaluation across accuracy, latency, hardware footprint, and real-world deployment criteria">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                <th className="py-3 px-4">Metric / Capability</th>
                <th className="py-3 px-4 text-orange-700 bg-orange-50/50">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span>RDD-YOLO (Ours)</span>
                    <span className="rounded bg-orange-500 px-1.5 py-0.5 text-[10px] text-white">Best</span>
                  </div>
                </th>
                <th className="py-3 px-4 text-slate-700">YOLOv8s Baseline</th>
                <th className="py-3 px-4 text-slate-600">Faster R-CNN (ResNet-50)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              <Row title="Detection Architecture"
                rdd={<span className="font-medium text-slate-900">Single-stage Anchor-Free + 3D Attention</span>}
                yolo8="Single-stage Anchor-Free (CSPDarknet)"
                frcnn="Two-stage Anchor-Based (RPN + RoI Pooling)"
              />
              <Row title="Overall mAP@50 (RDD2022)"
                rdd={<span className="font-bold text-orange-600 font-mono text-base">64.23%</span>}
                yolo8={<span className="font-mono font-medium text-slate-700">59.66%</span>}
                frcnn={<span className="font-mono text-slate-500">52.40%</span>}
                highlight
              />
              <Row title="mAP@50-95 (Strict IoU)"
                rdd={<span className="font-bold text-orange-600 font-mono">33.39%</span>}
                yolo8={<span className="font-mono">30.24%</span>}
                frcnn={<span className="font-mono text-slate-500">25.10%</span>}
              />
              <Row title="D00 Longitudinal Crack mAP@50"
                rdd={<span className="font-bold text-emerald-700 font-mono">72.2%</span>}
                yolo8={<span className="font-mono">66.1%</span>}
                frcnn={<span className="font-mono text-slate-500">57.3%</span>}
              />
              <Row title="D10 Transverse Crack mAP@50"
                rdd={<span className="font-bold text-emerald-700 font-mono">62.1%</span>}
                yolo8={<span className="font-mono">57.7%</span>}
                frcnn={<span className="font-mono text-slate-500">51.8%</span>}
              />
              <Row title="D20 Alligator Crack mAP@50"
                rdd={<span className="font-bold text-emerald-700 font-mono">68.5%</span>}
                yolo8={<span className="font-mono">66.6%</span>}
                frcnn={<span className="font-mono text-slate-500">59.4%</span>}
              />
              <Row title="D40 Pothole mAP@50"
                rdd={<span className="font-bold text-emerald-700 font-mono">54.2%</span>}
                yolo8={<span className="font-mono">45.9%</span>}
                frcnn={<span className="font-mono text-slate-500">41.2%</span>}
              />
              <Row title="Inference Latency (GPU, batch 1)"
                rdd={<span className="font-bold text-emerald-600 font-mono">14.2 ms (~70 FPS)</span>}
                yolo8={<span className="font-mono">16.8 ms (~60 FPS)</span>}
                frcnn={<span className="font-mono text-rose-600">78.5 ms (12.7 FPS)</span>}
                highlight
              />
              <Row title="Inference Latency (CPU fallback)"
                rdd={<span className="font-mono text-slate-800">~2.1 s</span>}
                yolo8={<span className="font-mono text-slate-600">~2.6 s</span>}
                frcnn={<span className="font-mono text-rose-600">~9.4 s</span>}
              />
              <Row title="Model Parameter Count"
                rdd={<span className="font-bold text-emerald-700 font-mono">9.95 M (-3.6% neck params)</span>}
                yolo8={<span className="font-mono">11.16 M</span>}
                frcnn={<span className="font-mono text-rose-600">41.52 M (4.2× larger)</span>}
              />
              <Row title="Checkpoint Weight Size"
                rdd={<span className="font-bold text-emerald-700 font-mono">19.4 MB</span>}
                yolo8={<span className="font-mono">22.5 MB</span>}
                frcnn={<span className="font-mono text-slate-600">165.2 MB</span>}
              />
              <Row title="Attention Mechanism"
                rdd={<span className="font-medium text-slate-900">SimAM Parameter-Free 3D Attention</span>}
                yolo8="None (standard convolutional feature maps)"
                frcnn="None (Global spatial pooling)"
              />
              <Row title="Feature Upsampling Method"
                rdd={<span className="font-medium text-slate-900">Bilinear Interpolation (align_corners=True)</span>}
                yolo8="Nearest Neighbor (discrete step sampling)"
                frcnn="Nearest Neighbor in FPN"
              />
              <Row title="Neck Convolutional Architecture"
                rdd={<span className="font-medium text-slate-900">GhostConv PAN (Cheap linear operators)</span>}
                yolo8="Standard Conv PAN"
                frcnn="Standard 3×3 Conv FPN"
              />
              <Row title="Resistance to Asphalt Shadows & Tire Tracks"
                rdd={<span className="font-medium text-emerald-700 flex items-center gap-1"><Check className="h-4 w-4" /> Strong (Energy function attenuates background)</span>}
                yolo8="Moderate (Shadows misclassified as cracks)"
                frcnn="Weak (RPN proposal explosion on skid marks)"
              />
              <Row title="Client-Side Browser Execution (WebGPU / WASM)"
                rdd={<span className="font-medium text-emerald-700 flex items-center gap-1"><Check className="h-4 w-4" /> Supported (Native 38MB ONNX Runtime Web)</span>}
                yolo8="Supported (Larger download size)"
                frcnn="Unsupported (Too heavy for browser runtimes)"
              />
              <Row title="Vehicle-Mounted Inspection Suitability"
                rdd={<span className="font-bold text-orange-600 flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Real-time 60+ FPS Video</span>}
                yolo8="Real-time 50+ FPS Video"
                frcnn="Offline batch processing only (< 15 FPS)"
              />
            </tbody>
          </table>
        </div>
      </Card>

      {/* Deep-Dive Architectural Explanations */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Why RDD-YOLO Outperforms YOLOv8" subtitle="Key structural innovations targeting pavement distress detection" className="h-full">
          <div className="space-y-4 text-sm text-slate-600">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">1. SimAM Parameter-Free 3D Attention</h3>
                <p className="mt-1 leading-relaxed">
                  Standard YOLOv8 models treat all spatial pixels equally or rely on 1D channel attention (like SE) or 2D spatial attention (like CBAM).
                  Road surfaces contain high-frequency noise: tree shadows, damp asphalt, oil patches, and rubber skid marks.
                  SimAM calculates an analytical energy function per neuron based on visual neuroscience without adding any trainable parameters.
                  It computes full 3D attention weights (C × H × W) simultaneously, suppressing uniform background texture while amplifying cracked boundaries.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">2. GhostConv Neck: Lightweight Redundancy Pruning</h3>
                <p className="mt-1 leading-relaxed">
                  In intermediate PAN neck layers, standard convolutions generate many redundant feature maps that look nearly identical.
                  GhostConv splits the feature generation into two parts: an initial small set of regular convolutions, followed by cheap linear transformations to generate "ghost" features.
                  This cuts parameter count by 3.6% and reduces memory bandwidth pressure while preserving the high-frequency edge filters necessary to delineate jagged crack contours.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <Activity className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">3. Bilinear Upsampling vs. Nearest Neighbor</h3>
                <p className="mt-1 leading-relaxed">
                  Ultralytics YOLO architectures traditionally use nearest-neighbor upsampling because it is fast. However, on narrow distresses like longitudinal cracks (D00) and transverse cracks (D10) that may only span 1–3 pixels in width, nearest-neighbor sampling causes aliasing and stair-step distortion.
                  RDD-YOLO switches upsampling layers to Bilinear Interpolation with <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono">align_corners=True</code>, maintaining smooth, continuous gradient paths across sub-pixel cracks.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Why RDD-YOLO Outperforms Faster R-CNN" subtitle="Overcoming the limitations of two-stage anchor detectors in road inspection" className="h-full">
          <div className="space-y-4 text-sm text-slate-600">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">1. Elimination of Region Proposal Network (RPN) Overhead</h3>
                <p className="mt-1 leading-relaxed">
                  Faster R-CNN first generates hundreds of candidate bounding boxes via an RPN, then runs expensive RoI pooling and dense linear heads on every box.
                  On a road image with mottled asphalt, the RPN generates massive false candidate proposals for random texture variations.
                  RDD-YOLO uses a dense, anchor-free decoupled head that predicts class probabilities and bounding box offsets directly in a single forward pass, achieving a 5.5× speedup (14.2 ms vs 78.5 ms).
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <Gauge className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">2. RoI Pooling Feature Quantization Loss</h3>
                <p className="mt-1 leading-relaxed">
                  In Faster R-CNN, features inside candidate regions are downsampled to a rigid 7 × 7 spatial grid via RoI Pooling/RoIAlign.
                  For thin longitudinal cracks extending across 400 pixels of pavement with a width of 2 pixels, quantizing to 7 × 7 strips away the structural continuity, causing Faster R-CNN to fragment single cracks into multiple disconnected, low-confidence boxes.
                  RDD-YOLO maintains multi-scale spatial resolution natively through its Path Aggregation Network (PAN).
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">3. Practical Edge & In-Vehicle Deployment</h3>
                <p className="mt-1 leading-relaxed">
                  Faster R-CNN requires 41.5 million parameters and over 165 MB of storage, requiring dedicated desktop GPU hardware and causing high thermal throttling in dashcam or embedded vehicle settings.
                  RDD-YOLO weighs just 19.4 MB (9.95 M params) and runs at 70+ FPS on a budget laptop GPU (RTX 3050 / RTX 2050), and even executes client-side inside the browser via WebGPU without sending sensitive video feeds to an external cloud.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Summary Banner */}
      <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 p-5 text-sm text-slate-800">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-semibold text-orange-950">Empirical Conclusion:</span>
            <span className="ml-2 text-slate-700">
              RDD-YOLO sets the Pareto-optimal frontier for automated road inspection, delivering <strong>+4.57 pp higher mAP@50</strong> than standard YOLOv8 with fewer neck parameters, and exceeding Faster R-CNN by <strong>+11.83 pp mAP@50</strong> at <strong>5.5× faster inference speed</strong>.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ title, rdd, yolo8, frcnn, highlight }: { title: string; rdd: React.ReactNode; yolo8: React.ReactNode; frcnn: React.ReactNode; highlight?: boolean }) {
  return (
    <tr className={highlight ? 'bg-orange-50/20 font-medium' : 'hover:bg-slate-50/50'}>
      <td className="py-3 px-4 font-medium text-slate-800">{title}</td>
      <td className="py-3 px-4 text-orange-900 bg-orange-50/30">{rdd}</td>
      <td className="py-3 px-4 text-slate-700">{yolo8}</td>
      <td className="py-3 px-4 text-slate-600">{frcnn}</td>
    </tr>
  )
}

function ClassBarCard({ code, title, rdd, yolo8, frcnn, note }: { code: string; title: string; rdd: number; yolo8: number; frcnn: number; note: string }) {
  return (
    <div className="rounded-lg border border-slate-200/80 bg-slate-50/40 p-4">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-bold text-slate-700">{code} · {title}</span>
        <span className="text-sm font-bold text-orange-600 font-mono">{rdd.toFixed(1)}%</span>
      </div>

      <div className="mt-3 space-y-2">
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="font-medium text-slate-800">RDD-YOLO</span>
            <span className="font-mono font-semibold text-orange-600">{rdd}%</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${rdd}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-slate-600">YOLOv8</span>
            <span className="font-mono text-slate-700">{yolo8}%</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-sky-500 rounded-full" style={{ width: `${yolo8}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-slate-500">Faster R-CNN</span>
            <span className="font-mono text-slate-500">{frcnn}%</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-slate-400 rounded-full" style={{ width: `${frcnn}%` }} />
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 leading-normal">{note}</p>
    </div>
  )
}
