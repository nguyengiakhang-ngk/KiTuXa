import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from "@rneui/base";
import TableDateCustom from '../../../components/TableDate';
export default function ItemTroubleMaterial({ item, navigation }) {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                borderRadius: 5,
                padding: 10,
                backgroundColor: "white"
            }}
        >
            <View style={{
                maxWidth: "30%"
            }}>
                <Text>{item.nameMaterial}</Text>
            </View>
            <View>
                <TableDateCustom date={item.createdAt} />
            </View>
            <View>
                <TableDateCustom date={item.updatedAt} />
            </View>
            <View>
                <TouchableOpacity
                    style={[
                        { marginRight: 10 }
                    ]}
                    onPress={() => navigation.navigate("troublemateialview", {report: item})}
                >
                    <Icon
                        name={"eye"}
                        type='font-awesome-5'
                        size={22}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}