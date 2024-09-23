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
        public skill: DiceSkillValue | undefined,
        public criticalHitsSkill: DiceSkillValue,
        public sustainedHits: boolean,
        public sustainedHitsCount: number,
        public lethalHits: boolean,
        public torrent: boolean,
        public rerollHitsModifier: DiceRerollModifierValue,
        public rerollWoundsModifier: DiceRerollModifierValue,
        public toughness: number,
        public stealth: boolean,
        public minusToWound: boolean
    ) {}
}

class AttackerCalculator {
    static calculate(input: AttackerCalculatorInput): AttackerCalculationResult {
        let hitDiceSkill = input.skill;

        let baseSuccessfulHits = 0;
        let successfulHits = 0;
        let successfulWounds = 0;
        let criticalHits = 0;

        if (!input.torrent && hitDiceSkill != null) {
            if (input.stealth && hitDiceSkill.numericalValue < 6) {
                const modifiedHitDiceSkill = hitDiceSkill.numericalValue + 1;
                hitDiceSkill =  DiceSkillValue.parseNumerical(modifiedHitDiceSkill) ?? hitDiceSkill;
            }

            baseSuccessfulHits = input.attackCount * hitDiceSkill.successPercentage;
            criticalHits = input.attackCount * input.criticalHitsSkill.successPercentage;

            const hitDiceToReroll = this.additionalDiceFromModifier(
                input.attackCount,
                hitDiceSkill,
                input.rerollHitsModifier
            );

            baseSuccessfulHits += hitDiceToReroll * hitDiceSkill.successPercentage;
            criticalHits += hitDiceToReroll * input.criticalHitsSkill.successPercentage;

            successfulHits = baseSuccessfulHits;

            if (input.sustainedHits) {
                successfulHits += criticalHits * input.sustainedHitsCount;
            }

            if (input.lethalHits) {
                successfulWounds += criticalHits ;
                successfulHits -= criticalHits ;
            }
        } else {
            baseSuccessfulHits = input.attackCount;
            successfulHits = baseSuccessfulHits;
        }

        const strength = input.strength;
        const toughness = input.toughness;

        let woundDiceSkill: DiceSkillValue;

        if (strength >= toughness * 2) {
            if (input.minusToWound) {
                woundDiceSkill = DiceSkillValue.Three;
            } else {
                woundDiceSkill = DiceSkillValue.Two;
            }
        } else if (strength > toughness) {
            if (input.minusToWound) {
                woundDiceSkill = DiceSkillValue.Four;
            } else {
                woundDiceSkill = DiceSkillValue.Three;
            }
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