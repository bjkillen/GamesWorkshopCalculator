export enum WargearClassificationEnum {
    AntiInfantry = 'AntiInfantry',
    AntiHeavyInfantry = 'AntiHeavyInfantry',
    AntiLightVehicleMonster = 'AntiLightVehicleMonster',
    AnitHeavyVehicleMonster = 'AntiHeavyVehicleMonster',
    WeightOfFire = 'WeightOfFire',
}

class WargearClassification {
    static readonly AntiInfantry = new WargearClassification(WargearClassificationEnum.AntiInfantry);

    static readonly AntiHeavyInfantry = new WargearClassification(WargearClassificationEnum.AntiHeavyInfantry);

    static readonly AntiLightVehicleMonster = new  WargearClassification(WargearClassificationEnum.AntiLightVehicleMonster);

    static readonly AntiHeavyVehicleMonster = new WargearClassification(WargearClassificationEnum.AnitHeavyVehicleMonster);

    static readonly WeightOfFire = new WargearClassification(WargearClassificationEnum.WeightOfFire);

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
            case WargearClassificationEnum.AntiLightVehicleMonster:
                return 'Light Vehicles/ Monsters';
            case WargearClassificationEnum.AnitHeavyVehicleMonster:
                return 'Heavy Vehicles/ Monsters';
            case WargearClassificationEnum.WeightOfFire:
                return 'Weight of Fire';
        }
    }
}

export default WargearClassification;