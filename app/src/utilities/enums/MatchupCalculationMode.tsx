export enum MatchupCalculationModeEnum {
    Attacking = 'Attacking',
    Defending = 'Defending',
}

class MatchupCalculationMode {
    static readonly Attacking = new MatchupCalculationMode(MatchupCalculationModeEnum.Attacking);

    static readonly Defending = new MatchupCalculationMode(MatchupCalculationModeEnum.Defending);

    static readonly AllValues = [this.Attacking, this.Defending];

    private constructor(public readonly value:  MatchupCalculationModeEnum) {}

    public static parse(key: string | null | undefined) {
        if (key == null) {
            return MatchupCalculationMode.Attacking;
        }

        return new this(MatchupCalculationModeEnum[key as keyof typeof MatchupCalculationModeEnum]);
    }
}

export default MatchupCalculationMode;