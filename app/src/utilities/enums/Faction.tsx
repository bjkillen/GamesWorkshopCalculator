export enum FactionEnum {
    Aeldari = 'Aeldari',
    DarkAngels = 'DarkAngels',
    Necrons = 'Necrons',
}

class Faction {
    static readonly Aeldari = new Faction(FactionEnum.Aeldari);

    static readonly DarkAngels = new Faction(FactionEnum.DarkAngels);

    static readonly Necrons = new Faction(FactionEnum.Necrons);

    static readonly AllValues = [this.Aeldari, this.DarkAngels, this.Necrons];

    private constructor(public readonly value: FactionEnum) {}

    public static parse(key: string | null | undefined) {
        if (key == null) {
            return new this(FactionEnum.Aeldari);
        }

        return new this(FactionEnum[key as keyof typeof FactionEnum]);
    }

    get description() {
        switch (this.value) {
            case FactionEnum.DarkAngels:
                return 'Dark Angels';
            default:
                return this.value;
        }
    }
}

export default Faction;