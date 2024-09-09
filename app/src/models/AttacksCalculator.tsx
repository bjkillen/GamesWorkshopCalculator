import DiceSkillValue from "../utilities/DiceSkillValue";

export class CalculationResult {
    constructor(
        public successfulHits: number,
        public successfulWounds: number,
        public totalDamage: number
    ) {}
}

export class CalculatorInput {
    constructor(
        public attackCount: number,
        public strength: number,
        public skill: DiceSkillValue,
        public damage: number,
        public sustainedHits: boolean,
        public lethalHits: boolean,
        public devastatingWounds: boolean,
        public toughness: number
    ) {}
}

class AttacksCalculator {
    static calculate(input: CalculatorInput): CalculationResult {
        let baseSuccessfulHits = input.attackCount * input.skill.successPercentage;
        let successfulHits = baseSuccessfulHits;

        if (input.sustainedHits) {
            successfulHits += successfulHits * DiceSkillValue.Six.successPercentage;
        }

        const strength = input.strength;
        const toughness = input.toughness;

        let woundDiceSkill: DiceSkillValue;

        if (strength >= toughness * 2) {
            woundDiceSkill = DiceSkillValue.Two;
        } else if (strength > toughness) {
            woundDiceSkill = DiceSkillValue.Three;
        } else if (strength === toughness) {
            woundDiceSkill = DiceSkillValue.Four;
        } else if (strength <= toughness / 2) {
            woundDiceSkill = DiceSkillValue.Six;
        } else {
            woundDiceSkill = DiceSkillValue.Five;
        }

        let successfulWounds = 0;

        if (input.lethalHits) {
            const lethalHits = baseSuccessfulHits * DiceSkillValue.Six.successPercentage;
            successfulWounds += lethalHits;

            baseSuccessfulHits -= lethalHits;
        }

        successfulWounds += baseSuccessfulHits * woundDiceSkill.successPercentage;

        return new  CalculationResult(
            successfulHits,
            successfulWounds,
            successfulWounds * input.damage
        );
    }
}

export default AttacksCalculator;