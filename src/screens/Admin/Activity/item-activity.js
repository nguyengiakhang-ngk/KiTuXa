/* eslint-disable prettier/prettier */
import React from "react";
import { Text, View } from "react-native";
import TableDateCustom from "../../../components/TableDate";
import { background_color, flex, font, text_size } from "../../../utils/styles/MainStyle";
export default function ItemActivity({ item }) {
    return (
        <View style={[
            {
                width: "100%",
                maxWidth: "100%",
                marginTop: 10,
                padding: 5,
                borderRadius: 5
            },
            background_color.light,
            flex.flex_row,
            flex.justify_content_between,
            flex.align_items_center
        ]}>
            <View>
                <Text style={[
                    { maxWidth: 100 },
                    text_size.xs,
                    font.serif,
                    { marginLeft: 4, marginBottom: -1 }
                ]}
                >Tên hoạt động: {item.nameEvent}</Text>
            </View>
            <View>
                <Text style={[
                    { maxWidth: 100 },
                    text_size.xs,
                    font.serif,
                    { marginLeft: 4, marginBottom: -1 }
                ]}
                >Tên vật chất: {item.nameMaterial}</Text>
            </View>
            <View>
                <Text style={[
                    { maxWidth: 100 },
                    text_size.xs,
                    font.serif,
                    { marginLeft: 4, marginBottom: -1 }
                ]}
                >Từ: {item.roomFrom}</Text>
                <Text style={[
                    { maxWidth: 100 },
                    text_size.xs,
                    font.serif,
                    { marginLeft: 4, marginBottom: -1 }
                ]}
                >Đến: {item.roomTo}</Text>
            </View>
            <View>
                <TableDateCustom date={item.createdAt} />
            </View>
        </View>
    )
}