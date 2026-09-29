import { CanvasHelpers } from "../../utils/canvas-helpers.js";

/**
 * CyberRadar AI SOC Threat Mitigation View Component
 */
export class CyberRadarView {
    constructor(container, engine, audioSynth) {
        this.container = container;
        this.engine = engine;
        this.synth = audioSynth;
        this.animFrame = null;
    }

    render() {
        this.container.innerHTML = `
            <div class="studio-panel" id="panel-cyberradar">
                <div class="studio-layout-grid">
                    
                    <!-- Left Column: Global Threat Radar Canvas -->
                    <div class="studio-card">
                        <div class="studio-card-header">
                            <div>
                                <span class="badge badge-rose">Global AI Threat Radar</span>
                                <h3 style="margin-top: 4px; color: #fff;">CyberRadar: 360° Real-Time Threat Vectors</h3>
                            </div>
                            <span class="badge badge-emerald">● Threat Mesh Active</span>
                        </div>

                        <!-- 360 Radar Canvas -->
                        <div style="background: #020409; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.08); height: 260px; overflow: hidden; position: relative;">
                            <canvas id="canvas-threat-radar" width="560" height="260" style="width: 100%; height: 100%;"></canvas>
                        </div>

                        <!-- AI Anomaly Detection Slider -->
                        <div style="margin-top: 14px; direction: ltr !important; font-family: var(--font-mono); font-size: 12px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                <span>AI Anomaly Score Threshold: <strong class="text-rose" id="lbl-anomaly-thresh">${this.engine.anomalyThreshold}</strong></span>
                                <span class="text-muted">Autoencoder + Isolation Forest</span>
                            </div>
                            <input type="range" id="slider-anomaly-thresh" min="0.30" max="0.95" step="0.05" value="${this.engine.anomalyThreshold}" class="knob-slider">
                        </div>

                        <!-- MITRE ATT&CK Matrix Grid -->
                        <div style="margin-top: 14px;">
                            <div style="font-size: 12px; font-weight: 700; color: #fff; margin-bottom: 8px;">MITRE ATT&CK® Matrix Coverage</div>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-family: var(--font-mono); font-size: 11px; direction: ltr !important;">
                                ${this.engine.mitreTactics.map(m => `
                                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 6px 8px;">
                                        <div style="color: #cbd5e1; font-weight: 600;">${m.name}</div>
                                        <div style="display: flex; justify-content: space-between; margin-top: 2px;">
                                            <span class="text-muted">${m.id}</span>
                                            <span class="${m.status === 'COVERED' ? 'text-emerald' : 'text-amber'}">${m.coverage}</span>
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Live Incidents & Response Actions -->
                    <div class="studio-card">
                        <div class="studio-card-header">
                            <div>
                                <span class="badge badge-amber">Automated Playbooks</span>
                                <h3 style="margin-top: 4px; color: #fff;">Active Security Incidents (SIEM Triage)</h3>
                            </div>
                            <span class="badge badge-purple">NIST 800-61</span>
                        </div>

                        <!-- Incidents Table -->
                        <div id="incidents-table-wrap" style="overflow-x: auto; margin-bottom: 16px;">
                            ${this._renderIncidentsTableHTML()}
                        </div>

                        <!-- SIEM Playbook Engine -->
                        <div style="background: #030712; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px; font-family: var(--font-mono); font-size: 11px; direction: ltr !important; text-align: left !important;">
                            <div class="text-emerald font-bold">Autonomous Containment Playbooks:</div>
                            <ul style="list-style-type: none; margin-top: 6px; display: flex; flex-direction: column; gap: 4px; color: #94a3b8;">
                                <li>✔ <strong>Host Isolation:</strong> Drops all ingress/egress except SIEM management channel via eBPF filters.</li>
                                <li>✔ <strong>Subnet Quarantine:</strong> Automatically pushes dynamic BGP blackhole routes.</li>
                                <li>✔ <strong>Credential Revocation:</strong> Invalidates JWT tokens & forces zero-trust re-auth.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        `;

        this.setupEvents();
        this.startRadarCanvas();
    }

    _renderIncidentsTableHTML() {
        return `
            <table class="data-table font-mono" style="font-size: 11px;">
                <thead>
                    <tr>
                        <th>ID & Source</th>
                        <th>Target Node</th>
                        <th>Technique</th>
                        <th>CVSS</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.engine.activeIncidents.map(inc => `
                        <tr>
                            <td>
                                <strong style="color: #fff;">${inc.id}</strong>
                                <div class="text-muted">${inc.sourceIp}</div>
                            </td>
                            <td>${inc.target}</td>
                            <td><span class="text-cyan">${inc.technique}</span></td>
                            <td class="${inc.cvss > 9 ? 'text-rose font-bold' : 'text-amber'}">${inc.cvss}</td>
                            <td>
                                <span class="badge ${inc.status === 'RESOLVED' ? 'badge-emerald' : (inc.status === 'ISOLATED' ? 'badge-purple' : 'badge-rose')}">
                                    ${inc.status}
                                </span>
                            </td>
                            <td>
                                ${inc.status !== 'RESOLVED' ? `
                                    <button class="btn btn-outline btn-sm btn-isolate-host" data-id="${inc.id}" style="padding: 2px 6px; font-size: 10px;">
                                        🛡️ Isolate
                                    </button>
                                ` : `<span class="text-muted">Clean</span>`}
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    }

    setupEvents() {
        const slider = this.container.querySelector("#slider-anomaly-thresh");
        slider.addEventListener("input", () => {
            const val = parseFloat(slider.value);
            this.engine.anomalyThreshold = val;
            this.container.querySelector("#lbl-anomaly-thresh").innerText = val.toFixed(2);
            this.synth.playClick();
        });

        this._bindTableButtons();
    }

    _bindTableButtons() {
        this.container.querySelectorAll(".btn-isolate-host").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;
                this.engine.isolateHost(id);
                this.container.querySelector("#incidents-table-wrap").innerHTML = this._renderIncidentsTableHTML();
                this._bindTableButtons();
                this.synth.playAlert();
            });
        });
    }

    startRadarCanvas() {
        const canvas = this.container.querySelector("#canvas-threat-radar");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let angle = 0;

        const loop = () => {
            angle += 0.03;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const maxR = Math.min(cx, cy) - 20;

            // Concentric range circles
            ctx.strokeStyle = "rgba(99, 102, 241, 0.2)";
            ctx.lineWidth = 1;
            [0.25, 0.5, 0.75, 1].forEach(frac => {
                ctx.beginPath();
                ctx.arc(cx, cy, maxR * frac, 0, Math.PI * 2);
                ctx.stroke();
            });

            // Crosshairs
            ctx.beginPath();
            ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy);
            ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR);
            ctx.stroke();

            // Radar sweep beam
            const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
            sweepGrad.addColorStop(0, "rgba(99, 102, 241, 0.4)");
            sweepGrad.addColorStop(1, "rgba(99, 102, 241, 0.05)");
            ctx.fillStyle = sweepGrad;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, maxR, angle - 0.4, angle);
            ctx.closePath();
            ctx.fill();

            // Attack trajectory vectors
            const threats = [
                { angle: 0.8, dist: 0.7, color: "#f43f5e", ip: "185.220.101.5" },
                { angle: 2.4, dist: 0.5, color: "#f59e0b", ip: "45.154.255.88" },
                { angle: 4.1, dist: 0.85, color: "#06b6d4", ip: "103.203.57.12" }
            ];

            threats.forEach(t => {
                const tx = cx + Math.cos(t.angle) * maxR * t.dist;
                const ty = cy + Math.sin(t.angle) * maxR * t.dist;

                // Pulsing dot
                ctx.fillStyle = t.color;
                ctx.beginPath(); ctx.arc(tx, ty, 5, 0, Math.PI * 2); ctx.fill();

                // Vector arc towards center
                ctx.strokeStyle = "rgba(244, 63, 94, 0.35)";
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(tx, ty);
                ctx.lineTo(cx, cy);
                ctx.stroke();
                ctx.setLineDash([]);

                // Label
                ctx.fillStyle = "#ffffff";
                ctx.font = "9px JetBrains Mono, monospace";
                ctx.fillText(t.ip, tx + 8, ty + 3);
            });

            this.animFrame = requestAnimationFrame(loop);
        };
        loop();
    }
}
