import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text } from "react-native";
import { materialAPI } from "../../../api/material.api";
import Header from "../../../components/Header";
import { font, text_size } from "../../../utils/styles/MainStyle";
import ItemDetailMaterial from "./ItemDetailMaterial";
const DetailMaterial = ({ navigation, route }) => {

    const { id } = route.params;
    const [datas, setDatas] = useState([]);
    const [title, setTitle] = useState("");

    const getMaterial = async () => {
        const { data } = await materialAPI.getById(id)
        setTitle(data.name);
    }

    const fetchData = async () => {
        try {
            const { data } = await materialAPI.getDetailMaterial(id);
            setDatas(data)
        } catch (error) {
            alert(error.message)
        }
    }

    navigation.addListener('focus', () => {
        getMaterial();
        fetchData();
    });

    useEffect(() => {
        getMaterial();
        fetchData();
    }, [id])

    return (
        <SafeAreaView style={{ height: "100%" }}>
            <Header>Vật chất: {title}</Header>
            <ScrollView style={{
                padding: 10,
            }}>
                {datas.length > 0 ? <FlatList data={datas} renderItem={({ item }) => <ItemDetailMaterial item={item} navigation={navigation}/>} /> :
                    <Text style={[
                        font.serif, text_size.lg
                    ]}>Hiện tại không có vật chất nào</Text>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailMaterial;