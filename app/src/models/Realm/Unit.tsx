import { Realm } from '@realm/react'
import { Wargear, UnitDatasheet, } from 'gamesworkshopcalculator.common';

export default class Unit extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    datasheet!: UnitDatasheet
    chosenWargear: Wargear | undefined;
    modelCount!: number;
    createdAt!: Date;

    static generate(datasheet: UnitDatasheet) {
        return {
            _id: new Realm.BSON.ObjectId(),
            datasheet,
            chosenWargear: undefined,
            modelCount: 1,
            createdAt: new Date(),
        };
    }

    static schema = {
        name: 'Wargear',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            isComplete: { type: 'bool', default: false },
            createdAt: 'date'
        },
    };
}