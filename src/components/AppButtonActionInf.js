import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
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
class AppButtonActionInf extends Component{
    render() {
        return (
            <TouchableOpacity
                disabled={ this.props.disabled }
                style={[
                    flex.align_items_center,
                    width.w_100,
                    shadow.shadow,
                    {
                        opacity: !this.props.disabled ? 1 : 0.5,
                        borderRadius: 7,
                        padding: this.props.size,
                        backgroundColor: this.props.bg
                    }
                ]}
                onPress={this.props.onPress}
            >
                <Text
                    style={[
                        font_weight.bold,
                        font.serif,
                        text_color.white,
                        {
                            fontSize: this.props.textSize
                        }
                    ]}
                >
                    { this.props.title }
                </Text>
            </TouchableOpacity>
        )
    }
}
export default AppButtonActionInf;
