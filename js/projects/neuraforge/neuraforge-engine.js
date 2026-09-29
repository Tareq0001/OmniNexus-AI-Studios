/**
 * NeuraForge Engine: LoRA PEFT Mathematics & Transformer Attention Matrix
 */
export class NeuraForgeEngine {
    constructor() {
        this.baseParams = 2147483648; // 2.15B parameters
        this.hiddenDim = 4096;
        this.loraConfig = {
            rank: 16,
            alpha: 32,
            targetModules: ["q_proj", "v_proj"]
        };

        this.sentence = "The autonomous agent optimized the transformer neural weights";
        this.tokens = this._tokenize(this.sentence);
        this.activeHead = 0;
        this.attentionMatrix = this._computeScaledDotProductAttention(this.tokens, 0);

        this.trainingModes = {
            SFT_LORA: { lr: "2e-5", lossStart: 2.10, lossEnd: 0.82, ppl: 2.27, vram: "14.4 GB" },
            DPO_ALIGNMENT: { lr: "5e-6", lossStart: 0.69, lossEnd: 0.28, ppl: 1.32, vram: "18.2 GB" },
            PRETRAIN: { lr: "1e-4", lossStart: 6.80, lossEnd: 1.95, ppl: 7.03, vram: "32.0 GB" }
        };
        this.currentMode = "SFT_LORA";
        this.lossHistory = [2.10, 1.85, 1.62, 1.44, 1.31, 1.22, 1.15, 1.09, 1.04, 0.98, 0.92, 0.88];
    }

    _tokenize(text) {
        return text.trim().split(/\s+/).filter(Boolean);
    }

    setSentence(newSentence) {
        this.sentence = newSentence;
        this.tokens = this._tokenize(newSentence);
        this.attentionMatrix = this._computeScaledDotProductAttention(this.tokens, this.activeHead);
        return this.tokens;
    }

    setActiveHead(headIdx) {
        this.activeHead = headIdx;
        this.attentionMatrix = this._computeScaledDotProductAttention(this.tokens, headIdx);
        return this.attentionMatrix;
    }

    _computeScaledDotProductAttention(tokens, headIdx) {
        const N = tokens.length;
        if (N === 0) return [];
        const matrix = [];
        const d_k = 128;
        const sqrt_dk = Math.sqrt(d_k);

        // Deterministic pseudo-embeddings per token
        const embeddings = tokens.map(tok => {
            let h = 0;
            for (let i = 0; i < tok.length; i++) h = (h * 31 + tok.charCodeAt(i)) & 0xffffffff;
            return {
                q: ((h >> 4) % 100) / 100.0,
                k: ((h >> 8) % 100) / 100.0,
                len: tok.length
            };
        });

        for (let i = 0; i < N; i++) {
            const rawScores = [];
            for (let j = 0; j < N; j++) {
                let score = 0;
                if (headIdx === 0) { // Syntactic Dependency
                    score = (i === j) ? 2.5 : (Math.abs(i - j) === 1 ? 1.8 : 0.4);
                } else if (headIdx === 1) { // Semantic Coreference
                    score = Math.cos(embeddings[i].q * embeddings[j].k * 3.14) * 2.0;
                } else if (headIdx === 2) { // Long-Range Induction
                    score = (j <= i) ? (2.0 - (i - j) * 0.15) : -1.0;
                } else { // Lexical Proximity
                    score = 2.0 / (Math.abs(i - j) + 1.0);
                }
                rawScores.push(score / sqrt_dk);
            }

            // Softmax
            const maxScore = Math.max(...rawScores);
            const expScores = rawScores.map(s => Math.exp(s - maxScore));
            const sumExp = expScores.reduce((a, b) => a + b, 0);
            const rowWeights = expScores.map(e => Number((e / sumExp).toFixed(3)));
            matrix.push(rowWeights);
        }
        return matrix;
    }

    getLoRAMetrics() {
        // Param formula: 2 * num_layers * d_model * rank * target_modules
        const numLayers = 32;
        const numTargetModules = this.loraConfig.targetModules.length; // 2
        const loraParams = 2 * numLayers * this.hiddenDim * this.loraConfig.rank * numTargetModules;
        const pct = (loraParams / this.baseParams) * 100;
        const scalingFactor = (this.loraConfig.alpha / this.loraConfig.rank).toFixed(2);
        const memorySaved = (100 - pct).toFixed(2);

        return {
            loraParams,
            loraParamsFormatted: (loraParams / 1e6).toFixed(2) + " Million",
            baseParamsFormatted: (this.baseParams / 1e9).toFixed(2) + " Billion",
            trainablePercentage: pct.toFixed(3) + "%",
            scalingFactor,
            memorySavedPercentage: memorySaved + "%"
        };
    }
}
