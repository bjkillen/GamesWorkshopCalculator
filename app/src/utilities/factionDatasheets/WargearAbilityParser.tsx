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

    static ParseAnti(value: string): [string, DiceSkillValue][] | undefined {
        let regex = new RegExp(/ANTI-(\w+) (D?[\d+]+)/g);
        let matches = value.toLocaleUpperCase().matchAll(regex);

        const results: [string, DiceSkillValue][] = [];

        for (let rr of matches) {
            const diceSkill = DiceSkillValue.parseDescription(rr[2]);

            if (diceSkill != null) {
                results.push([rr[1], diceSkill]);
            }
        }

        return results;
    }
}

export default WargearAbilityParser;