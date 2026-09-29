/**
 * Master Bento Grid Overview Component (Apple & Linear Inspired)
 */
export class BentoOverview {
    constructor(container, app) {
        this.container = container;
        this.app = app;
        this.animationFrame = null;
    }

    render() {
        this.container.innerHTML = `
            <div class="bento-header">
                <div class="bento-badge">
                    <span>✨</span>
                    <span id="bento-hero-badge">SOTA Silicon Valley Design System</span>
                </div>
                <h1 class="bento-hero-title" id="bento-hero-title">Five State-of-the-Art AI Workbenches</h1>
                <p class="bento-hero-sub" id="bento-hero-sub">
                    A unified enterprise platform delivering five fully operational AI studios: Multi-Agent Swarms, LLM Fine-Tuning, AutoML, Computer Vision, and Autonomous Cyber Defense.
                </p>
            </div>

            <!-- Modern Trending Bento Grid Layout -->
            <div class="bento-grid">
                
                <!-- 1. AgentCraft Swarm (Col Span 7) -->
                <div class="bento-card bento-col-7" data-target="agentcraft">
                    <div class="card-top">
                        <span class="card-project-tag tag-indigo">Project 01 • Agentic AI</span>
                        <span class="badge badge-emerald">● Swarm Active</span>
                    </div>
                    <h3 class="card-title">🤖 AgentCraft: Swarm DAG Orchestrator</h3>
                    <p class="card-desc">
                        Autonomous multi-agent task decomposition, dynamic ReAct cognitive execution streams, live Python code generation, and sandboxed validation terminal.
                    </p>
                    <div class="card-preview-area">
                        <canvas id="bento-canvas-agents" width="480" height="180" style="width: 100%; height: 100%;"></canvas>
                    </div>
                    <div class="card-bottom-actions">
                        <div class="card-meta-list font-mono text-sm">
                            <span>4 Specialized Agents</span> • <span>Zero-Shot DAG</span>
                        </div>
                        <button class="btn btn-primary btn-sm btn-open-studio" data-target="agentcraft">
                            Launch Studio ➔
                        </button>
                    </div>
                </div>

                <!-- 2. NeuraForge LLM (Col Span 5) -->
                <div class="bento-card bento-col-5" data-target="neuraforge">
                    <div class="card-top">
                        <span class="card-project-tag tag-purple">Project 02 • Generative LLM</span>
                        <span class="badge badge-indigo">LoRA PEFT</span>
                    </div>
                    <h3 class="card-title">🧠 NeuraForge: LLM & Attention</h3>
                    <p class="card-desc">
                        Low-rank matrix decomposition ($W_0 + B \\cdot A$), dynamic QKV multi-head attention calculator for custom sentences, and DPO alignment.
                    </p>
                    <div class="card-preview-area">
                        <canvas id="bento-canvas-attention" width="340" height="180" style="width: 100%; height: 100%;"></canvas>
                    </div>
                    <div class="card-bottom-actions">
                        <div class="card-meta-list font-mono text-sm">
                            <span>4 Scaled Heads</span> • <span>99.2% Frozen</span>
                        </div>
                        <button class="btn btn-secondary btn-sm btn-open-studio" data-target="neuraforge">
                            Launch Studio ➔
                        </button>
                    </div>
                </div>

                <!-- 3. PulseML AutoML (Col Span 4) -->
                <div class="bento-card bento-col-4" data-target="pulseml">
                    <div class="card-top">
                        <span class="card-project-tag tag-cyan">Project 03 • Data Science</span>
                        <span class="badge badge-emerald">AUC 0.984</span>
                    </div>
                    <h3 class="card-title">📊 PulseML: AutoML & SHAP</h3>
                    <p class="card-desc">
                        Automated model arena (XGBoost, LightGBM, RF), interactive decision threshold ($\\tau$) slider, Confusion Matrix, and dynamic SHAP feature attributions.
                    </p>
                    <div class="card-preview-area">
                        <canvas id="bento-canvas-automl" width="300" height="180" style="width: 100%; height: 100%;"></canvas>
                    </div>
                    <div class="card-bottom-actions">
                        <div class="card-meta-list font-mono text-sm">
                            <span>SHAP Waterfall</span> • <span>6×6 Pearson</span>
                        </div>
                        <button class="btn btn-secondary btn-sm btn-open-studio" data-target="pulseml">
                            Launch Studio ➔
                        </button>
                    </div>
                </div>

                <!-- 4. OmniVision Lab (Col Span 4) -->
                <div class="bento-card bento-col-4" data-target="omnivision">
                    <div class="card-top">
                        <span class="card-project-tag tag-emerald">Project 04 • Computer Vision</span>
                        <span class="badge badge-cyan">YOLOv8 + CLIP</span>
                    </div>
                    <h3 class="card-title">👁️ OmniVision: Multimodal Lab</h3>
                    <p class="card-desc">
                        Real-time synthetic sensor stream, live object detection bounding boxes, confidence threshold filter, and zero-shot CLIP image-text embedding similarity.
                    </p>
                    <div class="card-preview-area">
                        <canvas id="bento-canvas-vision" width="300" height="180" style="width: 100%; height: 100%;"></canvas>
                    </div>
                    <div class="card-bottom-actions">
                        <div class="card-meta-list font-mono text-sm">
                            <span>mAP@0.5: 0.94</span> • <span>Zero-Shot</span>
                        </div>
                        <button class="btn btn-secondary btn-sm btn-open-studio" data-target="omnivision">
                            Launch Studio ➔
                        </button>
                    </div>
                </div>

                <!-- 5. CyberRadar SOC (Col Span 4) -->
                <div class="bento-card bento-col-4" data-target="cyberradar">
                    <div class="card-top">
                        <span class="card-project-tag tag-rose">Project 05 • Cyber AI</span>
                        <span class="badge badge-rose">● Radar Sweeping</span>
                    </div>
                    <h3 class="card-title">🛡️ CyberRadar: AI SOC Radar</h3>
                    <p class="card-desc">
                        Real-time AI threat detection radar with animated vector attack trajectories, MITRE ATT&CK cognitive matrix, and automated incident response playbooks.
                    </p>
                    <div class="card-preview-area">
                        <canvas id="bento-canvas-radar" width="300" height="180" style="width: 100%; height: 100%;"></canvas>
                    </div>
                    <div class="card-bottom-actions">
                        <div class="card-meta-list font-mono text-sm">
                            <span>MTTD: 1.2s</span> • <span>MITRE TTPs</span>
                        </div>
                        <button class="btn btn-secondary btn-sm btn-open-studio" data-target="cyberradar">
                            Launch Studio ➔
                        </button>
                    </div>
                </div>

            </div>
        `;

        this.setupEvents();
        this.startMiniCanvases();
    }

