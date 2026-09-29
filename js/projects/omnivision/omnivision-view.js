import { CanvasHelpers } from "../../utils/canvas-helpers.js";

/**
 * OmniVision Multimodal Computer Vision View Component
 */
export class OmniVisionView {
    constructor(container, engine, audioSynth) {
        this.container = container;
        this.engine = engine;
        this.synth = audioSynth;
        this.animFrame = null;
    }

    render() {
        this.container.innerHTML = `
            <div class="studio-panel" id="panel-omnivision">
                <div class="studio-layout-grid">
                    
                    <!-- Left Column: Real-Time YOLOv8 Sensor Stream -->
                    <div class="studio-card">
                        <div class="studio-card-header">
                            <div>
                                <span class="badge badge-emerald">Real-Time Object Detection</span>
                                <h3 style="margin-top: 4px; color: #fff;">OmniVision: YOLOv8 Sensor Stream (60 FPS)</h3>
                            </div>
                            <span class="badge badge-cyan" id="lbl-detected-count">4 Objects Tracked</span>
                        </div>

                        <!-- Vision Canvas Stream -->
                        <div style="background: #020409; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.08); height: 260px; overflow: hidden; position: relative;">
                            <canvas id="canvas-vision-feed" width="560" height="260" style="width: 100%; height: 100%;"></canvas>
                        </div>

                        <!-- Sliders & Toggles -->
                        <div style="display: flex; gap: 14px; margin-top: 14px; direction: ltr !important; font-family: var(--font-mono); font-size: 12px;">
                            <div style="flex: 1;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                    <span>Confidence Threshold: <strong class="text-cyan" id="lbl-conf-thresh">${this.engine.confidenceThreshold}</strong></span>
                                </div>
                                <input type="range" id="slider-conf-thresh" min="0.10" max="0.95" step="0.05" value="${this.engine.confidenceThreshold}" class="knob-slider">
                            </div>
                            <div style="display: flex; align-items: flex-end;">
                                <button class="btn btn-outline btn-sm" id="btn-toggle-gradcam">
                                    🔥 Grad-CAM Heatmap
                                </button>
                            </div>
                        </div>

                        <!-- Vision Specs Bar -->
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 14px; font-family: var(--font-mono); font-size: 11px; direction: ltr !important;">
                            <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 8px;">
                                <div class="text-muted">Inference Latency:</div>
                                <strong class="text-emerald">6.2 ms (TensorRT)</strong>
                            </div>
                            <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 8px;">
                                <div class="text-muted">mAP@0.5:0.95:</div>
                                <strong class="text-cyan">0.824 SOTA</strong>
                            </div>
                            <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 8px;">
                                <div class="text-muted">NMS IoU Filter:</div>
                                <strong class="text-purple">0.45 IoU</strong>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Zero-Shot CLIP Semantic Search -->
                    <div class="studio-card">
                        <div class="studio-card-header">
                            <div>
                                <span class="badge badge-purple">Zero-Shot Multimodal</span>
                                <h3 style="margin-top: 4px; color: #fff;">CLIP Image-Text Embedding Matching</h3>
                            </div>
                            <span class="badge badge-indigo">Cosine Similarity</span>
                        </div>

                        <!-- Semantic Query Bar -->
                        <div style="margin-bottom: 14px; direction: ltr !important; text-align: left !important;">
                            <label class="text-sm text-muted font-mono" style="display: block; margin-bottom: 4px;">
                                🔎 Enter natural language prompt to rank visual matches:
                            </label>
                            <div style="display: flex; gap: 8px;">
                                <input type="text" id="input-clip-query" class="form-input font-mono text-sm" 
                                    value="autonomous vehicle on highway" 
                                    placeholder="e.g. human walking, delivery drone, car...">
                                <button class="btn btn-primary btn-sm" id="btn-clip-search" style="flex-shrink: 0; white-space: nowrap;">
                                    ⚡ Match CLIP
                                </button>
                            </div>
                        </div>

                        <!-- CLIP Similarity Results -->
                        <div id="clip-results-container" style="display: flex; flex-direction: column; gap: 10px; direction: ltr !important; font-family: var(--font-mono); font-size: 12px;">
                            ${this._renderClipResultsHTML("autonomous vehicle on highway")}
                        </div>

                        <!-- CLIP Theory Box -->
                        <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 8px; padding: 12px; margin-top: 16px; font-family: var(--font-mono); font-size: 11px; direction: ltr !important; text-align: left !important;">
                            <div class="text-cyan font-bold">Contrastive Language-Image Pretraining (CLIP):</div>
                            <div class="text-muted" style="margin-top: 4px;">
                                Dual encoders (Vision Transformer ViT-L/14 & Text Transformer) project images and natural language into a shared 768-dimensional latent hypersphere. Similarity is computed via normalized dot product: <strong>cos(θ) = (v · t) / (||v|| ||t||)</strong>.
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        `;

        this.setupEvents();
        this.startVisionCanvas();
    }

