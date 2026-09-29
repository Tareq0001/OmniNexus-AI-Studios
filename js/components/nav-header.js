/**
 * Top Navigation Header & Global Status Controller
 */
export class NavHeader {
    constructor(container, app) {
        this.container = container;
        this.app = app;
    }

    render() {
        this.container.innerHTML = `
            <header class="app-header">
                <div class="header-inner">
                    <div class="brand-wrap" id="btn-brand-home">
                        <div class="brand-icon">⚡</div>
                        <div>
                            <div class="brand-title" id="lbl-brand-title">OMNINEXUS AI STUDIOS</div>
                            <div class="brand-sub" id="lbl-brand-sub">5 Enterprise Autonomous AI Workbenches • Bento Grid Architecture</div>
                        </div>
                    </div>

                    <div class="header-kpi-bar">
                        <div class="kpi-chip">
                            <span class="kpi-dot"></span>
                            <span class="text-secondary" id="kpi-studios">5 SOTA Studios</span>
                        </div>
                        <div class="kpi-chip">
                            <span class="badge badge-indigo">18 Algorithms</span>
                        </div>
                        <div class="kpi-chip">
                            <span class="badge badge-emerald">60 FPS Hardware-Accelerated</span>
                        </div>
                    </div>

                    <div class="header-actions">
                        <button class="cmd-shortcut-btn" id="btn-cmd-palette">
                            <span>🔍</span>
                            <span id="lbl-cmd-text">Quick Search</span>
                            <span class="kbd-badge">Ctrl K</span>
                        </button>
                        <button class="btn btn-secondary btn-sm" id="btn-audio-toggle">
                            🔊 Audio On
                        </button>
                        <button class="btn btn-secondary btn-sm" id="btn-lang-toggle">
                            العربية
                        </button>
                    </div>
                </div>

                <!-- Linear-Style Navigation Tabs -->
                <nav class="nav-tabs-wrapper" id="nav-tabs-bar">
                    <button class="nav-tab-item active" data-tab="overview">
                        <span>⚡</span>
                        <span data-i18n="tabOverview">Overview (Bento Grid)</span>
                    </button>
                    <button class="nav-tab-item" data-tab="agentcraft">
                        <span>🤖</span>
                        <span data-i18n="tabAgentCraft">1. AgentCraft (Swarm DAG)</span>
                    </button>
                    <button class="nav-tab-item" data-tab="neuraforge">
                        <span>🧠</span>
                        <span data-i18n="tabNeuraForge">2. NeuraForge (LLM & LoRA)</span>
                    </button>
                    <button class="nav-tab-item" data-tab="pulseml">
                        <span>📊</span>
                        <span data-i18n="tabPulseML">3. PulseML (AutoML & SHAP)</span>
                    </button>
                    <button class="nav-tab-item" data-tab="omnivision">
                        <span>👁️</span>
                        <span data-i18n="tabOmniVision">4. OmniVision (YOLOv8 & CLIP)</span>
                    </button>
                    <button class="nav-tab-item" data-tab="cyberradar">
                        <span>🛡️</span>
                        <span data-i18n="tabCyberRadar">5. CyberRadar (AI SOC SIEM)</span>
                    </button>
                </nav>
            </header>
        `;

        this.setupEvents();
    }

    setupEvents() {
        this.container.querySelector("#btn-brand-home").addEventListener("click", () => {
            this.app.switchTab("overview");
        });

        this.container.querySelector("#btn-cmd-palette").addEventListener("click", () => {
            this.app.cmdPalette.open();
        });

        this.container.querySelector("#btn-audio-toggle").addEventListener("click", (e) => {
            const isEnabled = this.app.toggleAudio();
            e.currentTarget.innerText = isEnabled ? "🔊 Audio On" : "🔈 Audio Muted";
        });

        this.container.querySelector("#btn-lang-toggle").addEventListener("click", () => {
            this.app.toggleLanguage();
        });

        this.container.querySelectorAll(".nav-tab-item").forEach(tab => {
            tab.addEventListener("click", () => {
                const target = tab.dataset.tab;
                this.app.switchTab(target);
            });
        });
    }

    setActiveTab(tabId) {
        this.container.querySelectorAll(".nav-tab-item").forEach(tab => {
            if (tab.dataset.tab === tabId) {
                tab.classList.add("active");
            } else {
                tab.classList.remove("active");
            }
        });
    }

    updateLanguage(lang) {
        const titleEl = this.container.querySelector("#lbl-brand-title");
        const subEl = this.container.querySelector("#lbl-brand-sub");
        const cmdEl = this.container.querySelector("#lbl-cmd-text");
        const langBtn = this.container.querySelector("#btn-lang-toggle");

        if (lang === "ar") {
            titleEl.innerText = "أومني-نيكسوس (OMNINEXUS-AI)";
            subEl.innerText = "المنصة الرائدة: 5 مختبرات ذكاء اصطناعي ونظم متقدمة بتصميم Bento Grid العصري";
            cmdEl.innerText = "بحث سريع";
            langBtn.innerText = "English";
        } else {
            titleEl.innerText = "OMNINEXUS AI STUDIOS";
            subEl.innerText = "5 Enterprise Autonomous AI Workbenches • Bento Grid Architecture";
            cmdEl.innerText = "Quick Search";
            langBtn.innerText = "العربية";
        }
    }
}
