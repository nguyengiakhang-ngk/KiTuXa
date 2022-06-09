import React, { Component } from "react";
import ModalSelector from "react-native-modal-selector";
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
import { Text, TextInput, View } from "react-native";
import { Icon } from "@rneui/base";
import { color_secondary } from "../utils/theme/Color";
import LookupModal from 'react-native-lookup-modal';
class AppSelectSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true
        }
    }
    _onSelect = (item) => {
        this.props.onSelectUser(item);
    }
    render() {
        return (
            <View>
                <Text style={[
                    text_size.sm,
                    font.serif
                ]}>{this.props.label}</Text>
                <View style={[
                        width.w_100,
                        background_color.white,
                        shadow.shadow,
                        { borderRadius: 7, padding: 3, paddingRight: 10, marginTop: 5 },
                    ]}>
                    <LookupModal
                        data={this.props.data}
                        value={this.props.value}
                        onSelect={item => this._onSelect(item)}
                        displayKey={this.props.displayKey}
                        selectText={this.props.selectText}
                        placeholder={this.props.placeholder}
                        itemStyle={this.props.itemStyle}
                        itemTextStyle={this.props.itemTextStyle}
                        contentStyle={this.props.contentStyle}
                        selectButtonTextStyle={this.props.selectButtonTextStyle}
                        children={this.props.children}
                        // hideSelectButton={this.state.hide}
                    />
                </View>
            </View>
        )
    }
}
export default AppSelectSearch;