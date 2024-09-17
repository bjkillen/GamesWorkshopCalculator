import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";

import { Wargear } from "gamesworkshopcalculator.common";
import WargearList from "./WargearList";

export interface SelectWargearButtonAndPopupProps {
    disabled: boolean;
    wargear: Wargear[];
    value?: Wargear;
    setValue: (value: Wargear) => void;
}

function SelectWargearButtonAndPopup(props: SelectWargearButtonAndPopupProps) {
    const {
        disabled,
        wargear,
        value,
        setValue
    } = props as SelectWargearButtonAndPopupProps;

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

    return (
        <>
            <Portal>
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <ScrollView>
                        <View>
                            <WargearList wargear={wargear} setValue={valueSet} />
                        </View>
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