import DiceRerollModifierValue from "../utilities/DiceRerollModifierValue";
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
        public criticalHitsSkill: DiceSkillValue,
        public sustainedHits: boolean,
        public sustainedHitsCount: number,
        public lethalHits: boolean,
        public devastatingWounds: boolean,
        public rerollHitsModifier: DiceRerollModifierValue,
        public rerollWoundsModifier: DiceRerollModifierValue,
        public toughness: number
    ) {}
}

class AttacksCalculator {
    static calculate(input: CalculatorInput): CalculationResult {
        let baseSuccessfulHits = input.attackCount * input.skill.successPercentage * input.rerollHitsModifier.multiplier;
        let successfulHits = baseSuccessfulHits;

        if (input.sustainedHits) {
            successfulHits += successfulHits * input.criticalHitsSkill.successPercentage * input.sustainedHitsCount;
        }

        let successfulWounds = 0;

        if (input.lethalHits) {
            const lethalHits = baseSuccessfulHits * input.criticalHitsSkill.successPercentage;

            successfulWounds += lethalHits;
            successfulHits -= lethalHits;
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

        let succcessfulWounds = successfulHits * woundDiceSkill.successPercentage;

        successfulWounds +=
            Math.min(
                successfulHits * woundDiceSkill.successPercentage * input.rerollWoundsModifier.multiplier,
                successfulHits
            );

        return new  CalculationResult(
            successfulHits,
            successfulWounds,
            successfulWounds * input.damage
        );
    }
}

export default AttacksCalculator;