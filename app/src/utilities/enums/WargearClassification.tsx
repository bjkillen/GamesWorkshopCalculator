export enum WargearClassificationEnum {
    AntiInfantry = 'AntiInfantry',
    AntiHeavyInfantry = 'AntiHeavyInfantry',
    AntiVehicle = 'AntiVehicle',
}

class WargearClassification {
    static readonly AntiInfantry = new WargearClassification(WargearClassificationEnum.AntiInfantry);

    static readonly AntiHeavyInfantry = new WargearClassification(WargearClassificationEnum.AntiHeavyInfantry);

    static readonly AntiVehicle = new  WargearClassification(WargearClassificationEnum.AntiVehicle);

    private constructor(public readonly value:  WargearClassificationEnum) {}

    public static parse(key: string | null | undefined) {
        if (key == null) {
            return new this(WargearClassificationEnum.AntiInfantry);
        }

        return new this(WargearClassificationEnum[key as keyof typeof WargearClassificationEnum]);
    }

    get recommendationText() {
        switch (this.value) {
            case WargearClassificationEnum.AntiInfantry:
                return 'Infantry';
            case WargearClassificationEnum.AntiHeavyInfantry:
                return 'Heavy Infantry';
            case WargearClassificationEnum.AntiVehicle:
                return 'Vehicles';
        }
    }
}

export default WargearClassification;