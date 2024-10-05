import DiceRerollModifierValue, { DiceRerollModifierValueEnum } from "../utilities/enums/DiceRerollModifierValue";
import { DiceSkillValue, Keyword, Wargear } from "gamesworkshopcalculator.common";
import WargearAbilities from "./WargearAbilities";

export class AttackerCalculationResult {
    constructor(
        public successfulHits: number,
        public criticalHits: number,
        public successfulWounds: number,
        public criticalWounds: number
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
        public devastatingWounds: boolean,
        public torrent: boolean,
        public rerollHitsModifier: DiceRerollModifierValue,
        public rerollWoundsModifier: DiceRerollModifierValue,
        public toughness: number,
        public stealth: boolean,
        public minusToWound: boolean,
        public defendingUnitKeywords: Keyword[],
        public attackingUnitWargear: Wargear | undefined
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

        let criticalWoundSkill = input.devastatingWounds ? DiceSkillValue.Six : undefined;

        if (input.attackingUnitWargear != null) {
            const wargearAbilitiesParsed = new WargearAbilities(input.attackingUnitWargear);

            wargearAbilitiesParsed.anti?.forEach((anti) => {
                if (input.defendingUnitKeywords.find((kw) => kw.name.toLocaleLowerCase().includes(anti[0].toLocaleLowerCase()))) {
                    if (anti[1].numericalValue < (criticalWoundSkill?.numericalValue ?? 7 )) {
                        criticalWoundSkill = anti[1];
                    }

                    if (anti[1].numericalValue < woundDiceSkill.numericalValue) {
                        woundDiceSkill = anti[1];
                    }
                }
            })
        }

        const woundDiceToReroll = this.additionalDiceFromModifier(
            successfulHits,
            woundDiceSkill,
            input.rerollWoundsModifier
        );

        successfulWounds += (successfulHits * woundDiceSkill.successPercentage) + (woundDiceToReroll * woundDiceSkill.successPercentage);

        let criticalWounds = 0;

        if (criticalWoundSkill != null && input.devastatingWounds) {
            criticalWounds = (successfulHits * criticalWoundSkill.successPercentage) + (woundDiceToReroll * criticalWoundSkill.successPercentage);
            successfulWounds = Math.max(successfulWounds - criticalWounds, 0);
        }

        return new  AttackerCalculationResult(
            successfulHits,
            criticalHits,
            successfulWounds,
            criticalWounds
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