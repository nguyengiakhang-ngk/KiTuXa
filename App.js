  /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {Provider} from "react-redux";
import {store} from "./src/redux/store";
import {
  StyleSheet,
  View,LogBox
} from 'react-native';
  import StackScreen from './src/navigators/StackScreen'
// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);
 
//Ignore all log notifications
LogBox.ignoreAllLogs();
const App: () => Node = () => {
  return (
      <View style={styles.container}>
          <Provider store={store}>
              <StackScreen/>
          </Provider>
      </View>
  );
};

  const styles = StyleSheet.create({
      container:{
          flex:1,
          backgroundColor: 'white'
      }
  })

export default App;
