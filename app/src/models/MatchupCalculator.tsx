import AttackerCalculator, { AttackerCalculatorInput, AttackerCalculationResult } from "./AttackerCalculator";
import DefenderCalculator, { DefenderCalculatorInput, DefenderCalculatorResult, DefenderStatistics } from "./DefenderCalculator";

export class AttackerDefenderCalculatorInput {
    constructor(
        public attackerInput: AttackerCalculatorInput,
        public defenderStatistics: DefenderStatistics,
    ) {}
}

export class AttackerDefenderCalculatorResult {
    constructor(
        public attackerResult: AttackerCalculationResult,
        public defenderResult: DefenderCalculatorResult,
    ) {}
}

class AttackerDefenderCalculator {
    static calculate(input: AttackerDefenderCalculatorInput): AttackerDefenderCalculatorResult {
        const attackerResult = AttackerCalculator.calculate(input.attackerInput);

        const defenderCalculatorInput = new DefenderCalculatorInput(
            input.defenderStatistics,
            attackerResult
        );

        const defenderResult = DefenderCalculator.calculate(defenderCalculatorInput);

        return new AttackerDefenderCalculatorResult(attackerResult, defenderResult);
    }
}

export default AttackerDefenderCalculator;