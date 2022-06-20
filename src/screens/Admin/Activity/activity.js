/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { eventMaterialAPI } from "../../../api/event-material.api";
import Header from "../../../components/Header";
import ItemActivity from "./item-activity";
export default function Activity({navigation}) {
    const title = "Hoạt động";
    const [events, setEvents] = useState([]);
    const fetchEvents = async () => {
        try {
            const { data } = await eventMaterialAPI.get();
            setEvents(data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchEvents();
    }, [])
    return (
        <SafeAreaView>
            <Header>{title}</Header>
            <View style={{
                padding: 10
            }}>
                {events.length > 0 ? <FlatList data={events} renderItem={({ item }) => <ItemActivity item={item} callback={() => fetchMaterials()} navigation={navigation} />} keyExtractor={(item, index) => index.toString()} /> :
                    <Text>Hiện tại không có hoạt động</Text>}
            </View>
        </SafeAreaView>
    )
}