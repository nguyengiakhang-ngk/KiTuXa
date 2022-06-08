import React, { Component, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppButton from "../../../components/AppButton";
import AppDialogSelect from "../../../components/AppDialogSelect";
import FormInput from "../../../components/FormInput";
import Header from "../../../components/Header";

export default function BookTicket() {

    const [rooms, setRooms] = useState([]);
    const [value, setValue] = useState({ room: "", prepayment: "", note: "" });

    const handleBookTicket = () => {
        console.log(value);
    }

    const changePrepayment = e => {
        setValue({
            ...value,
            prepayment: e
        })
    }

    const changeNote = e => {
        setValue({
            ...value,
            note: e
        })
    }

    return (
        <SafeAreaView
            style={
                [
                    {
                        flex: 1,
                        paddingBottom: 60
                    },
                ]}
        >
            <Header >Đặt phòng</Header>
            <View style={style.container}>
                <AppDialogSelect
                    lable={'Phòng:'}
                    data={rooms}
                    placeholder={'Vui lòng chọn phòng...'}
                    value={value.room}
                    field={'Phong'}
                    style={style.row}
                />
                <FormInput
                    lable={'Số tiền đặt cọc:'}
                    style={style.row}
                    value={value.prepayment + ""}
                    onChangeText={changePrepayment}
                />
                <FormInput
                    lable={'Ghi chú:'}
                    style={style.row}
                    value={value.note}
                    onChangeText={changeNote}
                />
                <AppButton
                    disabled={false}
                    onPress={handleBookTicket}
                    title="Đặt phòng"
                />
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 10
    },
    row: {
        marginBottom: 10
    }
})