import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";
import { background_color, flex, font, font_weight, padding, shadow, text_size, width } from "../utils/styles/MainStyle";
class AppInputInf extends Component {
    cardExpiry(val) {
        val = val.split(".").join("");
        val = val.split("-").join("");
        val = Number(val);
        val = String(val);
        if (val.length > 3) {
            let res = "";
            let s = val.length;
            while (s > 3) {
                if (s === val.length) {
                    res = val.substring(s - 3, s);
                } else {
                    res = val.substring(s - 3, s) + "." + res;
                }
                s = s - 3;
            }
            return val.substring(0, s) ? val.substring(0, s) + "." + res : res;
        }
        return (val !== '0') ? val : "";
    }
    render() {
        return (
            <View style={[
                width.w_100,
                flex.justify_content_center,
                this.props?.style
            ]}>
                <Text
                    style={[
                        text_size.sm,
                        font.serif
                    ]}
                >
                    {this.props.lable}
                </Text>
                <TextInput
                    returnKeyType={this.props.returnKeyType}
                    secureTextEntry={this.props.secureTextEntry}
                    placeholder={this.props.placeholder}
                    keyboardType={this.props.keyboardType}
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
                        { borderRadius: 7, padding: 12, paddingLeft: 10, paddingRight: 10, marginTop: 5, textAlignVertical: 'top', },
                    ]}
                    onChangeText={this.props.onChangeText ? this.props.onChangeText : this.props.handleChange(this.props.field)}
                    onBlur={this.props.handleBlur(this.props.field)}
                    value={this.props.value ? this.props.value : (this.props.formatNum ? this.cardExpiry(this.props.values[this.props.field]) : this.props.values[this.props.field])}
                />
            </View>
        )
    }
}
export default AppInputInf;
