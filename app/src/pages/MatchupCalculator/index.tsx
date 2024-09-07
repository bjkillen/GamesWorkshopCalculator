import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from "react-native";
import NumericalTextInput from './components/NumericalTextInput';
import DiceWeaponSkillValueSegmentedButtons from './components/DiceWeaponSkillValueSegmentedButtons';
import { Text, ToggleButton } from 'react-native-paper';
import CustomCheckbox from './components/Checkbox';

function MatchupCalculator() {
    const [attackCount, setAttackCount] = useState(0);
    const [strength, setStrength] = useState(0);
    const [damage, setDamage] = useState(0);
    const [sustainedHitsChecked, setSustainedHitsChecked] = useState(false);
    const [sustainedHitsCount, setSustainedHitsCount] = useState(0);
    const [lethalHitsChecked, setLethalHitsChecked] = useState(false);
    const [devastatingWoundsChecked, setDevastatingWoundsChecked] = useState(false);
    const [weaponSkill, setWeaponSkill] = useState("2+");

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text variant="displayMedium">
                    Tabletop Matchup Calculator
                </Text>
                <Text variant="displaySmall">Attacking Unit</Text>
                <Text>WS/BS</Text>
                <DiceWeaponSkillValueSegmentedButtons
                    value={weaponSkill}
                    setValue={setWeaponSkill}
                />
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
    },
});