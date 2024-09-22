import { Wargear } from "gamesworkshopcalculator.common";
import WargearAbilities from "./WargearAbilities";
import VariableNumericalValueParser from "../utilities/factionDatasheets/VariableNumericalValueParser";
import WargearClassification from "../utilities/enums/WargearClassification";

class WargearClassifier {
    static Classify(wargear: Wargear) {
        const wargearAbilities = new WargearAbilities(wargear);

        const wargearDamageVariableNumericalValue = VariableNumericalValueParser.Parse(wargear.damage);

        let wargearClassifications = [];

        if ((wargear.strength >= 9 || (wargearAbilities.anti != null && wargearAbilities.anti[0] === 'VEHICLE')) &&
            (wargearDamageVariableNumericalValue.numericalVal >= VariableNumericalValueParser.Parse("D6").numericalVal ||
                wargearAbilities.melta != null)
        ) {
            wargearClassifications.push(WargearClassification.AntiVehicle);
        } else if (wargear.strength >= 6 && 
            wargearDamageVariableNumericalValue.numericalVal >= 3 && Math.abs(wargear.armorPenetration) >= 2
        ) {
            wargearClassifications.push(WargearClassification.AntiHeavyInfantry);
        }

        const wargearAttacksVariableNumericalValue = VariableNumericalValueParser.Parse(wargear.attacks);

        if ((wargear.strength <= 5 && ((wargearAbilities.sustainedHits?.numericalVal ?? 0) >= 2 ||
                wargearAbilities.blast ||
                wargearAttacksVariableNumericalValue.numericalVal >= 4 ||
                (wargearAbilities.anti != null && wargearAbilities.anti[0] === 'INFANTRY'))) ||
                (wargear.strength >= 6 && wargearAttacksVariableNumericalValue.numericalVal >= 10)
            ) {
                wargearClassifications.push(WargearClassification.AntiInfantry);
        }

        return wargearClassifications;
    }
}

export default WargearClassifier;