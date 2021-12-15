import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import {background_color, flex, font, font_weight, text_color, text_size, width} from "../utils/styles/MainStyle";
class AppButton extends Component{
    render() {
        return (
            <TouchableOpacity
                disabled={ this.props.disabled }
                style={[
                    background_color.primary,
                    flex.align_items_center,
                    width.w_100,
                    {opacity: !this.props.disabled ? 1 : 0.5, borderRadius: 25, padding: 18}
                ]}
                onPress={this.props.onPress}
            >
                <Text
                    style={[
                        font_weight.bold,
                        text_size.sm,
                        font.serif,
                        text_color.white
                    ]}
                >
                    { this.props.title }
                </Text>
            </TouchableOpacity>
        )
    }
}
export default AppButton;
