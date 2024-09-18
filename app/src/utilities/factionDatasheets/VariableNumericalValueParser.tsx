import { Faction, FactionsMap, TypedJSON } from "gamesworkshopcalculator.common";

export class VariableNumericalValue {
    constructor(
        public stringVal: string,
        public numericalVal: number
    ) {}
}

class VariableNumericalValueParser {
    static Parse(value: string): VariableNumericalValue {
        const valueSplitByPlus = value.split("+").map((v) => {
            const trimmedVal = v.trim().toUpperCase();

            if (trimmedVal === "D6") {
                return 3.5;
            }
            else if (trimmedVal === "D3") {
                return 2;
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