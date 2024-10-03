import { Wargear } from "gamesworkshopcalculator.common";
import WargearAbilities from "./WargearAbilities";
import VariableNumericalValueParser from "../utilities/factionDatasheets/VariableNumericalValueParser";
import WargearClassification from "../utilities/enums/WargearClassification";

class WargearClassifier {
    static Classify(wargear: Wargear) {
        const wargearAbilities = new WargearAbilities(wargear);

        const wargearAttacksVariableNumericalValue = VariableNumericalValueParser.Parse(wargear.attacks);
        const wargearDamageVariableNumericalValue = VariableNumericalValueParser.Parse(wargear.damage);

        let wargearClassifications = [];

        if (wargearAbilities.anti?.find(a => a[0].startsWith('VEHICLE')) || (wargear.strength >= 9 &&
            (wargearDamageVariableNumericalValue.numericalVal >= VariableNumericalValueParser.Parse("D6").numericalVal ||
                wargearAbilities.melta != null))
        ) {
            wargearClassifications.push(WargearClassification.AntiVehicle);
        }

        if (wargear.strength >= 6 && 
            wargearDamageVariableNumericalValue.numericalVal >= 3 &&
            Math.abs(wargear.armorPenetration) >= 2 &&
            wargearAttacksVariableNumericalValue.numericalVal > 2
        ) {
            wargearClassifications.push(WargearClassification.AntiHeavyInfantry);
        }

        if ((wargear.strength <= 5 && ((wargearAbilities.sustainedHits?.numericalVal ?? 0) >= 2 ||
                wargearAbilities.blast ||
                wargearAttacksVariableNumericalValue.numericalVal >= 4 ||
                wargearAbilities.anti?.find(a => a[0].startsWith('INFANTRY')))) ||
                (wargear.strength >= 6 && wargearAttacksVariableNumericalValue.numericalVal >= 10)
            ) {
                wargearClassifications.push(WargearClassification.AntiInfantry);
        }

        if (wargearAbilities.anti?.find(a => a[0].startsWith('MONSTER'))) {
            wargearClassifications.push(WargearClassification.AntiMonster);
        }

        return wargearClassifications;
    }
}

export default WargearClassifier;