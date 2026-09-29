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
            t += 0.03;
            // 1. Swarm Canvas
            const cAgents = document.getElementById("bento-canvas-agents");
            if (cAgents) {
                const ctx = cAgents.getContext("2d");
                ctx.clearRect(0, 0, cAgents.width, cAgents.height);
                const w = cAgents.width, h = cAgents.height;
                const nodes = [
                    { x: w * 0.18, y: h * 0.5, color: "#6366f1", label: "Planner" },
                    { x: w * 0.5, y: h * 0.28, color: "#06b6d4", label: "Researcher" },
                    { x: w * 0.5, y: h * 0.72, color: "#10b981", label: "Coder" },
                    { x: w * 0.82, y: h * 0.5, color: "#f59e0b", label: "Critic" }
                ];
                // Connections
                ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(nodes[0].x, nodes[0].y); ctx.lineTo(nodes[1].x, nodes[1].y);
                ctx.moveTo(nodes[0].x, nodes[0].y); ctx.lineTo(nodes[2].x, nodes[2].y);
                ctx.moveTo(nodes[1].x, nodes[1].y); ctx.lineTo(nodes[3].x, nodes[3].y);
                ctx.moveTo(nodes[2].x, nodes[2].y); ctx.lineTo(nodes[3].x, nodes[3].y);
                ctx.stroke();

                // Pulses
                const pulse1 = (t * 0.6) % 1;
                const p1x = nodes[0].x + (nodes[1].x - nodes[0].x) * pulse1;
                const p1y = nodes[0].y + (nodes[1].y - nodes[0].y) * pulse1;
                ctx.fillStyle = "#06b6d4";
                ctx.beginPath(); ctx.arc(p1x, p1y, 4, 0, Math.PI * 2); ctx.fill();

                nodes.forEach(n => {
                    ctx.fillStyle = n.color;
                    ctx.beginPath(); ctx.arc(n.x, n.y, 8, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "#ffffff";
                    ctx.font = "10px JetBrains Mono, monospace";
                    ctx.textAlign = "center";
                    ctx.fillText(n.label, n.x, n.y + 18);
                });
            }

            // 2. Attention Canvas
            const cAttn = document.getElementById("bento-canvas-attention");
            if (cAttn) {
                const ctx = cAttn.getContext("2d");
                ctx.clearRect(0, 0, cAttn.width, cAttn.height);
                const size = 18;
                const startX = 40, startY = 20;
                for (let r = 0; r < 6; r++) {
                    for (let c = 0; c < 6; c++) {
                        const val = 0.5 + 0.5 * Math.sin(t + r * 0.5 + c * 0.7);
                        ctx.fillStyle = `rgba(139, 92, 246, ${val * 0.85 + 0.1})`;
                        ctx.fillRect(startX + c * (size + 4), startY + r * (size + 4), size, size);
                    }
                }
            }

            // 4. Vision Canvas (Bounding boxes)
            const cVision = document.getElementById("bento-canvas-vision");
            if (cVision) {
                const ctx = cVision.getContext("2d");
                ctx.clearRect(0, 0, cVision.width, cVision.height);
                ctx.fillStyle = "#020409";
                ctx.fillRect(0, 0, cVision.width, cVision.height);

                // Grid
                ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
                for (let x = 0; x < cVision.width; x += 25) {
                    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, cVision.height); ctx.stroke();
                }

                // Simulated vehicle
                const vx = 40 + Math.sin(t) * 15;
                ctx.strokeStyle = "#10b981";
                ctx.lineWidth = 1.5;
                ctx.strokeRect(vx, 45, 90, 60);
                ctx.fillStyle = "#10b981";
                ctx.font = "10px JetBrains Mono, monospace";
                ctx.fillText("Drone 96%", vx + 4, 38);

                // Simulated pedestrian
                const px = 180 + Math.cos(t * 0.8) * 10;
                ctx.strokeStyle = "#06b6d4";
                ctx.strokeRect(px, 35, 45, 80);
                ctx.fillStyle = "#06b6d4";
                ctx.fillText("Human 92%", px + 4, 28);
            }

            // 5. Radar Canvas
            const cRadar = document.getElementById("bento-canvas-radar");
            if (cRadar) {
                const ctx = cRadar.getContext("2d");
                ctx.clearRect(0, 0, cRadar.width, cRadar.height);
                const cx = cRadar.width / 2, cy = cRadar.height / 2, radius = 65;
                // Rings
                ctx.strokeStyle = "rgba(244, 63, 94, 0.25)";
                ctx.lineWidth = 1;
                [0.3, 0.6, 1].forEach(frac => {
                    ctx.beginPath(); ctx.arc(cx, cy, radius * frac, 0, Math.PI * 2); ctx.stroke();
                });
                // Sweep line
                const angle = t * 1.5;
                ctx.strokeStyle = "rgba(244, 63, 94, 0.8)";
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
                ctx.stroke();

                // Target blip
                ctx.fillStyle = "#fb7185";
                ctx.beginPath();
                ctx.arc(cx + 30, cy - 25, 4, 0, Math.PI * 2);
                ctx.fill();
            }

            this.animationFrame = requestAnimationFrame(draw);
        };
        draw();
    }
}
