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
            <Header>Vật chất: {title}</Header>
            <View style={{ padding: 10 }}>
                <FormSelect label='Trạng thái' data={statuses} onChange={(option) => setStatus(option.key)} />
            </View>
            <View style={{padding:10}}>
                {datas.length > 0 ? <FlatList data={datas} renderItem={({ item }) => <ItemDetailMaterial item={item} navigation={navigation} />} /> :
                    <Text style={[
                        font.serif, text_size.lg
                    ]}>Hiện tại không có vật chất nào</Text>}
            </View>
        </SafeAreaView>
    )
}

export default DetailMaterial;