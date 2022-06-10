import React from "react";
import moment from "moment"
import { StyleSheet, Text, View } from "react-native";

const TableDateCustom = ({ date = "" }) => {
    return (
        <View style={style.tableDate}>
            <Text style={style.tableDateDay}>{moment(date).format("DD/MM/YYYY")}</Text>
            <Text style={style.tableDateTime}>{moment(date).format("HH:mm:ss")}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    tableDate: {},
    tableDateDay: {
        textAlign: "center"
    },
    tableDateTime: {
        textAlign: "center"
    }

})

export default TableDateCustom;