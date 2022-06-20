/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { materialTypeAPI } from '../../../api/material-type.api';
import { materialAPI } from '../../../api/material.api';
import ItemStatisticalMaterial from './ItemStatisticalMaterial';
import FormSelect from '../../../components/FormSelect';
import Header from '../../../components/Header';

const StatisticalMaterial = ({ navigation }) => {
    const [materialTypes, setMaterialTypes] = useState([]);
    const [selected, setSelected] = useState("");
    const [materials, setMaterials] = useState([]);

    const getColumn = id => {
        switch (+id) {
            case 1:
                return "moi";
            case 2:
                return "thanhly";
            case 3:
                return "dangsudung";
            case 4:
                return "chothue";
            case 5:
                return "daban";
            case 6:
                return "hong";
        }
    }


    const fetchMaterials = async () => {
        try {
            if (selected !== "") {
                const { data } = await materialAPI.statisticalByMaterialType(selected);
                console.log(data);
                let tmp = [];
                data.forEach(item => {
                    const index = tmp.findIndex(obj => obj.id === item.id)
                    if (index >= 0) {
                        tmp[index] = {
                            ...tmp[index],
                            [getColumn(item.idStatus)]: item.total
                        }
                    } else {
                        tmp.push({
                            id: item.id,
                            name: item.name,
                            moi: +item.idStatus === 1 ? item.total : 0,
                            thanhly: +item.idStatus === 2 ? item.total : 0,
                            dangsudung: +item.idStatus === 3 ? item.total : 0,
                            chothue: +item.idStatus === 4 ? item.total : 0,
                            daban: +item.idStatus === 5 ? item.total : 0,
                            hong: +item.idStatus === 6 ? item.total : 0
                        })
                    }
                })
                setMaterials(tmp)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        fetchMaterials();
    }, [selected])

    const fetchMaterialTypes = async () => {
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

    useEffect(() => {
        fetchMaterialTypes();
    }, [])
    navigation.addListener('focus', () => {
    });

    const onChangeMaterialType = (option) => {
        setSelected(option.key)
        fetchMaterials()
    }

    return (
        <SafeAreaView
            style={{
                height: "100%"
            }}
        >
            <Header>Thống kê vật chất</Header>
            <View style={{ padding: 10 }}>
                <FormSelect label={"Loại vật chất"} data={materialTypes} onChange={onChangeMaterialType} />
            </View>
            <View style={{
                padding: 10
            }}>
                {materials.length > 0 ? <FlatList data={materials} renderItem={({ item }) => <ItemStatisticalMaterial item={item} callback={() => fetchMaterials()} navigation={navigation} />} keyExtractor={(item, index) => index.toString()} /> :
                    selected !== "" ? <Text>Không có số lượng vật chất để thống kê</Text> : <Text>Chọn loại vật chất cần thống kê</Text>}
            </View>
        </SafeAreaView>
    )
}

export default StatisticalMaterial;