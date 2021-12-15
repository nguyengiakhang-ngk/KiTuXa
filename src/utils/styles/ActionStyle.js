import { StyleSheet } from "react-native";
import { color_primary } from "../theme/Color";

export const actionButton = StyleSheet.create({
    btn: {
        width: '100%',
        borderRadius: 25,
        backgroundColor: color_primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18
    }
});

export const actionTitle = StyleSheet.create({
    titleBtn:{
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'serif',
    },
    textWhite: {
        color: "white"
    },
});
