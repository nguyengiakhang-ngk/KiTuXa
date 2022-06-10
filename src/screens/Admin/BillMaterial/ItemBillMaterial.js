import { background_color, flex, font, text_size, width } from "../../../utils/styles/MainStyle";
import { color_danger } from "../../../utils/theme/Color";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "@rneui/base";
import TableDateCustom from "../../../components/TableDate";

const ItemBillMaterial = ({ item }) => {
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
                    Tổng tiền: {item.total} VNĐ
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
                    <TableDateCustom date={item.createdAt} />
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

export default ItemBillMaterial;