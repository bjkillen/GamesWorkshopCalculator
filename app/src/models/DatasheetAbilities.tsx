import WargearAbilityParser from "../utilities/factionDatasheets/WargearAbilityParser";
import { DiceSkillValue, UnitDatasheet } from "gamesworkshopcalculator.common";

class DatasheetAbilities {
    public stealth:  boolean
    public feelNoPain: DiceSkillValue | undefined

    constructor(unitDatasheet: UnitDatasheet) {
        const abilitiesMapped = new Map(unitDatasheet.abilities.map((a) => [a.name.replace(/\s/g, "").toLowerCase(), a]));

        this.stealth = abilitiesMapped.get("stealth") != null;
        const feelNoPainValue = abilitiesMapped.get("feelnopain");

        if (feelNoPainValue != null) {
            this.feelNoPain = DiceSkillValue.parseDescription(feelNoPainValue.parameter);
        }
    }
}

export default DatasheetAbilities;