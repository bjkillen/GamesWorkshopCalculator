import sortByName from "@/app/src/hooks/SortByName";
import { ModelDatasheet } from "gamesworkshopcalculator.common";
import { useEffect, useState } from "react";
import { List } from "react-native-paper";

export interface ModelDatasheetsListProps {
    modelDatasheets: ModelDatasheet[];
    setValue: (value: ModelDatasheet) => void;
}

function ModelDatasheetsList(props: ModelDatasheetsListProps) {
    const {
        modelDatasheets,
        setValue,
    } = props as ModelDatasheetsListProps;

    const [datasheets, setDatasheets] = useState<ModelDatasheet[]>([]);

    useEffect(() => {
        const sortedModelDatasheets = Array.from(modelDatasheets.values()).sort((a, b) => sortByName(a.name, b.name));
        setDatasheets(sortedModelDatasheets);
    }, [modelDatasheets])

    return (
        <List.Section>
            <List.Subheader>Select a faction</List.Subheader>
            {datasheets.map((d) =>
                <List.Item
                    key={d.name}
                    title={d.name}
                    onPress={() => setValue(d)}
                />
            )}
        </List.Section>
        
    );
}

export default ModelDatasheetsList;