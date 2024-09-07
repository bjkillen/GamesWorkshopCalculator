import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from "react-native";
import NumericalTextInput from './components/NumericalTextInput';
import DiceWeaponSkillValueSegmentedButtons from './components/DiceWeaponSkillValueSegmentedButtons';
import { Text } from 'react-native-paper';

function MatchupCalculator() {
    const [attackCount, setAttackCount] = useState(0);
    const [weaponSkill, setWeaponSkill] = useState("2+");

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text variant="displayMedium">
                    Tabletop Matchup Calculator
                </Text>
                <Text>Attacking Unit</Text>
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
                    value={attackCount}
                    setValue={setAttackCount}
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