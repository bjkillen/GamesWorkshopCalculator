import WargearAbilities from "./WargearAbilities";
import VariableNumericalValueParser from "../utilities/factionDatasheets/VariableNumericalValueParser";
import WargearClassification from "../utilities/enums/WargearClassification";
import { ArmyListWargear } from "../utilities/armyList/ArmyList";

class WargearClassifier {
    static Classify(listWargear: ArmyListWargear) {
        const wargear = listWargear.wargear;

        const wargearAbilities = new WargearAbilities(wargear);

        const wargearAttacksVariableNumericalValue = VariableNumericalValueParser.Parse(wargear.attacks);
        const wargearDamageVariableNumericalValue = VariableNumericalValueParser.Parse(wargear.damage);

        let wargearClassifications = [];

        if (wargearAbilities.anti?.find(a => a[0].startsWith('VEHICLE')) || wargearAbilities.anti?.find(a => a[0].startsWith('MONSTER')) ||
            (wargear.strength >= 9 &&
                (wargearDamageVariableNumericalValue.numericalVal >= VariableNumericalValueParser.Parse("D6").numericalVal ||
                    wargearAbilities.melta != null))
        ) {
            wargearClassifications.push(WargearClassification.AntiHeavyVehicleMonster);
        } else if ((wargear.strength >= 8 &&
            Math.abs(wargear.armorPenetration) >= 2 && wargearDamageVariableNumericalValue.numericalVal >= 2)
        ) {
            wargearClassifications.push(WargearClassification.AntiLightVehicleMonster);
        }

        if (wargear.strength >= 6 && 
            wargearDamageVariableNumericalValue.numericalVal >= 3 &&
            Math.abs(wargear.armorPenetration) >= 2 &&
            wargearAttacksVariableNumericalValue.numericalVal > 2
        ) {
            wargearClassifications.push(WargearClassification.AntiHeavyInfantry);
        }

        if (wargearAbilities.anti?.find(a => a[0].startsWith('INFANTRY')) || (wargear.strength <= 5 && ((wargearAbilities.sustainedHits?.numericalVal ?? 0) >= 2 ||
                wargearAbilities.blast ||
                wargearAttacksVariableNumericalValue.numericalVal >= 4)) ||
                (wargear.strength >= 6 && wargearAttacksVariableNumericalValue.numericalVal >= 10)
            ) {
                wargearClassifications.push(WargearClassification.AntiInfantry);
        }

        if (wargearClassifications.length == 0 &&
            wargearAttacksVariableNumericalValue.numericalVal * listWargear.count>= 14) {
                wargearClassifications.push(WargearClassification.WeightOfFire);
        }

        return wargearClassifications;
    }
}

export default WargearClassifier;