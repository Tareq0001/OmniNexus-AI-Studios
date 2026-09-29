/**
 * NeuraForge LLM & LoRA Studio View Component
 */
export class NeuraForgeView {
    constructor(container, engine, audioSynth) {
        this.container = container;
        this.engine = engine;
        this.synth = audioSynth;
    }

    render() {
        const metrics = this.engine.getLoRAMetrics();

        this.container.innerHTML = `
            <div class="studio-panel" id="panel-neuraforge">
                <div class="studio-layout-grid">
                    
                    <!-- Left Column: LoRA Low-Rank Decomposition -->
                    <div class="studio-card">
                        <div class="studio-card-header">
                            <div>
                                <span class="badge badge-purple">Parameter-Efficient Fine-Tuning</span>
                                <h3 style="margin-top: 4px; color: #fff;">Low-Rank Matrix Decomposition ($W = W_0 + B \\cdot A$)</h3>
                            </div>
                            <span class="badge badge-emerald" id="lbl-mem-saved">${metrics.memorySavedPercentage} Memory Saved</span>
                        </div>

                        <!-- Visual Formula Block -->
                        <div style="background: #030712; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.08); padding: 14px; display: flex; align-items: center; justify-content: space-between; font-family: var(--font-mono); direction: ltr !important; margin-bottom: 16px;">
                            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px; text-align: center;">
                                <span class="text-cyan" style="font-size: 11px;">W₀ (Frozen)</span>
                                <div style="font-weight: 700; color: #fff;">4096 × 4096</div>
                                <span class="badge badge-secondary" style="font-size: 9px;">16.7M Params</span>
                            </div>
                            <span style="font-size: 18px; color: #94a3b8;">+</span>
                            <div style="text-align: center;">
                                <span style="font-size: 11px; color: #c084fc;">α / r</span>
                                <div style="font-weight: 700; color: #c084fc;" id="lbl-scaling-val">${metrics.scalingFactor}</div>
                            </div>
                            <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 10px; text-align: center;">
                                <span class="text-emerald" style="font-size: 11px;">Matrix B</span>
                                <div style="font-weight: 700; color: #34d399;" id="lbl-mat-b">4096 × ${this.engine.loraConfig.rank}</div>
                                <span class="badge badge-emerald" style="font-size: 9px;">Trainable</span>
                            </div>
                            <span style="font-size: 18px; color: #94a3b8;">×</span>
                            <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 10px; text-align: center;">
                                <span class="text-emerald" style="font-size: 11px;">Matrix A</span>
                                <div style="font-weight: 700; color: #34d399;" id="lbl-mat-a">${this.engine.loraConfig.rank} × 4096</div>
                                <span class="badge badge-emerald" style="font-size: 9px;">Trainable</span>
                            </div>
                        </div>

                        <!-- Sliders -->
                        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; direction: ltr !important;">
                            <div>
                                <div style="display: flex; justify-content: space-between; font-size: 13px; font-family: var(--font-mono); margin-bottom: 4px;">
                                    <span>LoRA Rank (r):</span>
                                    <strong class="text-emerald" id="lbl-slider-rank">${this.engine.loraConfig.rank}</strong>
                                </div>
                                <input type="range" id="slider-rank" min="4" max="64" step="4" value="${this.engine.loraConfig.rank}" class="knob-slider">
                            </div>
                            <div>
                                <div style="display: flex; justify-content: space-between; font-size: 13px; font-family: var(--font-mono); margin-bottom: 4px;">
                                    <span>LoRA Alpha (α):</span>
                                    <strong class="text-cyan" id="lbl-slider-alpha">${this.engine.loraConfig.alpha}</strong>
                                </div>
                                <input type="range" id="slider-alpha" min="8" max="64" step="8" value="${this.engine.loraConfig.alpha}" class="knob-slider">
                            </div>
                        </div>

                        <!-- Stats Pills -->
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-family: var(--font-mono); font-size: 12px; direction: ltr !important;">
                            <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 8px;">
                                <div class="text-muted">Total Base:</div>
                                <strong style="color: #fff;">${metrics.baseParamsFormatted}</strong>
                            </div>
                            <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 8px;">
                                <div class="text-muted">Trainable LoRA:</div>
                                <strong class="text-emerald" id="lbl-trainable-params">${metrics.loraParamsFormatted}</strong>
                            </div>
                            <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 8px;">
                                <div class="text-muted">Trainable %:</div>
                                <strong class="text-cyan" id="lbl-trainable-pct">${metrics.trainablePercentage}</strong>
                            </div>
                        </div>

                        <!-- Training Modes Bar -->
                        <div style="margin-top: 18px; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 14px;">
                            <div style="display: flex; gap: 8px; margin-bottom: 12px; direction: ltr !important;">
                                <button class="btn btn-primary btn-sm btn-train-mode" data-mode="SFT_LORA">⚡ SFT with LoRA</button>
                                <button class="btn btn-secondary btn-sm btn-train-mode" data-mode="DPO_ALIGNMENT">🎯 DPO Alignment</button>
                                <button class="btn btn-outline btn-sm btn-train-mode" data-mode="PRETRAIN">🌐 Causal Pre-Train</button>
                            </div>
                            <div style="background: #030712; border-radius: 8px; height: 110px; overflow: hidden;">
                                <canvas id="canvas-lora-loss" width="540" height="110" style="width: 100%; height: 100%;"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Transformer Self-Attention Heatmap -->
                    <div class="studio-card">
                        <div class="studio-card-header">
                            <div>
                                <span class="badge badge-indigo">Transformer Internals</span>
                                <h3 style="margin-top: 4px; color: #fff;">Scaled Dot-Product Multi-Head Attention</h3>
                            </div>
                            <span class="badge badge-purple">Softmax(Q · Kᵀ / √dₖ) · V</span>
                        </div>

                        <!-- Custom Sentence Input -->
                        <div style="margin-bottom: 12px; direction: ltr !important; text-align: left !important;">
                            <label class="text-sm text-muted font-mono" style="display: block; margin-bottom: 4px;">
                                ✍️ Enter custom sentence to compute live attention matrix:
                            </label>
                            <div style="display: flex; gap: 8px;">
                                <input type="text" id="input-sentence" class="form-input font-mono text-sm" 
                                    value="${this.engine.sentence}" 
                                    placeholder="Type any sentence...">
                                <button class="btn btn-primary btn-sm" id="btn-calc-qkv" style="flex-shrink: 0; white-space: nowrap;">
                                    🧮 Compute QKV
                                </button>
                            </div>
                        </div>

                        <!-- Attention Head Switcher -->
                        <div style="display: flex; gap: 6px; margin-bottom: 10px; direction: ltr !important;">
                            <button class="btn btn-primary btn-sm btn-head" data-head="0">Head 0: Syntactic</button>
                            <button class="btn btn-secondary btn-sm btn-head" data-head="1">Head 1: Coreference</button>
                            <button class="btn btn-secondary btn-sm btn-head" data-head="2">Head 2: Induction</button>
                            <button class="btn btn-secondary btn-sm btn-head" data-head="3">Head 3: Proximity</button>
                        </div>

                        <!-- Attention Heatmap Table -->
                        <div id="table-attn-wrap" style="overflow-x: auto; max-height: 250px; background: #030712; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05); padding: 8px; direction: ltr !important;">
                            ${this._renderAttentionTableHTML()}
                        </div>

                        <!-- Math Breakdown -->
                        <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 8px; padding: 10px; margin-top: 14px; font-family: var(--font-mono); font-size: 11px; direction: ltr !important; text-align: left !important;">
                            <div class="text-purple font-bold">Self-Attention Mechanics:</div>
                            <div class="text-cyan">Attention(Q, K, V) = softmax((Q · Kᵀ) / √128) · V</div>
                            <div class="text-muted" style="margin-top: 4px;">Hover cells to inspect token interaction weights. Scaling prevents vanishing gradients.</div>
                        </div>
                    </div>

                </div>
            </div>
        `;

        this.setupEvents();
        this.drawLossCurve();
    }

