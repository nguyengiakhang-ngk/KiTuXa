/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
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
import BookTicket from '../screens/User/Container/BookTicket';
import SavedRoom from '../screens/User/Container/SavedRoomScreen';
import RoomBookedListScreen from '../screens/User/RoomBooked/RoomBookedListScreen';
import HomeScreen from '../screens/Admin/Container/HomeScreen';

//Contract
import ContractScreen from '../screens/Admin/Contract/ContractScreen';
import AddContract from '../screens/Admin/Contract/AddContract';
import ContractTerms from "../screens/Admin/Contract/ContractTerms";
import ContractDetail from "../screens/Admin/Contract/ContractDetail";

//Bill
import BillDetails from "../screens/Admin/Bill/BillDetails";
import AddBill from "../screens/Admin/Bill/AddBill";
import BillsComponent from "../screens/Admin/Bill/BillsComponent";
import UpdateBill from "../screens/Admin/Bill/UpdateBill";

//Receipt
import ReceiptComponent from "../screens/Admin/Receipt/ReceiptComponent";
import AddReceipt from "../screens/Admin/Receipt/AddReceipt";
import ReceiptDetails from "../screens/Admin/Receipt/ReceiptDetails";
import UpdateReceipt from "../screens/Admin/Receipt/UpdateReceipt";
import MaterialType from '../screens/Admin/MaterialType/MaterialType';
import MaterialTypeAdd from '../screens/Admin/MaterialType/MaterialTypeAdd';
import MaterialTypeView from '../screens/Admin/MaterialType/MaterialView';
import Material from '../screens/Admin/Material/Material';
import MaterialAdd from '../screens/Admin/Material/MaterialAdd';
import MaterialView from '../screens/Admin/Material/MaterialView';
import InputMaterial from '../screens/Admin/InputMaterial/InputMaterial';
import BillMaterial from '../screens/Admin/BillMaterial/BIllMaterial';
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
                /><Stack.Screen
                    name="ContractDetail"
                    component={ContractDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ContractTerms"
                    component={ContractTerms}
                    options={{ headerShown: false }}
                />

                {/* Bill */}
                <Stack.Screen
                    name="BillsComponent"
                    component={BillsComponent}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BillDetails"
                    component={BillDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddBill"
                    component={AddBill}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UpdateBill"
                    component={UpdateBill}
                    options={{ headerShown: false }}
                />
                {/* Receipt */}
                <Stack.Screen
                    name="ReceiptComponent"
                    component={ReceiptComponent}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddReceipt"
                    component={AddReceipt}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ReceiptDetails"
                    component={ReceiptDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UpdateReceipt"
                    component={UpdateReceipt}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BookTicket"
                    component={BookTicket}
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
                <Stack.Screen
                    name="materialtypeview"
                    component={MaterialTypeView}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="materialtypeadd"
                    component={MaterialTypeAdd}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="materialtype"
                    component={MaterialType}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="materialview"
                    component={MaterialView}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="materialadd"
                    component={MaterialAdd}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="material"
                    component={Material}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="inputmaterial"
                    component={InputMaterial}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="billmaterial"
                    component={BillMaterial}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default StackScreen;
