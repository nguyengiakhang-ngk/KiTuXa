/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeComponent from "../screens/HomeComponent";
import PersonalComponent from "../screens/PersonalComponent";
const Tab = createBottomTabNavigator();
const TabScreen = () => {
    return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeComponent}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Personal"
                    component={PersonalComponent}
                    options={{ headerShown: false }}
                />
            </Tab.Navigator>
    );
}
export default TabScreen;
