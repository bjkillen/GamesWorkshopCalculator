import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";

import { UnitDatasheet } from "gamesworkshopcalculator.common";
import UnitDatasheetsList from "./UnitDatasheetsList";

export interface SelectUnitButtonAndPopupProps {
    disabled: boolean;
    unitDatasheets: UnitDatasheet[];
    value?: UnitDatasheet;
    setValue: (value: UnitDatasheet) => void;
}

function SelectUnitButtonAndPopup(props: SelectUnitButtonAndPopupProps) {
    const {
        disabled,
        unitDatasheets,
        value,
        setValue
    } = props as SelectUnitButtonAndPopupProps;

    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const buttonPressed = () => {
        showModal();
    }

    const valueSet = (value: UnitDatasheet) => {
        if (value.modelDatasheets.length >= 1) {
            setValue(value);
        }

        hideModal();
    }

    return (
        <>
            <Portal>
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <ScrollView>
                        <View>
                            <UnitDatasheetsList unitDatasheets={unitDatasheets} setValue={valueSet} />
                        </View>
                    </ScrollView>
                </Modal>
            </Portal>
            <Button
                disabled={disabled}
                mode="contained"
                onPress={buttonPressed}
                buttonColor='black'
            >{value?.name ?? "Select Unit"}</Button>
        </>
    );
}

export default SelectUnitButtonAndPopup;

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
    }
});