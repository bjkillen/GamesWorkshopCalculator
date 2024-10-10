import sortByName from "@/app/src/hooks/SortByName";
import UnitClassifier from "@/app/src/models/UnitClassifier";
import { UnitDatasheet } from "gamesworkshopcalculator.common";
import { useEffect, useState } from "react";
import { List, Searchbar } from "react-native-paper";

export interface UnitDatasheetsListProps {
    unitDatasheets: UnitDatasheet[];
    setValue: (value: UnitDatasheet) => void;
}

function UnitDatasheetsList(props: UnitDatasheetsListProps) {
    const {
        unitDatasheets,
        setValue,
    } = props as UnitDatasheetsListProps;

    const [datasheets, setDatasheets] = useState<UnitDatasheet[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const sortedUnitDatasheets = Array.from(unitDatasheets.values()).sort((a, b) => sortByName(a.name, b.name));
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
            {datasheets.filter(((d) => d.name.includes(searchQuery))).map((d) => {
                let datasheetDescription = undefined;

                if (d.modelDatasheets[0] != null) {
                    const unitClass = UnitClassifier.Classify(d, d.modelDatasheets[0]);
                    datasheetDescription = unitClass != null ? `${unitClass.description}` : undefined;
                }

                return (
                    <List.Item
                        key={d.id}
                        title={d.name}
                        description={datasheetDescription}
                        onPress={() => setValue(d)}
                    />
                )
            })}
        </List.Section>
    );
}

export default UnitDatasheetsList;