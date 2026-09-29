/**
 * Canvas Helpers for High-Fidelity 60FPS Visualizations
 */
export class CanvasHelpers {
    static drawGrid(ctx, width, height, step = 30, color = "rgba(255, 255, 255, 0.03)") {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        for (let x = 0; x <= width; x += step) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y <= height; y += step) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        ctx.restore();
    }

    static drawGlowingNode(ctx, x, y, radius, color, label, sublabel) {
        ctx.save();
        // Outer glow
        const grad = ctx.createRadialGradient(x, y, radius * 0.2, x, y, radius * 2.2);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Core circle
        ctx.fillStyle = "#0c101d";
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Labels
        if (label) {
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 11px JetBrains Mono, monospace";
            ctx.textAlign = "center";
            ctx.fillText(label, x, y + 4);
        }
        if (sublabel) {
            ctx.fillStyle = "#94a3b8";
            ctx.font = "10px JetBrains Mono, monospace";
            ctx.textAlign = "center";
            ctx.fillText(sublabel, x, y + radius + 14);
        }
        ctx.restore();
    }

    static drawConnection(ctx, x1, y1, x2, y2, color, pulseProgress = 0) {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Animated pulse
        if (pulseProgress > 0) {
            const px = x1 + (x2 - x1) * pulseProgress;
            const py = y1 + (y2 - y1) * pulseProgress;
            ctx.fillStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    static drawBoundingBox(ctx, x, y, w, h, label, conf, color = "#06b6d4") {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);

        // Tech Corner Accents
        const cornerLen = 8;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        // Top Left
        ctx.beginPath(); ctx.moveTo(x, y + cornerLen); ctx.lineTo(x, y); ctx.lineTo(x + cornerLen, y); ctx.stroke();
        // Top Right
        ctx.beginPath(); ctx.moveTo(x + w - cornerLen, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + cornerLen); ctx.stroke();
        // Bottom Left
        ctx.beginPath(); ctx.moveTo(x, y + h - cornerLen); ctx.lineTo(x, y + h); ctx.lineTo(x + cornerLen, y + h); ctx.stroke();
        // Bottom Right
        ctx.beginPath(); ctx.moveTo(x + w - cornerLen, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y + h - cornerLen); ctx.stroke();

        // Label Tag Box
        const tagText = `${label} ${(conf * 100).toFixed(0)}%`;
        ctx.font = "bold 11px JetBrains Mono, monospace";
        const tagW = ctx.measureText(tagText).width + 12;
        ctx.fillStyle = color;
        ctx.fillRect(x, y - 20, tagW, 20);

        ctx.fillStyle = "#030712";
        ctx.fillText(tagText, x + 6, y - 6);
        ctx.restore();
    }
}
