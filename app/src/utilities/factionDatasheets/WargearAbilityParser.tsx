import { DiceSkillValue } from "gamesworkshopcalculator.common";

class WargearAbilityParser {
    static ParseSustainedHits(value: string) {
        let regex = new RegExp(/SUSTAINED HITS (D?[\d+]+)/);
        let regexResult = regex.exec(value.toLocaleUpperCase());

        if (regexResult == null) {
            return undefined;
        }

        return regexResult[1];
    }

    static ParseMelta(value: string) {
        let regex = new RegExp(/MELTA (D?[\d+]+)/);
        let regexResult = regex.exec(value.toLocaleUpperCase());

        if (regexResult == null) {
            return undefined;
        }

        return regexResult[1];
    }

    static ParseAnti(value: string): [string, DiceSkillValue] | undefined {
        let regex = new RegExp(/ANTI-(\w+) (D?[\d+]+)/);
        let regexResult = regex.exec(value.toLocaleUpperCase());

        if (regexResult == null) {
            return undefined;
        }

        const diceSkill = DiceSkillValue.parseDescription(regexResult[2]);

        if (diceSkill== null) {
            return undefined;
        }

        return [regexResult[1], diceSkill];
    }
}

export default WargearAbilityParser;