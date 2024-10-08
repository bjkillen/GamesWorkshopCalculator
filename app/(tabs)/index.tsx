import * as React from 'react';

import { AppRegistry } from 'react-native';
import { expo } from '../../app.json';
import MatchupCalculator from '../src/pages/MatchupCalculator';

export default function Main() {
  return (
    <MatchupCalculator />
  );
}

AppRegistry.registerComponent(expo.name, () => Main);