import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, } from 'react-native';
import {
    background_color,
    flex,
    font,
    text_size,
    width
} from "../../../utils/styles/MainStyle";
import { color_danger, color_primary, color_success } from "../../../utils/theme/Color";
import { Icon } from "@rneui/base";
import { PATH } from '../../../constant/define';
import TableDateCustom from '../../../components/TableDate';
import { materialAPI } from '../../../api/material.api';
const ItemStatisticalMaterial = ({ item, callback, navigation }) => {
    const total = (item) => {
        return +item.moi + +item.thanhly + +item.dangsudung + +item.chothue + +item.daban + +item.hong
    }
    return (
        <View
            style={[
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
            ]}
        >
            <View>
                <Text
                    style={[
                        { maxWidth: 100 },
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Vật chất: {item.name}
                </Text>
            </View>
            <View>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Mới: {item.moi}
                </Text>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Thanh lý: {item.thanhly}
                </Text>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Đang sử dụng: {item.dangsudung}
                </Text>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Cho thuê: {item.chothue}
                </Text>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Đã bán: {item.daban}
                </Text>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Hỏng : {item.hong}
                </Text>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Tổng cộng : {total(item)}
                </Text>
            </View>
        </View>
    )
}

export default ItemStatisticalMaterial;