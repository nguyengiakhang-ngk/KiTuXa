import React, {Component} from "react";
import {color_primary} from "../utils/theme/Color";
import {Icon} from "react-native-elements";
import {Text, View} from "react-native";
import {text_size, font} from "../utils/styles/MainStyle";


class AppItemTabs extends Component{
    render() {
        return (
            <View>
                <Icon
                    name= {this.props.name}
                    type='font-awesome-5'
                    size={this.props.size}
                    color={this.props.color}
                />
                {
                    this.props.label ? (
                        <Text style={[ text_size.small, {color: this.props.color}, font.serif ]}>
                            {this.props.label}
                        </Text>
                    ) : null
                }
            </View>
        )
    }
}
export default AppItemTabs;