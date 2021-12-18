/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelComeComponent from '../screens/WelComeComponent';
import LoginComponent from '../screens/LoginComponent'
import TabScreen from "./TabScreen";
const Stack = createNativeStackNavigator();
const StackScreen: () => Node = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Welcome"
                    component={WelComeComponent}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginComponent}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Tab"
                    component={TabScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default StackScreen;
