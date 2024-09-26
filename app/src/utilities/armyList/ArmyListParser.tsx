import { UnitDatasheet } from "gamesworkshopcalculator.common";
import ArmyList, { ArmyListUnitDatasheet, ArmyListWargear } from "./ArmyList";

class ArmyListParser {
    static Parse(armyListInput: string, unitDatasheet: UnitDatasheet[]): ArmyList {
        const unitDatasheetMap = new Map(unitDatasheet.map((ud) => [ud.name.toLocaleLowerCase(), ud]));

        let result = new ArmyList([]);

        const armyListSplit = armyListInput.split(/\n\s*\n/).filter(s => s.length > 0);

        armyListSplit.forEach((entry) => {
            const entrySplitByLines = entry.split(/\r?\n/);

            const datasheetHeaderRegex = new RegExp(/([\w\W\s]+)\s+\((\d+)\s+points\)/);
            const regexResult = datasheetHeaderRegex.exec(entrySplitByLines[0].toLocaleLowerCase());

            if (regexResult == null) {
                return undefined;
            }

            const datasheetName = regexResult[1].trim();
            const totalPoints = Number(regexResult[2]);

            const unitDatasheetEntry = unitDatasheetMap.get(datasheetName);

            if (unitDatasheetEntry != null && unitDatasheetEntry.modelDatasheets.length > 0) {
                let newArmyListDatasheet = new ArmyListUnitDatasheet(totalPoints, unitDatasheetEntry.modelDatasheets, []);

                const datasheetEntryRegex = new RegExp(/(\d+)x\s+([\w\W]+)/);
                const remainingEntriesToProcess = entrySplitByLines.slice(1);

                remainingEntriesToProcess.forEach((e) => {
                    const entryRegexResult = datasheetEntryRegex.exec(e.trim());

                    if (entryRegexResult != null) {
                        const matchingWargear = unitDatasheetEntry.wargear.filter((w) => w.name.toLocaleLowerCase() == entryRegexResult[2])

                        matchingWargear.forEach((w) => {
                            const matchedArmyListWargear = new ArmyListWargear(w, Number(entryRegexResult[1]));
                            newArmyListDatasheet.chosenWargear.push(matchedArmyListWargear);
                        })
                    }
                });

                result.unitDatasheets.push(newArmyListDatasheet);
            }
        });

        return result;
    }
}

export default ArmyListParser;