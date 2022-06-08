import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { color_light, color_primary } from "../utils/theme/Color";

export default function ({ children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color_primary,
        padding: 10
    },
    title: {
        fontSize: 24,
        color: color_light
    }
})
