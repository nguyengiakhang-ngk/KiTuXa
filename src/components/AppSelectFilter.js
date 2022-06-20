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
class AppSelectFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // textInputValue: this.props.value[this.props.field]
        }
    }

    setText(option) {
        this.props.returnFilter ? this.props.returnFilter(option) : null;
    }

    render() {
        return (
            <View style={[
                width.w_100,
                flex.justify_content_center
            ]}>
                <Text
                    style={[
                        text_size.sm,
                        font.serif
                    ]}
                >
                    {this.props.lable}
                </Text>
                <ModalSelector
                    touchableStyle={[
                        width.w_100,
                        background_color.white,
                        shadow.shadow,
                        { borderRadius: 7, padding: 3, paddingLeft: 6, paddingRight: 10, marginTop: 5 },
                    ]}
                    selectStyle={[
                        { borderWidth: 0, textAlignVertical: 'right' }
                    ]}
                    selectedItemTextStyle={[
                        text_color.primary,
                        font_weight.bold
                    ]}
                    optionTextStyle={[
                        text_size.sm,
                        font.serif,
                        text_color.black
                    ]}
                    cancelTextStyle={[
                        text_size.sm,
                        font.serif,
                        text_color.danger,
                        font_weight.bold
                    ]}
                    cancelText={"Hủy"}
                    childrenContainerStyle={[
                        flex.flex_row,
                        flex.align_items_center,
                        flex.justify_content_between
                    ]}
                    touchableActiveOpacity={.8}
                    data={this.props.data}
                    placeholder={this.props.placeholder}
                    onChange={(option) => { this.setText(option) }}>

                    <TextInput
                        autoCorrect={false}
                        style={[text_size.sm, font.serif, font_weight.f_500, { color: 'black', width: '95%' }]}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                    />
                    <Icon
                        name='caret-down'
                        type='font-awesome-5'
                        color={color_secondary}
                        size={22} />
                </ModalSelector>
            </View>
        )
    }
}
export default AppSelectFilter;
