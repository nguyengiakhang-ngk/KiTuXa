import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    flex, font,
    height, position, text_size,
    width
} from "../../../utils/styles/MainStyle";

import ImagePicker from 'react-native-image-crop-picker';
import { Icon } from "@rneui/base";
import { color_primary, color_success } from "../../../utils/theme/Color";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import FormInput from '../../../components/FormInput';
import { uploadAPI } from '../../../api/uploadAPI';
import { materialTypeAPI } from "../../../api/material-type.api"
import { PATH } from '../../../constant/define';
const MaterialTypeView = ({ navigation, route }) => {
    const { id } = route.params;
    const initMaterialType = {
        name: "",
        media: "",
    }
    const [materialType, setMaterialType] = useState(initMaterialType);
    const [image, setImage] = useState()
    const [file, setFile] = useState()
    const [isChangeFile, setIsChangeFile] = useState(false);

    const submit = async () => {
        try {
            if (checkValue()) {
                let payload = { ...materialType }
                if (isChangeFile) {
                    const upload = await uploadImage();
                    if (upload?.name) {
                        uploadAPI.removeImage(materialType.media, "materialType");
                        payload = { ...payload, media: upload?.name }
                    }
                }
                payload = { ...payload, updatedAt: new Date() }
                const { data } = await materialTypeAPI.update(payload);
                if (data?.error) {
                    Alert.alert(data?.message);
                } else {
                    Alert.alert("Cập nhật thành công !");
                    navigation.goBack();

                }
            }
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    const checkValue = () => {
        if (materialType.name.length === 0) {
            alert("Vui lòng nhập tên !")
            return false
        }
        return true
    }

    const uploadImage = async () => {
        try {
            const { data } = await uploadAPI.uploadImage(file);
            return data;
        } catch (error) {
            alert(error.message)
            return
        }
    }

    const fetchMaterialType = async () => {
        try {
            const { data } = await materialTypeAPI.getById(id);
            setMaterialType({
                ...data,
                nameOld: data.name
            })
            setImage(PATH.MATERIAL + data?.media)
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    useEffect(() => {
        fetchMaterialType()
    }, [id])

    const chooseImage = () => {
        ImagePicker.openPicker({
            multiple: false,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            compressImageQuality: 0.8,
            maxFiles: 1,
            mediaType: "any",
            includeBase64: true,
        }).then(async (res) => {
            setImage(res.path)
            const file = {
                uri: res.path,
                type: res.mime,
                name: res.filename || "tmp.png",
            }
            setFile(file)
            setIsChangeFile(true)
        }).catch(error => alert('Error: ', error.message));
    }

    return (
        <SafeAreaView
            style={[
                { flex: 1 },
                height.h_100,
                position.relative,
                background_color.white
            ]}
        >
            <ScrollView
                style={{ flex: 1, padding: 10 }} contentContainerStyle={{ flexGrow: 1 }}
                nestedScrollEnabled
            >
                <FormInput lable={"Tên loại vật chất"} value={materialType.name} onChangeText={e => setMaterialType({ ...materialType, name: e })} />
                <View
                    style={[
                        width.w_100,
                        { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                    ]}
                >
                    <TouchableOpacity
                        style={[
                            width.w_100,
                            flex.flex_row,
                            flex.align_items_center,
                        ]}
                        onPress={() => chooseImage()}
                    >
                        <Icon
                            name='plus-circle'
                            type='font-awesome-5'
                            size={20}
                            color={color_success}
                        />
                        <Text
                            style={[
                                text_size.sm,
                                font.serif,
                                {
                                    marginLeft: 3
                                }
                            ]}
                        >
                            Chọn ảnh:
                        </Text>
                    </TouchableOpacity>
                    {image && <View
                        style={[
                            width.w_100,
                            flex.flex_row,
                            flex.flex_wrap,
                            flex.justify_content_between,
                            {
                                marginTop: 5
                            }
                        ]}
                    >
                        <Image
                            source=
                            {{ uri: image }}
                            style={{
                                width: '100%',
                                height: 300,
                                borderRadius: 5,
                                overflow: 'hidden',
                            }}
                        />
                    </View>}
                </View>
                <View style={{
                    marginTop: 10
                }}>
                    <AppButtonActionInf
                        size={10}
                        textSize={16}
                        bg={color_primary}
                        onPress={submit}
                        title="Cập nhật"
                    />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default MaterialTypeView