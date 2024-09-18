import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from "react-native";
import NumericalTextInput from '../../components/NumericalTextInput';
import DiceWeaponSkillValueSegmentedButtons from './components/DiceWeaponSkillValueSegmentedButtons';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import CustomCheckbox from '../../components/Checkbox';
import Row from '../../components/Row';
import { DiceSkillValue, Faction, UnitDatasheet, Wargear } from 'gamesworkshopcalculator.common';
import { AttackerCalculatorInput } from '../../models/AttackerCalculator';
import StringExtension from '../../utilities/extensions/StringExtension';
import DiceRerollModifierSegmentedButtons from './components/DiceRerollModifierSegmentedButtons';
import DiceRerollModifierValue from '../../utilities/enums/DiceRerollModifierValue';
import { DefenderStatistics } from '../../models/DefenderCalculator';
import AttackerDefenderCalculator, { AttackerDefenderCalculatorInput, AttackerDefenderCalculatorResult } from '../../models/MatchupCalculator';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import LoadingOverlay from '@/components/LoadingOverlay';
import FactionDatasheetsParser from '../../utilities/factionDatasheets/FactionDatasheetsParser';
import SelectFactionButtonAndPopup from './components/faction/SelectFactionButtonAndPopup';
import SelectUnitButtonAndPopup from './components/unit/SelectUnitButtonAndPopup';
import SelectWargearButtonAndPopup from './components/wargear/SelectWargearButtonAndPopup';
import VariableNumericalValueParser, { VariableNumericalValue } from '../../utilities/factionDatasheets/VariableNumericalValueParser';
import VariableNumericalTextInput from '../../components/VariableNumericalTextInput';
import SustainedHitsParser from '../../utilities/factionDatasheets/SustainedHitsParser';

