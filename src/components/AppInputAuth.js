import React, { Component } from "react";
import {Icon} from "react-native-elements";
import {TextInput, View} from "react-native";
import {color_primary} from "../utils/theme/Color";
import {background_color, flex, font, font_weight, padding, shadow, text_size, width} from "../utils/styles/MainStyle";
class AppInputAuth extends Component{
    render() {
        return (
            <View style={[
                width.w_100,
                flex.flex_row,
                shadow.shadow,
                flex.align_items_center,
                flex.justify_content_center,
                background_color.white,
                {borderRadius: 12, padding: 15, paddingLeft: 25}
            ]}>
                <Icon
                    name= {this.props.icon}
                    type='font-awesome-5'
                    color={color_primary}
                    size={18}/>
                <TextInput
                    secureTextEntry={this.props.secureTextEntry}
                    placeholder={this.props.placeholder}
                    style={[
                        text_size.sm,
                        font_weight.f_500,
                        font.serif,
                        padding.p_0,
                        width.w_100,
                        { paddingRight: 20, marginLeft: 10}
                    ]}
                    onChangeText={this.props.handleChange(this.props.field)}
                    onBlur={this.props.handleBlur(this.props.field)}
                    value={this.props.values[this.props.field]}
                />
            </View>
        )
    }
}
export default AppInputAuth;
