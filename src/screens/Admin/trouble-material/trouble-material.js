import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
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
import ItemTroubleMaterial from './item-trouble-material';
import FormSelect from '../../../components/FormSelect';
import Header from '../../../components/Header';
import { troubleMaterialAPI } from '../../../api/trouble-material.api';

export default function TroubleMaterial({ navigation }) {

    const title = "Báo cáo sự cố";
    const [troubles, setTroubles] = useState([]);
    const fetchTroubles = async () => {
        try {
            const { data } = await troubleMaterialAPI.get();
            setTroubles(data);
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        fetchTroubles();
    }, []);

    navigation.addListener('focus', () => {
        fetchTroubles();
    });

    return (
        <SafeAreaView
            style={{
                height: "100%"
            }}
        >
            <Header>{title}</Header>
            <View style={{
                padding: 10
            }}>
                <FlatList data={troubles} renderItem={({ item }) => <ItemTroubleMaterial item={item} navigation={navigation} />} keyExtractor={(item, index) => index.toString()} />
            </View>
        </SafeAreaView>
    )
}