    _renderClipResultsHTML(query) {
        const matches = this.engine.matchCLIPQuery(query);
        return matches.map(m => `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 6px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #fff;">${m.target}</strong>
                    <span class="badge ${m.similarity > 0.7 ? 'badge-emerald' : 'badge-secondary'}">
                        Similarity: ${(m.similarity * 100).toFixed(1)}%
                    </span>
                </div>
                <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; border-radius: 3px; width: ${m.similarity * 100}%; background: ${m.similarity > 0.7 ? '#10b981' : '#06b6d4'};"></div>
                </div>
            </div>
        `).join("");
    }

    setupEvents() {
        const slider = this.container.querySelector("#slider-conf-thresh");
        slider.addEventListener("input", () => {
            const val = parseFloat(slider.value);
            this.engine.confidenceThreshold = val;
            this.container.querySelector("#lbl-conf-thresh").innerText = val.toFixed(2);
            this.synth.playClick();
        });

        const btnGradCAM = this.container.querySelector("#btn-toggle-gradcam");
        btnGradCAM.addEventListener("click", () => {
            this.engine.showGradCAM = !this.engine.showGradCAM;
            btnGradCAM.className = this.engine.showGradCAM ? "btn btn-primary btn-sm" : "btn btn-outline btn-sm";
            btnGradCAM.innerText = this.engine.showGradCAM ? "🔥 Grad-CAM Active" : "🔥 Grad-CAM Heatmap";
            this.synth.playClick();
        });

        const inputClip = this.container.querySelector("#input-clip-query");
        const btnClip = this.container.querySelector("#btn-clip-search");

        const runCLIP = () => {
            const query = inputClip.value.trim();
            if (query) {
                this.container.querySelector("#clip-results-container").innerHTML = this._renderClipResultsHTML(query);
                this.synth.playSuccess();
            }
        };

        btnClip.addEventListener("click", runCLIP);
        inputClip.addEventListener("keydown", (e) => {
            if (e.key === "Enter") runCLIP();
        });
    }

    startVisionCanvas() {
        const canvas = this.container.querySelector("#canvas-vision-feed");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const w = canvas.width, h = canvas.height;

            // Background synthetic sensor grid
            CanvasHelpers.drawGrid(ctx, w, h, 28, "rgba(255, 255, 255, 0.03)");

            // Update tracked targets
            const activeTargets = this.engine.updateTargets(w, h);
            const countBadge = this.container.querySelector("#lbl-detected-count");
            if (countBadge) countBadge.innerText = `${activeTargets.length} Objects Tracked`;

            // Draw Grad-CAM overlay if enabled
            if (this.engine.showGradCAM) {
                activeTargets.forEach(t => {
                    const cx = t.x + t.w / 2;
                    const cy = t.y + t.h / 2;
                    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, t.w * 0.9);
                    grad.addColorStop(0, "rgba(244, 63, 94, 0.4)");
                    grad.addColorStop(0.5, "rgba(245, 158, 11, 0.2)");
                    grad.addColorStop(1, "transparent");
                    ctx.fillStyle = grad;
                    ctx.fillRect(t.x - 20, t.y - 20, t.w + 40, t.h + 40);
                });
            }

            // Draw bounding boxes with tech corners
            activeTargets.forEach(t => {
                CanvasHelpers.drawBoundingBox(ctx, t.x, t.y, t.w, t.h, t.label, t.baseConf, t.color);
            });

            this.animFrame = requestAnimationFrame(loop);
        };
        loop();
    }
}
