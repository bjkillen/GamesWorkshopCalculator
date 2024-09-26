import { UnitDatasheet } from "gamesworkshopcalculator.common";
import ArmyList from "./ArmyList";

class ArmyListParser {
    static Parse(armyListInput: string, unitDatasheet: UnitDatasheet[]): ArmyList {
        const unitDatasheetMap = new Map(unitDatasheet.map((ud) => [ud.name.toLocaleLowerCase(), ud]));

        let result = new ArmyList([]);

        const armyListSplit = armyListInput.split(/\n\s*\n/).filter(s => s.length > 0);

        armyListSplit.forEach((entry) => {
            const entrySplitByLines = entry.split(/\r?\n/);

            let regex = new RegExp(/([\w\s]+)\s+\((\d+)\s+points\)/);
            let regexResult = regex.exec(entry[0].toLocaleLowerCase());

            if (regexResult == null) {
                return undefined;
            }

            const datasheetName = regexResult[1].trim();
            const totalPoints = Number(regexResult[2]);

            const unitDatasheetEntry = unitDatasheetMap.get(datasheetName);

            if (unitDatasheetEntry != null && unitDatasheetEntry.modelDatasheets.length > 0) {
                if (unitDatasheetEntry.modelDatasheets.length == 1) {

                }
            }
        });

        return result;
    }
}

export default ArmyListParser;