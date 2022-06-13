import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import AppFAB from "../../../components/AppFAB";
import {
    background_color,
    font,
    height,
    position,
    text_size,
} from "../../../utils/styles/MainStyle";
import { color_primary } from "../../../utils/theme/Color";
import { billMaterialAPI } from "../../../api/bill-material.api";
import ItemBillMaterial from "./ItemBillMaterial";
import Header from "../../../components/Header";

const BillMaterial = ({ navigation }) => {
    const [bills, setBills] = useState([]);
    const fetchBill = async () => {
        try {
            const { data } = await billMaterialAPI.getAllAdmin();
            setBills(data);
        } catch (error) {

        }
    }
    navigation.addListener('focus', () => {
        fetchBill();
    });

    useEffect(() => {
        fetchBill();
    }, [])

    return (

        <SafeAreaView
            style={[
                { flex: 1 },
                height.h_100,
                position.relative,
                background_color.white
            ]}
        >
            <Header >Hóa đơn vật chất</Header>
            <ScrollView
                style={{ flex: 1, padding: 10 }} contentContainerStyle={{ flexGrow: 1 }}
                nestedScrollEnabled
            >
                {bills.length > 0 ? <FlatList data={bills} n renderItem={({ item }) => <ItemBillMaterial item={item} callback={() => { }} navigation={navigation} />} keyExtractor={(item, index) => index.toString()} /> : <Text style={[
                    font.serif, text_size.sm
                ]}>Hiện tại không có hóa đơn !</Text>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default BillMaterial;