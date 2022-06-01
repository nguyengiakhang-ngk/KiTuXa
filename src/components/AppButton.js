import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Button } from '@rneui/base';
import {
    background_color,
    flex,
    font,
    font_weight,
    shadow,
    text_color,
    text_size,
    width
} from "../utils/styles/MainStyle";
class AppButton extends Component{
    render() {
        return (
            <Button
                buttonStyle={[
                    background_color.primary,
                    flex.align_items_center,
                    width.w_100,
                    {padding: 16}
                ]}
                titleStyle={[
                    font_weight.bold,
                    text_size.sm,
                    font.serif,
                    text_color.white
                ]}
                disabledStyle={[background_color.primary, {opacity: 0.5}]}
                disabledTitleStyle={[
                    font_weight.bold,
                    text_size.sm,
                    font.serif,
                    text_color.white
                ]}
                title={this.props.title}
                disabled={this.props.disabled}
                raised
                radius={10}
                onPress={this.props.onPress}
            />
        )
    }
}
export default AppButton;
