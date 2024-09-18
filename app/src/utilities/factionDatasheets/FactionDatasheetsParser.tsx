import { Faction, FactionsMap, TypedJSON } from "gamesworkshopcalculator.common";

class FactionDatasheetsParser {
    private static serializer = new TypedJSON(FactionsMap);

    static async Parse() {
        const data = require('./ExportedFactionsWithDatasheets.json');
        const factions = FactionDatasheetsParser.serializer.parse(data);

        return factions?.map ?? new Map<string, Faction>();
    }
}

export default FactionDatasheetsParser;