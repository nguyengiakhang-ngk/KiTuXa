import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { materialTypeAPI } from '../../../api/material-type.api';
import ModalSelector from 'react-native-modal-selector';
import { materialAPI } from '../../../api/material.api';
import AppFAB from '../../../components/AppFAB';
import {
    background_color,
    height,
    position,
} from "../../../utils/styles/MainStyle";
import { color_primary } from "../../../utils/theme/Color";
import ItemMaterial from './ItemMaterial';
import FormSelect from '../../../components/FormSelect';
const initMaterialType = {
    key: "",
    name: "",
}
const Material = ({ navigation }) => {
    const [materialType, setMaterialType] = useState(initMaterialType)
    const [materialTypes, setMaterialTypes] = useState([]);
    const [materials, setMaterials] = useState([]);

    const fetchMaterialType = async () => {
        try {
            const { data } = await materialTypeAPI.get();
            let tmp = [
                {
                    key: "",
                    label: "Tất cả"
                }
            ];
            data.forEach(item => {
                tmp.push({ key: item.id, label: item.name })
            })
            setMaterialTypes(tmp);
        } catch (error) {
            alert(error.message);
        }
    }

    const fetchMaterial = async (materialType) => {
        try {
            if (materialType?.key === "") {
                const { data } = await materialAPI.get();
                setMaterials(data);
            } else {
                const { data } = await materialAPI.getByIdLoaivatchat(materialType?.key);
                setMaterials(data);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const onChangeMaterialType = (option) => {
        setMaterialType(option)
        fetchMaterial(option);
    }
    navigation.addListener('focus', () => {
        fetchMaterial(initMaterialType);
        fetchMaterialType();
    });

    const viewAdd = () => {
        navigation.navigate("materialadd");
    }
    return (
        <SafeAreaView
            style={[
                { flex: 1, padding: 2, paddingLeft: 10, paddingRight: 10, paddingBottom: 15 },
                height.h_100,
                position.relative,
                background_color.white
            ]}
        >
            <View
                style={[
                    position.absolute,
                    {
                        bottom: 25,
                        right: 25,
                        zIndex: 9999
                    }
                ]}
            >
                <AppFAB
                    bg={color_primary}
                    name='plus'
                    size={20}
                    color={'white'}
                    onPress={viewAdd}
                />
            </View>
            <FormSelect label={"Loại vật chất"} data={materialTypes} onChange={onChangeMaterialType} />
            <FlatList data={materials} renderItem={({ item }) => <ItemMaterial item={item} callback={() => fetchMaterial(initMaterialType)} navigation={navigation} />} keyExtractor={(item, index) => index.toString()} />
        </SafeAreaView>
    )
}

export default Material;