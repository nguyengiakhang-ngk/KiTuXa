import React, { Component } from "react";
import {Text, TextInput, View} from "react-native";
import {background_color, flex, font, font_weight, padding, shadow, text_size, width} from "../utils/styles/MainStyle";
class AppInputInf extends Component{
    render() {
        return (
            <View style={[
                width.w_100,
                flex.justify_content_center,
            ]}>
                <Text
                    style={[
                        text_size.sm,
                        font.serif
                    ]}
                >
                    { this.props.lable }
                </Text>
                <TextInput
                    secureTextEntry={this.props.secureTextEntry}
                    placeholder={this.props.placeholder}
                    keyboardType = {this.props.keyboardType}
                    multiline={this.props.multiline}
                    numberOfLines={this.props.number}
                    style={[
                        text_size.sm,
                        font_weight.f_500,
                        font.serif,
                        padding.p_0,
                        width.w_100,
                        background_color.white,
                        shadow.shadow,
                        {borderRadius: 7, padding: 12, paddingLeft: 10, paddingRight: 10, marginTop: 5, textAlignVertical: 'top',},
                    ]}
                    onChangeText={this.props.handleChange(this.props.field)}
                    onBlur={this.props.handleBlur(this.props.field)}
                    value={this.props.values[this.props.field]}
                />
            </View>
        )
    }
}
export default AppInputInf;
