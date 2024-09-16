import DiceSkillValue from "../enums/DiceSkillValue";

class Wargear {
    constructor (
        public name: string,
        public attacks: number,
        public skill: DiceSkillValue,
        public armorPenetration: number,
        public damage: number,
        public sustainedHits: boolean,
        public sustainedHitsCount: number,
        public lethalHits: boolean,
    ) {}
}

export default Wargear;