import sortByName from "@/app/src/hooks/SortByName";
import UnitClassifier from "@/app/src/models/UnitClassifier";
import { useEffect, useState } from "react";
import { List, Searchbar, Text } from "react-native-paper";
import { ArmyListUnitDatasheet } from "../utilities/armyList/ArmyList";
import ArrayExtension from "../utilities/extensions/ArrayExtension";
import { WargearType } from "gamesworkshopcalculator.common";
import { View } from "react-native";

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
            {datasheets.filter(((d) => d.datasheet.name.includes(searchQuery))).map((d, idx) => {
                let datasheetDescription = undefined;

                if (d.modelDatasheets[0]?.modelDatasheet != null) {
                    const unitClass = UnitClassifier.Classify(d.datasheet, d.modelDatasheets[0].modelDatasheet);
                    datasheetDescription = unitClass != null ? `${unitClass.description}` : undefined;
                }

                const groupedWargear = ArrayExtension.groupBy(d.chosenWargear, w => w.wargear.type.value.toString());

                return (
                    <List.Section key={`Section-${d.datasheet.id}-${idx}`}>
                        <List.Item
                            key={`${d.datasheet.id}-${idx}`}
                            title={d.datasheet.name}
                            description={datasheetDescription}
                            onPress={() => setValue(d)}
                        />
                        <Text variant="labelMedium">{WargearType.Ranged.value}</Text>
                        {   
                            groupedWargear.get(WargearType.Ranged.value)?.map((w, wIdx) => {
                                return (
                                    <Text key={`${w.wargear.name}-${WargearType.Ranged.value}-${idx}-${wIdx}`} variant="labelSmall">
                                        {w.count}x {w.wargear.name}
                                    </Text>
                                )
                            })
                        }
                        <Text variant="labelMedium">{WargearType.Melee.value}</Text>
                        {   
                            groupedWargear.get(WargearType.Melee.value)?.map((w, wIdx) => {
                                return (
                                    <Text key={`${w.wargear.name}-${WargearType.Melee.value}-${idx}-${wIdx}`} variant="labelSmall">
                                        {w.count}x {w.wargear.name}
                                    </Text>
                                )
                            })
                        }
                    </List.Section>
                )
            })}
        </List.Section>
    );
}

export default ArmyListUnitDatasheetsList;