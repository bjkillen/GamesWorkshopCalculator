import sortByName from "@/app/src/hooks/SortByName";
import { Faction } from "gamesworkshopcalculator.common";
import { useEffect, useState } from "react";
import { List } from "react-native-paper";

export interface FactionsListProps {
    factionData: Map<string, Faction>;
    setValue: (value: Faction) => void;
}

function FactionsList(props: FactionsListProps) {
    const {
        factionData,
        setValue,
    } = props as FactionsListProps;

    const [factions, setFactions] = useState<Faction[]>([]);

    useEffect(() => {
        const sortedFactions = Array.from(factionData.values()).sort((a, b) => sortByName(a.name, b.name));
        setFactions(sortedFactions);
    }, [factionData])

    return (
        <List.Section>
            <List.Subheader>Select a faction</List.Subheader>
            {factions.map((f) =>
                <List.Item
                    key={f.id}
                    title={f.name}
                    onPress={() => setValue(f)}
                />
            )}
        </List.Section>
        
    );
}

export default FactionsList;