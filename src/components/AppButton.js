import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { actionButton, actionTitle } from "../utils/styles/ActionStyle";
class AppButton extends Component{
    render() {
        return (
            <TouchableOpacity disabled={ this.props.disabled } style={[actionButton.btn, {opacity: !this.props.disabled ? 1 : 0.5}]} onPress={this.props.onPress}>
                <Text style={[actionTitle.titleBtn, actionTitle.textWhite]}>
                    { this.props.title }
                </Text>
            </TouchableOpacity>
        )
    }
}
export default AppButton;
