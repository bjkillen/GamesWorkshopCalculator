export enum DiceRerollModifierValueEnum {
    None = 'None',
    Ones = 'Ones',
    All = 'All'
}

class DiceRerollModifierValue {
    static readonly None = new DiceRerollModifierValue(DiceRerollModifierValueEnum.None);

    static readonly Ones = new DiceRerollModifierValue(DiceRerollModifierValueEnum.Ones);

    static readonly All = new  DiceRerollModifierValue(DiceRerollModifierValueEnum.All);

    static readonly AllValues = [this.None, this.Ones, this.All];

    private constructor(public readonly value:  DiceRerollModifierValueEnum) {}

    public static parse(key: string | null | undefined) {
        if (key == null) {
            return new this( DiceRerollModifierValueEnum.None);
        }

        return new this(DiceRerollModifierValueEnum[key as keyof typeof DiceRerollModifierValueEnum]);
    }

    get description() {
        switch (this.value) {
            case DiceRerollModifierValueEnum.None:
                return 'No';
            case DiceRerollModifierValueEnum.Ones:
                return '1s';
            case DiceRerollModifierValueEnum.All:
                return 'All';
        }
    }
}

export default DiceRerollModifierValue;