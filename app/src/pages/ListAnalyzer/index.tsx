import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";

import LoadingOverlay from "@/components/LoadingOverlay";
import { Faction } from "gamesworkshopcalculator.common";
import FactionDatasheetsParser from "../../utilities/factionDatasheets/FactionDatasheetsParser";
import SelectFactionButtonAndPopup from "../../components/faction/SelectFactionButtonAndPopup";
import MultineTextInput from "./components/MultilineTextInput";
import Row from "../../components/Row";

function ListAnalyzer() {
    const [loadingOverlayOpen, setLoadingOverlayOpen] = useState(false);
    const [factionsDatasheets, setFactionsDatasheets] = useState(new Map<string, Faction>())

    const [selectedFaction, setSelectedFaction] = useState<Faction | undefined>(undefined);
    const [listText, setListText] = useState<string | undefined>(undefined);

    const analyzeListButtonPressed = () => {
        setSelectedFaction(undefined);
        setListText(undefined);
    }

    const clearButtonPressed = () => {
        setSelectedFaction(undefined);
        setListText(undefined);
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

    return (
        <SafeAreaView>
            <LoadingOverlay open={loadingOverlayOpen} />
            <ScrollView style={{ padding: 16 }}>
                <Text variant="displayLarge" style={{ textAlign: 'center' }}>
                    Matchup Calculator
                </Text>
                <View style={{ marginTop: 5 }}>
                    <View style={{ flex: 6 }}>
                        <SelectFactionButtonAndPopup
                            value={selectedFaction}
                            setValue={setSelectedFaction}
                            factionData={factionsDatasheets}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text variant="labelLarge">Please copy your exported army list from the official 40k app here. We may not be able to correctly analyze your list if there are any unexpected characters or post export edits inserted.</Text>
                    <View style={{ marginTop: 10 }}>
                        <MultineTextInput
                            label="Copy list here"
                            disabled={selectedFaction == null}
                            value={listText}
                            setValue={setListText}
                            style={{ height: 400 }}
                        />
                    </View>
                </View>
                <Row style={{ marginTop: 30, columnGap: 10 }}>
                    <Button
                        style={{ flex: 3 }}
                        mode="contained"
                        onPress={analyzeListButtonPressed}>
                            Analyze!
                    </Button>
                    <Button
                        style={{ flex: 3 }}
                        mode="contained"
                        onPress={clearButtonPressed}
                        buttonColor='black'>
                            Clear
                    </Button>
                </Row>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ListAnalyzer;