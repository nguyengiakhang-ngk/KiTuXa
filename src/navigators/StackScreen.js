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
import WelComeScreen from '../screens/WelComeScreen';
import LoginScreen from '../screens/Authentication/LoginScreen'
import TabScreen from "./TabScreen";
import AreaListScreen from "../screens/Admin/Area/AreaListScreen";
import AddAreaScreen from "../screens/Admin/Area/AddAreaScreen";
import UpdateAreaScreen from "../screens/Admin/Area/UpdateAreaScreen";
import RoomTypeListScreen from "../screens/Admin/RoomType/RoomTypeListScreen";
import AddRoomTypeScreen from "../screens/Admin/RoomType/AddRoomTypeScreen";
import TabScreenService from "./TabScreenService";
import TabUserScreen from "./TabUserScreen";
import UpdateRoomTypeScreen from "../screens/Admin/RoomType/UpdateRoomTypeScreen";
import SignUpScreen from "../screens/Authentication/SignUpScreen";
import ContractScreen from '../screens/Admin/Contract/ContractScreen';
import AddContract from '../screens/Admin/Contract/AddContract';
import SavedRoom from '../screens/User/Container/SavedRoomScreen';
import RoomBookedListScreen from '../screens/User/RoomBooked/RoomBookedListScreen';
import HomeScreen from '../screens/Admin/Container/HomeScreen'
const Stack = createNativeStackNavigator();
const StackScreen: () => Node = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Welcome"
                    component={WelComeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Tab"
                    component={TabScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TabUser"
                    component={TabUserScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TabService"
                    component={TabScreenService}
                    options={{ headerShown: false }}
                />
                {/* Home admin */}
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AreaList"
                    component={AreaListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddArea"
                    component={AddAreaScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UpdateArea"
                    component={UpdateAreaScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="RoomTypeList"
                    component={RoomTypeListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddRoomType"
                    component={AddRoomTypeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UpdateRoomType"
                    component={UpdateRoomTypeScreen}
                    options={{ headerShown: false }}
                />

                {/* Contract Stack Screen */}
                <Stack.Screen
                    name="ContractScreen"
                    component={ContractScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddContract"
                    component={AddContract}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SavedRoom"
                    component={SavedRoom}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="RoomBookedList"
                    component={RoomBookedListScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default StackScreen;
