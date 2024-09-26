import { ModelDatasheet, Wargear } from "gamesworkshopcalculator.common";

export class ArmyListUnitDatasheet {
    constructor(
        public points: number,
        public modelDatasheets: ModelDatasheet[],
        public chosenWargear: ArmyListWargear[]
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