import WargearAbilityParser from "../utilities/factionDatasheets/WargearAbilityParser";
import VariableNumericalValueParser, { VariableNumericalValue } from "../utilities/factionDatasheets/VariableNumericalValueParser"
import { DiceSkillValue, Wargear } from "gamesworkshopcalculator.common";

class WargearAbilities {
    public melta:  VariableNumericalValue | undefined
    public anti: [string, DiceSkillValue][] | undefined
    public sustainedHits: VariableNumericalValue | undefined
    public lethalHits: boolean
    public devastatingWounds: boolean
    public blast: boolean
    public torrent: boolean

    constructor(wargear: Wargear) {
        const wargearDescriptionLower = wargear.description.toLowerCase();

        const meltaParsed = WargearAbilityParser.ParseMelta(wargear.description);

        if (meltaParsed != null) {
            this.melta = VariableNumericalValueParser.Parse(meltaParsed);
        }

        this.anti = WargearAbilityParser.ParseAnti(wargear.description);

        const sustainedHitsParsed = WargearAbilityParser.ParseSustainedHits(wargearDescriptionLower);

        if (sustainedHitsParsed != null) {
            this.sustainedHits= VariableNumericalValueParser.Parse(sustainedHitsParsed);
        }

        this.lethalHits = wargearDescriptionLower.includes("lethal hits");
        this.devastatingWounds = wargearDescriptionLower.includes("devastating wounds");
        this.blast = wargearDescriptionLower.includes("blast");
        this.torrent = wargearDescriptionLower.includes("torrent");
    }
}

export default WargearAbilities;