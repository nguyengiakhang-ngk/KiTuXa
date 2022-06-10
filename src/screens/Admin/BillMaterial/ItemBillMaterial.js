import { background_color, flex, font, text_size, width } from "../../../utils/styles/MainStyle";
import { color_danger, color_primary } from "../../../utils/theme/Color";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "@rneui/base";
import TableDateCustom from "../../../components/TableDate";

const ItemBillMaterial = ({ item, navigation }) => {
    const view = () => {
        navigation.navigate("billmaterialview", { id: item.id })
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
            <View
                style={[
                    flex.flex_row,
                    flex.align_items_center,
                    { marginLeft: "auto" }
                ]}
            >
                <View style={{ marginRight: 10 }}>
                    <TableDateCustom date={item.createdAt} />
                </View>
                <TouchableOpacity
                    style={[
                        { marginRight: 10 }
                    ]}
                    onPress={() => view()}
                >
                    <Icon
                        name={"eye"}
                        type='font-awesome-5'
                        size={22}
                        color={color_primary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemBillMaterial;