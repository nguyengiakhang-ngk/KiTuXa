/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Admin/Container/HomeScreen";
import PersonalScreen from "../screens/Admin/Container/PersonalScreen";
import NotificationScreen from "../screens/Admin/Container/NotificationScreen";
import CommentScreen from "../screens/Admin/Container/CommentScreen";
import {color_primary, color_secondary} from "../utils/theme/Color";
import AppItemTabs from "../components/AppItemTabs";
import {View} from "react-native";
import {background_color} from "../utils/styles/MainStyle";
const Tab = createBottomTabNavigator();
const TabScreen = () => {
    return (
        <Tab.Navigator
            screenOptions = {{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    left: 10,
                    right: 10,
                    bottom: 10,
                    borderRadius: 15,
                    background_color: 'white',
                    height: 60,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 5
                    },
                    shadowOpacity: 0.36,
                    shadowRadius: 6.68,
                    elevation: 11
                }
            }}

        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <AppItemTabs
                            name='home'
                            color = {focused ? color_primary : color_secondary}
                            label={'Trang chủ'}
                            size={20}
                            text_size = {12}
                        />
                    )
            }}

            />
            <Tab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <AppItemTabs
                            name='bell'
                            color = {focused ? color_primary : color_secondary}
                            label={'Thông Báo'}
                            size={20}
                            text_size = {12}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Qrcode"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View
                            style={[
                                background_color.primary,
                                {
                                    borderRadius: 10,
                                    padding: 10
                                }
                            ]}
                        >
                            <AppItemTabs
                                name='qrcode'
                                color = { 'white' }
                                size={25}
                            />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Comment"
                component={CommentScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <AppItemTabs
                            name='comments'
                            color = {focused ? color_primary : color_secondary}
                            label={'Góp ý'}
                            size={20}
                            text_size = {12}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Personal"
                component={PersonalScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <AppItemTabs
                            name='user'
                            color = {focused ? color_primary : color_secondary}
                            label={'Cá Nhân'}
                            size={20}
                            text_size = {12}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}
export default TabScreen;
