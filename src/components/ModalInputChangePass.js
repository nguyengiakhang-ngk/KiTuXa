import React from 'react';
import {Modal, View, Text, TextInput} from 'react-native';
import {background_color, flex, font, font_weight, padding, shadow, text_size, width} from "../utils/styles/MainStyle";
import AppButtonActionInf from "./AppButtonActionInf";
import {color_danger, color_primary} from "../utils/theme/Color";
import AppError from "./AppError";

export default class ModalInputChangePass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            valuePassCurrent: '',
            valuePassChange: '',
            valuePassConfirm: '',
            isCurrent: false,
            isChange: false,
            isConfirm: false,
            messageChange: ''
        }
    }
    onChange = () => {
        if(this.state.valuePassCurrent !== this.props.passCurrent){
            this.setState({
                isCurrent: true,
                valuePassCurrent: '',
                valuePassChange: '',
                valuePassConfirm: ''
            });
        } else if (this.state.valuePassChange.length < 8) {
            this.setState({
                isChange: true,
                messageChange: 'Độ dài mật khẩu tối thiểu là 8!',
                valuePassCurrent: '',
                valuePassChange: '',
                valuePassConfirm: ''
            });
        } else if (this.state.valuePassChange === this.state.valuePassCurrent) {
            this.setState({
                isChange: true,
                messageChange: 'Đã trùng với mật khẩu gần nhất!',
                valuePassCurrent: '',
                valuePassChange: '',
                valuePassConfirm: ''
            });
        } else if (this.state.valuePassConfirm !== this.state.valuePassChange) {
            this.setState({
                isConfirm: true,
                valuePassCurrent: '',
                valuePassChange: '',
                valuePassConfirm: ''
            });
        } else{
            this.props.onChangePass(this.state.valuePassChange);
        }
    }

    componentDidMount() {
        // alert(this.props.passCurrent)
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
                                <Text
                                    style={[
                                        text_size.sm,
                                        font.serif
                                    ]}
                                >
                                    Mật khẩu hiện tại:
                                </Text>
                                <TextInput
                                    returnKeyType={this.props.returnKeyType}
                                    secureTextEntry={true}
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
                                    value={this.state.valuePassCurrent}
                                    onChangeText={(text) => {
                                        this.setState({
                                            valuePassCurrent: text,
                                            isCurrent: false,
                                            isChange: false,
                                            isConfirm: false,
                                            messageChange: ''
                                        })
                                    }}
                                />
                                {
                                    this.state.isCurrent ?
                                        <AppError errors={ 'Sai mật khẩu!' }/>
                                        : null
                                }
                            </View>
                            <View style={[
                                width.w_100,
                                flex.justify_content_center,
                                this.props?.style,
                                {
                                    marginTop: 10
                                }
                            ]}>
                                <Text
                                    style={[
                                        text_size.sm,
                                        font.serif
                                    ]}
                                >
                                    Mật khẩu mới:
                                </Text>
                                <TextInput
                                    returnKeyType={this.props.returnKeyType}
                                    secureTextEntry={true}
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
                                    value={this.state.valuePassChange}
                                    onChangeText={(text) => {
                                        this.setState({
                                            valuePassChange: text,
                                            isCurrent: false,
                                            isChange: false,
                                            isConfirm: false,
                                            messageChange: ''
                                        })
                                    }}
                                />
                                {
                                    this.state.isChange ?
                                        <AppError errors={ this.state.messageChange }/>
                                        : null
                                }
                            </View>
                            <View style={[
                                width.w_100,
                                flex.justify_content_center,
                                this.props?.style,
                                {
                                    marginTop: 10
                                }
                            ]}>
                                <Text
                                    style={[
                                        text_size.sm,
                                        font.serif
                                    ]}
                                >
                                    Xác nhận mật khẩu:
                                </Text>
                                <TextInput
                                    returnKeyType={this.props.returnKeyType}
                                    secureTextEntry={true}
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
                                    value={this.state.valuePassConfirm}
                                    onChangeText={(text) => {
                                        this.setState({
                                            valuePassConfirm: text,
                                            isCurrent: false,
                                            isChange: false,
                                            isConfirm: false,
                                            messageChange: ''
                                        })
                                    }}
                                />
                                {
                                    this.state.isConfirm ?
                                        <AppError errors={ 'Mật khẩu không trùng khớp!' }/>
                                        : null
                                }
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
                                        disabled={ (!this.state.valuePassCurrent || !this.state.valuePassChange || !this.state.valuePassConfirm) }
                                        size={13}
                                        textSize={18}
                                        bg={color_primary}
                                        onPress = { () => { this.onChange() } }
                                        title="Xác nhận"
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