function MatchupCalculator() {
    const [loadingOverlayOpen, setLoadingOverlayOpen] = useState(false);
    const [factionsDatasheets, setFactionsDatasheets] = useState(new Map<string, Faction>());

    const [attackingFaction, setAttackingFaction] = useState<Faction | undefined>(undefined);
    const [attackingUnit, setAttackingUnit] = useState<UnitDatasheet | undefined>(undefined);
    const [attackingUnitWargear, setAttackingUnitWargear] = useState<Wargear | undefined>(undefined);

    const [defendingFaction, setDefendingFaction] = useState<Faction | undefined>(undefined);
    const [defendingUnit, setDefendingUnit] = useState<UnitDatasheet | undefined>(undefined);

    const [weaponSkill, setWeaponSkill] = useState(DiceSkillValue.Two);

    const [modelCount, setModelCount] = useState<number | undefined>(1);
    const [attackCountVariableNumericalValue, setAttackCountVariableNumericalValue] = useState<VariableNumericalValue | undefined>(undefined);
    const [strength, setStrength] = useState<number | undefined>(undefined);
    const [damageVariableNumericalValue, setDamageVariableNumericalValue] = useState<VariableNumericalValue | undefined>(undefined);
    const [armorPenetration, setArmorPenetration] = useState<number | undefined>(undefined);

    const [criticalHitsSkill, setCriticalHitsSkill] = useState(DiceSkillValue.Six);
    const [sustainedHitsChecked, setSustainedHitsChecked] = useState(false);
    const [sustainedHitsCountVariableNumericalValue, setSustainedHitsCountVariableNumericalValue] = useState<VariableNumericalValue | undefined>(undefined);
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
            (modelCount ?? 1) * (attackCountVariableNumericalValue?.numericalVal ?? 0),
            strength ?? 0,
            weaponSkill,
            criticalHitsSkill,
            sustainedHitsChecked,
            sustainedHitsCountVariableNumericalValue?.numericalVal ?? 0,
            lethalHitsChecked,
            rerollHitsModifier,
            rerollWoundsModifier,
            toughness ?? 0,
        );

        const defenseStatistics = new DefenderStatistics(
            damageVariableNumericalValue?.numericalVal ?? 0,
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

    const attackingFactionSet = (value: Faction) => {
        setAttackingFaction(value);
        setAttackingUnit(undefined);
        setAttackingUnitWargear(undefined);
    }

    const attackingUnitSet = (value: UnitDatasheet) => {
        setAttackingUnit(value);
        setAttackingUnitWargear(undefined);
    }

    const defendingFactionSet = (value: Faction) => {
        setDefendingFaction(value);
        setDefendingUnit(undefined);
    }

    const clearAttackingStats = () =>  {
        setModelCount(1);
        setAttackCountVariableNumericalValue(undefined);
        setStrength(undefined);
        setDamageVariableNumericalValue(undefined);
        setArmorPenetration(undefined);
        setCriticalHitsSkill(DiceSkillValue.Six);
        setSustainedHitsChecked(false);
        setSustainedHitsCountVariableNumericalValue(undefined);
        setLethalHitsChecked(false);
        setDevastatingWoundsChecked(false);
        setWeaponSkill(DiceSkillValue.Two);
    }

    const clearDefendingStats = () => {
        setToughness(undefined);
        setRerollHitsModifier(DiceRerollModifierValue.None);
        setRerollWoundsModifier(DiceRerollModifierValue.None);
        setArmorSaveSkill(DiceSkillValue.Two);
        setInvulnerableSaveChecked(false);
        setInvulnerableSaveSkill(DiceSkillValue.Two);
        setFeelNoPainChecked(false);
        setFeelNoPainSaveSkill(DiceSkillValue.Two);
    }

    const clearButtonPressed = () => {
        clearAttackingStats();
        clearDefendingStats();
        setCalculationResult(undefined);

        hideResultsModal();
    }

    async function loadFactionsDatasheets() {
        const parsedFactionsDatasheets = await FactionDatasheetsParser.Parse();
        setFactionsDatasheets(parsedFactionsDatasheets)
    }

    useEffect(() => {
        setLoadingOverlayOpen(true);
        loadFactionsDatasheets();
    }, [])

    useEffect(() => {
        setLoadingOverlayOpen(false);
    }, [factionsDatasheets])

    useEffect(() => {
        if (attackingUnitWargear == null) {
            clearAttackingStats();
            return;
        }

        setWeaponSkill(attackingUnitWargear.skill);
        setStrength(attackingUnitWargear.strength);
        setAttackCountVariableNumericalValue(VariableNumericalValueParser.Parse(attackingUnitWargear.attacks));
        setDamageVariableNumericalValue(VariableNumericalValueParser.Parse(attackingUnitWargear.damage));
        setArmorPenetration(Math.abs(attackingUnitWargear.armorPenetration));

        let wargearDescriptionLower = attackingUnitWargear.description.toLowerCase();
        setLethalHitsChecked(wargearDescriptionLower.includes("lethal hits"));

        const sustainedHitsParsed = SustainedHitsParser.Parse(wargearDescriptionLower);

        setSustainedHitsChecked(sustainedHitsParsed != null)

        if (sustainedHitsParsed != null) {
            setSustainedHitsCountVariableNumericalValue(VariableNumericalValueParser.Parse(sustainedHitsParsed));
        } else {
            setSustainedHitsCountVariableNumericalValue(undefined);
        }

        setDevastatingWoundsChecked(wargearDescriptionLower.includes("devastating wounds"));
    }, [attackingUnitWargear])

    useEffect(() => {
        if (defendingUnit == null) {
            clearDefendingStats();
            return;
        }

        const firstModelOnDatasheet = defendingUnit.modelDatasheets[0];

        setToughness(firstModelOnDatasheet.toughness);
        setArmorSaveSkill(firstModelOnDatasheet.armorSaveSkill);
        setInvulnerableSaveChecked(firstModelOnDatasheet.invulnerableSave);

        if (firstModelOnDatasheet.invulnerableSaveSkill != null) {
            setInvulnerableSaveSkill(firstModelOnDatasheet.invulnerableSaveSkill);
        }
    }, [defendingUnit])

    return (
        <ParallaxScrollView
            backgroundImageSource={require('@/assets/images/cracked-earth-texture-small.png')}
        >
            <LoadingOverlay open={loadingOverlayOpen} />
            <View style={{ padding: 16, flex: 1 }}>
                <Text variant="displayLarge" style={{ textAlign: 'center' }}>
                    Matchup Calculator
                </Text>
                <View style={{ marginTop: 5 }}>
                    <View>
                        <Text variant="displaySmall">Attacking Faction</Text>
                        <View style={{ marginTop: 6, rowGap: 8 }}>
                            <View style={{ flex: 6 }}>
                                <SelectFactionButtonAndPopup
                                    value={attackingFaction}
                                    setValue={attackingFactionSet}
                                    factionData={factionsDatasheets}
                                />
                            </View>
                            <View style={{ flex: 6 }}>
                                <SelectUnitButtonAndPopup
                                    disabled={attackingFaction == null}
                                    unitDatasheets={attackingFaction?.unitDatasheets ?? []}
                                    value={attackingUnit}
                                    setValue={attackingUnitSet}
                                />
                            </View>
                            <View style={{ flex: 6 }}>
                                <SelectWargearButtonAndPopup
                                    disabled={attackingUnit == null}
                                    wargear={attackingUnit?.wargear ?? []}
                                    value={attackingUnitWargear}
                                    setValue={setAttackingUnitWargear}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text variant="displaySmall">Defending Faction</Text>
                        <View style={{ marginTop: 6, rowGap: 8 }}>
                            <View style={{ flex: 6 }}>
                                <SelectFactionButtonAndPopup
                                    value={defendingFaction}
                                    setValue={defendingFactionSet}
                                    factionData={factionsDatasheets}
                                />
                            </View>
                            <View style={{ flex: 6 }}>
                                <SelectUnitButtonAndPopup
                                    disabled={defendingFaction == null}
                                    unitDatasheets={defendingFaction?.unitDatasheets ?? []}
                                    value={defendingUnit}
                                    setValue={setDefendingUnit}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text variant="displaySmall">Attacking Unit</Text>
                    <View style={{ marginTop: 10 }}>
                        <Text>WS/BS</Text>
                        <DiceWeaponSkillValueSegmentedButtons
                            value={weaponSkill}
                            setValue={setWeaponSkill}
                        />
                    </View>
                    <Row style={{ marginTop: 25, columnGap: 10 }} >
                        <View style={{ flex: 2 }}>
                            <NumericalTextInput
                                label='Model Count'
                                value={modelCount}
                                setValue={setModelCount}
                            />
                        </View>
                        <View style={{ flex: 2 }}>
                            <VariableNumericalTextInput
                                label='Attack Count'
                                value={attackCountVariableNumericalValue}
                                setValue={setAttackCountVariableNumericalValue}
                            />
                        </View>
                        <View style={{ flex: 2 }}>
                            <NumericalTextInput
                                label='Strength'
                                value={strength}
                                setValue={setStrength}
                            />
                        </View>
                    </Row>
                    <Row style={{ marginTop: 10, columnGap: 10 }}>
                        <View style={{ flex: 3 }}>
                            <VariableNumericalTextInput
                                label='Damage'
                                value={damageVariableNumericalValue}
                                setValue={setDamageVariableNumericalValue}
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
                    <View style={{ marginTop: 15 }}>
                        <Text variant="headlineSmall">Modifiers</Text>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <CustomCheckbox
                                label='Sustained Hits'
                                value={sustainedHitsChecked}
                                setValue={setSustainedHitsChecked}
                            />
                            <VariableNumericalTextInput
                                    label='Count'
                                    disabled={!(sustainedHitsChecked)}
                                    value={sustainedHitsCountVariableNumericalValue}
                                    setValue={setSustainedHitsCountVariableNumericalValue}
                                />
                        </Row>
                        <Row style={{ marginTop: 15, justifyContent: 'space-between' }}>
                            <View>
                                <CustomCheckbox
                                    label='Lethal Hits'
                                    value={lethalHitsChecked}
                                    setValue={setLethalHitsChecked}
                                />
                            </View>
                            <View>
                                <CustomCheckbox
                                    label='Devastating Wounds'
                                    value={devastatingWoundsChecked}
                                    setValue={setDevastatingWoundsChecked}
                                />
                            </View>
                        </Row>
                        <View style={{ marginTop: 10 }}>
                            <View>
                                <Text>Critical Hits</Text>
                            </View>
                            <View style={{ marginTop: 5 }}>
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
                        <Text variant="displaySmall" style={{ textAlign: 'center' }}>Results</Text>
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
                        <View style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center' }}>
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
            </View>
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