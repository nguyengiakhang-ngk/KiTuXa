import React, {Component} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {Icon} from "@rneui/base";
import {text_size, font, flex, text_align} from "../utils/styles/MainStyle";

class AppItemHome extends Component{
    render() {
        return (
            <TouchableOpacity
                style={[
                    flex.align_items_center,
                    flex.justify_content_center
                ]}
                onPress = { this.props.onPress }
            >
                <View
                    style={[
                        {
                            backgroundColor: this.props.bg,
                            padding: 12,
                            borderRadius: 20,
                            width: '80%',
                            height: 'auto'
                        }
                    ]}
                >
                    <Icon
                        name= {this.props.name}
                        type='font-awesome-5'
                        size={this.props.size}
                        color={this.props.color}
                    />
                </View>
                {
                    this.props.label ? (
                        <Text style={[ text_size.md, {color: this.props.colorText}, font.serif, text_align.center ]} numberOfLines={1}>
                            {this.props.label}
                        </Text>
                    ) : null
                }
            </TouchableOpacity>
        )
    }
}
export default AppItemHome;
