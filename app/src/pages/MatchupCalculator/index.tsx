import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import NumericalTextInput from '../../components/NumericalTextInput';
import DiceWeaponSkillValueSegmentedButtons from './components/DiceWeaponSkillValueSegmentedButtons';
import { Button, Text } from 'react-native-paper';
import CustomCheckbox from '../../components/Checkbox';
import Row from '../../components/Row';
import DiceSkillValue from '../../utilities/DiceSkillValue';
import AttackCalculator, { AttackerCalculationResult, AttackerCalculatorInput } from '../../models/AttackerCalculator';
import StringExtension from '../../utilities/extensions/StringExtension';
import DiceRerollModifierSegmentedButtons from './components/DiceRerollModifierSegmentedButtons';
import DiceRerollModifierValue from '../../utilities/DiceRerollModifierValue';

function MatchupCalculator() {
    const [weaponSkill, setWeaponSkill] = useState(DiceSkillValue.Two);

    const [attackCount, setAttackCount] = useState<number | undefined>(0);
    const [strength, setStrength] = useState<number | undefined>(0);
    const [damage, setDamage] = useState<number | undefined>(0);
    const [armorPenetration, setArmorPenetration] = useState<number | undefined>(0);

    const [criticalHitsSkill, setCriticalHitsSkill] = useState(DiceSkillValue.Six);
    const [sustainedHitsChecked, setSustainedHitsChecked] = useState(false);
    const [sustainedHitsCount, setSustainedHitsCount] = useState<number | undefined>(1);
    const [lethalHitsChecked, setLethalHitsChecked] = useState(false);
    const [devastatingWoundsChecked, setDevastatingWoundsChecked] = useState(false);

    const [toughness, setToughness] = useState<number | undefined>(0);
    const [armorSaveSkill, setArmorSaveSkill] = useState(DiceSkillValue.Two);
    const [invulnerableSaveChecked, setInvulnerableSaveChecked] = useState(false);
    const [invulnerableSaveSkill, setInvulnerableSaveSkill] = useState(DiceSkillValue.Two);

    const [rerollHitsModifier, setRerollHitsModifier] = useState(DiceRerollModifierValue.None);
    const [rerollWoundsModifier, setRerollWoundsModifier] = useState(DiceRerollModifierValue.None);

    const [calculationResult, setCalculationResult] = useState(new AttackerCalculationResult(0, 0, 0, 0));

    const calculateButtonPressed = () => {
        const input = new AttackerCalculatorInput(
            attackCount ?? 0,
            strength ?? 0,
            weaponSkill,
            damage ?? 0,
            criticalHitsSkill,
            sustainedHitsChecked,
            sustainedHitsCount ?? 0,
            lethalHitsChecked,
            devastatingWoundsChecked,
            rerollHitsModifier,
            rerollWoundsModifier,
            toughness ?? 0,
        );

        const computedCalculationResult = AttackCalculator.calculate(input);
        setCalculationResult(computedCalculationResult);
    }

    const clearButtonPressed = () => {
        setAttackCount(0);
        setStrength(0);
        setDamage(0);
        setCriticalHitsSkill(DiceSkillValue.Six);
        setSustainedHitsChecked(false);
        setSustainedHitsCount(1);
        setLethalHitsChecked(false);
        setDevastatingWoundsChecked(false);
        setWeaponSkill(DiceSkillValue.Two);
        setToughness(0);
        setRerollHitsModifier(DiceRerollModifierValue.None);
        setRerollWoundsModifier(DiceRerollModifierValue.None);
        setCalculationResult(new AttackerCalculationResult(0, 0, 0, 0));
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
                            <NumericalTextInput
                                label='Armor Penetration (enter only positive ie. -1 as 1)'
                                value={armorPenetration}
                                setValue={setArmorPenetration}
                            />
                        </Row>
                        <View style={{ marginTop: 20 }}>
                            <Text variant="headlineSmall">Modifiers</Text>
                            <Row style={{ justifyContent: "space-between" }}>
                                <Text>Sustained Hits</Text>
                                <CustomCheckbox
                                    value={sustainedHitsChecked}
                                    setValue={setSustainedHitsChecked}
                                />
                            </Row>
                            <Row style={{ justifyContent: "space-between" }}>
                                <Text>Lethal Hits</Text>
                                <CustomCheckbox
                                    value={lethalHitsChecked}
                                    setValue={setLethalHitsChecked}
                                />
                            </Row>
                            <View>
                                <View>
                                <Text>Critical Hits</Text>
                                    <DiceWeaponSkillValueSegmentedButtons
                                        disabled={!(sustainedHitsChecked || lethalHitsChecked)}
                                        value={criticalHitsSkill}
                                        setValue={setCriticalHitsSkill}
                                    />
                                </View>
                                <NumericalTextInput
                                    label='Count'
                                    disabled={!(sustainedHitsChecked || lethalHitsChecked)}
                                    value={sustainedHitsCount}
                                    setValue={setSustainedHitsCount}
                                />
                            </View>
                            <Row style={{ justifyContent: "space-between" }}>
                                <Text>Devastating Wounds</Text>
                                <CustomCheckbox
                                    value={devastatingWoundsChecked}
                                    setValue={setDevastatingWoundsChecked}
                                />
                            </Row>
                            <View>
                                <Text variant="labelLarge">Reroll Hits</Text>
                                <DiceRerollModifierSegmentedButtons
                                    value={rerollHitsModifier}
                                    setValue={setRerollHitsModifier}
                                />
                            </View>
                            <View>
                                <Text variant="labelLarge">Reroll Wounds</Text>
                                <DiceRerollModifierSegmentedButtons
                                    value={rerollWoundsModifier}
                                    setValue={setRerollWoundsModifier}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text variant="displaySmall">Defending Unit</Text>
                        <NumericalTextInput
                            label='Toughness'
                            value={toughness}
                            setValue={setToughness}
                        />
                        <View>
                            <Text>Armor Save</Text>
                            <DiceWeaponSkillValueSegmentedButtons
                                value={armorSaveSkill}
                                setValue={setArmorSaveSkill}
                            />
                        </View>
                        <View>
                            <Row style={{ justifyContent: "space-between" }}>
                                <Text>Invulenerable Save</Text>
                                <CustomCheckbox
                                    value={invulnerableSaveChecked}
                                    setValue={setInvulnerableSaveChecked}
                                />
                            </Row>
                            <DiceWeaponSkillValueSegmentedButtons
                                disabled={!invulnerableSaveChecked}
                                value={invulnerableSaveSkill}
                                setValue={setInvulnerableSaveSkill}
                            />
                        </View>
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