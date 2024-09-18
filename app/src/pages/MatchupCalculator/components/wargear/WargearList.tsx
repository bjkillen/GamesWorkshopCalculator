import sortByName from "@/app/src/hooks/SortByName";
import { Wargear } from "gamesworkshopcalculator.common";
import { useEffect, useState } from "react";
import { List } from "react-native-paper";

export interface WargearListProps {
    subheader: string;
    wargear: Wargear[];
    setValue: (value: Wargear) => void;
}

function WargearList(props: WargearListProps) {
    const {
        subheader,
        wargear,
        setValue,
    } = props as WargearListProps;

    const [sortedWargear, setSortedWargear] = useState<Wargear[]>([]);

    useEffect(() => {
        const sortedWargear = Array.from(wargear.values()).sort((a, b) => sortByName(a.name, b.name));
        setSortedWargear(sortedWargear);
    }, [wargear])

    return (
        <List.Section>
            <List.Subheader>{subheader}</List.Subheader>
            {sortedWargear.map((w) =>
                <List.Item
                    key={w.name}
                    title={w.name}
                    onPress={() => setValue(w)}
                />
            )}
        </List.Section>
        
    );
}

export default WargearList;