import { Icon } from "@rneui/base";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import TableDateCustom from "../../../components/TableDate";
import { formatMoney } from "../../../helps/formatMoney";
import { background_color, flex, font, text_size, width } from "../../../utils/styles/MainStyle";
import { color_primary } from "../../../utils/theme/Color";
const ItemDetailBillMaterial = ({ item }) => {
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
                    Tên: {item.nameMaterial}
                </Text>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Tình trạng: {item.status}
                </Text>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Số lượng: {item.quantity}
                </Text>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Đơn giá: {item.price} VNĐ
                </Text>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    Tổng tiền: {formatMoney(+item.price * +item.quantity)} VNĐ
                </Text>
            </View>
            <View
                style={[
                    flex.flex_row,
                    flex.align_items_center,
                    { marginLeft: "auto" }
                ]}
            >
                <View>
                    <TableDateCustom date={item.createdAt} />
                </View>
            </View>
        </View>
    )
}

export default ItemDetailBillMaterial