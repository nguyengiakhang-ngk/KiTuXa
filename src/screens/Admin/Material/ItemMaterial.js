import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, } from 'react-native';
import { materialTypeAPI } from '../../../api/material-type.api';
import { uploadAPI } from '../../../api/uploadAPI';
import {
    background_color,
    flex,
    font,
    text_size,
    width
} from "../../../utils/styles/MainStyle";
import { color_danger, color_success } from "../../../utils/theme/Color";
import { Icon } from "@rneui/base";
import { PATH } from '../../../constant/define';
import TableDateCustom from '../../../components/TableDate';
const ItemMaterial = ({ item, callback, navigation }) => {

    const confirmDelete = () => {
        Alert.alert(
            "Loại vật chất",
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

    const viewEdit = () => {
        navigation.navigate("materialtypeview", { id: item.id })
    }

    const handleDelete = async () => {
        try {
            const { data } = await materialTypeAPI.delete(item.id)
            if (data.status) {
                Alert.alert("Xóa thành công!")
                callback();
                uploadAPI.removeImage(item.media, "materialType")
            } else {
                Alert.alert("Xóa thất bại !");
            }
        } catch (error) {
            Alert.alert(error.message)
        }
        return false
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
            <View >
                <Image source={{ uri: PATH.MATERIAL + item.media }}
                    style={{ width: 100, height: 100 }} />
            </View>
            <View>
                <Text
                    style={[
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
            <View
                style={[
                    flex.flex_row
                ]}
            >
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
                <TouchableOpacity
                    onPress={viewEdit}
                >
                    <Icon
                        name={"pencil-alt"}
                        type='font-awesome-5'
                        size={22}
                        color={color_success}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemMaterial;