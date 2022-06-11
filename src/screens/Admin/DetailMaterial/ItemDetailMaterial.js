import { Icon } from "@rneui/base";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { color_success } from "../../../utils/theme/Color";
import { background_color } from "../../../utils/styles/MainStyle";
import { PATH } from "../../../constant/define";
import TableDateCustom from "../../../components/TableDate";
const ItemDetailMaterial = ({ item, navigation }) => {
    const onView = () => {
        navigation.navigate("detailmaterialview", { id: item.id });
    }
    return (
        <View
            style={[
                {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                    marginBottom: 5,
                }, background_color.light
            ]}>
            <View >
                <Image source={{ uri: PATH.MATERIAL + item?.qr }}
                    style={{ width: 100, height: 100 }} />
            </View>
            <Text style={{
                marginLeft: 10
            }}>Tình trạng: {item?.status}</Text>
            <View style={{
                marginLeft: "auto",
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
                <TableDateCustom date={item?.createdAt} />
                <TouchableOpacity
                    style={{
                        marginLeft: 10
                    }}
                    onPress={onView}
                >
                    <Icon
                        name={"eye"}
                        type='font-awesome-5'
                        size={22}
                        color={color_success}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemDetailMaterial;