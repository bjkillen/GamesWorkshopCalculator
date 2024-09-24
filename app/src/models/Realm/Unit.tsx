import { Realm } from '@realm/react';
import WargearRealm from './WargearRealm';

export default class Unit extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    datasheetName!: string;
    chosenWargear!: WargearRealm[];
    modelCount!: number;
    createdAt!: Date;

    static generate(datasheetName: string) {
        return {
            _id: new Realm.BSON.ObjectId(),
            datasheetName,
            chosenWargear: [],
            modelCount: 1,
            createdAt: new Date(),
        };
    }

    static schema = {
        name: 'Unit',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            datasheetName: 'string',
            chosenWargear: 'WargearRealm[]',
            modelCount: 'number',
            createdAt: 'date'
        },
    };
}