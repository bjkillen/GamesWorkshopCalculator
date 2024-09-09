import DiceSkillValues from "../components/DiceSkillValues";

class CalculationResult {
    successfulHits!: number;
    successfulWounds!: number;
    totalDamage!: number;
}

class CalculatorInput {
    attackCount!: number;
    skill!: DiceSkillValues;
}

class AttacksCalculator {
    static calculate(input: CalculatorInput): CalculationResult {
        
    }
}