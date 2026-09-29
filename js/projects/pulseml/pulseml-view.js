/**
 * PulseML AutoML & Explainable AI View Component
 */
export class PulseMLView {
    constructor(container, engine, audioSynth) {
        this.container = container;
        this.engine = engine;
        this.synth = audioSynth;
    }

    render() {
        const cm = this.engine.calculateConfusionMatrix(this.engine.currentThreshold);
        const shap = this.engine.calculateSHAP();

        this.container.innerHTML = `
            <div class="studio-panel" id="panel-pulseml">
                <div class="studio-layout-grid">
                    
                    <!-- Left Column: AutoML Arena & Pearson Matrix -->
                    <div class="studio-card">
                        <div class="studio-card-header">
                            <div>
                                <span class="badge badge-cyan">Automated Machine Learning</span>
                                <h3 style="margin-top: 4px; color: #fff;">PulseML: Algorithmic Leaderboard</h3>
                            </div>
                            <span class="badge badge-emerald">Champion: XGBoost (0.984 AUC)</span>
                        </div>

                        <!-- Leaderboard Table -->
                        <div style="overflow-x: auto; margin-bottom: 20px;">
                            <table class="data-table font-mono text-sm">
                                <thead>
                                    <tr>
                                        <th>Model Algorithm</th>
                                        <th>ROC-AUC</th>
                                        <th>F1-Score</th>
                                        <th>Precision</th>
                                        <th>Latency</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.engine.leaderboard.map(m => `
                                        <tr>
                                            <td>
                                                <strong style="color: #fff;">${m.model}</strong>
                                                <div class="text-muted" style="font-size: 10px;">${m.type}</div>
                                            </td>
                                            <td class="text-emerald font-bold">${m.auc}</td>
                                            <td>${m.f1}</td>
                                            <td>${m.precision}</td>
                                            <td>${m.latency}</td>
                                            <td>
                                                <span class="badge ${m.status === 'LEADER' ? 'badge-emerald' : 'badge-secondary'}">
                                                    ${m.status}
                                                </span>
                                            </td>
                                        </tr>
                                    `).join("")}
                                </tbody>
                            </table>
                        </div>

                        <!-- Pearson Matrix -->
                        <div class="studio-card-header" style="margin-top: 10px;">
                            <h4 style="color: #fff; font-size: 14px;">Feature Pearson Correlation Matrix (6×6)</h4>
                            <span class="text-muted text-sm font-mono">Bivariate Pearson r</span>
                        </div>
                        <div style="overflow-x: auto;">
                            <table class="data-table font-mono" style="font-size: 11px; text-align: center;">
                                <thead>
                                    <tr>
                                        <th style="text-align: left;">Feature</th>
                                        ${this.engine.features.map(f => `<th>${f}</th>`).join("")}
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.engine.features.map((f, r) => `
                                        <tr>
                                            <td style="text-align: left; font-weight: 700; color: #cbd5e1;">${f}</td>
                                            ${this.engine.correlationMatrix[r].map(val => {
                                                const bg = val > 0 
                                                    ? `rgba(16, 185, 129, ${Math.abs(val) * 0.7})` 
                                                    : `rgba(244, 63, 94, ${Math.abs(val) * 0.7})`;
                                                return `<td style="background: ${bg}; color: #fff; padding: 6px;">${val > 0 ? val.toFixed(2) : val.toFixed(2)}</td>`;
                                            }).join("")}
                                        </tr>
                                    `).join("")}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Right Column: ROC-AUC Threshold & SHAP Waterfall -->
                    <div class="studio-card">
                        
                        <!-- 1. Decision Threshold & 2x2 Confusion Matrix -->
                        <div class="studio-card-header">
                            <div>
                                <span class="badge badge-purple">Interactive Threshold</span>
                                <h3 style="margin-top: 4px; color: #fff;">ROC-AUC & Decision Threshold (τ)</h3>
                            </div>
                            <span class="badge badge-emerald">AUC: 0.984</span>
                        </div>

                        <div style="margin-bottom: 14px; direction: ltr !important; font-family: var(--font-mono); font-size: 12px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                <span>Classification Threshold (τ): <strong class="text-cyan" id="lbl-thresh-val">${this.engine.currentThreshold}</strong></span>
                                <span>F1-Score: <strong class="text-emerald" id="lbl-f1-val">${cm.f1}</strong></span>
                            </div>
                            <input type="range" id="slider-threshold" min="0.10" max="0.90" step="0.05" value="${this.engine.currentThreshold}" class="knob-slider">
                        </div>

                        <!-- Confusion Matrix Grid -->
                        <div style="background: #030712; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); padding: 10px; margin-bottom: 20px; direction: ltr !important; font-family: var(--font-mono);">
                            <div style="font-size: 11px; color: #94a3b8; text-align: center; margin-bottom: 6px;">Confusion Matrix Counts (Test Set N=10,000)</div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                                <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 8px; text-align: center;">
                                    <div style="font-size: 10px; color: #94a3b8;">True Positive (TP)</div>
                                    <strong class="text-emerald" id="cm-tp" style="font-size: 16px;">${cm.tp}</strong>
                                </div>
                                <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 8px; text-align: center;">
                                    <div style="font-size: 10px; color: #94a3b8;">False Positive (FP)</div>
                                    <strong class="text-rose" id="cm-fp" style="font-size: 16px;">${cm.fp}</strong>
                                </div>
                                <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 8px; text-align: center;">
                                    <div style="font-size: 10px; color: #94a3b8;">False Negative (FN)</div>
                                    <strong class="text-rose" id="cm-fn" style="font-size: 16px;">${cm.fn}</strong>
                                </div>
                                <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 8px; text-align: center;">
                                    <div style="font-size: 10px; color: #94a3b8;">True Negative (TN)</div>
                                    <strong class="text-cyan" id="cm-tn" style="font-size: 16px;">${cm.tn}</strong>
                                </div>
                            </div>
                        </div>

                        <!-- 2. SHAP Waterfall Explanation -->
                        <div class="studio-card-header">
                            <div>
                                <span class="badge badge-amber">Explainable AI (XAI)</span>
                                <h3 style="margin-top: 4px; color: #fff;">SHAP Waterfall Feature Attribution</h3>
                            </div>
                            <span class="badge ${shap.decision === 'FLAGGED_FRAUD' ? 'badge-rose' : 'badge-emerald'}" id="lbl-shap-decision">
                                ${shap.decision}
                            </span>
                        </div>

                        <!-- Feature Tuning Sliders -->
                        <div style="display: flex; gap: 14px; margin-bottom: 12px; direction: ltr !important; font-family: var(--font-mono); font-size: 12px;">
                            <div style="flex: 1;">
                                <label class="text-muted">IP Risk Score: <strong class="text-rose" id="lbl-ip-risk">${this.engine.currentIpRisk}</strong></label>
                                <input type="range" id="slider-ip-risk" min="0.05" max="1.0" step="0.05" value="${this.engine.currentIpRisk}" class="knob-slider">
                            </div>
                            <div style="flex: 1;">
                                <label class="text-muted">Velocity (24h): <strong class="text-cyan" id="lbl-velocity">${this.engine.currentVelocity}</strong></label>
                                <input type="range" id="slider-velocity" min="1" max="30" step="1" value="${this.engine.currentVelocity}" class="knob-slider">
                            </div>
                        </div>

                        <div style="font-family: var(--font-mono); font-size: 12px; margin-bottom: 8px; direction: ltr !important;">
                            <span>Base Risk E[f(x)]: <strong>${shap.baseValue}</strong></span> ➔ 
                            <span class="font-bold text-rose" id="lbl-pred-prob">Predicted Fraud Prob: ${shap.predictedProb}</span>
                        </div>

                        <!-- Waterfall Bars -->
                        <div id="shap-bars-container" style="display: flex; flex-direction: column; gap: 8px; direction: ltr !important; font-family: var(--font-mono); font-size: 12px;">
                            ${this._renderShapBarsHTML(shap)}
                        </div>

                    </div>

                </div>
            </div>
        `;

        this.setupEvents();
    }

