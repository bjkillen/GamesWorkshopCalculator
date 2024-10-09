import NumberExtension from "../utilities/extensions/NumberExtension";
import { VariableNumericalValue } from "../utilities/factionDatasheets/VariableNumericalValueParser";
import { AttackerCalculationResult } from "./AttackerCalculator";
import { DiceSkillValue } from "gamesworkshopcalculator.common";

export class DefenderStatistics {
    constructor(
        public weaponDamage: number,
        public melta: boolean,
        public meltaDamage: number,
        public armorPenetration: number,
        public armorSaveSkill: DiceSkillValue | undefined,
        public invulnerableSave: boolean,
        public invulnerableSaveSkill: DiceSkillValue | undefined,
        public feelNoPain: boolean,
        public feelNoPainSkill: DiceSkillValue | undefined,
        public wounds: number,
        public worsenAPChecked: boolean
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
        const modifiedArmorPenetration = input.defenderStatistics.worsenAPChecked ?
            Math.max(input.defenderStatistics.armorPenetration - 1, 0) :
            input.defenderStatistics.armorPenetration

        const modifiedArmorSave = (input.defenderStatistics.armorSaveSkill?.numericalValue ?? 7)
            + modifiedArmorPenetration;

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

        let remainingDiceToAllocate = woundsFailed;

        let effectiveWeaponDamage = input.defenderStatistics.weaponDamage;
        let totalWeaponDamage = input.defenderStatistics.weaponDamage;

        if (input.defenderStatistics.melta && input.defenderStatistics.meltaDamage != null) {
            effectiveWeaponDamage += input.defenderStatistics.meltaDamage;
            totalWeaponDamage += input.defenderStatistics.meltaDamage;
        }

        let damageSaved = 0;

        if (input.defenderStatistics.feelNoPain && input.defenderStatistics.feelNoPainSkill != null) {
            effectiveWeaponDamage *= input.defenderStatistics.feelNoPainSkill.failurePercentage;
            damageSaved = (totalWeaponDamage - effectiveWeaponDamage) * woundsFailed;
        }

        const woundDicePerModel = Math.ceil(input.defenderStatistics.wounds / effectiveWeaponDamage);

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
            modelsDestroyed +=  (remainingWholeDiceLeft * effectiveWeaponDamage) / input.defenderStatistics.wounds;
        }

        return new DefenderCalculatorResult(
            input.attackerCalculatorResult.successfulWounds - (woundsFailed - input.attackerCalculatorResult.criticalWounds),
            (woundsFailed - input.attackerCalculatorResult.criticalWounds),
            damageSaved,
            damageDiceTotal * effectiveWeaponDamage,
            modelsDestroyed
        )
    }
}

export default DefenderCalculator;