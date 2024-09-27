import * as React from 'react';
import ListAnalyzer from '../src/pages/ListAnalyzer';
import ListAnalysisResults from '../src/pages/ListAnalysisResults';
import { createStackNavigator } from '@react-navigation/stack';
import ArmyList from '../src/utilities/armyList/ArmyList';

export type ListAnalyzerRootStackParamList = {
  ListAnalyzer: undefined;
  ListAnalysisResults: { armyList: ArmyList };
};

const Stack = createStackNavigator<ListAnalyzerRootStackParamList>();

function ListAnalyzerStack() {
  return (
    <Stack.Navigator initialRouteName="ListAnalyzer">
        <Stack.Screen
          name="ListAnalyzer"
          component={ListAnalyzer}
          options={{
            title: 'List Analzyer',
          }} 
        />
        <Stack.Screen
          name="ListAnalysisResults"
          component={ListAnalysisResults}
          options={{
            title: 'List Analysis Results',
          }} 
        />
    </Stack.Navigator>
  )
}

export default ListAnalyzerStack;