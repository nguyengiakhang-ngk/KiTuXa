import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, } from "react-native";
import { SafeAreaView, } from 'react-native';

import {
    background_color,
    font,
    height,
    position,
    text_size,
} from "../../../utils/styles/MainStyle";
import { billMaterialAPI } from "../../../api/bill-material.api";
import ItemBillMaterial from "./ItemBillMaterial";
import Header from "../../../components/Header";
import ItemDetailBillMaterial from "./ItemDetailBillMaterial";

const BillMaterialView = ({ navigation, route }) => {
    const { id } = route.params;
    const [bills, setBills] = useState([]);
    const fetchBill = async () => {
        try {
            const { data } = await billMaterialAPI.getById(id);
            setBills(data)
        } catch (error) {
            TOAST.EROR(error.message)
        }
    }
    useEffect(() => {
        if (id) {
            fetchBill();
        }
    }, [id]);

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
            <Header >Chi tiết hóa đơn vật chất</Header>
            <ScrollView
                style={{ flex: 1, padding: 10 }} contentContainerStyle={{ flexGrow: 1 }}
                nestedScrollEnabled
            >
                {bills.length > 0 ? <FlatList data={bills} n renderItem={({ item }) => <ItemDetailBillMaterial item={item} callback={() => { }} navigation={navigation} />} keyExtractor={(item, index) => index.toString()} /> :
                    <Text style={[
                        font.serif, text_size.sm
                    ]}>Hiện tại không có hóa đơn !</Text>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default BillMaterialView;