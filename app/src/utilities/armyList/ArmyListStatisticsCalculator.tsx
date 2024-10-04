import { Wargear } from "gamesworkshopcalculator.common";
import UnitClassifier from "../../models/UnitClassifier";
import WargearClassifier from "../../models/WargearClassifier";
import VariableNumericalValueParser from "../factionDatasheets/VariableNumericalValueParser";
import ArmyList from "./ArmyList";
import UnitClassification from "../enums/UnitClassification";
import WargearClassification from "../enums/WargearClassification";

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
            const totalWargearScalar = ud.chosenWargear.reduce((acc, val) => {
                return acc + this.computeWargearScalar(val.wargear)
            }, 0)

            ud.chosenWargear.forEach((w) => {
                const wargearClasses = WargearClassifier.Classify(w);

                const wargear = w.wargear;

                const pointsScalarValue = (this.computeWargearScalar(wargear) / totalWargearScalar) * ud.points;

                if (wargearClasses.length > 0) {
                    wargearClasses.forEach((wc) => {
                        results.wargearClassPoints.set(
                            wc.value,
                            (results.wargearClassPoints.get(wc.value) ?? 0) + pointsScalarValue
                        );
                    });
                } else {
                    results.wargearClassPoints.set(
                        'Insignificant',
                        (results.wargearClassPoints.get('Insignificant') ?? 0) + pointsScalarValue
                    );
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

            ud.modelDatasheets.forEach((md) => {
                const unitClass = UnitClassifier.Classify(ud.datasheet, md.modelDatasheet);

                if (unitClass  == null) {
                    results.unitClassPoints.set(
                        'Other',
                        (results.unitClassPoints.get('Other') ?? 0) + ud.points
                    );
                } else {
                    results.unitClassPoints.set(
                        unitClass.value,
                        (results.unitClassPoints.get(unitClass.value) ?? 0) + ud.points
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

    private static computeWargearScalar(wargear: Wargear) {
        const wargearAttacksVariableNumericalValue = VariableNumericalValueParser.Parse(wargear.attacks);
        const wargearDamageVariableNumericalValue = VariableNumericalValueParser.Parse(wargear.damage);

        return wargearAttacksVariableNumericalValue.numericalVal +
            wargear.strength +
            Math.abs(wargear.armorPenetration) +
            wargearDamageVariableNumericalValue.numericalVal;
    }
}

export default ArmyListStatisticsCalculator;