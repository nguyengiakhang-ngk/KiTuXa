import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import AppFAB from "../../../components/AppFAB";
import {
    background_color,
    height,
    position,
} from "../../../utils/styles/MainStyle";
import { color_primary } from "../../../utils/theme/Color";
import { billMaterialAPI } from "../../../api/bill-material.api";
import ItemBillMaterial from "./ItemBillMaterial";

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
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </ScrollView>
        </SafeAreaView>
        // <SafeAreaView
        //     style={[
        //         { flex: 1, padding: 2, paddingLeft: 10, paddingRight: 10, paddingBottom: 15 },
        //         height.h_100,
        //         position.relative,
        //         background_color.white
        //     ]}
        // >
        //     <ScrollView
        //         style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}
        //         nestedScrollEnabled
        //     >
        //         <FlatList data={bills} renderItem={({ item }) => <ItemBillMaterial item={item} callback={() => { }} navigation={navigation} />} keyExtractor={(item, index) => index.toString()} />
        //     </ScrollView>
        // </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
});

export default BillMaterial;