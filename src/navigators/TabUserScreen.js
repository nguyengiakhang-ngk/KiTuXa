import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/User/Container/HomeScreen";
import PersonalScreen from "../screens/User/Container/PersonalScreen";
import NotificationScreen from "../screens/User/Container/NotificationScreen";
import SearchScreen from "../screens/User/Container/SearchScreen";
import {color_primary, color_secondary} from "../utils/theme/Color";
import AppItemTabs from "../components/AppItemTabs";
import {View} from "react-native";
import {background_color} from "../utils/styles/MainStyle";
const Tab = createBottomTabNavigator();
const TabUserScreen = () => {
    return (
        <Tab.Navigator
            screenOptions = {{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    left: 10,
                    right: 10,
                    bottom: 10,
                    borderRadius: 30,
                    background_color: 'white',
                    height: 50,
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
                name="Search"
                component={SearchScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <AppItemTabs
                            name='search'
                            color = {focused ? color_primary : color_secondary}
                            label={'Tìm kiếm'}
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
export default TabUserScreen;
