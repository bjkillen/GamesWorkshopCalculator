import { ListAnalyzerRootStackParamList } from "./(tabs)/listAnalyzer";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends ListAnalyzerRootStackParamList { }
    }
}