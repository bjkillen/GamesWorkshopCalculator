import { Faction, FactionsMap, TypedJSON } from "gamesworkshopcalculator.common";

export class VariableNumericalValue {
    constructor(
        public stringVal: string,
        public numericalVal: number
    ) {}
}

class VariableNumericalValueParser {
    static multicationDRegex = new RegExp(/(\d)?(D\d+)/);

    static Parse(value: string): VariableNumericalValue {
        const valueSplitByPlus = value.split("+").map((v) => {
            const trimmedVal = v.trim().toUpperCase();

            const result = this.multicationDRegex.exec(trimmedVal);

            if (result != null) {
                const multiplcationVal = Number(result[1] ?? 1);

                if (result[2] === "D6") {
                    return 3.5 * multiplcationVal;
                } else if (result[2] === "D3") {
                    return 2 * multiplcationVal;
                }
            }

            return Number(trimmedVal) ?? 0;
        });

        const sum = valueSplitByPlus.reduce(
            (accumulator, currentValue) => accumulator + currentValue
        );

        return new VariableNumericalValue(value, sum);
    }
}

export default VariableNumericalValueParser;