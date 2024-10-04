export enum WargearClassificationEnum {
    AntiInfantry = 'AntiInfantry',
    AntiHeavyInfantry = 'AntiHeavyInfantry',
    AntiLightVehicleMonster = 'AntiLightVehicleMonster',
    AntiHeavyVehicleMonster = 'AntiHeavyVehicleMonster',
    WeightOfFire = 'WeightOfFire',
}

class WargearClassification {
    static readonly AntiInfantry = new WargearClassification(WargearClassificationEnum.AntiInfantry);

    static readonly AntiHeavyInfantry = new WargearClassification(WargearClassificationEnum.AntiHeavyInfantry);

    static readonly AntiLightVehicleMonster = new  WargearClassification(WargearClassificationEnum.AntiLightVehicleMonster);

    static readonly AntiHeavyVehicleMonster = new WargearClassification(WargearClassificationEnum.AntiHeavyVehicleMonster);

    static readonly WeightOfFire = new WargearClassification(WargearClassificationEnum.WeightOfFire);

    private constructor(public readonly value:  WargearClassificationEnum) {}

    public static parse(key: string | null | undefined) {
        if (key == null) {
            return undefined;
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
            case WargearClassificationEnum.AntiHeavyVehicleMonster:
                return 'Heavy Vehicles/ Monsters';
            case WargearClassificationEnum.WeightOfFire:
                return 'Weight of Fire';
        }
    }

    get color() {
        switch (this.value) {
            case WargearClassificationEnum.AntiInfantry:
                return '#FFA50099';
            case WargearClassificationEnum.AntiHeavyInfantry:
                return '#FFA500D9';
            case WargearClassificationEnum.AntiLightVehicleMonster:
                return '#0000FF99';
            case WargearClassificationEnum.AntiHeavyVehicleMonster:
                return '#0000FFD9';
            case WargearClassificationEnum.WeightOfFire:
                return '#006400D9';
        }
    }
}

export default WargearClassification;