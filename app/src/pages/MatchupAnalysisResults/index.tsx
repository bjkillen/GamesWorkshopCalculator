import { MatchupAnalyzerRootStackParamList } from "@/app/(tabs)/matchupAnalyzer";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import MatchupCalculationMode from "../../utilities/enums/MatchupCalculationMode";
import MatchupCalculationModeSegmentedButtons from "./components/MatchupCalculationModeSegmentedButtons";
import SelectUnitDatasheetFromListButtonAndPopup from "./components/SelectUnitDatasheetFromListButtonAndPopup";
import { ArmyListUnitDatasheet } from "../../utilities/armyList/ArmyList";

function MatchupAnalysisResults() {
    const route = useRoute<RouteProp<MatchupAnalyzerRootStackParamList, "MatchupAnalysisResults">>();
    const { myArmyList, opponentsArmyList } = route.params;

    const [matchupCalculationMode, setMatchupCalculationMode] = useState<MatchupCalculationMode>(MatchupCalculationMode.Attacking);
    const [selectedArmyListUnitDatasheet, setSelectedArmyListUnitDatasheet] = useState<ArmyListUnitDatasheet | undefined>(undefined);

    function computeArmyMatchupStatistics() {
        // const results = ArmyListMatchupCalculator.Calculate();
    }

    useEffect(() => {
        computeArmyMatchupStatistics()
    }, [])

    return (
        <SafeAreaView style={styles.safeView}>
            <ScrollView>
                <Text variant="displayMedium" style={{ textAlign: 'center', marginTop: 10 }}>
                    Results
                </Text>
                <View>
                    <MatchupCalculationModeSegmentedButtons
                        value={matchupCalculationMode}
                        setValue={setMatchupCalculationMode}
                    />
                </View>
                <View>
                    <SelectUnitDatasheetFromListButtonAndPopup
                        myArmyList={myArmyList}
                        opponentsArmyList={opponentsArmyList}
                        value={selectedArmyListUnitDatasheet}
                        setValue={setSelectedArmyListUnitDatasheet}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default MatchupAnalysisResults;

const styles = StyleSheet.create({
    safeView: {
        flex: 1
    }
});