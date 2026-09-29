/**
 * PulseML Engine: AutoML Leaderboard, Dynamic Confusion Matrix & SHAP Waterfall
 */
export class PulseMLEngine {
    constructor() {
        this.leaderboard = [
            { model: "XGBoost Classifier", type: "Gradient Boosted Trees", auc: 0.984, f1: 0.962, precision: 0.971, latency: "4.2ms", status: "LEADER" },
            { model: "LightGBM Classifier", type: "Histogram Gradient Boosting", auc: 0.981, f1: 0.958, precision: 0.965, latency: "1.8ms", status: "RUNNER_UP" },
            { model: "Random Forest Ensemble", type: "Bagged Decision Trees", auc: 0.962, f1: 0.934, precision: 0.942, latency: "8.6ms", status: "BASELINE" },
            { model: "Deep Neural Net (MLP)", type: "4-Layer Dense + BatchNorm", auc: 0.955, f1: 0.921, precision: 0.930, latency: "14.5ms", status: "NEURAL" }
        ];

        this.features = ["tx_amount", "account_age", "ip_risk_score", "velocity_24h", "device_trust", "geo_dist_km"];
        this.correlationMatrix = [
            [1.00, -0.15, 0.42, 0.38, -0.28, 0.52],
            [-0.15, 1.00, -0.32, -0.45, 0.61, -0.18],
            [0.42, -0.32, 1.00, 0.58, -0.68, 0.49],
            [0.38, -0.45, 0.58, 1.00, -0.52, 0.44],
            [-0.28, 0.61, -0.68, -0.52, 1.00, -0.35],
            [0.52, -0.18, 0.49, 0.44, -0.35, 1.00]
        ];

        this.baseValue = 0.082; // E[f(x)] base risk
        this.currentThreshold = 0.50;
        this.currentIpRisk = 0.85;
        this.currentVelocity = 14;
    }

    calculateConfusionMatrix(threshold) {
        this.currentThreshold = threshold;
        const totalPositives = 500;
        const totalNegatives = 9500;

        // Model sensitivity curves based on threshold
        const tpRate = Math.min(0.99, Math.max(0.40, 1.0 - Math.pow(threshold, 1.4) * 0.7));
        const fpRate = Math.min(0.20, Math.max(0.001, Math.pow(1.0 - threshold, 2.8) * 0.15));

        const tp = Math.round(totalPositives * tpRate);
        const fn = totalPositives - tp;
        const fp = Math.round(totalNegatives * fpRate);
        const tn = totalNegatives - fp;

        const precision = tp / (tp + fp) || 0;
        const recall = tp / (tp + fn) || 0;
        const f1 = (2 * precision * recall) / (precision + recall) || 0;

        return {
            tp, fp, fn, tn,
            precision: precision.toFixed(3),
            recall: recall.toFixed(3),
            f1: f1.toFixed(3)
        };
    }

    calculateSHAP(ipRisk = this.currentIpRisk, velocity = this.currentVelocity) {
        this.currentIpRisk = ipRisk;
        this.currentVelocity = velocity;

        // Realistic feature attribution calculation
        const ipShap = (ipRisk - 0.5) * 0.78;
        const velShap = ((velocity - 5) / 25) * 0.52;
        const geoDistShap = 0.15;
        const txAmountShap = 0.08;
        const devTrustShap = 0.08;
        const accountAgeShap = -0.16;

        const contributions = [
            { feature: "ip_risk_score", value: ipRisk.toFixed(2), shap: Number(ipShap.toFixed(3)), unit: "" },
            { feature: "velocity_24h", value: `${velocity} txs`, shap: Number(velShap.toFixed(3)), unit: "" },
            { feature: "geo_dist_km", value: "3800 km", shap: geoDistShap, unit: "" },
            { feature: "tx_amount", value: "$4,200", shap: txAmountShap, unit: "" },
            { feature: "device_trust", value: "0.25", shap: devTrustShap, unit: "" },
            { feature: "account_age", value: "650 days", shap: accountAgeShap, unit: "" }
        ];

        // Sort by absolute magnitude
        contributions.sort((a, b) => Math.abs(b.shap) - Math.abs(a.shap));

        const totalShap = contributions.reduce((acc, c) => acc + c.shap, 0);
        // Sigmoid mapping for predicted probability
        const logOdds = Math.log(this.baseValue / (1 - this.baseValue)) + totalShap * 3.2;
        const predictedProb = 1 / (1 + Math.exp(-logOdds));

        const maxShap = Math.max(...contributions.map(c => Math.abs(c.shap)));
        contributions.forEach(c => {
            c.barWidthPct = Math.min(100, Math.max(10, Math.round((Math.abs(c.shap) / maxShap) * 90)));
        });

        return {
            baseValue: this.baseValue,
            predictedProb: predictedProb.toFixed(3),
            decision: predictedProb >= this.currentThreshold ? "FLAGGED_FRAUD" : "APPROVED_CLEAN",
            contributions
        };
    }
}
