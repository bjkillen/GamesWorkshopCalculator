class SustainedHitsParser {
    static sustainedHitRegExp = new RegExp('SUSTAINED HITS ([[:alnum:]+]+)');

    static Parse(value: string) {
        let regexResult = SustainedHitsParser.sustainedHitRegExp.exec(value);

        if (regexResult == null) {
            return undefined;
        }

        return regexResult[1];
    }
}

export default SustainedHitsParser;