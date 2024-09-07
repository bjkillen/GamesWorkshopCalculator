import * as React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

import { AppRegistry } from 'react-native';
import { expo } from '../../app.json';
import App from './App';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => Main);