class SustainedHitsParser {
    static Parse(value: string) {
        // let regex = new RegExp(/SUSTAINED HITS \(D\?\[\\d\+\]\+\)/);
        let regex = new RegExp(/SUSTAINED HITS (D?[\d+]+)/);
        let regexResult = regex.exec(value.toLocaleUpperCase());

        if (regexResult == null) {
            return undefined;
        }

        return regexResult[1];
    }
}

export default SustainedHitsParser;