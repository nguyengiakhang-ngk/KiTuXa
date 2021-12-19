import { StyleSheet } from "react-native";
import {color_danger, color_primary} from "../theme/Color";

export const text_color = StyleSheet.create({
    primary: {
        color: color_primary
    },
    danger: {
        color: color_danger
    },
    white: {
        color: 'white'
    }
});

export const text_size = StyleSheet.create({
    sm: {
        fontSize: 18
    },
    xs: {
        fontSize: 16
    },
    title: {
        fontSize: 35
    },
    small: {
        fontSize: 12
    }
});

export const text_align = StyleSheet.create({
    center: {
        textAlign: 'center'
    }
});
export const font_weight = StyleSheet.create({
    f_500: {
        fontWeight: '500'
    },
    bold: {
        fontWeight: 'bold'
    }
});

export const font = StyleSheet.create({
    serif: {
        fontFamily: 'serif'
    }
});

export const background_color = StyleSheet.create({
    primary: {
        backgroundColor: color_primary
    },
    transparent: {
        backgroundColor: 'transparent'
    },
    white: {
        backgroundColor: 'white'
    },
    blue:{
        backgroundColor: 'blue'
    },
    green:{
        backgroundColor: 'green'
    }
});

export const margin = StyleSheet.create({
    ml_0: {
        marginLeft: 0
    }
});

export const border = StyleSheet.create({
    w_0: {
        borderWidth: 0
    }
});

export const padding = StyleSheet.create({
    p_0: {
        padding: 0
    }
});

export const shadow = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11
    }
});

export const width = StyleSheet.create({
    w_100: {
        width: '100%'
    },
    w_25: {
        width: '25%'
    }
});

export const flex = StyleSheet.create({
    flex_row: {
        flexDirection: 'row'
    },
    align_items_center: {
        alignItems: 'center'
    },
    justify_content_center: {
        justifyContent: 'center'
    },
    justify_content_between: {
        justifyContent: "space-between",
    },
    flex_wrap: {
        flexWrap: "wrap"
    }
});

export const rounded = StyleSheet.create({
});

