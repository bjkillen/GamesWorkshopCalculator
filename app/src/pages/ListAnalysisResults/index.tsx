import { SafeAreaView, ScrollView, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native"
import { ListAnalyzerRootStackParamList } from "@/app/(tabs)/listAnalyzer";
import { Text } from "react-native-paper";
import DataPieChart from "../../components/chart/DataPieChart";
import { useEffect, useState } from "react";
import ArmyListStatisticsCalculator, { ArmyListStatistics } from "../../utilities/armyList/ArmyListStatisticsCalculator";

function ListAnalysisResults() {
    const route = useRoute<RouteProp<ListAnalyzerRootStackParamList, "ListAnalysisResults">>();
    const { armyList } = route.params;
    const [ armyListStatistics, setArmyListStatistics] = useState(new ArmyListStatistics())

    function computeArmyListStatistics() {
        const computedArmyListStatistics = ArmyListStatisticsCalculator.Calculate(armyList);
        setArmyListStatistics(computedArmyListStatistics);
    }

    useEffect(() => {
        computeArmyListStatistics()
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
                <Text variant="displayMedium" style={{ textAlign: 'center' }}>
                    Results
                </Text>
                <DataPieChart data={armyListStatistics.unitClassPoints} height={250} />
                <DataPieChart data={armyListStatistics.wargearClassPoints} height={250} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ListAnalysisResults;