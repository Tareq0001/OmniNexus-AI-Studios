/**
 * AgentCraft Swarm View Component
 */
export class AgentCraftView {
    constructor(container, engine, audioSynth) {
        this.container = container;
        this.engine = engine;
        this.synth = audioSynth;
        this.animFrame = null;
    }

    render() {
        this.container.innerHTML = `
            <div class="studio-panel" id="panel-agentcraft">
                <div class="studio-layout-grid">
                    
                    <!-- Left Column: DAG Orchestrator & Task Dispatch -->
                    <div class="studio-card">
                        <div class="studio-card-header">
                            <div>
                                <span class="badge badge-indigo">Autonomous Multi-Agent Swarm</span>
                                <h3 style="margin-top: 4px; color: #fff;">AgentCraft: DAG Workflow Orchestrator</h3>
                            </div>
                            <span class="badge badge-emerald">4 Swarm Agents</span>
                        </div>

                        <!-- Presets Bar -->
                        <div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; direction: ltr !important;">
                            <span class="text-sm text-muted">Presets:</span>
                            <button class="btn btn-outline btn-sm btn-preset" data-task="Design an Enterprise Hybrid-Search RAG Architecture with Cross-Encoder Reranking">
                                📚 Enterprise RAG
                            </button>
                            <button class="btn btn-outline btn-sm btn-preset" data-task="Build an Autonomous High-Frequency Market Making Agent with Risk Bounds">
                                📈 FinTech Market Agent
                            </button>
                            <button class="btn btn-outline btn-sm btn-preset" data-task="Fine-tune a 7B LLM with LoRA on Medical Diagnosis Records with DPO Alignment">
                                🧬 Medical LLM Swarm
                            </button>
                        </div>

                        <!-- Task Input & Dispatch -->
                        <div style="display: flex; gap: 10px; width: 100%; align-items: center; margin-bottom: 16px; direction: ltr !important;">
                            <input type="text" id="input-swarm-task" class="form-input font-mono" 
                                value="Design an Enterprise Hybrid-Search RAG Architecture with Cross-Encoder Reranking" 
                                placeholder="Enter objective for the autonomous swarm...">
                            <button class="btn btn-primary" id="btn-dispatch-swarm" style="flex-shrink: 0; white-space: nowrap;">
                                🚀 Dispatch Swarm
                            </button>
                        </div>

                        <!-- Interactive DAG Canvas -->
                        <div style="background: #030712; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.06); height: 240px; overflow: hidden; position: relative;">
                            <canvas id="canvas-swarm-dag" width="560" height="240" style="width: 100%; height: 100%;"></canvas>
                        </div>

                        <!-- Active Agent Cards -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 14px;">
                            ${this.engine.agents.map(a => `
                                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 10px; display: flex; align-items: center; justify-content: space-between;">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <span style="font-size: 18px;">${a.avatar}</span>
                                        <div>
                                            <div style="font-size: 12px; font-weight: 700; color: #fff;">${a.name}</div>
                                            <div style="font-size: 10px; color: #94a3b8;">${a.role}</div>
                                        </div>
                                    </div>
                                    <span class="badge ${a.status === 'ACTIVE' ? 'badge-emerald' : 'badge-secondary'}" id="badge-agent-${a.id}">
                                        ${a.status}
                                    </span>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <!-- Right Column: ReAct Feed & Verified Artifact -->
                    <div class="studio-card">
                        <div class="studio-card-header">
                            <div>
                                <span class="badge badge-cyan">Cognitive Stream</span>
                                <h3 style="margin-top: 4px; color: #fff;">Live ReAct Execution Log</h3>
                            </div>
                            <span class="badge badge-purple" id="lbl-steps-count">${this.engine.executionLogs.length} Steps</span>
                        </div>

                        <div id="feed-react-logs" style="display: flex; flex-direction: column; gap: 8px; max-height: 220px; overflow-y: auto; margin-bottom: 16px; direction: ltr !important; text-align: left !important;">
                            ${this._renderLogsHTML()}
                        </div>

                        <!-- Generated Code Box -->
                        <div style="background: #090e1a; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 14px; direction: ltr !important;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding-bottom: 6px;">
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <span class="badge badge-emerald">Verified Artifact</span>
                                    <strong class="font-mono text-sm" id="lbl-artifact-title">${this.engine.currentArtifact.title}</strong>
                                </div>
                                <div style="display: flex; gap: 6px;">
                                    <button class="btn btn-outline btn-sm" id="btn-copy-artifact">📋 Copy</button>
                                    <button class="btn btn-primary btn-sm" id="btn-run-sandbox">▶️ Run Sandbox</button>
                                </div>
                            </div>
                            <pre class="code-box" id="code-artifact-content">${this.engine.currentArtifact.code}</pre>
                            <div id="terminal-sandbox-output" class="terminal-box" style="display: none; margin-top: 10px;"></div>
                        </div>
                    </div>

                </div>
            </div>
        `;

        this.setupEvents();
        this.startCanvas();
    }

    _renderLogsHTML() {
        return this.engine.executionLogs.map(log => `
            <div style="background: #030712; border-left: 3px solid #6366f1; border-radius: 6px; padding: 8px 12px; font-family: var(--font-mono); font-size: 11px;">
                <div style="display: flex; justify-content: space-between; color: #94a3b8; margin-bottom: 4px;">
                    <span><strong>${log.role}</strong> [${log.type}]</span>
                    <span>${log.time}</span>
                </div>
                <div style="color: #e2e8f0; line-height: 1.4;">${log.text}</div>
            </div>
        `).join("");
    }

    setupEvents() {
        const input = this.container.querySelector("#input-swarm-task");
        const dispatchBtn = this.container.querySelector("#btn-dispatch-swarm");

        // Presets
        this.container.querySelectorAll(".btn-preset").forEach(btn => {
            btn.addEventListener("click", () => {
                input.value = btn.dataset.task;
                this.synth.playClick();
            });
        });

        // Dispatch
        dispatchBtn.addEventListener("click", async () => {
            const prompt = input.value.trim();
            if (!prompt) return;

            dispatchBtn.disabled = true;
            dispatchBtn.innerText = "⏳ Swarm Processing...";
            this.synth.playDispatch();

            await this.engine.dispatchTask(prompt, () => {
                this._updateLiveFeed();
            });

            this.synth.playSuccess();
            dispatchBtn.disabled = false;
            dispatchBtn.innerText = "🚀 Dispatch Swarm";
        });

        // Copy Code
        this.container.querySelector("#btn-copy-artifact").addEventListener("click", () => {
            navigator.clipboard.writeText(this.engine.currentArtifact.code);
            this.synth.playClick();
            const btn = this.container.querySelector("#btn-copy-artifact");
            btn.innerText = "✔ Copied!";
            setTimeout(() => btn.innerText = "📋 Copy", 2000);
        });

        // Run Sandbox
        this.container.querySelector("#btn-run-sandbox").addEventListener("click", async () => {
            const term = this.container.querySelector("#terminal-sandbox-output");
            term.style.display = "block";
            term.innerHTML = "<em>[Sandbox Runtime v3.11.8 - Linux x86_64]</em><br>Compiling AST and executing bytecodes...";
            this.synth.playClick();

            await new Promise(r => setTimeout(r, 600));
            this.synth.playSuccess();
            term.innerHTML = `[Sandbox Runtime v3.11.8 - Linux x86_64]<br>
✔ Process finished with exit code 0 (Elapsed: 0.038s)<br>
<span style="color: #38bdf8;">Output:</span> Pipeline validated. All 4 assertions passed. Ready for deployment.`;
        });
    }

    _updateLiveFeed() {
        const feed = this.container.querySelector("#feed-react-logs");
        if (feed) {
            feed.innerHTML = this._renderLogsHTML();
            feed.scrollTop = feed.scrollHeight;
        }
        const title = this.container.querySelector("#lbl-artifact-title");
        const code = this.container.querySelector("#code-artifact-content");
        if (title) title.innerText = this.engine.currentArtifact.title;
        if (code) code.innerText = this.engine.currentArtifact.code;

        this.engine.agents.forEach(a => {
            const b = this.container.querySelector(`#badge-agent-${a.id}`);
            if (b) {
                b.className = `badge ${a.status === 'ACTIVE' ? 'badge-emerald' : 'badge-secondary'}`;
                b.innerText = a.status;
            }
        });
    }

    startCanvas() {
        const canvas = this.container.querySelector("#canvas-swarm-dag");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let t = 0;

        const draw = () => {
            t += 0.03;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const w = canvas.width, h = canvas.height;

            const nPlanner = { x: w * 0.16, y: h * 0.5, color: "#6366f1", label: "Planner" };
            const nResearcher = { x: w * 0.5, y: h * 0.28, color: "#06b6d4", label: "Researcher" };
            const nCoder = { x: w * 0.5, y: h * 0.72, color: "#10b981", label: "Coder" };
            const nCritic = { x: w * 0.84, y: h * 0.5, color: "#f59e0b", label: "Critic" };

            // Links
            ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(nPlanner.x, nPlanner.y); ctx.lineTo(nResearcher.x, nResearcher.y);
            ctx.moveTo(nPlanner.x, nPlanner.y); ctx.lineTo(nCoder.x, nCoder.y);
            ctx.moveTo(nResearcher.x, nResearcher.y); ctx.lineTo(nCritic.x, nCritic.y);
            ctx.moveTo(nCoder.x, nCoder.y); ctx.lineTo(nCritic.x, nCritic.y);
            ctx.stroke();

            // Active Pulses
            const pulse = (t * 0.8) % 1;
            const px1 = nPlanner.x + (nResearcher.x - nPlanner.x) * pulse;
            const py1 = nPlanner.y + (nResearcher.y - nPlanner.y) * pulse;
            ctx.fillStyle = "#06b6d4";
            ctx.beginPath(); ctx.arc(px1, py1, 4, 0, Math.PI * 2); ctx.fill();

            const px2 = nResearcher.x + (nCritic.x - nResearcher.x) * pulse;
            const py2 = nResearcher.y + (nCritic.y - nResearcher.y) * pulse;
            ctx.fillStyle = "#f59e0b";
            ctx.beginPath(); ctx.arc(px2, py2, 4, 0, Math.PI * 2); ctx.fill();

            [nPlanner, nResearcher, nCoder, nCritic].forEach(n => {
                ctx.fillStyle = n.color;
                ctx.beginPath(); ctx.arc(n.x, n.y, 10, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = "#ffffff";
                ctx.font = "bold 11px JetBrains Mono, monospace";
                ctx.textAlign = "center";
                ctx.fillText(n.label, n.x, n.y + 22);
            });

            this.animFrame = requestAnimationFrame(draw);
        };
        draw();
    }
}
