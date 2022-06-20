import { FlatList, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import FormSelect from "../../../components/FormSelect";
import ItemViewMaterialInRoom from "./item-view-material-in-room";
import { materialAPI } from "../../../api/material.api";
import ModalMoveMaterial from "./modal-move-material";
export default function ViewMaterialInRoom({ navigation }) {
    const title = "Xem chi tiết vật chất trong phòng";
    const [room, setRoom] = useState("");
    const [material, setMaterial] = useState("");
    const [materials, setMaterials] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [detailMaterial, setDetailMaterial] = useState([]);
    const [openReport, setOpenReport] = useState(false);
    const [selected, setSelected] = useState();
    const [openMoveMaterial, setOpenMoveMaterial] = useState(false)
    const fetchRooms = async () => {
        try {
            const { data } = await materialAPI.getRoomAdmin();
            let tmp = [{ key: "", label: "--- Chọn phòng ---" }];
            data.forEach((item) => {
                tmp.push({
                    key: item?.id,
                    label: item.roomName,
                });
            });
            setRooms(tmp);
        } catch (error) {
            alert(error.message);
        }
    }

    const fetchMaterials = async () => {
        try {
            const { data } = await materialAPI.get();
            let tmp = [{ key: "", label: "--- Tất cả ---" }];
            data.forEach((item) => {
                tmp.push({
                    key: item?.id,
                    label: item.name,
                });
            });
            setMaterials(tmp);
        } catch (error) {
            alert(error);
        }
    }

    const fetchDetailMaterials = async () => {
        try {
            if (room) {
                const { data } = await materialAPI.getAllDetailMaterial(room, +material > 0 ? material : undefined);
                setDetailMaterial(data);
            } else {
                setDetailMaterial([])
            }

        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        if (room) {
            fetchDetailMaterials();
        } else {
            setDetailMaterial([]);
        }

    }, [room, material])

    const fetchData = () => {
        fetchRooms();
        fetchMaterials();
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleOpenMoveMaterial = () => {
        setOpenMoveMaterial(true);
    }

    navigation.addListener('focus', () => {
        fetchData();
        setDetailMaterial([])
    });
    return (
        <SafeAreaView>
            <Header>Xem chi tiết vật chất trong phòng</Header>
            <View style={{ padding: 10 }}>
                <FormSelect data={rooms} label="Phòng" onChange={(option) => setRoom(option.key)}></FormSelect>
            </View>
            <View style={{ padding: 10 }}>
                <FormSelect data={materials} label="Vật chất" onChange={(option) => setMaterial(option.key)}></FormSelect>
            </View>
            <ModalMoveMaterial open={openMoveMaterial} close={() => setOpenMoveMaterial(false)} />
            <View style={{
                padding: 10
            }}>
                <FlatList data={detailMaterial} renderItem={({ item }) => <ItemViewMaterialInRoom item={item} navigation={navigation} material={material} openModalMoveMaterial={(item) => handleOpenMoveMaterial(item)} />} keyExtractor={(item, index) => index.toString()} />
            </View>
        </SafeAreaView>
    )
}