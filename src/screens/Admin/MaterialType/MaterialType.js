import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { materialTypeAPI } from '../../../api/material-type.api';
import AppFAB from '../../../components/AppFAB';
import Header from '../../../components/Header';
import {
    background_color,
    height,
    position,
} from "../../../utils/styles/MainStyle";
import { color_primary } from "../../../utils/theme/Color";
import ItemMaterialType from './ItemMaterialType';
const MaterialType = ({ navigation }) => {
    const [materialTypes, setMaterialTypes] = useState([]);
    const fetchMaterialType = async () => {
        try {
            const { data } = await materialTypeAPI.get();
            setMaterialTypes(data);
        } catch (error) {
            alert(error.message);
        }
    }

    navigation.addListener('focus', () => {
        fetchMaterialType();
    });

    useEffect(() => {
        fetchMaterialType();
    }, [navigation]);

    const viewAdd = () => {
        navigation.navigate("materialtypeadd");
    }
    return (
        <SafeAreaView
            style={{
                height: "100%"
            }}
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
            <Header>Loại vật chất ({materialTypes.length})</Header>
            <ScrollView style={{
                padding: 10
            }}>
                <FlatList data={materialTypes} renderItem={({ item }) => <ItemMaterialType item={item} callback={fetchMaterialType} navigation={navigation} />} keyExtractor={(item, index) => index.toString()} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default MaterialType;