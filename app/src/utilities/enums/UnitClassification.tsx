export enum UnitClassificationEnum {
    Infantry = 'Infantry',
    HeavyInfantry = 'HeavyInfantry',
    LightVehicle = 'LightVehicle',
    MediumVehicle = 'MediumVehicle',
    HeavyVehicle = 'HeavyVehicle',
    Monster = 'Monster'
    
}

class UnitClassification {
    static readonly Infantry = new UnitClassification(UnitClassificationEnum.Infantry);

    static readonly HeavyInfantry = new UnitClassification(UnitClassificationEnum.HeavyInfantry);

    static readonly LightVehicle = new  UnitClassification(UnitClassificationEnum.LightVehicle);

    static readonly MediumVehicle = new  UnitClassification(UnitClassificationEnum.MediumVehicle);

    static readonly HeavyVehicle = new  UnitClassification(UnitClassificationEnum.HeavyVehicle);

    static readonly Monster = new  UnitClassification(UnitClassificationEnum.Monster);

    private constructor(public readonly value:  UnitClassificationEnum) {}

    public static parse(key: string | null | undefined) {
        if (key == null) {
            return new this(UnitClassificationEnum.Infantry);
        }

        return new this(UnitClassificationEnum[key as keyof typeof UnitClassificationEnum]);
    }

    get description() {
        switch (this.value) {
            case UnitClassificationEnum.Infantry:
                return 'Infantry';
            case UnitClassificationEnum.HeavyInfantry:
                return 'Heavy Infantry';
            case UnitClassificationEnum.LightVehicle:
                return 'Light Vehicle';
            case UnitClassificationEnum.MediumVehicle:
                return 'Medium Vehicle';
            case UnitClassificationEnum.HeavyVehicle:
                return 'Heavy Vehicle';
            case UnitClassificationEnum.Monster:
                return 'Monster';
        }
    }
}

export default UnitClassification;