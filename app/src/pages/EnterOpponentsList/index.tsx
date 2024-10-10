import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";

import LoadingOverlay from "@/components/LoadingOverlay";
import { Faction } from "gamesworkshopcalculator.common";
import FactionDatasheetsParser from "../../utilities/factionDatasheets/FactionDatasheetsParser";
import SelectFactionButtonAndPopup from "../../components/faction/SelectFactionButtonAndPopup";
import MultineTextInput from "../../components/input/MultilineTextInput";
import Row from "../../components/Row";
import ArmyListParser from "../../utilities/armyList/ArmyListParser";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MatchupAnalyzerRootStackParamList } from "@/app/(tabs)/matchupAnalyzer";
import { StackNavigationProp } from "@react-navigation/stack";

function EnterOpponentsList() {
    const route = useRoute<RouteProp<MatchupAnalyzerRootStackParamList, "EnterOpponentsList">>();
    const { myArmyList } = route.params;

    const navigation = useNavigation<StackNavigationProp<MatchupAnalyzerRootStackParamList>>();

    const [loadingOverlayOpen, setLoadingOverlayOpen] = useState(false);
    const [factionsDatasheets, setFactionsDatasheets] = useState(new Map<string, Faction>())

    const [selectedFaction, setSelectedFaction] = useState<Faction | undefined>(undefined);
    const [listText, setListText] = useState<string | undefined>(undefined);

    const inputMyListButtonPressed = () => {
        if (listText == null || selectedFaction == null) {
            return;
        }

        const armyListResult = ArmyListParser.Parse(listText, selectedFaction.unitDatasheets);
        navigation.navigate("MatchupAnalysisResults", { myArmyList: myArmyList, opponentsArmyList: armyListResult});
    }

    const clearButtonPressed = () => {
        setListText(undefined);
        setSelectedFaction(undefined);
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
                <Text variant="displaySmall" style={{ textAlign: 'center' }}>
                    Opponents List
                </Text>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flex: 6 }}>
                        <SelectFactionButtonAndPopup
                            value={selectedFaction}
                            setValue={setSelectedFaction}
                            factionData={factionsDatasheets}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text variant="labelLarge">Please copy the exported army list from the official 40k app here. We may not be able to correctly analyze your list if there are any unexpected characters or post export edits inserted.</Text>
                    <View style={{ marginTop: 10 }}>
                        <MultineTextInput
                            label={selectedFaction != null ? "Copy list here" : "Please select a faction"}
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
                        onPress={inputMyListButtonPressed}>
                            Enter Opp. List!
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

export default EnterOpponentsList;