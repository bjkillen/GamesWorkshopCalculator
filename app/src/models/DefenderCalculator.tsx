import NumberExtension from "../utilities/extensions/NumberExtension";
import { AttackerCalculationResult } from "./AttackerCalculator";
import { DiceSkillValue } from "gamesworkshopcalculator.common";

export class DefenderStatistics {
    constructor(
        public weaponDamage: number,
        public armorPenetration: number,
        public armorSaveSkill: DiceSkillValue | undefined,
        public invulnerableSave: boolean,
        public invulnerableSaveSkill: DiceSkillValue | undefined,
        public feelNoPain: boolean,
        public feelNoPainSkill: DiceSkillValue | undefined,
        public wounds: number,
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
        public woundsFailed: number,
        public totalDamageSaved: number,
        public totalSuccessfulDamage: number,
        public modelsDestroyed: number,
    ) {}
}

class DefenderCalculator {
    static calculate(input: DefenderCalculatorInput): DefenderCalculatorResult {
        const modifiedArmorSave = (input.defenderStatistics.armorSaveSkill?.numericalValue ?? 7)
            + input.defenderStatistics.armorPenetration;

        const modifiedArmorSaveSkill = DiceSkillValue.parseNumerical(modifiedArmorSave);

        let unsavedWoundsRemaining = input.attackerCalculatorResult.successfulWounds;
        let woundsFailed = input.attackerCalculatorResult.criticalWounds;

        if (modifiedArmorSaveSkill != null) {
            let finalChosenSaveSkill = modifiedArmorSaveSkill;

            if (input.defenderStatistics.invulnerableSave && input.defenderStatistics.invulnerableSaveSkill != null &&
                input.defenderStatistics.invulnerableSaveSkill.numericalValue < modifiedArmorSaveSkill.numericalValue
            ) {
                finalChosenSaveSkill = input.defenderStatistics.invulnerableSaveSkill;
            }

            woundsFailed += unsavedWoundsRemaining * finalChosenSaveSkill.failurePercentage;
        } else if (input.defenderStatistics.invulnerableSave && input.defenderStatistics.invulnerableSaveSkill != null) {
            woundsFailed += unsavedWoundsRemaining *
                input.defenderStatistics.invulnerableSaveSkill.failurePercentage;
        } else {
            woundsFailed += unsavedWoundsRemaining;
        }

        let totalDamage = woundsFailed * input.defenderStatistics.weaponDamage;

        let totalSuccessfulDamage = totalDamage;

        if (input.defenderStatistics.feelNoPain && input.defenderStatistics.feelNoPainSkill != null) {
            totalSuccessfulDamage = totalDamage * input.defenderStatistics.feelNoPainSkill.failurePercentage;
        }

        const woundDicePerModel = Math.ceil(input.defenderStatistics.wounds / input.defenderStatistics.weaponDamage);

        let remainingDiceToAllocate = totalSuccessfulDamage / input.defenderStatistics.weaponDamage;
        let modelsDestroyed = 0;
        let damageDiceTotal = 0;

        while (remainingDiceToAllocate > woundDicePerModel) {
            modelsDestroyed += 1;
            remainingDiceToAllocate -= woundDicePerModel;
            damageDiceTotal += woundDicePerModel;
        }

        const remainingWholeDiceLeft = Math.floor(remainingDiceToAllocate);
        damageDiceTotal += remainingWholeDiceLeft;

        if (remainingWholeDiceLeft > 0)
        {
            modelsDestroyed +=  (remainingWholeDiceLeft * input.defenderStatistics.weaponDamage) / input.defenderStatistics.wounds;
        }

        return new DefenderCalculatorResult(
            input.attackerCalculatorResult.successfulWounds - (woundsFailed - input.attackerCalculatorResult.criticalWounds),
            (woundsFailed - input.attackerCalculatorResult.criticalWounds),
            totalDamage - totalSuccessfulDamage,
            damageDiceTotal * input.defenderStatistics.weaponDamage,
            modelsDestroyed
        )
    }
}

export default DefenderCalculator;