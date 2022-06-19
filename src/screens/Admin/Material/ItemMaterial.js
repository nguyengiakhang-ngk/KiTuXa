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
const ItemMaterial = ({ item, callback, navigation }) => {

    const confirmDelete = () => {
        Alert.alert(
            "Vật chất",
            `Bạn có chắc muốn xóa ${item.name} ?`,
            [
                {
                    text: "Đồng ý",
                    onPress: () => handleDelete(),
                },
                {
                    text: "Đóng",
                },
            ])
    }

    const viewDetail = () => {
        navigation.navigate("detailmaterial", { id: item.id })
    }

    const viewEdit = () => {
        navigation.navigate("materialview", { id: item.id })
    }

    const handleDelete = async () => {
        try {
            const { data } = await materialAPI.delete(item?.id);
            if (data.status) {
                Alert.alert("Xóa thành công !")
                callback();
            } else {
                Alert.alert("Xóa thất bại !")
            }
        } catch (error) {
            Alert.alert(error.message)
        }
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
            <View >
                <Image source={{ uri: PATH.MATERIAL + item.media }}
                    style={{ width: 100, height: 100 }} />
            </View>
            <View>
                <Text
                    style={[
                        {maxWidth: 100},
                        text_size.xs,
                        font.serif,
                        { marginLeft: 4, marginBottom: -1 }
                    ]}
                >
                    {item.name}
                </Text>
            </View>
            <View>
                <TableDateCustom date={item.createdAt} />
            </View>
            <View>
                <TouchableOpacity
                    onPress={viewDetail}
                    style={{
                        marginRight: 5,
                        marginBottom:5
                    }}
                >
                    <Icon
                        name={"eye"}
                        type='font-awesome-5'
                        size={22}
                        color={color_primary}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        marginRight: 5,
                        marginBottom:5
                    }}
                    onPress={viewEdit}
                >
                    <Icon
                        name={"pencil-alt"}
                        type='font-awesome-5'
                        size={22}
                        color={color_success}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        { marginRight: 10 }
                    ]}
                    onPress={confirmDelete}
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

export default ItemMaterial;