import UnitClassifier from "../../models/UnitClassifier";
import WargearClassifier from "../../models/WargearClassifier";
import UnitClassification from "../enums/UnitClassification";
import ArmyList from "./ArmyList";

export class ArmyListStatistics {
    public unitClassPoints: Map<string, number>;
    public wargearClassPoints: Map<string, number>;
    public datasheetToughnessCounts: Map<number, number>;
    public wargearStrengthCounts: Map<number, number>;
    public wargearArmorPenetrationCounts: Map<number, number>;

    constructor() {
        this.unitClassPoints = new Map<string, number>();
        this.wargearClassPoints = new Map<string, number>();
        this.datasheetToughnessCounts = new Map<number, number>();
        this.wargearStrengthCounts = new Map<number, number>();
        this.wargearArmorPenetrationCounts = new Map<number, number>();
    }
}

class ArmyListStatisticsCalculator {
    static Calculate(list: ArmyList): ArmyListStatistics {
        let results = new ArmyListStatistics();

        list.unitDatasheets.forEach((ud) => {
            ud.chosenWargear.forEach((w) => {
                const wargearClasses = WargearClassifier.Classify(w.wargear);

                if (wargearClasses.length == 0) {
                    results.wargearClassPoints.set(
                        'None',
                        (results.wargearClassPoints.get('None') ?? 0) + ud.points / ud.chosenWargear.length
                    );
                } else {
                    wargearClasses.forEach((wc) => {
                        results.wargearClassPoints.set(
                            wc.recommendationText,
                            (results.wargearClassPoints.get(wc.recommendationText) ?? 0) + (ud.points / ud.chosenWargear.length / wargearClasses.length)
                        );
                    });
                }

                const wargearStrength = w.wargear.strength;
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
                        'None',
                        (results.unitClassPoints.get('None') ?? 0) + ud.points
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