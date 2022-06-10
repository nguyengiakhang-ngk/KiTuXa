import { Icon } from "@rneui/base";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { formatMoney } from "../../../helps/formatMoney";
import { background_color, flex, font, text_size, width } from "../../../utils/styles/MainStyle";
import { color_danger, color_success } from "../../../utils/theme/Color";

const ItemInputMaterial = ({ item, materials, statuses, onDelete }) => {
  
    const getNameStatus = () => {
        return statuses.filter(status => status.key === item.status)[0].label;
    }
    const getNameMaterial = () => {
        return materials.filter(material => material.key === item.material)[0].label;
    }
    return (
        <View
            style={[
                width.w_100,
                {
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
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Tên: {getNameMaterial()}
                </Text>
                <Text style={[
                    text_size.xs,
                    font.serif,
                    { marginLeft: 4, marginBottom: -1 }
                ]}>Tình trạng: {getNameStatus()}</Text>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Số lượng: {item.quantity}
                </Text>
                <Text style={[
                    text_size.xs,
                    font.serif,
                    { marginLeft: 4, marginBottom: -1 }
                ]}>Đơn giá: {formatMoney(item.price)} VNĐ</Text>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Thành tiền:{formatMoney(+item.price * +item.quantity)} VNĐ
                </Text>
            </View>
            <View
                style={[
                    flex.flex_row
                ]}
            >
                <TouchableOpacity
                    style={[
                        { marginRight: 10 }
                    ]}
                    onPress={() => onDelete(item)}
                >
                    <Icon
                        name={"trash-alt"}
                        type='font-awesome-5'
                        size={22}
                        color={color_danger}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemInputMaterial;