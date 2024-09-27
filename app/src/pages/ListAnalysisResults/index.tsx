import { View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native"
import { ListAnalyzerRootStackParamList } from "@/app/(tabs)/listAnalyzer";

function ListAnalysisResults() {
    const route = useRoute<RouteProp<ListAnalyzerRootStackParamList, "ListAnalysisResults">>();
    const { armyList } = route.params;

    return (
        <View></View>
    )
}

export default ListAnalysisResults;