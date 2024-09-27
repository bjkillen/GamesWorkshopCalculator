import * as React from 'react';
import ListAnalyzer from '../src/pages/ListAnalyzer';
import ListAnalysisResults from '../src/pages/ListAnalysisResults';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function ListAnalyzerStack() {
  return (
    <Stack.Navigator initialRouteName="ListAnalyzerScreen">
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