import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import { materialAPI } from "../../../api/material.api";
import FormSelect from "../../../components/FormSelect";
import Header from "../../../components/Header";
import { font, text_size } from "../../../utils/styles/MainStyle";
import ItemDetailMaterial from "./ItemDetailMaterial";
const DetailMaterial = ({ navigation, route }) => {

    const { id } = route.params;
    const [datas, setDatas] = useState([]);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [statuses, setStatuses] = useState([]);
    const [total, setTotal] = useState([]);
    const getMaterial = async () => {
        const { data } = await materialAPI.getById(id)
        setTitle(data.name);
    }

    const fetStatus = async () => {
        try {
            const { data } = await materialAPI.getStatus();
            const tmp = [{
                key: "",
                label: "Tất cả"
            }]
            data.forEach(item => {
                tmp.push({ key: item.id, label: item.name })
            })
            setStatuses(tmp);
        } catch (error) {
            alert(error.message)
        }
    }

    const fetchData = async () => {
        try {
            if (status === "") {
                const { data } = await materialAPI.getDetailMaterial(id);
                setDatas(data)
                setTotal(data);
            } else {
                const { data } = await materialAPI.getDetailMaterialByStatus(id, status);
                setDatas(data)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    navigation.addListener('focus', () => {
        getMaterial();
        fetchData();
        fetStatus();
    });

    useEffect(() => {
        fetchData();
    }, [status])

    useEffect(() => {
        fetStatus();
        getMaterial();
        fetchData();
    }, [id])
    return (
        <SafeAreaView style={{ height: "100%", paddingBottom: 10 }}>
            <Header>Vật chất: {title} ({total.length})</Header>
            <View style={{ padding: 10, display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <Text style={[
                    text_size.sm
                ]}>Mới: {total.filter(item => item.idStatus === 1).length}</Text>
                <Text style={[
                    text_size.sm
                ]}>Đã qua sử dụng: {total.filter(item => item.idStatus === 2).length}</Text>
                <Text style={[
                    text_size.sm
                ]}>Đang sử dụng: {total.filter(item => item.idStatus === 3).length}</Text>
            </View>
            <View style={{ padding: 10 }}>
                <FormSelect label='Trạng thái' data={statuses} onChange={(option) => setStatus(option.key)} />
            </View>
            <ScrollView style={{
                padding: 10,
            }}>
                {datas.length > 0 ? <FlatList data={datas} renderItem={({ item }) => <ItemDetailMaterial item={item} navigation={navigation} />} /> :
                    <Text style={[
                        font.serif, text_size.lg
                    ]}>Hiện tại không có vật chất nào</Text>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailMaterial;