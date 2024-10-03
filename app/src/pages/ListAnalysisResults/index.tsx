import { Dimensions, SafeAreaView, ScrollView, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native"
import { ListAnalyzerRootStackParamList } from "@/app/(tabs)/listAnalyzer";
import { Text } from "react-native-paper";
import DataPieChart from "../../components/chart/DataPieChart";
import { useEffect, useState } from "react";
import ArmyListStatisticsCalculator, { ArmyListStatistics } from "../../utilities/armyList/ArmyListStatisticsCalculator";
import DataBarChart, {convertStringKeyData, convertNumberKeyData} from "../../components/chart/DataBarChart";

function ListAnalysisResults() {
    const route = useRoute<RouteProp<ListAnalyzerRootStackParamList, "ListAnalysisResults">>();
    const { armyList } = route.params;
    const [ armyListStatistics, setArmyListStatistics] = useState(new ArmyListStatistics())

    const chartHeight = 250;

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
                        Points per unit class
                    </Text>
                    <View style={{ height: chartHeight, marginHorizontal: 20 }}>
                        <DataPieChart
                            data={armyListStatistics.unitClassPoints}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10 }}>
                        Points per wargear class
                    </Text>
                    <View style={{ height: chartHeight, marginHorizontal: 20 }}>
                        <DataPieChart
                            data={armyListStatistics.wargearClassPoints}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10 }}>
                        Wargear Offensive Breakdown
                    </Text>
                    <View style={{ height: chartHeight, marginHorizontal: 20 }}>
                        <DataBarChart
                            data={convertStringKeyData(armyListStatistics.wargearTypeWeightings)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10 }}>
                        Wargear Strength Counts
                    </Text>
                    <View style={{ height: chartHeight, marginHorizontal: 20 }}>
                        <DataBarChart
                            data={convertNumberKeyData(armyListStatistics.wargearStrengthCounts)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10 }}>
                        Wargear AP Counts
                    </Text>
                    <View style={{ height: chartHeight, marginHorizontal: 20 }}>
                        <DataBarChart
                            data={convertNumberKeyData(armyListStatistics.wargearArmorPenetrationCounts)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10 }}>
                        Unit toughness Counts
                    </Text>
                    <View style={{ height: chartHeight, marginHorizontal: 20 }}>
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