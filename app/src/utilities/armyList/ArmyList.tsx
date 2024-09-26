import { ModelDatasheet, Wargear } from "gamesworkshopcalculator.common";

export class ArmyListUnitDatasheet {
    constructor(
        public points: number,
        public modelDatasheets: ModelDatasheet[],
        public chosenWargear: Wargear[]
    ) {}
}

class ArmyList {
    constructor(
        public unitDatasheets: ArmyListUnitDatasheet[]
    ) {}
}

export default ArmyList;