    setupEvents() {
        this.container.querySelectorAll(".btn-open-studio").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                this.app.synth.playClick();
                this.app.switchTab(btn.dataset.target);
            });
        });

        this.container.querySelectorAll(".bento-card").forEach(card => {
            card.addEventListener("click", () => {
                this.app.synth.playClick();
                this.app.switchTab(card.dataset.target);
            });
        });
    }

    startMiniCanvases() {
        let t = 0;
        const draw = () => {
            t += 0.025;

            // 1. Swarm Canvas — Glowing network with particle trails
            const cAgents = document.getElementById("bento-canvas-agents");
            if (cAgents) {
                const ctx = cAgents.getContext("2d");
                const w = cAgents.width, h = cAgents.height;
                ctx.clearRect(0, 0, w, h);

                const nodes = [
                    { x: w * 0.15, y: h * 0.5, color: "#FBBF24", label: "Planner" },
                    { x: w * 0.45, y: h * 0.22, color: "#22d3ee", label: "Researcher" },
                    { x: w * 0.45, y: h * 0.78, color: "#34d399", label: "Coder" },
                    { x: w * 0.75, y: h * 0.35, color: "#fbbf24", label: "Critic" },
                    { x: w * 0.85, y: h * 0.7, color: "#fb7185", label: "Validator" }
                ];
                const edges = [[0,1],[0,2],[1,3],[2,3],[2,4],[3,4],[1,2]];

                // Gradient connections
                edges.forEach(([a, b]) => {
                    const grad = ctx.createLinearGradient(nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y);
                    grad.addColorStop(0, nodes[a].color + "30");
                    grad.addColorStop(1, nodes[b].color + "30");
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(nodes[a].x, nodes[a].y);
                    ctx.lineTo(nodes[b].x, nodes[b].y);
                    ctx.stroke();
                });

                // Animated pulses along edges
                edges.forEach(([a, b], i) => {
                    const progress = ((t * 0.5 + i * 0.25) % 1);
                    const px = nodes[a].x + (nodes[b].x - nodes[a].x) * progress;
                    const py = nodes[a].y + (nodes[b].y - nodes[a].y) * progress;
                    const glow = ctx.createRadialGradient(px, py, 0, px, py, 8);
                    glow.addColorStop(0, nodes[b].color + "cc");
                    glow.addColorStop(1, nodes[b].color + "00");
                    ctx.fillStyle = glow;
                    ctx.beginPath();
                    ctx.arc(px, py, 8, 0, Math.PI * 2);
                    ctx.fill();
                });

                // Glowing nodes
                nodes.forEach(n => {
                    const glowR = 16 + Math.sin(t * 2) * 3;
                    const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
                    glow.addColorStop(0, n.color + "55");
                    glow.addColorStop(1, n.color + "00");
                    ctx.fillStyle = glow;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = n.color;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = "#ffffffcc";
                    ctx.font = "9px JetBrains Mono, monospace";
                    ctx.textAlign = "center";
                    ctx.fillText(n.label, n.x, n.y + 18);
                });
            }

            // 2. Attention Canvas — Smooth gradient heatmap
            const cAttn = document.getElementById("bento-canvas-attention");
            if (cAttn) {
                const ctx = cAttn.getContext("2d");
                const w = cAttn.width, h = cAttn.height;
                ctx.clearRect(0, 0, w, h);
                const cellSize = 20;
                const gap = 3;
                const cols = 8, rows = 6;
                const startX = (w - cols * (cellSize + gap)) / 2;
                const startY = (h - rows * (cellSize + gap)) / 2;
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const val = 0.5 + 0.5 * Math.sin(t * 1.2 + r * 0.6 + c * 0.8);
                        const hue = 30 + val * 30;
                        const sat = 70 + val * 30;
                        ctx.fillStyle = `hsla(${hue}, ${sat}%, ${50 + val * 20}%, ${val * 0.8 + 0.15})`;
                        const rx = startX + c * (cellSize + gap);
                        const ry = startY + r * (cellSize + gap);
                        ctx.beginPath();
                        ctx.roundRect(rx, ry, cellSize, cellSize, 3);
                        ctx.fill();
                    }
                }
                // Labels
                ctx.fillStyle = "#ffffff55";
                ctx.font = "8px JetBrains Mono, monospace";
                ctx.textAlign = "left";
                const tokens = ["The", "model", "learns", "attention", "weights", "fast"];
                tokens.forEach((tk, i) => {
                    if (i < rows) ctx.fillText(tk, 4, startY + i * (cellSize + gap) + 14);
                });
            }

            // 3. AutoML canvas (mini bar chart)
            const cAutoML = document.getElementById("bento-canvas-automl");
            if (cAutoML) {
                const ctx = cAutoML.getContext("2d");
                const w = cAutoML.width, h = cAutoML.height;
                ctx.clearRect(0, 0, w, h);
                const models = [
                    { name: "XGB", score: 0.984, color: "#22d3ee" },
                    { name: "LGBM", score: 0.971, color: "#FBBF24" },
                    { name: "RF", score: 0.956, color: "#34d399" },
                    { name: "SVM", score: 0.923, color: "#fbbf24" },
                    { name: "LR", score: 0.891, color: "#fb7185" }
                ];
                const barW = 36, gap2 = 16;
                const totalW = models.length * (barW + gap2) - gap2;
                const startX2 = (w - totalW) / 2;
                const maxH = h * 0.65;
                models.forEach((m, i) => {
                    const animated = m.score * (0.85 + 0.15 * Math.sin(t + i));
                    const barH = animated * maxH;
                    const x = startX2 + i * (barW + gap2);
                    const y = h - 24 - barH;
                    const grad = ctx.createLinearGradient(x, y + barH, x, y);
                    grad.addColorStop(0, m.color + "33");
                    grad.addColorStop(1, m.color + "cc");
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
                    ctx.fill();
                    ctx.fillStyle = "#ffffff88";
                    ctx.font = "9px JetBrains Mono, monospace";
                    ctx.textAlign = "center";
                    ctx.fillText(m.name, x + barW / 2, h - 10);
                });
            }

            // 4. Vision Canvas — Enhanced bounding boxes with glow
            const cVision = document.getElementById("bento-canvas-vision");
            if (cVision) {
                const ctx = cVision.getContext("2d");
                const w = cVision.width, h = cVision.height;
                ctx.clearRect(0, 0, w, h);

                // Subtle grid
                ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
                ctx.lineWidth = 0.5;
                for (let x = 0; x < w; x += 20) {
                    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
                }
                for (let y2 = 0; y2 < h; y2 += 20) {
                    ctx.beginPath(); ctx.moveTo(0, y2); ctx.lineTo(w, y2); ctx.stroke();
                }

                const objects = [
                    { x: 30 + Math.sin(t * 0.7) * 12, y: 40, w: 95, h: 65, label: "Drone", conf: 96, color: "#34d399" },
                    { x: 175 + Math.cos(t * 0.5) * 8, y: 30, w: 50, h: 85, label: "Human", conf: 92, color: "#22d3ee" },
                    { x: 245 + Math.sin(t * 0.4) * 6, y: 55, w: 45, h: 40, label: "Vehicle", conf: 88, color: "#fbbf24" }
                ];

                objects.forEach(obj => {
                    // Glow
                    ctx.shadowColor = obj.color;
                    ctx.shadowBlur = 10;
                    ctx.strokeStyle = obj.color;
                    ctx.lineWidth = 1.5;
                    ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
                    ctx.shadowBlur = 0;

                    // Corner brackets
                    const corner = 8;
                    ctx.lineWidth = 2.5;
                    ctx.strokeStyle = obj.color;
                    // Top-left
                    ctx.beginPath(); ctx.moveTo(obj.x, obj.y + corner); ctx.lineTo(obj.x, obj.y); ctx.lineTo(obj.x + corner, obj.y); ctx.stroke();
                    // Top-right
                    ctx.beginPath(); ctx.moveTo(obj.x + obj.w - corner, obj.y); ctx.lineTo(obj.x + obj.w, obj.y); ctx.lineTo(obj.x + obj.w, obj.y + corner); ctx.stroke();
                    // Bottom-left
                    ctx.beginPath(); ctx.moveTo(obj.x, obj.y + obj.h - corner); ctx.lineTo(obj.x, obj.y + obj.h); ctx.lineTo(obj.x + corner, obj.y + obj.h); ctx.stroke();
                    // Bottom-right
                    ctx.beginPath(); ctx.moveTo(obj.x + obj.w - corner, obj.y + obj.h); ctx.lineTo(obj.x + obj.w, obj.y + obj.h); ctx.lineTo(obj.x + obj.w, obj.y + obj.h - corner); ctx.stroke();

                    ctx.lineWidth = 1;
                    // Label background
                    ctx.fillStyle = obj.color + "22";
                    ctx.fillRect(obj.x, obj.y - 16, 72, 14);
                    ctx.fillStyle = obj.color;
                    ctx.font = "bold 10px JetBrains Mono, monospace";
                    ctx.textAlign = "left";
                    ctx.fillText(`${obj.label} ${obj.conf}%`, obj.x + 3, obj.y - 5);
                });
            }

            // 5. Radar Canvas — Professional radar sweep with gradient cone
            const cRadar = document.getElementById("bento-canvas-radar");
            if (cRadar) {
                const ctx = cRadar.getContext("2d");
                const w = cRadar.width, h = cRadar.height;
                ctx.clearRect(0, 0, w, h);
                const cx = w / 2, cy = h / 2, radius = Math.min(w, h) * 0.38;

                // Concentric rings
                [0.25, 0.5, 0.75, 1].forEach(frac => {
                    ctx.strokeStyle = `rgba(251, 113, 133, ${0.08 + frac * 0.08})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.arc(cx, cy, radius * frac, 0, Math.PI * 2);
                    ctx.stroke();
                });

                // Crosshairs
                ctx.strokeStyle = "rgba(251, 113, 133, 0.08)";
                ctx.beginPath();
                ctx.moveTo(cx - radius, cy); ctx.lineTo(cx + radius, cy);
                ctx.moveTo(cx, cy - radius); ctx.lineTo(cx, cy + radius);
                ctx.stroke();

                // Sweep cone gradient
                const angle = t * 1.2;
                const sweepAngle = 0.5;
                const grad = ctx.createConicGradient(angle - sweepAngle, cx, cy);
                grad.addColorStop(0, "rgba(251, 113, 133, 0)");
                grad.addColorStop(sweepAngle / (Math.PI * 2), "rgba(251, 113, 133, 0.18)");
                grad.addColorStop(sweepAngle / Math.PI, "rgba(251, 113, 133, 0)");
                grad.addColorStop(1, "rgba(251, 113, 133, 0)");
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                ctx.fill();

                // Sweep line
                ctx.strokeStyle = "rgba(251, 113, 133, 0.9)";
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
                ctx.stroke();

                // Threat blips with pulsing glow
                const blips = [
                    { a: 1.2, r: 0.6, size: 4 },
                    { a: 3.5, r: 0.35, size: 3 },
                    { a: 5.0, r: 0.82, size: 5 }
                ];
                blips.forEach(blip => {
                    const bx = cx + Math.cos(blip.a) * radius * blip.r;
                    const by = cy + Math.sin(blip.a) * radius * blip.r;
                    const pulse = 1 + 0.3 * Math.sin(t * 3 + blip.a);
                    const glow = ctx.createRadialGradient(bx, by, 0, bx, by, blip.size * pulse * 3);
                    glow.addColorStop(0, "rgba(251, 113, 133, 0.6)");
                    glow.addColorStop(1, "rgba(251, 113, 133, 0)");
                    ctx.fillStyle = glow;
                    ctx.beginPath();
                    ctx.arc(bx, by, blip.size * pulse * 3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = "#fb7185";
                    ctx.beginPath();
                    ctx.arc(bx, by, blip.size * pulse, 0, Math.PI * 2);
                    ctx.fill();
                });

                // Center dot
                ctx.fillStyle = "#fb718566";
                ctx.beginPath();
                ctx.arc(cx, cy, 3, 0, Math.PI * 2);
                ctx.fill();
            }

            this.animationFrame = requestAnimationFrame(draw);
        };
        draw();
    }
}
