import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from "react-native";
import NumericalTextInput from './components/NumericalTextInput';
import DiceWeaponSkillValueSegmentedButtons from './components/DiceWeaponSkillValueSegmentedButtons';
import { Button, Text, ToggleButton } from 'react-native-paper';
import CustomCheckbox from './components/Checkbox';
import Row from '../../components/Row';
import DiceSkillValue from '../../utilities/DiceSkillValue';

function MatchupCalculator() {
    const [attackCount, setAttackCount] = useState(0);
    const [strength, setStrength] = useState(0);
    const [damage, setDamage] = useState(0);
    const [sustainedHitsChecked, setSustainedHitsChecked] = useState(false);
    const [sustainedHitsCount, setSustainedHitsCount] = useState(0);
    const [lethalHitsChecked, setLethalHitsChecked] = useState(false);
    const [devastatingWoundsChecked, setDevastatingWoundsChecked] = useState(false);
    const [weaponSkill, setWeaponSkill] = useState(DiceSkillValue.Two);

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text variant="displayMedium">
                    Tabletop Matchup Calculator
                </Text>
                <View style={{ marginTop: 15 }}>
                    <Text variant="displaySmall">Attacking Unit</Text>
                    <View style={{ marginTop: 10 }}>
                        <Text>WS/BS</Text>
                        <DiceWeaponSkillValueSegmentedButtons
                            value={weaponSkill}
                            setValue={setWeaponSkill}
                        />
                    </View>
                    <View style={{ marginTop: 25 }}>
                        <Row style={{ justifyContent: "space-evenly" }}>
                            <NumericalTextInput
                                label='Attack Count'
                                value={attackCount}
                                setValue={setAttackCount}
                            />
                            <NumericalTextInput
                                label='Strength'
                                value={strength}
                                setValue={setStrength}
                            />
                            <NumericalTextInput
                                label='Damage'
                                value={damage}
                                setValue={setDamage}
                            />
                        </Row>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text variant="headlineSmall">Modifiers</Text>
                        <CustomCheckbox
                            label='Sustained Hits'
                            value={sustainedHitsChecked}
                            setValue={setSustainedHitsChecked}
                        />
                        <CustomCheckbox
                            label='Lethal Hits'
                            value={lethalHitsChecked}
                            setValue={setLethalHitsChecked}
                        />
                        <CustomCheckbox
                            label='Devastating Wounds'
                            value={devastatingWoundsChecked}
                            setValue={setDevastatingWoundsChecked}
                        />
                    </View>
                </View>
                <Button mode="contained" style={{ marginTop: 25 }}>Calculate!</Button>
            </SafeAreaView>
        </View>
    );
}

export default MatchupCalculator;

// create styles of app
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 16,
    },
});