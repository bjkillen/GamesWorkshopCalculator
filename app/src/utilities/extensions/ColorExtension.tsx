class ColorExtension {
    static lerpColor(color1: string, color2: string, amount: number): string {
        const c1 = ColorExtension.hexToRgb(color1);
        const c2 = ColorExtension.hexToRgb(color2);

        if (c1 == null || c2 == null) {
            return color1;
        }

        const r = Math.round(c1.r + (c2.r - c1.r) * amount);
        const g = Math.round(c1.g + (c2.g - c1.g) * amount);
        const b = Math.round(c1.b + (c2.b - c1.b) * amount);

        return ColorExtension.rgbToHex(r, g, b);
    }

    static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null; 
    }

    static rgbToHex(r: number, g: number, b: number): string {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
}

export default ColorExtension;