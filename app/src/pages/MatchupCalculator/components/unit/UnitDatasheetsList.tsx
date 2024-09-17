import sortByName from "@/app/src/hooks/SortByName";
import { UnitDatasheet } from "gamesworkshopcalculator.common";
import { useEffect, useState } from "react";
import { List } from "react-native-paper";

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

    useEffect(() => {
        const sortedUnitDatasheets = Array.from(unitDatasheets.values()).sort((a, b) => sortByName(a.name, b.name));
        setDatasheets(sortedUnitDatasheets);
    }, [unitDatasheets])

    return (
        <List.Section>
            <List.Subheader>Select a faction</List.Subheader>
            {datasheets.map((d) =>
                <List.Item
                    key={d.id}
                    title={d.name}
                    onPress={() => setValue(d)}
                />
            )}
        </List.Section>
        
    );
}

export default UnitDatasheetsList;