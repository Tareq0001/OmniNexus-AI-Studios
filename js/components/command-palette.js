/**
 * Command Palette Controller (Linear & Raycast Style)
 */
export class CommandPalette {
    constructor(app) {
        this.app = app;
        this.isOpen = false;
        this.commands = [
            { id: "overview", name: "⚡ Bento Grid Overview", desc: "View all 5 Flagship Studios", category: "Navigation", action: () => app.switchTab("overview") },
            { id: "agentcraft", name: "🤖 AgentCraft: Swarm Orchestrator", desc: "Autonomous Multi-Agent DAG Studio", category: "Studios", action: () => app.switchTab("agentcraft") },
            { id: "neuraforge", name: "🧠 NeuraForge: LLM & LoRA Foundry", desc: "PEFT & Transformer Attention Matrix", category: "Studios", action: () => app.switchTab("neuraforge") },
            { id: "pulseml", name: "📊 PulseML: AutoML & Explainable AI", desc: "Model Leaderboard & SHAP Waterfall", category: "Studios", action: () => app.switchTab("pulseml") },
            { id: "omnivision", name: "👁️ OmniVision: Real-Time Multimodal Lab", desc: "YOLOv8 Detection & Zero-Shot CLIP", category: "Studios", action: () => app.switchTab("omnivision") },
            { id: "cyberradar", name: "🛡️ CyberRadar: Autonomous AI SOC", desc: "AI Threat Detection & Global Attack Radar", category: "Studios", action: () => app.switchTab("cyberradar") },
            { id: "toggle_audio", name: "🔊 Toggle Sound Effects", desc: "Enable/Disable Web Audio feedback", category: "System", action: () => app.toggleAudio() },
            { id: "toggle_lang", name: "🌐 Switch Language (العربية / English)", desc: "Toggle bilingual interface", category: "System", action: () => app.toggleLanguage() }
        ];

        this.initDOM();
        this.setupKeyboard();
    }

    initDOM() {
        this.backdrop = document.createElement("div");
        this.backdrop.className = "modal-backdrop";
        this.backdrop.innerHTML = `
            <div class="cmd-palette-box">
                <input type="text" class="cmd-search-input font-mono" placeholder="Type a command or jump to studio... (Press ESC to close)" id="cmd-input">
                <div class="cmd-results-list" id="cmd-results"></div>
            </div>
        `;
        document.body.appendChild(this.backdrop);

        this.input = this.backdrop.querySelector("#cmd-input");
        this.resultsList = this.backdrop.querySelector("#cmd-results");

        this.backdrop.addEventListener("click", (e) => {
            if (e.target === this.backdrop) this.close();
        });

        this.input.addEventListener("input", () => this.filter(this.input.value));
    }

    setupKeyboard() {
        window.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                this.toggle();
            } else if (e.key === "Escape" && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        if (this.isOpen) this.close();
        else this.open();
    }

    open() {
        this.isOpen = true;
        this.backdrop.classList.add("open");
        this.input.value = "";
        this.filter("");
        setTimeout(() => this.input.focus(), 50);
    }

    close() {
        this.isOpen = false;
        this.backdrop.classList.remove("open");
    }

    filter(query) {
        const q = query.toLowerCase().trim();
        const filtered = this.commands.filter(c => 
            c.name.toLowerCase().includes(q) || 
            c.desc.toLowerCase().includes(q) || 
            c.category.toLowerCase().includes(q)
        );

        this.resultsList.innerHTML = filtered.map((c, idx) => `
            <div class="cmd-item ${idx === 0 ? 'selected' : ''}" data-id="${c.id}">
                <div>
                    <strong>${c.name}</strong>
                    <div class="text-sm text-muted">${c.desc}</div>
                </div>
                <span class="badge badge-secondary">${c.category}</span>
            </div>
        `).join("");

        this.resultsList.querySelectorAll(".cmd-item").forEach(item => {
            item.addEventListener("click", () => {
                const target = this.commands.find(c => c.id === item.dataset.id);
                if (target) {
                    target.action();
                    this.close();
                }
            });
        });
    }
}