    _renderShapBarsHTML(shap) {
        return shap.contributions.map(c => `
            <div style="display: grid; grid-template-columns: 1.2fr 2fr 0.6fr; align-items: center; gap: 10px;">
                <div>
                    <strong style="color: #fff;">${c.feature}</strong> <span class="text-muted">(${c.value})</span>
                </div>
                <div style="height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden;">
                    <div style="height: 100%; border-radius: 4px; width: ${c.barWidthPct}%; background: ${c.shap >= 0 ? '#f43f5e' : '#10b981'};"></div>
                </div>
                <div class="${c.shap >= 0 ? 'text-rose' : 'text-emerald'}" style="text-align: right; font-weight: 700;">
                    ${c.shap >= 0 ? '+' : ''}${c.shap.toFixed(2)}
                </div>
            </div>
        `).join("");
    }

    setupEvents() {
        const sliderThresh = this.container.querySelector("#slider-threshold");
        sliderThresh.addEventListener("input", () => {
            const val = parseFloat(sliderThresh.value);
            const cm = this.engine.calculateConfusionMatrix(val);

            this.container.querySelector("#lbl-thresh-val").innerText = val.toFixed(2);
            this.container.querySelector("#lbl-f1-val").innerText = cm.f1;
            this.container.querySelector("#cm-tp").innerText = cm.tp;
            this.container.querySelector("#cm-fp").innerText = cm.fp;
            this.container.querySelector("#cm-fn").innerText = cm.fn;
            this.container.querySelector("#cm-tn").innerText = cm.tn;
            this.synth.playClick();
        });

        const sliderIp = this.container.querySelector("#slider-ip-risk");
        const sliderVel = this.container.querySelector("#slider-velocity");

        const updateSHAP = () => {
            const ip = parseFloat(sliderIp.value);
            const vel = parseInt(sliderVel.value);
            const shap = this.engine.calculateSHAP(ip, vel);

            this.container.querySelector("#lbl-ip-risk").innerText = ip.toFixed(2);
            this.container.querySelector("#lbl-velocity").innerText = vel;
            this.container.querySelector("#lbl-pred-prob").innerText = `Predicted Fraud Prob: ${shap.predictedProb}`;

            const badge = this.container.querySelector("#lbl-shap-decision");
            badge.className = `badge ${shap.decision === 'FLAGGED_FRAUD' ? 'badge-rose' : 'badge-emerald'}`;
            badge.innerText = shap.decision;

            this.container.querySelector("#shap-bars-container").innerHTML = this._renderShapBarsHTML(shap);
            this.synth.playClick();
        };

        sliderIp.addEventListener("input", updateSHAP);
        sliderVel.addEventListener("input", updateSHAP);
    }
}
