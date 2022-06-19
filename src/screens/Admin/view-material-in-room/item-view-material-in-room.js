import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import TableDateCustom from "../../../components/TableDate";
import { Icon } from "@rneui/base";
import { color_danger, color_primary, color_secondary, color_success } from "../../../utils/theme/Color";
export default function ItemViewMaterialInRoom({ item, navigation, openModalMoveMaterial }) {
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
                <TableDateCustom date={item.updatedAt} />
            </View>
            <View style={{display:"flex", flexDirection:"row"}}>
                <TouchableOpacity
                    style={[
                        { marginRight: 10 }
                    ]}
                    onPress={() =>navigation.navigate("detailmaterialview", { id: item.id })}
                >
                    <Icon
                        name={"eye"}
                        type='font-awesome-5'
                        size={22}
                        color={color_success}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        { marginRight: 10 }
                    ]}
                    onPress={() => navigation.navigate("troublemateialview", { report: item })}
                >
                    <Icon
                        name={"bug"}
                        type='font-awesome-5'
                        size={22}
                        color={color_danger}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        { marginRight: 10 }
                    ]}
                    onPress={() => openModalMoveMaterial(item)}
                >
                    <Icon
                        name={"500px"}
                        type='font-awesome-5'
                        size={22}
                        color={color_primary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}