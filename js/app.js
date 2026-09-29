/**
 * OmniNexus AI Studios - Master Application Orchestrator
 */

import { SynthAudio } from "./audio/synth-audio.js?v=5.0.0";
import { I18nManager } from "./i18n/translations.js?v=5.0.0";
import { NavHeader } from "./components/nav-header.js?v=5.0.0";
import { BentoOverview } from "./components/bento-overview.js?v=5.0.0";
import { CommandPalette } from "./components/command-palette.js?v=5.0.0";

// Studio 1: AgentCraft
import { AgentCraftEngine } from "./projects/agentcraft/agentcraft-engine.js?v=5.0.0";
import { AgentCraftView } from "./projects/agentcraft/agentcraft-view.js?v=5.0.0";

// Studio 2: NeuraForge
import { NeuraForgeEngine } from "./projects/neuraforge/neuraforge-engine.js?v=5.0.0";
import { NeuraForgeView } from "./projects/neuraforge/neuraforge-view.js?v=5.0.0";

// Studio 3: PulseML
import { PulseMLEngine } from "./projects/pulseml/pulseml-engine.js?v=5.0.0";
import { PulseMLView } from "./projects/pulseml/pulseml-view.js?v=5.0.0";

// Studio 4: OmniVision
import { OmniVisionEngine } from "./projects/omnivision/omnivision-engine.js?v=5.0.0";
import { OmniVisionView } from "./projects/omnivision/omnivision-view.js?v=5.0.0";

// Studio 5: CyberRadar
import { CyberRadarEngine } from "./projects/cyberradar/cyberradar-engine.js?v=5.0.0";
import { CyberRadarView } from "./projects/cyberradar/cyberradar-view.js?v=5.0.0";

class OmniNexusApp {
    constructor() {
        this.synth = new SynthAudio();
        this.i18n = new I18nManager();
        this.currentTab = "overview";

        // Engines
        this.agentEngine = new AgentCraftEngine();
        this.neuraEngine = new NeuraForgeEngine();
        this.pulseEngine = new PulseMLEngine();
        this.visionEngine = new OmniVisionEngine();
        this.cyberEngine = new CyberRadarEngine();

        this.init();
    }

    init() {
        // Nav Header
        const headerContainer = document.getElementById("app-header-container");
        this.navHeader = new NavHeader(headerContainer, this);
        this.navHeader.render();

        // Command Palette
        this.cmdPalette = new CommandPalette(this);

        // Bento Overview
        const overviewContainer = document.getElementById("panel-overview-container");
        this.bentoOverview = new BentoOverview(overviewContainer, this);
        this.bentoOverview.render();

        // Studios
        this.agentView = new AgentCraftView(document.getElementById("panel-agentcraft-container"), this.agentEngine, this.synth);
        this.agentView.render();

        this.neuraView = new NeuraForgeView(document.getElementById("panel-neuraforge-container"), this.neuraEngine, this.synth);
        this.neuraView.render();

        this.pulseView = new PulseMLView(document.getElementById("panel-pulseml-container"), this.pulseEngine, this.synth);
        this.pulseView.render();

        this.visionView = new OmniVisionView(document.getElementById("panel-omnivision-container"), this.visionEngine, this.synth);
        this.visionView.render();

        this.cyberView = new CyberRadarView(document.getElementById("panel-cyberradar-container"), this.cyberEngine, this.synth);
        this.cyberView.render();

        // Initial Tab
        this.switchTab("overview");
    }

    switchTab(tabId) {
        this.currentTab = tabId;
        this.synth.playClick();

        // Update nav header active state
        this.navHeader.setActiveTab(tabId);

        // Hide all studio panels & overview
        document.querySelectorAll(".studio-panel, #panel-overview-container").forEach(panel => {
            panel.classList.remove("active");
            panel.style.display = "none";
        });

        // Show target panel
        if (tabId === "overview") {
            const overview = document.getElementById("panel-overview-container");
            if (overview) {
                overview.classList.add("active");
                overview.style.display = "block";
            }
        } else {
            const targetPanel = document.getElementById(`panel-${tabId}`);
            if (targetPanel) {
                targetPanel.classList.add("active");
                targetPanel.style.display = "block";
            }
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    toggleAudio() {
        return this.synth.toggle();
    }

    toggleLanguage() {
        const nextLang = this.i18n.lang === "ar" ? "en" : "ar";
        this.i18n.setLanguage(nextLang);
        this.navHeader.updateLanguage(nextLang);
        this.synth.playClick();
    }
}

// Bootstrap
window.addEventListener("DOMContentLoaded", () => {
    window.omniApp = new OmniNexusApp();
});
