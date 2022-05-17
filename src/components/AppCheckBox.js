import React, { Component } from "react";
import {CheckBox} from "@rneui/base";
import {color_primary} from "../utils/theme/Color";
import {
    background_color,
    border,
    font,
    font_weight,
    margin,
    padding,
    text_color,
    text_size
} from "../utils/styles/MainStyle";
class AppCheckBox extends Component{
    render() {
        return (
            <CheckBox
                containerStyle={[
                    background_color.transparent,
                    margin.ml_0,
                    border.w_0,
                    padding.p_0
                ]}
                textStyle={[
                    font.serif,
                    font_weight.f_500,
                    text_color.primary,
                    text_size.sm,
                    { marginStart: 2}
                ]}
                title={this.props.title}
                checked={this.props.values}
                onPress={this.props.onPress}
                uncheckedColor={color_primary}
                checkedColor={color_primary}
            />
        )
    }
}
export default AppCheckBox;
