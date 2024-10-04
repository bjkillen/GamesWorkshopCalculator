import { Tabs } from 'expo-router';
import React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function TabLayout() {
  return (
    <PaperProvider theme={theme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors['light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Matchup Calculator',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'dice' : 'dice-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="listAnalyzer"
          options={{
            title: 'List Analyzer',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
