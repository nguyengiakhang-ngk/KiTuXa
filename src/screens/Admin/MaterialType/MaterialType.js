import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { materialTypeAPI } from '../../../api/material-type.api';
import AppFAB from '../../../components/AppFAB';
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
            <FlatList data={materialTypes} renderItem={({ item }) => <ItemMaterialType item={item} callback={fetchMaterialType} navigation={navigation} />} keyExtractor={(item, index) => index.toString()} />
        </SafeAreaView>
    )
}

export default MaterialType;