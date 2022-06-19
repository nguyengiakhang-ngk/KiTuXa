import React, {Component} from 'react';
import {
    ActivityIndicator,
    Keyboard, Modal,
    ScrollView, Text, TextInput, TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {
    background_color,
    flex, font, font_weight,
    padding, shadow, text_color, text_size,
    width
} from "../../utils/styles/MainStyle";
import AppError from "../../components/AppError";
import { connect } from 'react-redux';
import {doChangePass, doCheckUserDuplicate} from '../../redux/actions/user';
import AppButtonActionInf from "../../components/AppButtonActionInf";
import {color_danger, color_dark, color_primary, color_warning} from "../../utils/theme/Color";
import OTPInput from "react-native-otp";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import {Icon} from "@rneui/base";
const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class ForgotPasswordScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isCheckPhone: false,
            isOTP: false,
            otp: '',
            otpConfirm: '',
            text: null,
            isLoading: false,
            isErrorOTP: false,
            isChangePass: false,
            numberPhone: null,
            passNew: null,
            rePassNew: null,
            isErrorPhone: false,
            isPass: false,
            isPassText: '',
            isRePass: false,
        }
    }

    isFormValid (isValid, touched){
        return isValid && Object.keys(touched).length !== 0;
    }

    signUp = async () => {
        this.props.doCheckUserDuplicate({numberPhone: this.state.numberPhone}).then(data => {
            if(!data){
                // Toast.show({
                //     type: 'error',
                //     text1: 'Tài khoản',
                //     text2: 'Tài khoản không tồn tại.',
                //     visibilityTime: 4000,
                //     autoHide: true
                // });
                this.setState({
                    isErrorPhone: true
                })
            }else{
                let phoneNumber = this.state.numberPhone.substring(1, this.state.numberPhone.length);
                this.signInWithPhoneNumber(`+84${phoneNumber}`);
            }
        });
    }

    async signInWithPhoneNumber(phoneNumber) {
        this.setState({
            isLoading: true,
            isOTP: false
        })
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber, true);
        this.setState({
            otpConfirm: confirmation,
            isOTP: true,
            isLoading: false
        })
        let i = 60;
        let intervalId = setInterval(() => {
            if(i > 0) {
                i--;
                this.setState({
                    text: `(${i}s)`
                })
            } else {
                this.setState({
                    text: '(Gửi lại)'
                })
                clearInterval(intervalId);
            }
        }, 1000);
    }

    async confirmCode() {
        try {
            let confirm = await this.state.otpConfirm.confirm(this.state.otp);
            if(confirm) {
                this.setState({
                    isLoading: true
                })
                setTimeout(() => {
                    this.setState({
                        isOTP: false,
                        isChangePass: true
                    })
                }, 1000)
            } else {
                this.setState({
                    isErrorOTP: true
                })
            }
        } catch (error) {
            this.setState({
                isErrorOTP: true
            })
        }
    }

    handleOTPChange = (otp) => {
        this.setState({
            otp: otp,
            isErrorOTP: false
        })
    }

    doChangePass = () => {
        this.setState({
            isLoading: true
        })
        this.props.doChangePass({password: this.state.passNew}, {numberPhone: this.state.numberPhone}).then(data => {
            if(data){
                Toast.show({
                    type: 'success',
                    text1: 'Tài khoản',
                    text2: 'Đổi mật khẩu thành công.',
                    visibilityTime: 2000,
                    autoHide: true
                });
                setTimeout(() => {
                    this.setState({
                        isLoading: false
                    })
                    this.props.navigation.replace('Login');
                }, 2000)
            }else{
                Toast.show({
                    type: 'error',
                    text1: 'Tài khoản',
                    text2: 'Đã xảy ra sự cố vui lòng thử lại.',
                    visibilityTime: 2000,
                    autoHide: true
                });
                setTimeout(() => {
                    this.setState({
                        isLoading: false
                    })
                }, 2000)
            }
        });
    }

    render() {
        return (
            <ScrollView
                style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
                {
                    this.state.isLoading ?
                        <ActivityIndicator size="large" color={color_primary}/>
                        :
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <View
                                style={[
                                    flex.justify_content_center,
                                    flex.align_items_center,
                                    {
                                        paddingVertical: 30
                                    }
                                ]}
                                onPress={Keyboard.dismiss}
                            >
                                <Icon
                                    raised
                                    name='hotel'
                                    type='font-awesome-5'
                                    color={color_primary}
                                    size={50}
                                />
                                <Text
                                    style={[
                                        text_color.primary,
                                        font.serif,
                                        font_weight.bold,
                                        text_size.title
                                    ]}
                                >
                                    Quản lý vật chất
                                </Text>
                            </View>
                            {
                                !this.state.isChangePass ?
                                    <HideKeyboard>
                                        <View
                                            style={{flex: 1, padding: 10}}
                                        >
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
                                                    Số điện thoại
                                                </Text>
                                                <TextInput
                                                    autoCorrect={false}
                                                    placeholder={'Nhập số điện thoại'}
                                                    keyboardType={'numeric'}
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
                                                    onChangeText={(text) => {
                                                        this.setState({
                                                            numberPhone: text,
                                                            isErrorPhone: false
                                                        })
                                                    }}
                                                    value={this.state.numberPhone}
                                                />
                                            </View>
                                            {this.state.isErrorPhone ? (
                                                <AppError errors={ 'Tài khoản không tồn tại.' }/>
                                            ) : null}
                                            <View style={[flex.align_items_center, { marginTop: 20 }]}>
                                                <View
                                                    style={[
                                                        {
                                                            width: '50%',
                                                            paddingHorizontal: 16
                                                        }
                                                    ]}
                                                >
                                                    <AppButtonActionInf
                                                        disabled={!this.state.numberPhone}
                                                        size={12}
                                                        textSize={18}
                                                        bg={color_primary}
                                                        onPress={() => { this.signUp() }}
                                                        title="Tiếp tục"
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </HideKeyboard>
                                    :
                                    <HideKeyboard>
                                        <View
                                            style={{flex: 1, padding: 10}}
                                        >
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
                                                    Mật khẩu mới
                                                </Text>
                                                <TextInput
                                                    autoCorrect={false}
                                                    placeholder={'Nhập mật khẩu mới'}
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
                                                    onChangeText={(text) => {
                                                        this.setState({
                                                            passNew: text,
                                                            isPass: false
                                                        })
                                                    }}
                                                    value={this.state.passNew}
                                                />
                                            </View>
                                            {this.state.isPass ? (
                                                <AppError errors={this.state.isPassText}/>
                                            ) : null}
                                            <View style={[
                                                width.w_100,
                                                flex.justify_content_center,
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
                                                    Xác nhận mật khẩu
                                                </Text>
                                                <TextInput
                                                    autoCorrect={false}
                                                    placeholder={'Nhập lại mật khẩu mới'}
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
                                                    onChangeText={(text) => {
                                                        this.setState({
                                                            rePassNew: text,
                                                            isRePass: false
                                                        })
                                                    }}
                                                    value={this.state.rePassNew}
                                                />
                                            </View>
                                            {this.state.isRePass ? (
                                                <AppError errors={'Mật khẩu không trùng khớp.'}/>
                                            ) : null}
                                            <View style={[flex.align_items_center, { marginTop: 20 }]}>
                                                <View
                                                    style={[
                                                        {
                                                            width: '50%',
                                                            paddingHorizontal: 16
                                                        }
                                                    ]}
                                                >
                                                    <AppButtonActionInf
                                                        disabled={!this.state.passNew || !this.state.rePassNew}
                                                        size={12}
                                                        textSize={18}
                                                        bg={color_primary}
                                                        onPress={() => { this.doChangePass() }}
                                                        title="Xác nhận"
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </HideKeyboard>
                            }
                        </View>
                }
                {
                    this.state.isOTP
                        ?
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={true}
                            onRequestClose={() => {
                                this.setState({ isVisible: false });
                            }}
                        >
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
                                            padding: 15,
                                        }
                                    ]}
                                >
                                    <View>
                                        <View style={[flex.align_items_center]}>
                                            <Text style={[font_weight.bold, text_size.lg, font.serif, width.w_100, { textAlign: 'center', color: color_primary }]}>Xác thực OTP</Text>
                                            <OTPInput
                                                value={this.state.otp}
                                                onChange={this.handleOTPChange}
                                                tintColor="#FB6C6A"
                                                offTintColor="#BBBCBE"
                                                otpLength={6}
                                                cellStyle={
                                                    {
                                                        borderRadius: 10,
                                                        borderWidth: 2,
                                                        fontSize: 25,
                                                        color: color_primary
                                                    }
                                                }
                                            />
                                            <View
                                                style={[
                                                    flex.flex_row, flex.align_items_center, width.w_100,
                                                    {
                                                        marginTop: 5,
                                                        marginRight: 32,
                                                        justifyContent: "flex-end"
                                                    }
                                                ]}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({ otp: undefined })
                                                    }}
                                                >
                                                    <Text
                                                        style={[
                                                            text_size.xs,
                                                            font.serif,
                                                            {
                                                                color: color_danger,
                                                                marginLeft: 5,
                                                                fontWeight: "bold",
                                                                fontStyle: 'italic'
                                                            }
                                                        ]}
                                                    >
                                                        Clear
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View
                                                style={[
                                                    flex.flex_row, flex.align_items_center, width.w_100,
                                                    {
                                                        marginTop: 5,
                                                        marginLeft: 32
                                                    }
                                                ]}
                                            >
                                                {this.state.isErrorOTP ? (
                                                    <AppError errors={ "Mã xác thực không chính xác" }/>
                                                ) : null}
                                            </View>
                                            <View
                                                style={[
                                                    flex.flex_row, flex.align_items_center, width.w_100,
                                                    {
                                                        marginTop: 15,
                                                        marginLeft: 32
                                                    }
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        text_size.xs,
                                                        font.serif,
                                                        {
                                                            color: color_dark
                                                        }
                                                    ]}
                                                >
                                                    Bạn không nhận được SMS?
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        if(this.state.text === '(Gửi lại)'){
                                                            let phoneNumber = this.state.numberPhone.substring(1, this.state.numberPhone.length);
                                                            this.signInWithPhoneNumber(`+84${phoneNumber}`);
                                                        }
                                                    }}
                                                >
                                                    <Text
                                                        style={[
                                                            text_size.xs,
                                                            font.serif,
                                                            {
                                                                color: color_danger,
                                                                marginLeft: 5
                                                            }
                                                        ]}
                                                    >
                                                        {this.state.text}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={[flex.flex_row, flex.align_items_center, flex.justify_content_between, width.w_100, { marginTop: 25 }]}>
                                            <View
                                                style={[
                                                    {
                                                        width: '50%',
                                                        paddingHorizontal: 16
                                                    }
                                                ]}
                                            >
                                                <AppButtonActionInf
                                                    size={10}
                                                    textSize={16}
                                                    bg={color_danger}
                                                    onPress={() => {
                                                        this.setState({
                                                            isOTP: false
                                                        })
                                                    }}
                                                    title="Hủy"
                                                />
                                            </View>
                                            <View
                                                style={[
                                                    {
                                                        width: '50%',
                                                        paddingHorizontal: 16
                                                    }
                                                ]}
                                            >
                                                <AppButtonActionInf
                                                    size={10}
                                                    textSize={16}
                                                    bg={color_primary}
                                                    onPress={() => { this.confirmCode() }}
                                                    title="Xác nhận"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        :
                        <View />
                }
                <Toast ref={(ref) => {Toast.setRef(ref)}} />
            </ScrollView>
        );
    }
}

const mapStateToProps = ({user}) => {
    return user;
};

const mapDispatchToProps = {
    doCheckUserDuplicate,
    doChangePass
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
