enum DiceSkillValueEnum {
    Two = 'Two',
    Three = 'Three',
    Four = 'Four',
    Five = 'Five',
    Six = 'Six',
}

class DiceSkillValue {
    static readonly Two = new  DiceSkillValue(DiceSkillValueEnum.Two);

    static readonly Three = new  DiceSkillValue(DiceSkillValueEnum.Three);

    static readonly Four = new  DiceSkillValue(DiceSkillValueEnum.Four);

    static readonly Five = new  DiceSkillValue(DiceSkillValueEnum.Five);

    static readonly Six = new  DiceSkillValue(DiceSkillValueEnum.Six);

    static readonly AllValues = [this.Two, this.Three, this.Four, this.Five, this.Six];

    private constructor(public readonly value: DiceSkillValueEnum) {}

    public static parse(key: string | null | undefined) {
        if (key == null) {
            return new this(DiceSkillValueEnum.Two);
        }

        return new this(DiceSkillValueEnum[key as keyof typeof DiceSkillValueEnum]);
    }

    get description() {
        switch (this.value) {
            case DiceSkillValueEnum.Two:
                return '2+';
            case DiceSkillValueEnum.Three:
                return '3+';
            case DiceSkillValueEnum.Four:
                return '4+';
            case DiceSkillValueEnum.Five:
                return '5+';
            case DiceSkillValueEnum.Six:
                return '6+';
        }
    }
}

export default DiceSkillValue;