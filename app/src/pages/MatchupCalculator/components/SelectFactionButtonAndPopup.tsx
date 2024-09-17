import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";

import { Faction } from "gamesworkshopcalculator.common";
import FactionsList from "./faction/FactionsList";

export interface SelectFactionButtonAndPopupProps {
    factionData: Map<string, Faction>;
    value?: Faction;
    setValue: (value: Faction) => void;
}

function SelectFactionButtonAndPopup(props: SelectFactionButtonAndPopupProps) {
    const {
        factionData,
        value,
        setValue,
    } = props as SelectFactionButtonAndPopupProps;

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const buttonPressed = () => {
        showModal();
    }

    const valueSet = (value: Faction) => {
        setValue(value);
        hideModal();
    }

    return (
        <>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <ScrollView>
                        <FactionsList factionData={factionData} setValue={valueSet} />
                    </ScrollView>
                </Modal>
            </Portal>
            <Button
                mode="contained"
                onPress={buttonPressed}
                buttonColor='black'
            >{value?.name ?? "Select Faction"}</Button>
        </>
    );
}

export default SelectFactionButtonAndPopup;

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
    }
});