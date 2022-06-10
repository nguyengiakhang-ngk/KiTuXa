import React, { useState } from 'react';
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
import { materialTypeAPI } from "../../../api/material-type.api";
import { materialAPI } from "../../../api/material.api";
import FormSelect from '../../../components/FormSelect';
import { PATH } from '../../../constant/define';
const initMaterial = {
    idMaterialType: "",
    name: "",
    media: "",
}

const MaterialView = ({ navigation, route }) => {
    const { id } = route.params;
    const [materialTypes, setMaterialTypes] = useState([]);
    const [material, setMaterial] = useState(initMaterial);
    const [image, setImage] = useState();
    const [file, setFile] = useState();
    const [isChangeFile, setIsChangeFile] = useState(false);

    const uploadFile = async () => {
        const { data } = await uploadAPI.uploadImage(file, "material");
        return data
    }

    const fetchMaterial = async () => {
        try {
            const { data } = await materialAPI.getById(id);
            setMaterial({
                ...data,
                nameOld: data.name
            })

            setImage(PATH.MATERIAL + data.media)
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    const checkValue = () => {
        if (material?.idMaterialType.length === 0) {
            Alert.alert("Vui lòng chọn loại vật chất !");
            return false
        }
        if (material?.name.length === 0) {
            Alert.alert("Vui lòng nhập tên vật chất !");
            return false
        }
        return true
    }

    const submit = async () => {
        try {
            if (checkValue()) {
                let payload = material;
                if (isChangeFile) {
                    const upload = await uploadFile();
                    if (upload?.name) {
                        uploadAPI.removeImage(material.media, "material");
                        payload = { ...payload, media: upload.name };
                    }
                }
                payload = { ...payload, updatedAt: new Date() }
                const { data } = await materialAPI.update(payload);
                if (data?.error) {
                    Alert.alert(data.message)
                } else {
                    Alert.alert("Cập nhật thành công !");
                    navigation.goBack()
                }
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const fetchMaterialType = async () => {
        try {
            const { data } = await materialTypeAPI.get();
            let tmp = [];
            data.forEach(item => {
                tmp.push({ key: item.id, label: item.name })
            })
            setMaterialTypes(tmp);
        } catch (error) {
            alert(error.message);
        }
    }

    navigation.addListener('focus', () => {
        fetchMaterialType();
        fetchMaterial();
    });

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

    const onChangeMaterialType = (option) => {
        setMaterial({
            ...material,
            idMaterialType: option.key
        })
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
                <FormSelect label='Loại vật chất' data={materialTypes} onChange={onChangeMaterialType} selectedKey={material.idMaterialType} />
                <FormInput lable={"Tên vật chất"} value={material.name} onChangeText={e => setMaterial({ ...material, name: e })} />
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

export default MaterialView