import { AttackerCalculationResult } from "./AttackerCalculator";
import { DiceSkillValue } from "gamesworkshopcalculator.common";

export class DefenderStatistics {
    constructor(
        public weaponDamage: number,
        public armorPenetration: number,
        public devastatingWounds: boolean,
        public armorSaveSkill: DiceSkillValue,
        public invulnerableSave: boolean,
        public invulnerableSaveSkill: DiceSkillValue,
        public feelNoPain: boolean,
        public feelNoPainSkill: DiceSkillValue,
        public wounds: number
    ) {}
}

export class DefenderCalculatorInput {
    constructor(
        public defenderStatistics: DefenderStatistics,
        public attackerCalculatorResult: AttackerCalculationResult,
    ) {}
}

export class DefenderCalculatorResult {
    constructor(
        public woundsSaved: number,
        public totalDamageSaved: number,
        public totalSuccessfulDamage: number,
        public modelsDestroyed: number
    ) {}
}

class DefenderCalculator {
    static calculate(input: DefenderCalculatorInput): DefenderCalculatorResult {
        const modifiedArmorSave = input.defenderStatistics.armorSaveSkill.numericalValue
            + input.defenderStatistics.armorPenetration;

        const modifiedArmorSaveSkill = DiceSkillValue.parseNumerical(modifiedArmorSave);

        let unsavedWoundsRemaining = input.attackerCalculatorResult.successfulWounds;
        let woundsFailed = 0;

        if (input.defenderStatistics.devastatingWounds) {
            const devWoundsSuccessful = input.attackerCalculatorResult.successfulWounds * DiceSkillValue.Six.successPercentage;

            unsavedWoundsRemaining -= devWoundsSuccessful;
            woundsFailed += devWoundsSuccessful;
        }

        if (modifiedArmorSaveSkill != null) {
            let finalChosenSaveSkill = modifiedArmorSaveSkill;

            if (input.defenderStatistics.invulnerableSave &&
                input.defenderStatistics.invulnerableSaveSkill.numericalValue < modifiedArmorSaveSkill.numericalValue
            ) {
                finalChosenSaveSkill = input.defenderStatistics.invulnerableSaveSkill;
            }

            woundsFailed += unsavedWoundsRemaining * finalChosenSaveSkill.failurePercentage;
        } else if (input.defenderStatistics.invulnerableSave) {
            woundsFailed += unsavedWoundsRemaining *
                input.defenderStatistics.invulnerableSaveSkill.failurePercentage;
        } else {
            woundsFailed += unsavedWoundsRemaining;
        }

        let totalDamage = woundsFailed * input.defenderStatistics.weaponDamage;
        let totalSuccessfulDamage = totalDamage;

        if (input.defenderStatistics.feelNoPain) {
            totalSuccessfulDamage = totalDamage * input.defenderStatistics.feelNoPainSkill.failurePercentage;
        }

        let totalSuccessfulWoundDice = totalSuccessfulDamage / input.defenderStatistics.weaponDamage;
        const woundDicePerModel = Math.ceil(input.defenderStatistics.wounds / input.defenderStatistics.weaponDamage);

        let modelsDestroyed = totalSuccessfulWoundDice / woundDicePerModel;
        let remainingModelDamage = (totalSuccessfulWoundDice % woundDicePerModel) * input.defenderStatistics.weaponDamage;

        return new DefenderCalculatorResult(
            input.attackerCalculatorResult.successfulWounds - woundsFailed,
            totalDamage - totalSuccessfulDamage,
            totalSuccessfulDamage,
            Math.floor(modelsDestroyed) + (input.defenderStatistics.wounds / remainingModelDamage)
        )
    }
}

export default DefenderCalculator;