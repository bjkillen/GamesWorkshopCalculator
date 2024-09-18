class NumberExtension {
    public static roundedToNearest(value: number, nearest: number) {
        return Math.round(value / nearest) * nearest;
    }

    public static flooredToNearest(value: number, nearest: number) {
        return Math.floor(value / nearest) * nearest;
    }

    public static clamped(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max);
    }

    public static parseTextFlooredZeroOrUndefined(value: string) {
        if (value.length === 0) {
            return undefined;
        }

        const parsedNumber = Number(value);

        if (Number.isNaN(parsedNumber)) {
            return undefined;
        }

        return Math.max(0, parsedNumber);
    }
}

export default NumberExtension;