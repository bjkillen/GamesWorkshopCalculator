import ArmyListUnitDatasheetsList from "@/app/src/components/ArmyListUnitDatasheetList";
import ArmyList, { ArmyListUnitDatasheet } from "@/app/src/utilities/armyList/ArmyList";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Modal, Portal, SegmentedButtons, Text } from "react-native-paper";

export interface SelectUnitDatasheetFromListButtonAndPopupProps {
    myArmyList: ArmyList;
    opponentsArmyList: ArmyList;
    value?: ArmyListUnitDatasheet;
    setValue: (value: ArmyListUnitDatasheet) => void;
}

function SelectUnitDatasheetFromListButtonAndPopup(props: SelectUnitDatasheetFromListButtonAndPopupProps) {
    const {
        myArmyList,
        opponentsArmyList,
        value,
        setValue
    } = props;

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [targetArmyList, setTargetArmyList] = useState('');

    const buttonPressed = () => {
        showModal();
    }

    const valueSet = (value: ArmyListUnitDatasheet) => {
        if (value.modelDatasheets.length >= 1) {
            setValue(value);
        }

        hideModal();
    }

    return (
        <>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <ScrollView>
                        <View>
                            <Text variant="headlineSmall">Target list</Text>
                            <SegmentedButtons
                                value={targetArmyList}
                                onValueChange={setTargetArmyList}
                                buttons={[
                                    {
                                        value: 'Mine',
                                        label: 'Mine',
                                    },
                                    {
                                        value: 'Opponents',
                                        label: 'Opponents',
                                    },
                                ]}
                            />
                        </View>
                        {targetArmyList == 'Mine' &&
                            <ArmyListUnitDatasheetsList
                                unitDatasheets={myArmyList.unitDatasheets} setValue={valueSet}
                            />
                        }
                        {targetArmyList == 'Opponents' &&
                            <ArmyListUnitDatasheetsList
                                unitDatasheets={opponentsArmyList.unitDatasheets} setValue={valueSet}
                            />
                        }
                    </ScrollView>
                </Modal>
            </Portal>
            <Button
                mode="contained"
                onPress={buttonPressed}
                buttonColor='black'
            >{value?.datasheet.name ?? "Select Unit"}</Button>
        </>
    );
}

export default SelectUnitDatasheetFromListButtonAndPopup;

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
    }
});