import { Realm, RealmProvider, useRealm, useQuery } from '@realm/react'
import Unit from './Unit';

export default class ArmyList extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    unitDatasheets!: Unit[];
    createdAt!: Date;

    static generate(name: string) {
        return {
            _id: new Realm.BSON.ObjectId(),
            name,
            unitDatasheets: [],
            createdAt: new Date()
        };
    }

    static schema = {
        name: 'ArmyList',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            isComplete: { type: 'bool', default: false },
            createdAt: 'date'
        },
    };
}