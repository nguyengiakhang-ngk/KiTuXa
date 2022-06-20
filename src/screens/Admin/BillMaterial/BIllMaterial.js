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
import FormSelect from "../../../components/FormSelect"

const types = [
    {
        key: "",
        label: "Tất cả"
    },
    {
        key: "import",
        label: "Nhập"
    },
    {
        key: "export",
        label: "Xuất"
    }
]

const BillMaterial = ({ navigation }) => {
    const [bills, setBills] = useState([]);
    const [kind, setKind] = useState("")
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

    const fetchBillByKind = async () => {
        try {
            const { data } = await billMaterialAPI.getAllAdminByKind(kind);
            setBills(data);
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        if (kind === "") {
            fetchBill();
        } else {
            fetchBillByKind();
        }

    }, [kind])

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
            <View>
                <FormSelect data={types} onChange={op => setKind(op.key)}></FormSelect>
            </View>
            {bills.length > 0 ? <FlatList data={bills} n renderItem={({ item }) => <ItemBillMaterial item={item} callback={() => { }} navigation={navigation} />} keyExtractor={(item, index) => index.toString()} /> : <Text style={[
                font.serif, text_size.sm
            ]}>Hiện tại không có hóa đơn !</Text>}
        </SafeAreaView>
    )
}

export default BillMaterial;