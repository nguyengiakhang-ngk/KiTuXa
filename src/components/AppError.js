import React, { Component } from "react";
import {Icon} from "react-native-elements";
import {font, text_color, text_size} from "../utils/styles/MainStyle";
import {color_danger} from "../utils/theme/Color";
import {Text, View} from "react-native";
class AppError extends Component{
    render() {
        return (
            <View style={{flexDirection: "row", marginLeft: 15, marginTop: 5}}>
                <Icon
                    name='exclamation-triangle'
                    type='font-awesome-5'
                    color={color_danger}
                    size={16}/>
                <Text style={[
                    text_size.xs,
                    font.serif,
                    text_color.danger,
                    {marginLeft: 5}
                ]}>{this.props.errors}</Text>
            </View>
        )
    }
}
export default AppError;
