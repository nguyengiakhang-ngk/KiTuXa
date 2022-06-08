import React from "react";
import { Text, TextInput, View } from "react-native";
import { background_color, flex, font, font_weight, padding, shadow, text_size, width } from "../utils/styles/MainStyle";

const FormInput = ({ lable, style, ...props }) => {
    return (
        <View style={[
            width.w_100,
            flex.justify_content_center,
            style && style
        ]}>
            <Text
                style={[
                    text_size.sm,
                    font.serif
                ]}
            >
                {lable || ""}
            </Text>
            <TextInput
                {...props}
                style={[
                    text_size.sm,
                    font_weight.f_500,
                    font.serif,
                    padding.p_0,
                    width.w_100,
                    background_color.white,
                    shadow.shadow,
                    { borderRadius: 7, padding: 12, paddingLeft: 10, paddingRight: 10, marginTop: 5, textAlignVertical: 'top', },
                ]}
            />
        </View>
    )
}

export default FormInput