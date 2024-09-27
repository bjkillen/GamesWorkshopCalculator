import { Dimensions, SafeAreaView, ScrollView, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native"
import { ListAnalyzerRootStackParamList } from "@/app/(tabs)/listAnalyzer";
import { Text } from "react-native-paper";
import DataPieChart from "../../components/chart/DataPieChart";
import { useEffect, useState } from "react";
import ArmyListStatisticsCalculator, { ArmyListStatistics } from "../../utilities/armyList/ArmyListStatisticsCalculator";
import DataBarChart from "../../components/chart/DataBarChart";

function ListAnalysisResults() {
    const route = useRoute<RouteProp<ListAnalyzerRootStackParamList, "ListAnalysisResults">>();
    const { armyList } = route.params;
    const [ armyListStatistics, setArmyListStatistics] = useState(new ArmyListStatistics())

    const screenWidth =  Dimensions.get("window").width;

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
                    <DataPieChart
                        data={armyListStatistics.unitClassPoints}
                        width={screenWidth}
                        height={250}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10 }}>
                        Points per wargear class
                    </Text>
                    <DataPieChart
                        data={armyListStatistics.wargearClassPoints}
                        width={screenWidth}
                        height={250}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10 }}>
                        Wargear Strength Counts
                    </Text>
                    <DataBarChart
                        data={armyListStatistics.wargearStrengthCounts}
                        width={screenWidth}
                        height={250}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10 }}>
                        Wargear AP Counts
                    </Text>
                    <DataBarChart
                        data={armyListStatistics.wargearArmorPenetrationCounts}
                        width={screenWidth}
                        height={250}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 10 }}>
                        Unit toughness Counts
                    </Text>
                    <DataBarChart
                        data={armyListStatistics.datasheetToughnessCounts}
                        width={screenWidth}
                        height={250}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ListAnalysisResults;