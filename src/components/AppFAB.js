import React, {Component} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {flex, shadow} from "../utils/styles/MainStyle";

class AppFAB extends Component{
    render() {
        return (
            <TouchableOpacity
                style={[
                    {
                        backgroundColor: this.props.bg,
                        borderRadius: 30,
                        width: 55,
                        height: 55
                    },
                    flex.align_items_center,
                    flex.justify_content_center,
                    shadow.shadow
                ]}
                onPress = { this.props.onPress }
            >
                    <Icon
                        name= {this.props.name}
                        type='font-awesome-5'
                        size={this.props.size}
                        color={this.props.color}
                    />
            </TouchableOpacity>
        )
    }
}
export default AppFAB;
