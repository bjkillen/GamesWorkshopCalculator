import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

import { Wargear, WargearType } from "gamesworkshopcalculator.common";
import WargearList from "./WargearList";
import ArrayExtension from "@/app/src/utilities/extensions/ArrayExtension";

export interface SelectWargearButtonAndPopupProps {
    disabled: boolean;
    wargear: Wargear[];
    value?: Wargear;
    setValue: (value: Wargear) => void;
    modelCount: number;
}

function SelectWargearButtonAndPopup(props: SelectWargearButtonAndPopupProps) {
    const {
        disabled,
        wargear,
        value,
        setValue,
        modelCount
    } = props as SelectWargearButtonAndPopupProps;

    const [wargearGroupedByType, setWargearGroupedByType] = useState(new Map<string, Wargear[]>());

    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const buttonPressed = () => {
        showModal();
    }

    const valueSet = (value: Wargear) => {
        setValue(value);
        hideModal();
    }

    useEffect(() => {
        const groupedWargear = ArrayExtension.groupBy(wargear, w => w.type.value.toString());
        setWargearGroupedByType(groupedWargear);
    }, [wargear])

    return (
        <>
            <Portal>
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <ScrollView>
                        <Text variant="headlineSmall">Select a wargear option</Text>
                        {(wargearGroupedByType.get(WargearType.Ranged.value)?.length ?? 0 > 0) && (
                            <View>
                                <WargearList
                                    subheader={WargearType.Ranged.value}
                                    wargear={wargearGroupedByType.get(WargearType.Ranged.value) ?? []}
                                    setValue={valueSet}
                                    modelCount={modelCount}
                                />
                            </View>
                        )}
                        {(wargearGroupedByType.get(WargearType.Melee.value)?.length ?? 0 > 0) && (
                            <View>
                                <WargearList
                                    subheader={WargearType.Melee.value}
                                    wargear={wargearGroupedByType.get(WargearType.Melee.value) ?? []} 
                                    setValue={valueSet}
                                    modelCount={modelCount}
                                />
                            </View>
                        )}
                    </ScrollView>
                </Modal>
            </Portal>
            <Button
                disabled={disabled}
                mode="contained"
                onPress={buttonPressed}
                buttonColor='black'
            >{value?.name ?? "Select Wargear"}</Button>
        </>
    );
}

export default SelectWargearButtonAndPopup;

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
    }
});