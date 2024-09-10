import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import NumericalTextInput from '../../components/NumericalTextInput';
import DiceWeaponSkillValueSegmentedButtons from './components/DiceWeaponSkillValueSegmentedButtons';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import CustomCheckbox from '../../components/Checkbox';
import Row from '../../components/Row';
import DiceSkillValue from '../../utilities/DiceSkillValue';
import { AttackerCalculatorInput } from '../../models/AttackerCalculator';
import StringExtension from '../../utilities/extensions/StringExtension';
import DiceRerollModifierSegmentedButtons from './components/DiceRerollModifierSegmentedButtons';
import DiceRerollModifierValue from '../../utilities/DiceRerollModifierValue';
import { DefenderStatistics } from '../../models/DefenderCalculator';
import AttackerDefenderCalculator, { AttackerDefenderCalculatorInput, AttackerDefenderCalculatorResult } from '../../models/MatchupCalculator';
import ParallaxScrollView from '@/components/ParallaxScrollView';

function MatchupCalculator() {
    const [weaponSkill, setWeaponSkill] = useState(DiceSkillValue.Two);

    const [attackCount, setAttackCount] = useState<number | undefined>(undefined);
    const [strength, setStrength] = useState<number | undefined>(undefined);
    const [damage, setDamage] = useState<number | undefined>(undefined);
    const [armorPenetration, setArmorPenetration] = useState<number | undefined>(undefined);

    const [criticalHitsSkill, setCriticalHitsSkill] = useState(DiceSkillValue.Six);
    const [sustainedHitsChecked, setSustainedHitsChecked] = useState(false);
    const [sustainedHitsCount, setSustainedHitsCount] = useState<number | undefined>(1);
    const [lethalHitsChecked, setLethalHitsChecked] = useState(false);
    const [devastatingWoundsChecked, setDevastatingWoundsChecked] = useState(false);

    const [toughness, setToughness] = useState<number | undefined>(undefined);
    const [armorSaveSkill, setArmorSaveSkill] = useState(DiceSkillValue.Two);
    const [invulnerableSaveChecked, setInvulnerableSaveChecked] = useState(false);
    const [invulnerableSaveSkill, setInvulnerableSaveSkill] = useState(DiceSkillValue.Two);
    const [feelNoPainChecked, setFeelNoPainChecked] = useState(false);
    const [feelNoPainSaveSkill, setFeelNoPainSaveSkill] = useState(DiceSkillValue.Two);

    const [rerollHitsModifier, setRerollHitsModifier] = useState(DiceRerollModifierValue.None);
    const [rerollWoundsModifier, setRerollWoundsModifier] = useState(DiceRerollModifierValue.None);

    const [calculationResult, setCalculationResult] = useState<AttackerDefenderCalculatorResult | undefined>(undefined);

    const [resultsModalIsVisible, setResultsModalIsVisible] = useState(false);

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
        showResultsModal();
    }

    const showResultsModal = () => setResultsModalIsVisible(true);
    const hideResultsModal = () => setResultsModalIsVisible(false);

    const clearButtonPressed = () => {
        setAttackCount(undefined);
        setStrength(undefined);
        setDamage(undefined);
        setArmorPenetration(undefined);
        setCriticalHitsSkill(DiceSkillValue.Six);
        setSustainedHitsChecked(false);
        setSustainedHitsCount(1);
        setLethalHitsChecked(false);
        setDevastatingWoundsChecked(false);
        setWeaponSkill(DiceSkillValue.Two);
        setToughness(undefined);
        setRerollHitsModifier(DiceRerollModifierValue.None);
        setRerollWoundsModifier(DiceRerollModifierValue.None);
        setArmorSaveSkill(DiceSkillValue.Two);
        setInvulnerableSaveChecked(false);
        setInvulnerableSaveSkill(DiceSkillValue.Two);
        setFeelNoPainChecked(false);
        setFeelNoPainSaveSkill(DiceSkillValue.Two);
        setCalculationResult(undefined);

        hideResultsModal();
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/cracked-earth-texture-small.png')}
                    style={styles.textureBackground}
                />
        }>
            <Text variant="displayLarge" style={{ textAlign: 'center' }}>
                Matchup Calculator
            </Text>
            <View style={{ marginTop: 5 }}>
                <Text variant="displaySmall">Attacking Unit</Text>
                <View style={{ marginTop: 10 }}>
                    <Text>WS/BS</Text>
                    <DiceWeaponSkillValueSegmentedButtons
                        value={weaponSkill}
                        setValue={setWeaponSkill}
                    />
                </View>
                <Row style={{ marginTop: 25, columnGap: 10 }} >
                    <View style={{ flex: 3 }}>
                        <NumericalTextInput
                            label='Attack Count'
                            value={attackCount}
                            setValue={setAttackCount}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <NumericalTextInput
                            label='Strength'
                            value={strength}
                            setValue={setStrength}
                        />
                    </View>
                </Row>
                <Row style={{ marginTop: 10, columnGap: 10 }}>
                    <View style={{ flex: 3 }}>
                        <NumericalTextInput
                            label='Damage'
                            value={damage}
                            setValue={setDamage}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <NumericalTextInput
                            label='Armour Penetration'
                            value={armorPenetration}
                            setValue={setArmorPenetration}
                        />
                    </View>
                </Row>
                <View style={{ marginTop: 20 }}>
                    <Text variant="headlineSmall">Modifiers</Text>
                    <Row>
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
                    </Row>
                    <View style={{ marginTop: 10 }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <View>
                                <Text>Critical Hits</Text>
                            </View>
                            <NumericalTextInput
                                label='Count'
                                disabled={!(sustainedHitsChecked || lethalHitsChecked)}
                                value={sustainedHitsCount}
                                setValue={setSustainedHitsCount}
                            />
                        </Row>
                        <View style={{ marginTop: 20 }}>
                            <DiceWeaponSkillValueSegmentedButtons
                                disabled={!(sustainedHitsChecked || lethalHitsChecked)}
                                value={criticalHitsSkill}
                                setValue={setCriticalHitsSkill}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15, rowGap: 10 }}>
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
            </View>
            <View style={{ marginTop: 15 }}>
                <Text variant="displaySmall">Defending Unit</Text>
                <View style={{ marginTop: 10 }}>
                    <NumericalTextInput
                        label='Toughness'
                        value={toughness}
                        setValue={setToughness}
                    />
                </View>
                <View style={{ marginTop: 15, rowGap: 10 }}>
                    <View style={{ rowGap: 5 }}>
                        <Text>Armor Save</Text>
                        <DiceWeaponSkillValueSegmentedButtons
                            value={armorSaveSkill}
                            setValue={setArmorSaveSkill}
                        />
                    </View>
                    <View style={{ rowGap: 5 }}>
                        <CustomCheckbox
                            label='Invulenerable Save'
                            value={invulnerableSaveChecked}
                            setValue={setInvulnerableSaveChecked}
                        />
                        <DiceWeaponSkillValueSegmentedButtons
                            disabled={!invulnerableSaveChecked}
                            value={invulnerableSaveSkill}
                            setValue={setInvulnerableSaveSkill}
                        />
                    </View>
                    <View style={{ rowGap: 5 }}>
                        <CustomCheckbox
                            label='Feel No Pain'
                            value={feelNoPainChecked}
                            setValue={setFeelNoPainChecked}
                        />
                        <DiceWeaponSkillValueSegmentedButtons
                            disabled={!feelNoPainChecked}
                            value={feelNoPainSaveSkill}
                            setValue={setFeelNoPainSaveSkill}
                        />
                    </View>
                </View>
            </View>
            <Portal>
                <Modal visible={resultsModalIsVisible} onDismiss={hideResultsModal} contentContainerStyle={styles.modal}>
                    <Text variant="displaySmall">Results</Text>
                    <Text variant="labelLarge" style={{ marginTop: 5 }}>
                        Successful Hits: {StringExtension.toFixedWithoutZeros(calculationResult?.attackerResult.successfulHits ?? 0, 2)}
                    </Text>
                    <Text variant="labelLarge">
                        Critical Hits: {StringExtension.toFixedWithoutZeros(calculationResult?.attackerResult.criticalHits ?? 0, 5)}
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
                    <View style={{ marginTop: 15, justifyContent: 'center' }}>
                        <Button
                            mode="contained"
                            onPress={hideResultsModal}
                            buttonColor='black'>
                                Close
                        </Button>
                    </View>
                    
                </Modal>
            </Portal>
            <Row style={{ marginTop: 30, columnGap: 10 }}>
                <Button
                    style={{ flex: 3 }}
                    mode="contained"
                    onPress={calculateButtonPressed}>
                        Calculate!
                </Button>
                <Button
                    style={{ flex: 3 }}
                    mode="contained"
                    onPress={clearButtonPressed}
                    buttonColor='black'>
                        Clear
                </Button>
            </Row>
        </ParallaxScrollView>
    );
}

export default MatchupCalculator;

// create styles of app
const styles = StyleSheet.create({
    textureBackground: {
        resizeMode: 'cover'
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
    }
});