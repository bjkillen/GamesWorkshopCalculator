import { SafeAreaView, ScrollView, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native"
import { ListAnalyzerRootStackParamList } from "@/app/(tabs)/listAnalyzer";
import { Text } from "react-native-paper";
import DataPieChart, { convertData, convertWargearClassificationData } from "../../components/chart/DataPieChart";
import { useEffect, useState } from "react";
import ArmyListStatisticsCalculator, { ArmyListStatistics } from "../../utilities/armyList/ArmyListStatisticsCalculator";
import DataBarChart, {convertStringKeyData, convertNumberKeyData} from "../../components/chart/DataBarChart";

function ListAnalysisResults() {
    const route = useRoute<RouteProp<ListAnalyzerRootStackParamList, "ListAnalysisResults">>();
    const { armyList } = route.params;
    const [ armyListStatistics, setArmyListStatistics] = useState(new ArmyListStatistics())

    const pieChartHeight = 275;
    const barChartHeight = 250;

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
                <Text variant="displayMedium" style={{ textAlign: 'center', marginTop: 10 }}>
                    Results
                </Text>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10 }}>
                        Unit Classification
                    </Text>
                    <View style={{ height: pieChartHeight, marginHorizontal: 20, marginVertical: 10 }}>
                        <DataPieChart
                            data={convertData(armyListStatistics.unitClassPoints)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10, marginVertical: 10 }}>
                        Wargear Target Classification
                    </Text>
                    <View style={{ height: pieChartHeight, marginHorizontal: 20 }}>
                        <DataPieChart
                            data={convertWargearClassificationData(armyListStatistics.wargearClassPoints)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10 }}>
                        Wargear Offensive Breakdown
                    </Text>
                    <View style={{ height: barChartHeight, marginHorizontal: 20 }}>
                        <DataBarChart
                            data={convertStringKeyData(armyListStatistics.wargearTypeWeightings)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10 }}>
                        Wargear Strength Counts
                    </Text>
                    <View style={{ height: barChartHeight, marginHorizontal: 20 }}>
                        <DataBarChart
                            data={convertNumberKeyData(armyListStatistics.wargearStrengthCounts)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10 }}>
                        Wargear AP Counts
                    </Text>
                    <View style={{ height: barChartHeight, marginHorizontal: 20 }}>
                        <DataBarChart
                            data={convertNumberKeyData(armyListStatistics.wargearArmorPenetrationCounts)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10 }}>
                        Unit toughness Counts
                    </Text>
                    <View style={{ height: barChartHeight, marginHorizontal: 20 }}>
                        <DataBarChart
                            data={convertNumberKeyData(armyListStatistics.datasheetToughnessCounts)}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ListAnalysisResults;