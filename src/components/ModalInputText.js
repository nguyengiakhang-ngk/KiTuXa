import React from 'react';
import {Modal, View, Text, TextInput} from 'react-native';
import {background_color, flex, font, font_weight, padding, shadow, text_size, width} from "../utils/styles/MainStyle";
import AppButtonActionInf from "./AppButtonActionInf";
import {color_danger, color_primary} from "../utils/theme/Color";

export default class ModalInputText extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.initValue
        }
    }
    onChange = () => {
        this.props.onChangeValue(this.state.value);
    }


    render() {
        return(
            this.props.isVisible ?
                <Modal animationType={'fade'} isVisible={true} transparent={true}>
                    <View
                        style={[
                            {
                                flex: 1,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                justifyContent: "center",
                                alignItems: "center"
                            }
                        ]}
                    >
                        <View
                            style={[
                                {
                                    width: '90%',
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                    padding: 15
                                }
                            ]}
                        >
                            <View style={[
                                width.w_100,
                                flex.justify_content_center,
                                this.props?.style
                            ]}>
                                {
                                    this.props.label ?
                                        <Text
                                            style={[
                                                text_size.sm,
                                                font.serif
                                            ]}
                                        >
                                            {this.props.label}
                                        </Text>
                                        : null
                                }
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
                                    value={this.state.value}
                                    onChangeText={(text) => {
                                        this.setState({
                                            value: text
                                        })
                                    }}
                                />
                            </View>
                            <View
                                style={[
                                    width.w_100,
                                    flex.flex_row,
                                    {paddingLeft: 15, paddingRight: 15, marginTop: 20}
                                ]}
                            >
                                <View
                                    style={[
                                        {
                                            flex: 1,
                                            marginRight: 15
                                        }
                                    ]}
                                >
                                    <AppButtonActionInf
                                        size={13}
                                        textSize={18}
                                        bg={color_danger}
                                        onPress = { () => { this.props.cancel() } }
                                        title="Hủy"
                                    />
                                </View>
                                <View
                                    style={[
                                        {
                                            flex: 1
                                        }
                                    ]}
                                >
                                    <AppButtonActionInf
                                        disabled={ (!this.state.value) }
                                        size={13}
                                        textSize={18}
                                        bg={color_primary}
                                        onPress = { () => { this.onChange() } }
                                        title="Xác nhận"
                                        keyboardType={this.props.keyboardType}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                : <View/>
        )
    }
}
