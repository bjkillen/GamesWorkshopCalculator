import sortByName from "@/app/src/hooks/SortByName";
import UnitClassifier from "@/app/src/models/UnitClassifier";
import { useEffect, useState } from "react";
import { List, Searchbar } from "react-native-paper";
import { ArmyListUnitDatasheet } from "../utilities/armyList/ArmyList";

export interface ArmyListUnitDatasheetsListProps {
    unitDatasheets: ArmyListUnitDatasheet[];
    setValue: (value: ArmyListUnitDatasheet) => void;
}

function ArmyListUnitDatasheetsList(props: ArmyListUnitDatasheetsListProps) {
    const {
        unitDatasheets,
        setValue,
    } = props;

    const [datasheets, setDatasheets] = useState<ArmyListUnitDatasheet[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const sortedUnitDatasheets = Array.from(unitDatasheets.values()).sort((a, b) => sortByName(a.datasheet.name, b.datasheet.name));
        setDatasheets(sortedUnitDatasheets);
    }, [unitDatasheets])

    return (
        <List.Section>
            <Searchbar
                placeholder="Search unit by name"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <List.Subheader>Select a unit</List.Subheader>
            {datasheets.filter(((d) => d.datasheet.name.includes(searchQuery))).map((d) => {
                let datasheetDescription = undefined;

                if (d.modelDatasheets[0]?.modelDatasheet != null) {
                    const unitClass = UnitClassifier.Classify(d.datasheet, d.modelDatasheets[0].modelDatasheet);
                    datasheetDescription = unitClass != null ? `${unitClass.description}` : undefined;
                }

                return (
                    <List.Item
                        key={d.datasheet.id}
                        title={d.datasheet.name}
                        description={datasheetDescription}
                        onPress={() => setValue(d)}
                    />
                )
            })}
        </List.Section>
    );
}

export default ArmyListUnitDatasheetsList;