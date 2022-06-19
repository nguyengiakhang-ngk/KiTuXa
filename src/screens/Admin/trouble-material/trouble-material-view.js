import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Header from "../../../components/Header";
import FormSelect from "../../../components/FormSelect";
import { troubleMaterialAPI } from "../../../api/trouble-material.api";
import FormInput from "../../../components/FormInput";
import { flex, font, text_size, width } from "../../../utils/styles/MainStyle";
import { color_primary, color_success } from "../../../utils/theme/Color";
import { Icon } from "@rneui/base";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import { PATH } from "../../../constant/define";
import ImagePicker from 'react-native-image-crop-picker';
const initTrouble = {
    createdAt: "",
    descriptionTroubleMaterial: "",
    idMaterial: "",
    idTroubleMaterial: 1,
    mediaTroubleMaterial: "",
    statusTroubleMaterial: "",
    updatedAt: "",
}

export default function TroubleMaterialView({ navigation, route }) {
    const { material, report } = route.params
    const [src, setSrc] = React.useState("");
    const [file, setFile] = React.useState();
    const [trouble, setTrouble] = React.useState(initTrouble);
    const [types, setTypes] = React.useState([])
    const fetchType = async () => {
        try {
            const { data } = await troubleMaterialAPI.getType();
            let tmp = [];
            data.forEach(item => {
                tmp.push({ key: item.value, label: item.label })
            })
            setTypes(tmp);
        } catch (error) {
            alert(error.message);
        }
    }

    React.useEffect(() => {
        fetchType();
    }, [])

    const fetchReport = async (id) => {
        try {
            const { data } = await troubleMaterialAPI.getOne(id)
            setTrouble(data)
            setSrc(PATH.MATERIAL + data.media)
        } catch (error) {

        }
    }
    React.useEffect(() => {
        if (report) {
            fetchReport(report.idTroubleMaterial)
        }
    }, [report])
    const uploadFile = async () => {
        const { data } = await uploadFileService.uploadImage(file, "material");
        return data
    }
    const submit = async () => {
        try {
            let tmp = {
                ...trouble,
                idMaterial: material?.id
            }
            if (file) {
                const upload = await uploadFile();
                if (upload?.name) {
                    tmp = {
                        ...tmp,
                        mediaTroubleMaterial: upload?.name
                    }
                }
            }
            const { data } = await troubleMaterialAPI.create(tmp);
            if (data[1] > 0) {
                alert("Report success !");
                close();
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const onChangeType = (option) => {
        setTrouble({ ...trouble, statusTroubleMaterial: option.key })
    }

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
            setSrc(res.path)
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
        <SafeAreaView style={{ height: "100%" }}   >
            <Header>Sự cố vật chất</Header>
            <ScrollView style={{ padding: 10 }}
            >
                <FormSelect label='Mức độ' data={types} onChange={onChangeType} selectedKey={trouble?.statusTroubleMaterial} />
                <FormInput numberOfLines={4} lable={"Mô tả"} value={trouble.descriptionTroubleMaterial} onChangeText={e => setTrouble({ ...trouble, descriptionTroubleMaterial: e })} />
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
                    {src.length > 0 && <View
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
                            {{ uri: src }}
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
                        title="Gửi"
                    />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}