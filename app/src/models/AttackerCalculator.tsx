import DiceRerollModifierValue, { DiceRerollModifierValueEnum } from "../utilities/enums/DiceRerollModifierValue";
import { DiceSkillValue } from "gamesworkshopcalculator.common";

export class AttackerCalculationResult {
    constructor(
        public successfulHits: number,
        public criticalHits: number,
        public successfulWounds: number,
    ) {}
}

export class AttackerCalculatorInput {
    constructor(
        public attackCount: number,
        public strength: number,
        public skill: DiceSkillValue,
        public criticalHitsSkill: DiceSkillValue,
        public sustainedHits: boolean,
        public sustainedHitsCount: number,
        public lethalHits: boolean,
        public rerollHitsModifier: DiceRerollModifierValue,
        public rerollWoundsModifier: DiceRerollModifierValue,
        public toughness: number
    ) {}
}

class AttackerCalculator {
    static calculate(input: AttackerCalculatorInput): AttackerCalculationResult {
        let baseSuccessfulHits = input.attackCount * input.skill.successPercentage;
        let criticalHits = input.attackCount * input.criticalHitsSkill.successPercentage;

        const hitDiceToReroll = this.additionalDiceFromModifier(
            input.attackCount,
            input.skill,
            input.rerollHitsModifier
        );

        baseSuccessfulHits += hitDiceToReroll * input.skill.successPercentage;
        criticalHits += hitDiceToReroll * input.criticalHitsSkill.successPercentage;

        let successfulHits = baseSuccessfulHits;

        if (input.sustainedHits) {
            successfulHits += criticalHits * input.sustainedHitsCount;
        }

        let successfulWounds = 0;

        if (input.lethalHits) {
            successfulWounds += criticalHits ;
            successfulHits -= criticalHits ;
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

        const woundDiceToReroll = this.additionalDiceFromModifier(
            successfulHits,
            woundDiceSkill,
            input.rerollWoundsModifier
        );

        successfulWounds += (successfulHits * woundDiceSkill.successPercentage) + (woundDiceToReroll * woundDiceSkill.successPercentage);

        return new  AttackerCalculationResult(
            successfulHits,
            criticalHits,
            successfulWounds,
        );
    }

    private static additionalDiceFromModifier(
        diceCount: number,
        skill: DiceSkillValue,
        modifier: DiceRerollModifierValue
    ): number {
        if (modifier.value == DiceRerollModifierValueEnum.Ones) {
            return diceCount * DiceSkillValue.Two.failurePercentage;
        } else if (modifier.value == DiceRerollModifierValueEnum.All) {
            return diceCount * skill.failurePercentage;
        }

        return 0;
    }
}

export default AttackerCalculator;