import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView } from "react-native";
import Header from "../../../components/Header";
import FormInput from "../../../components/FormInput";
import { materialAPI } from "../../../api/material.api";
import moment from "moment";
import { PATH } from "../../../constant/define";

const initValue = {
    createdAt: "",
    id: "",
    idDetailBill: 0,
    nameMaterial: "",
    nameMaterialType: "",
    qr: "",
    status: "",
    updatedAt: "",
}

const DetailMaterialView = ({ navigation, route }) => {
    const { id } = route.params;
    const [detailMaterial, setDetailMaterial] = useState(initValue);

    const fetchDetailMaterial = async () => {
        try {
            const { data } = await materialAPI.getDetailMaterialById(id);
            if (data) {
                setDetailMaterial(data)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    navigation.addListener('focus', () => {
        fetchDetailMaterial();
    });

    useEffect(() => {
        if (id) {
            fetchDetailMaterial();
        }
    }, [id])

    return (
        <SafeAreaView style={{
            height: "100%"
        }}>
            <Header>Chi tiết vật chất</Header>
            <ScrollView style={{
                padding: 10
            }}>
                <FormInput editable={false} lable={"Tên loại vật chất"} value={detailMaterial.nameMaterialType} />
                <FormInput editable={false} lable={"Tên vật chất"} value={detailMaterial.nameMaterial} />
                <FormInput editable={false} lable={"Tình trạng"} value={detailMaterial.status} />
                <FormInput editable={false} lable={"Ngày nhập"} value={moment(detailMaterial.createdAt).format("DD/MM/YYYY HH:mm:ss")} />
                <Image
                    source=
                    {{ uri: `${PATH.MATERIAL + detailMaterial.qr}` }}
                    style={{
                        width: 300,
                        height: 300,
                        borderRadius: 5,
                        marginTop: 10
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailMaterialView;