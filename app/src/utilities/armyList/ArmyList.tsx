import { ModelDatasheet, UnitDatasheet, Wargear } from "gamesworkshopcalculator.common";

export class ArmyListUnitDatasheet {
    constructor(
        public datasheet: UnitDatasheet,
        public points: number,
        public modelDatasheets: ArmyListModelDatasheet[],
        public chosenWargear: ArmyListWargear[]
    ) {}
}

export class ArmyListModelDatasheet {
    constructor(
        public modelDatasheet: ModelDatasheet,
        public count: number
    ) {}
}

export class ArmyListWargear {
    constructor(
        public wargear: Wargear,
        public count: number
    ) {}
}

class ArmyList {
    constructor(
        public unitDatasheets: ArmyListUnitDatasheet[]
    ) {}
}

export default ArmyList;