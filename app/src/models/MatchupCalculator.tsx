import AttackerCalculator, { AttackerCalculatorInput, AttackerCalculationResult } from "./AttackerCalculator";

export class MatchupCalculatorInput {
    constructor(
        public attackerInput: AttackerCalculatorInput,
    ) {}
}

export class MatchupCalculatorResult {
    constructor(
        public attackerResult: AttackerCalculationResult,
    ) {}
}

class MatchupCalculator {
    static calculate(input: MatchupCalculatorInput): MatchupCalculatorResult {
        const attackerResult = AttackerCalculator.calculate(input.attackerInput);

        return new MatchupCalculatorResult(attackerResult);
    }
}

export default MatchupCalculator;