import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import NumericalTextInput from '../../components/NumericalTextInput';
import DiceWeaponSkillValueSegmentedButtons from './components/DiceWeaponSkillValueSegmentedButtons';
import { Button, Text } from 'react-native-paper';
import CustomCheckbox from '../../components/Checkbox';
import Row from '../../components/Row';
import DiceSkillValue from '../../utilities/DiceSkillValue';
import { AttackerCalculationResult, AttackerCalculatorInput } from '../../models/AttackerCalculator';
import StringExtension from '../../utilities/extensions/StringExtension';
import DiceRerollModifierSegmentedButtons from './components/DiceRerollModifierSegmentedButtons';
import DiceRerollModifierValue from '../../utilities/DiceRerollModifierValue';
import { DefenderStatistics } from '../../models/DefenderCalculator';
import AttackerDefenderCalculator, { AttackerDefenderCalculatorInput, AttackerDefenderCalculatorResult } from '../../models/MatchupCalculator';

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
    const [feelNoPainChecked, setFeelNoPainChecked] = useState(false);
    const [feelNoPainSaveSkill, setFeelNoPainSaveSkill] = useState(DiceSkillValue.Two);

    const [rerollHitsModifier, setRerollHitsModifier] = useState(DiceRerollModifierValue.None);
    const [rerollWoundsModifier, setRerollWoundsModifier] = useState(DiceRerollModifierValue.None);

    const [calculationResult, setCalculationResult] = useState<AttackerDefenderCalculatorResult | undefined>(undefined);

    const calculateButtonPressed = () => {
        const attackerInput = new AttackerCalculatorInput(
            attackCount ?? 0,
            strength ?? 0,
            weaponSkill,
            criticalHitsSkill,
            sustainedHitsChecked,
            sustainedHitsCount ?? 0,
            lethalHitsChecked,
            rerollHitsModifier,
            rerollWoundsModifier,
            toughness ?? 0,
        );

        const defenseStatistics = new DefenderStatistics(
            damage ?? 0,
            armorPenetration ?? 0,
            devastatingWoundsChecked,
            armorSaveSkill,
            invulnerableSaveChecked,
            invulnerableSaveSkill,
            feelNoPainChecked,
            feelNoPainSaveSkill
        );

        const attackerDefenderCalculatorInput = new AttackerDefenderCalculatorInput(
            attackerInput,
            defenseStatistics
        );

        const computedCalculationResult = AttackerDefenderCalculator.calculate(attackerDefenderCalculatorInput);
        setCalculationResult(computedCalculationResult);
    }

    const clearButtonPressed = () => {
        setAttackCount(0);
        setStrength(0);
        setDamage(0);
        setArmorPenetration(0);
        setCriticalHitsSkill(DiceSkillValue.Six);
        setSustainedHitsChecked(false);
        setSustainedHitsCount(1);
        setLethalHitsChecked(false);
        setDevastatingWoundsChecked(false);
        setWeaponSkill(DiceSkillValue.Two);
        setToughness(0);
        setRerollHitsModifier(DiceRerollModifierValue.None);
        setRerollWoundsModifier(DiceRerollModifierValue.None);
        setArmorSaveSkill(DiceSkillValue.Two);
        setInvulnerableSaveChecked(false);
        setInvulnerableSaveSkill(DiceSkillValue.Two);
        setFeelNoPainChecked(false);
        setFeelNoPainSaveSkill(DiceSkillValue.Two);
        setCalculationResult(undefined);
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
                        </Row>
                        <Row style={{ marginTop: 10, justifyContent: "space-evenly" }}>
                            <NumericalTextInput
                                label='Damage'
                                value={damage}
                                setValue={setDamage}
                            />
                            <NumericalTextInput
                                label='Armour Penetration'
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
                        <View>
                            <Row style={{ justifyContent: "space-between" }}>
                                <Text>Feel No Pain</Text>
                                <CustomCheckbox
                                    value={feelNoPainChecked}
                                    setValue={setFeelNoPainChecked}
                                />
                            </Row>
                            <DiceWeaponSkillValueSegmentedButtons
                                disabled={!feelNoPainChecked}
                                value={feelNoPainSaveSkill}
                                setValue={setFeelNoPainSaveSkill}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text variant="displaySmall">Results</Text>
                        <Text variant="labelLarge">
                            Successful Hits: {StringExtension.toFixedWithoutZeros(calculationResult?.attackerResult.successfulHits ?? 0, 2)}
                        </Text>
                        <Text variant="labelLarge">
                            Successful Wounds: {StringExtension.toFixedWithoutZeros(calculationResult?.attackerResult.successfulWounds ?? 0, 2)}
                        </Text>
                        <Text variant="labelLarge">
                            Total Successful Damage: {StringExtension.toFixedWithoutZeros(calculationResult?.defenderResult.totalSuccessfulDamage ?? 0, 2)}
                        </Text>
                        <Text variant="labelLarge">
                            Wounds Saved: {StringExtension.toFixedWithoutZeros(calculationResult?.defenderResult.woundsSaved ?? 0, 2)}
                        </Text>
                        <Text variant="labelLarge">
                            Damage Saved: {StringExtension.toFixedWithoutZeros(calculationResult?.defenderResult.totalDamageSaved ?? 0, 2)}
                        </Text>
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