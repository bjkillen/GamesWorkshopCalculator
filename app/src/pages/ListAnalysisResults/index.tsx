import { SafeAreaView, ScrollView, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native"
import { ListAnalyzerRootStackParamList } from "@/app/(tabs)/listAnalyzer";
import { Text } from "react-native-paper";
import DataPieChart from "../../components/chart/DataPieChart";
import { useEffect } from "react";

function ListAnalysisResults() {
    const route = useRoute<RouteProp<ListAnalyzerRootStackParamList, "ListAnalysisResults">>();
    const { armyList } = route.params;

    function computeArmyListStatistics() {
        
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
                <DataPieChart />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ListAnalysisResults;