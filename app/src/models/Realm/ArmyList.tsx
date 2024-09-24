import { Realm } from '@realm/react'
import Unit from './Unit';

export default class ArmyList extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    factionId!: string;
    name!: string;
    units!: Unit[];
    createdAt!: Date;

    static generate(factionId: string, name: string) {
        return {
            _id: new Realm.BSON.ObjectId(),
            factionId,
            name,
            units: [],
            createdAt: new Date()
        };
    }

    static schema = {
        name: 'ArmyList',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            factionId: 'string',
            name: 'string',
            units: 'Unit[]',
            createdAt: 'date'
        },
    };
}