    _renderAttentionTableHTML() {
        const tokens = this.engine.tokens;
        const matrix = this.engine.attentionMatrix;
        if (!tokens.length || !matrix.length) return "";

        let html = `<table class="data-table font-mono" style="font-size: 11px; text-align: center;">`;
        html += `<thead><tr><th style="text-align: left;">Q \\ K</th>`;
        tokens.forEach(tok => { html += `<th>${tok}</th>`; });
        html += `</tr></thead><tbody>`;

        tokens.forEach((qTok, r) => {
            html += `<tr><td style="text-align: left; font-weight: 700; color: #e2e8f0;">${qTok}</td>`;
            tokens.forEach((_, c) => {
                const weight = matrix[r] ? matrix[r][c] : 0;
                const alpha = Math.min(1, Math.max(0.1, weight * 3.5));
                const bg = `rgba(99, 102, 241, ${alpha})`;
                html += `<td style="background: ${bg}; color: #fff; padding: 6px;" title="Q[${qTok}] -> K[${tokens[c]}]: ${weight}">${weight.toFixed(2)}</td>`;
            });
            html += `</tr>`;
        });
        html += `</tbody></table>`;
        return html;
    }

    setupEvents() {
        const sliderRank = this.container.querySelector("#slider-rank");
        const sliderAlpha = this.container.querySelector("#slider-alpha");

        const updateLoRA = () => {
            this.engine.loraConfig.rank = parseInt(sliderRank.value);
            this.engine.loraConfig.alpha = parseInt(sliderAlpha.value);

            const m = this.engine.getLoRAMetrics();
            this.container.querySelector("#lbl-slider-rank").innerText = sliderRank.value;
            this.container.querySelector("#lbl-slider-alpha").innerText = sliderAlpha.value;
            this.container.querySelector("#lbl-scaling-val").innerText = m.scalingFactor;
            this.container.querySelector("#lbl-mat-b").innerText = `4096 × ${sliderRank.value}`;
            this.container.querySelector("#lbl-mat-a").innerText = `${sliderRank.value} × 4096`;
            this.container.querySelector("#lbl-trainable-params").innerText = m.loraParamsFormatted;
            this.container.querySelector("#lbl-trainable-pct").innerText = m.trainablePercentage;
            this.container.querySelector("#lbl-mem-saved").innerText = `${m.memorySavedPercentage} Memory Saved`;
            this.synth.playClick();
        };

        sliderRank.addEventListener("input", updateLoRA);
        sliderAlpha.addEventListener("input", updateLoRA);

        // Compute QKV
        const btnCalc = this.container.querySelector("#btn-calc-qkv");
        const inputSentence = this.container.querySelector("#input-sentence");

        const computeQKV = () => {
            const val = inputSentence.value.trim();
            if (val) {
                this.engine.setSentence(val);
                this.container.querySelector("#table-attn-wrap").innerHTML = this._renderAttentionTableHTML();
                this.synth.playSuccess();
            }
        };

        btnCalc.addEventListener("click", computeQKV);
        inputSentence.addEventListener("keydown", (e) => {
            if (e.key === "Enter") computeQKV();
        });

        // Head Switchers
        this.container.querySelectorAll(".btn-head").forEach(btn => {
            btn.addEventListener("click", () => {
                const head = parseInt(btn.dataset.head);
                this.engine.setActiveHead(head);
                this.container.querySelectorAll(".btn-head").forEach(b => {
                    b.className = (b === btn) ? "btn btn-primary btn-sm btn-head" : "btn btn-secondary btn-sm btn-head";
                });
                this.container.querySelector("#table-attn-wrap").innerHTML = this._renderAttentionTableHTML();
                this.synth.playClick();
            });
        });

        // Training Modes
        this.container.querySelectorAll(".btn-train-mode").forEach(btn => {
            btn.addEventListener("click", () => {
                const mode = btn.dataset.mode;
                this.engine.currentMode = mode;
                this.container.querySelectorAll(".btn-train-mode").forEach(b => {
                    b.className = (b === btn) ? "btn btn-primary btn-sm btn-train-mode" : "btn btn-secondary btn-sm btn-train-mode";
                });
                // Simulate new loss curve
                const cfg = this.engine.trainingModes[mode];
                this.engine.lossHistory = Array.from({ length: 12 }, (_, i) => {
                    const progress = i / 11;
                    return Number((cfg.lossStart * Math.exp(-progress * 1.5) + cfg.lossEnd * progress).toFixed(3));
                });
                this.drawLossCurve();
                this.synth.playClick();
            });
        });
    }

    drawLossCurve() {
        const canvas = this.container.querySelector("#canvas-lora-loss");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const data = this.engine.lossHistory;
        const maxVal = Math.max(...data) * 1.1;
        const minVal = Math.min(...data) * 0.8;
        const w = canvas.width, h = canvas.height;

        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        data.forEach((val, idx) => {
            const x = (idx / (data.length - 1)) * (w - 20) + 10;
            const y = h - ((val - minVal) / (maxVal - minVal)) * (h - 20) - 10;
            if (idx === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Area under curve
        ctx.lineTo(w - 10, h);
        ctx.lineTo(10, h);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, "rgba(16, 185, 129, 0.2)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fill();
    }
}
