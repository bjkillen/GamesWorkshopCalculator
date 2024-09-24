import { Realm } from '@realm/react';
import { Wargear } from 'gamesworkshopcalculator.common';

export default class WargearRealm extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    type!: string;
    createdAt!: Date;

    static generate(wargear: Wargear) {
        return {
            _id: new Realm.BSON.ObjectId(),
            name: wargear.name,
            type: wargear.type,
            createdAt: new Date(),
        };
    }

    static schema = {
        name: 'WargearRealm',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            type: 'string',
            createdAt: 'date'
        },
    };
}