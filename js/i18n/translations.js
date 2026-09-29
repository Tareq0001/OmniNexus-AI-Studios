/**
 * OmniNexus AI Studios - Bilingual Translations (Arabic / English)
 */
export const translations = {
    ar: {
        brandTitle: "أومني-نيكسوس (OMNINEXUS-AI)",
        brandSubtitle: "المنصة الرائدة: 5 مختبرات ذكاء اصطناعي ونظم متقدمة بتصميم Bento Grid العصري",
        kpiPlatforms: "5 منصات رائدة",
        kpiActiveModels: "18 خوارزمية ذكية",
        kpiSOTA: "مستوى SOTA الفائق",
        cmdSearch: "بحث سريع (Ctrl + K)",
        tabOverview: "⚡ لوحة الاستعراض الشاملة (Bento Grid)",
        tabAgentCraft: "🤖 وكلاء Swarm المستقلون",
        tabNeuraForge: "🧠 تدريب وتطويع LLM & LoRA",
        tabPulseML: "📊 علوم البيانات وAutoML التفسيري",
        tabOmniVision: "👁️ الرؤية الحاسوبية والوسائط المتعددة",
        tabCyberRadar: "🛡️ رادار الذكاء الاصطناعي السيبراني",
        heroBadge: "✨ الجيل الأحدث من واجهات الذكاء الاصطناعي الحية",
        heroTitle: "مختبرات الذكاء الاصطناعي الخمسة فائقة التطور",
        heroSub: "مجموعة متكاملة تضم 5 بيئات برمجية تفاعلية تحاكي أحدث نماذج العمل في وادي السيليكون: هندسة الوكلاء، محاذاة اللغات الكبيرة، علوم البيانات المفسرة، الرؤية الحاسوبية، والدفاع السيبراني الذاتي.",
        btnLaunch: "تشغيل المختبر التفاعلي ➔",
        btnDispatch: "🚀 إطلاق وتوزيع المهام",
        btnCopyCode: "📋 نسخ الكود البرمجي",
        btnRunSandbox: "▶️ تشغيل في البيئة الافتراضية",
        btnComputeQKV: "🧮 حساب مصفوفة QKV",
        btnTuneWeights: "⚡ تحديث الأوزان",
        liveFeed: "البث الحي والتفاعل الفعلي",
        verifiedArtifact: "كود بايثون البرمجي المعتمد"
    },
    en: {
        brandTitle: "OMNINEXUS AI STUDIOS",
        brandSubtitle: "Flagship Suite: 5 Autonomous AI & SOTA Computing Studios with Bento Grid Design",
        kpiPlatforms: "5 Premier Studios",
        kpiActiveModels: "18 SOTA Algorithms",
        kpiSOTA: "Enterprise Production Grade",
        cmdSearch: "Command Palette (Ctrl + K)",
        tabOverview: "⚡ Overview Bento Grid",
        tabAgentCraft: "🤖 AgentCraft: Swarm Orchestrator",
        tabNeuraForge: "🧠 NeuraForge: LLM & LoRA Foundry",
        tabPulseML: "📊 PulseML: AutoML & Explainable AI",
        tabOmniVision: "👁️ OmniVision: Real-Time Multimodal Lab",
        tabCyberRadar: "🛡️ CyberRadar: Autonomous AI SOC",
        heroBadge: "✨ Next-Gen Production AI Workbenches",
        heroTitle: "Five State-of-the-Art Interactive AI Studios",
        heroSub: "A unified enterprise platform delivering five fully operational AI workbenches inspired by Silicon Valley's most trending design templates: Agent Swarms, LLM Fine-Tuning, AutoML, Computer Vision, and Autonomous Cyber Defense.",
        btnLaunch: "Launch Interactive Studio ➔",
        btnDispatch: "🚀 Dispatch Agent Swarm",
        btnCopyCode: "📋 Copy Code",
        btnRunSandbox: "▶️ Run in Sandbox",
        btnComputeQKV: "🧮 Compute QKV Matrix",
        btnTuneWeights: "⚡ Update Weights",
        liveFeed: "Live Execution & Real-Time Feed",
        verifiedArtifact: "Verified Python Implementation"
    }
};

export class I18nManager {
    constructor() {
        this.lang = "ar";
    }

    setLanguage(lang) {
        this.lang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }

    t(key) {
        return translations[this.lang][key] || key;
    }
}
