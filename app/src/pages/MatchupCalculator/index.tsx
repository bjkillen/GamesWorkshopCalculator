import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import NumericalTextInput from '../../components/NumericalTextInput';
import DiceWeaponSkillValueSegmentedButtons from './components/DiceWeaponSkillValueSegmentedButtons';
import { Button, Text } from 'react-native-paper';
import CustomCheckbox from '../../components/Checkbox';
import Row from '../../components/Row';
import DiceSkillValue from '../../utilities/DiceSkillValue';
import AttacksCalculator, { CalculationResult, CalculatorInput } from '../../models/AttacksCalculator';
import StringExtension from '../../utilities/extensions/StringExtension';

function MatchupCalculator() {
    const [attackCount, setAttackCount] = useState<number | undefined>(0);
    const [strength, setStrength] = useState<number | undefined>(0);
    const [damage, setDamage] = useState<number | undefined>(0);
    const [sustainedHitsChecked, setSustainedHitsChecked] = useState(false);
    const [sustainedHitsCount, setSustainedHitsCount] = useState(0);
    const [lethalHitsChecked, setLethalHitsChecked] = useState(false);
    const [devastatingWoundsChecked, setDevastatingWoundsChecked] = useState(false);
    const [weaponSkill, setWeaponSkill] = useState(DiceSkillValue.Two);

    const [toughness, setToughness] = useState<number | undefined>(0);

    const [calculationResult, setCalculationResult] = useState(new CalculationResult(0, 0, 0));

    const calculateButtonPressed = () => {
        const input = new CalculatorInput(
            attackCount ?? 0,
            strength ?? 0,
            weaponSkill,
            damage ?? 0,
            sustainedHitsChecked,
            lethalHitsChecked,
            devastatingWoundsChecked,
            toughness ?? 0,
        );

        const computedCalculationResult = AttacksCalculator.calculate(input);
        setCalculationResult(computedCalculationResult);
    }

    const clearButtonPressed = () => {
        setAttackCount(0);
        setStrength(0);
        setDamage(0);
        setSustainedHitsChecked(false);
        setLethalHitsChecked(false);
        setDevastatingWoundsChecked(false);
        setWeaponSkill(DiceSkillValue.Two);
        setToughness(0);
        setCalculationResult(new CalculationResult(0, 0, 0));
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text variant="displayMedium">
                    Tabletop Matchup Calculator
                </Text>
                <ScrollView>
                    <View style={{ marginTop: 15 }}>
                        <Text variant="displaySmall">Attacking Unit</Text>
                        <View style={{ marginTop: 10 }}>
                            <Text>WS/BS</Text>
                            <DiceWeaponSkillValueSegmentedButtons
                                value={weaponSkill}
                                setValue={setWeaponSkill}
                            />
                        </View>
                        <Row style={{ marginTop: 25, justifyContent: "space-evenly" }}>
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
                    <View style={{ marginTop: 15 }}>
                        <Text variant="displaySmall">Defending Unit</Text>
                        <NumericalTextInput
                            label='Toughness'
                            value={toughness}
                            setValue={setToughness}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text variant="displaySmall">Results</Text>
                        <Text variant="labelLarge">Successful Hits: {StringExtension.toFixedWithoutZeros(calculationResult.successfulHits, 2)}</Text>
                        <Text variant="labelLarge">Successful Wounds: {StringExtension.toFixedWithoutZeros(calculationResult.successfulWounds, 2)}</Text>
                        <Text variant="labelLarge">Total Damage: {StringExtension.toFixedWithoutZeros(calculationResult.totalDamage, 2)}</Text>
                    </View>
                    <Row style={{ marginTop: 25, justifyContent: "space-evenly" }}>
                        <Button mode="contained" onPress={calculateButtonPressed}>Calculate!</Button>
                        <Button
                            mode="contained"
                            onPress={clearButtonPressed}
                            buttonColor='black'>Clear</Button>
                    </Row>
                </ScrollView>
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