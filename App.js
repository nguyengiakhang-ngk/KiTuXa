  /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
  import StackScreen from './src/navigators/StackScreen'

const App: () => Node = () => {
  return (
      <View style={styles.container}>
          <StackScreen/>
      </View>
  );
};

  const styles = StyleSheet.create({
      container:{
          flex:1
      }
  })

export default App;
