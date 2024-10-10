import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ArmyList from '../src/utilities/armyList/ArmyList';
import MatchupAnalyzer from '../src/pages/MatchupAnalyzer';
import EnterOpponentsList from '../src/pages/EnterOpponentsList';
import MatchupAnalysisResults from '../src/pages/MatchupAnalysisResults';

export type MatchupAnalyzerRootStackParamList = {
    MatchupAnalyzer: undefined;
    EnterOpponentsList: { myArmyList: ArmyList };
    MatchupAnalysisResults: { myArmyList: ArmyList, opponentsArmyList: ArmyList };
};

const Stack = createStackNavigator<MatchupAnalyzerRootStackParamList>();

function MatchupAnalyzerStack() {
    return (
        <Stack.Navigator initialRouteName="MatchupAnalyzer">
            <Stack.Screen
                name="MatchupAnalyzer"
                component={MatchupAnalyzer}
                options={{
                    title: 'Matchup Analyzer',
                }} 
            />
            <Stack.Screen
                name="EnterOpponentsList"
                component={EnterOpponentsList}
                options={{
                    title: 'Enter Opponents List',
                }} 
            />
            <Stack.Screen
                name="MatchupAnalysisResults"
                component={MatchupAnalysisResults}
                options={{
                    title: 'Matchup Analysis Results',
                }} 
            />
        </Stack.Navigator>
    )
}

export default MatchupAnalyzerStack;