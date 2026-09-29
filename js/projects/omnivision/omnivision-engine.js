/**
 * OmniVision Engine: YOLOv8 Object Detection & Zero-Shot CLIP Embedding Matching
 */
export class OmniVisionEngine {
    constructor() {
        this.confidenceThreshold = 0.50;
        this.iouThreshold = 0.45;
        this.showGradCAM = false;

        // Ground-truth tracked targets
        this.targets = [
            { id: 1, label: "Autonomous Vehicle", baseConf: 0.94, color: "#10b981", x: 60, y: 70, w: 140, h: 90, vx: 0.8, vy: 0 },
            { id: 2, label: "Pedestrian", baseConf: 0.91, color: "#06b6d4", x: 260, y: 50, w: 55, h: 120, vx: -0.4, vy: 0.2 },
            { id: 3, label: "Delivery Drone", baseConf: 0.88, color: "#EA580C", x: 380, y: 30, w: 85, h: 55, vx: 0.5, vy: -0.3 },
            { id: 4, label: "Traffic Signal", baseConf: 0.96, color: "#f59e0b", x: 490, y: 20, w: 40, h: 110, vx: 0, vy: 0 },
            { id: 5, label: "Cyclist", baseConf: 0.62, color: "#f43f5e", x: 180, y: 95, w: 60, h: 80, vx: 0.6, vy: 0.1 }
        ];

        // CLIP text embeddings simulation
        this.clipEmbeddings = {
            "autonomous vehicle": [0.82, 0.12, 0.45, 0.08],
            "car": [0.85, 0.10, 0.42, 0.05],
            "pedestrian": [0.15, 0.88, 0.12, 0.41],
            "human walking": [0.12, 0.92, 0.09, 0.38],
            "drone": [0.22, 0.18, 0.89, 0.35],
            "flying robot": [0.25, 0.15, 0.91, 0.32],
            "traffic light": [0.08, 0.05, 0.12, 0.95]
        };
    }

    updateTargets(width, height) {
        this.targets.forEach(t => {
            t.x += t.vx;
            t.y += t.vy;

            // Bounce within bounds
            if (t.x < 10 || t.x + t.w > width - 10) t.vx *= -1;
            if (t.y < 10 || t.y + t.h > height - 10) t.vy *= -1;
        });

        // Filter by confidence threshold
        return this.targets.filter(t => t.baseConf >= this.confidenceThreshold);
    }

    matchCLIPQuery(textQuery) {
        const q = textQuery.toLowerCase().trim();
        // Generate pseudo text vector
        let qVec = [0.2, 0.2, 0.2, 0.2];
        for (const [key, vec] of Object.entries(this.clipEmbeddings)) {
            if (q.includes(key)) {
                qVec = vec;
                break;
            }
        }

        // Compute cosine similarities against detected targets
        const results = this.targets.map(t => {
            let targetVec = [0.1, 0.1, 0.1, 0.1];
            if (t.label.includes("Vehicle")) targetVec = [0.85, 0.10, 0.40, 0.10];
            else if (t.label.includes("Pedestrian")) targetVec = [0.10, 0.90, 0.10, 0.40];
            else if (t.label.includes("Drone")) targetVec = [0.20, 0.15, 0.90, 0.30];
            else if (t.label.includes("Traffic")) targetVec = [0.05, 0.05, 0.10, 0.95];
            else targetVec = [0.4, 0.7, 0.3, 0.2];

            // Dot product
            const dot = qVec.reduce((acc, val, idx) => acc + val * targetVec[idx], 0);
            const magQ = Math.sqrt(qVec.reduce((acc, val) => acc + val * val, 0));
            const magT = Math.sqrt(targetVec.reduce((acc, val) => acc + val * val, 0));
            const sim = Math.min(0.99, Math.max(0.12, dot / (magQ * magT)));

            return {
                target: t.label,
                similarity: Number(sim.toFixed(3)),
                conf: t.baseConf
            };
        });

        results.sort((a, b) => b.similarity - a.similarity);
        return results;
    }
}
