import DiceSkillValue from "../enums/DiceSkillValue";
import Wargear from "./Wargear";

class UnitDatasheet {
    constructor (
        public name: string,
        public toughness: number,
        public armorSaveSkill: DiceSkillValue,
        public invulnerableSave: boolean,
        public invulnerableSaveSkill: DiceSkillValue,
        public wargear: [Wargear] 
    ) {}
}

export default UnitDatasheet;