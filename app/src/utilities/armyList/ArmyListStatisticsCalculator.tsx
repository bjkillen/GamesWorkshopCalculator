import UnitClassifier from "../../models/UnitClassifier";
import WargearClassifier from "../../models/WargearClassifier";
import VariableNumericalValueParser from "../factionDatasheets/VariableNumericalValueParser";
import ArmyList from "./ArmyList";

export class ArmyListStatistics {
    public unitClassPoints: Map<string, number>;
    public wargearClassPoints: Map<string, number>;
    public datasheetToughnessCounts: Map<number, number>;
    public wargearStrengthCounts: Map<number, number>;
    public wargearArmorPenetrationCounts: Map<number, number>;
    public wargearTypeWeightings: Map<string, number>;

    constructor() {
        this.unitClassPoints = new Map<string, number>();
        this.wargearClassPoints = new Map<string, number>();
        this.datasheetToughnessCounts = new Map<number, number>();
        this.wargearStrengthCounts = new Map<number, number>();
        this.wargearArmorPenetrationCounts = new Map<number, number>();
        this.wargearTypeWeightings = new Map<string, number>();
    }
}

class ArmyListStatisticsCalculator {
    static Calculate(list: ArmyList): ArmyListStatistics {
        let results = new ArmyListStatistics();

        list.unitDatasheets.forEach((ud) => {
            const totalModelCount = ud.modelDatasheets.reduce((acc, val) => {
                return acc + val.count
            }, 0)

            let classedWargearTotalPoints = 0;

            ud.chosenWargear.forEach((w) => {
                const wargearClasses = WargearClassifier.Classify(w);

                const wargear = w.wargear;
                const wargearAttacksVariableNumericalValue = VariableNumericalValueParser.Parse(wargear.attacks);
                const wargearDamageVariableNumericalValue = VariableNumericalValueParser.Parse(wargear.damage);

                const pointsScalarValue = ((
                    wargearAttacksVariableNumericalValue.numericalVal +
                    wargear.strength +
                    Math.abs(wargear.armorPenetration) +
                    wargearDamageVariableNumericalValue.numericalVal) / (ud.points * (w.count / totalModelCount))) * ud.points;

                if (wargearClasses.length > 0) {
                    classedWargearTotalPoints += pointsScalarValue;

                    wargearClasses.forEach((wc) => {
                        results.wargearClassPoints.set(
                            wc.recommendationText,
                            (results.wargearClassPoints.get(wc.recommendationText) ?? 0) + pointsScalarValue
                        );
                    });
                }

                results.wargearTypeWeightings.set(
                    wargear.type.value,
                    (results.wargearTypeWeightings.get(wargear.type.value) ?? 0) + pointsScalarValue
                )

                const wargearStrength = wargear.strength;
                results.wargearStrengthCounts.set(
                    wargearStrength,
                    (results.wargearStrengthCounts.get(wargearStrength) ?? 0) + w.count
                );

                const wargearAP = w.wargear.armorPenetration;
                results.wargearArmorPenetrationCounts.set(
                    wargearAP,
                    (results.wargearArmorPenetrationCounts.get(wargearAP) ?? 0) + w.count
                );
            })

            results.wargearClassPoints.set(
                'Insignificant',
                (results.wargearClassPoints.get('Insignificant') ?? 0) + Math.max(ud.points - classedWargearTotalPoints, 0)
            );

            ud.modelDatasheets.forEach((md) => {
                const unitClass = UnitClassifier.Classify(ud.datasheet, md.modelDatasheet);

                if (unitClass  == null) {
                    results.unitClassPoints.set(
                        'Other',
                        (results.unitClassPoints.get('Other') ?? 0) + ud.points
                    );
                } else {
                    results.unitClassPoints.set(
                        unitClass.description,
                        (results.unitClassPoints.get(unitClass.description) ?? 0) + ud.points
                    );
                }

                const datasheetToughness = md.modelDatasheet.toughness;
                results.datasheetToughnessCounts.set(
                    datasheetToughness,
                    (results.wargearStrengthCounts.get(datasheetToughness) ?? 0) + md.count
                );
            })
        });

        return results;
    }
}

export default ArmyListStatisticsCalculator;