import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { materialAPI } from "../../../api/material.api";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";
import { color_light, color_primary, color_secondary } from "../../../utils/theme/Color";
export default function ModalMoveMaterial({ open, close }) {
    const [room, setRoom] = useState("");
    const [rooms, setRooms] = useState([]);
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

    useEffect(() => {
        fetchRooms()
    }, [])
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={open}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ padding: 10 }}>
                        <FormSelect data={rooms} label="Phòng" onChange={(option) => setRoom(option.key)}></FormSelect>
                    </View>
                    <View style={{ padding: 10 }}>
                        <FormInput lable={"Ghi chú"} numberOfLines={4} value="" />
                    </View>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent:"flex-end",
                        padding: 10
                    }}>
                        <TouchableOpacity onPress={close} style={{
                            backgroundColor: color_primary,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            alignItems: "center",
                            borderRadius: 10
                        }}>
                            <Text style={{ color: color_light }}>Chuyển</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={close} style={{
                            backgroundColor: color_secondary,
                            marginLeft: 10,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            alignItems: "center",
                            borderRadius: 10
                        }}>
                            <Text style={{ color: color_light }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        width: "95%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});