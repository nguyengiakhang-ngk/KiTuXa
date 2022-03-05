/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import PersonalScreen from "../screens/Admin/Container/PersonalScreen";
import CommentScreen from "../screens/Admin/Container/CommentScreen";
import {View} from "react-native";
import {background_color} from "../utils/styles/MainStyle";
import AppItemTabs from "../components/AppItemTabs";
import {color_primary, color_secondary} from "../utils/theme/Color";
import FreeServiceListScreen from "../screens/Admin/Service/FreeService/FreeServiceListScreen";
import PaidServiceListScreen from "../screens/Admin/Service/PaidService/PaidServiceListScreen";
const Tab = createBottomTabNavigator();
const TabScreenService = () => {
    return (
        <Tab.Navigator
            screenOptions = {{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    left: 5,
                    right: 5,
                    top: 5,
                    borderRadius: 5,
                    background_color: 'white',
                    height: 40,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 5
                    },
                    shadowOpacity: 0.36,
                    shadowRadius: 6.68,
                    elevation: 11
                },
                tabBarLabelStyle: {
                    fontSize: 16,
                    fontFamily: 'serif',
                    textTransform: 'uppercase'
                }
            }}

        >
            <Tab.Screen
                name="ServiceFree"
                component={FreeServiceListScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <AppItemTabs
                            color = {focused ? color_primary : color_secondary}
                            label={'Dịch vụ miễn phí'}
                            text_size = {16}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="ServicePaid"
                component={PaidServiceListScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <AppItemTabs
                            color = {focused ? color_primary : color_secondary}
                            label={'Dịch vụ có phí'}
                            text_size = {16}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}
export default TabScreenService;
