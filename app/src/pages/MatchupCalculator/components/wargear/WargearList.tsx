import sortByName from "@/app/src/hooks/SortByName";
import WargearClassifier from "@/app/src/models/WargearClassifier";
import { ArmyListWargear } from "@/app/src/utilities/armyList/ArmyList";
import { Wargear } from "gamesworkshopcalculator.common";
import { useEffect, useState } from "react";
import { List } from "react-native-paper";

export interface WargearListProps {
    subheader: string;
    wargear: Wargear[];
    setValue: (value: Wargear) => void;
    modelCount: number;
}

function WargearList(props: WargearListProps) {
    const {
        subheader,
        wargear,
        setValue,
        modelCount,
    } = props as WargearListProps;

    const [sortedWargear, setSortedWargear] = useState<Wargear[]>([]);

    useEffect(() => {
        const sortedWargear = Array.from(wargear.values()).sort((a, b) => sortByName(a.name, b.name));
        setSortedWargear(sortedWargear);
    }, [wargear])

    return (
        <List.Section>
            <List.Subheader>{subheader}</List.Subheader>
            {sortedWargear.map((w) => {
                const wargearClasses = WargearClassifier.Classify(new ArmyListWargear(w, modelCount));
                const wargearDescription = wargearClasses.length > 0 ? `Best against ${wargearClasses.map((c) => c.recommendationText).join(", ")}` : undefined;

                return (
                    <List.Item
                        key={w.name}
                        title={w.name}
                        description={wargearDescription}
                        onPress={() => setValue(w)}
                    />
                )
            })}
        </List.Section>
        
    );
}

export default WargearList;