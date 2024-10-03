import { ModelDatasheet, UnitDatasheet } from "gamesworkshopcalculator.common";
import UnitClassification from "../utilities/enums/UnitClassification";

class UnitClassifier {
    static Classify(unit: UnitDatasheet, model: ModelDatasheet) {
        const toughness = model.toughness;
        const invulnScalarValue = model.invulnerableSave ? model.invulnerableSaveSkill?.successPercentage ?? 0 : 0;
        const armorSaveScalarValue = model?.armorSaveSkill?.successPercentage || 0;

        const classificationValue = (.05 * toughness + (invulnScalarValue * 0.66) + (armorSaveScalarValue * 0.33)) * model.wounds;

        let mappedKeywords = unit.keywords.map((k) => k.name.toLowerCase());

        let classification: UnitClassification | undefined = undefined;

        if (mappedKeywords.includes("infantry")) {
            if (classificationValue > 1) {
                classification = UnitClassification.HeavyInfantry;
            } else {
                classification = UnitClassification.Infantry;
            }
        } else if (mappedKeywords.includes("vehicle")) {
            if (classificationValue < 7) {
                classification = UnitClassification.LightVehicle;
            } else if (classificationValue >= 7 && classificationValue < 11) {
                classification = UnitClassification.MediumVehicle;
            } else {
                classification = UnitClassification.HeavyVehicle;
            }
        } else if (mappedKeywords.includes("monster")) {
            classification = UnitClassification.Monster;
        }

        return classification;
    }
}

export default UnitClassifier;