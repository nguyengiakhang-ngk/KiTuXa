import React, {Component} from 'react';
import {
    ActivityIndicator,
    Keyboard, Modal,
    SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { Formik } from 'formik';
import {SignupSchema} from "../../utils/validation/ValidateSignUp";
import {
    background_color,
    flex, font, font_weight,
    height, padding, shadow, text_color, text_size,
    width
} from "../../utils/styles/MainStyle";
import AppInputInf from "../../components/AppInputInf";
import AppError from "../../components/AppError";
import AppButton from "../../components/AppButton";
import AppRadioButton from "../../components/AppRadioButton";
import { connect } from 'react-redux';
import {doCheckUserDuplicate, doSignUp} from '../../redux/actions/user';
import AppButtonActionInf from "../../components/AppButtonActionInf";
import {color_danger, color_dark, color_primary, color_warning} from "../../utils/theme/Color";
import OTPInput from "react-native-otp";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class SignUpScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            genders: [
                {
                    label: 'Nam',
                    value: '0'
                },
                {
                    label: 'Nữ',
                    value: '1'
                },
            ],
            isCheckPhone: true,
            isOTP: false,
            otp: '',
            otpConfirm: '',
            text: null,
            refUser: React.createRef(),
            isLoading: false,
            isErrorOTP: false,
            user: null
        }
    }

    isFormValid (isValid, touched){
        return isValid && Object.keys(touched).length !== 0;
    }

    signUp = async (values) => {
        this.props.doCheckUserDuplicate({numberPhone: values.numberPhone}).then(data => {
            if(data){
                this.setState({
                    isCheckPhone: false
                })
                Toast.show({
                    type: 'error',
                    text1: 'Tài khoản',
                    text2: 'Số điện thoại đã được sử dụng.',
                    visibilityTime: 2000,
                    autoHide: true
                });
            }else{
                this.setState({
                    user: values
                })
                let phoneNumber = values.numberPhone.substring(1, values.numberPhone.length);
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
                    isOTP: false
                }, () => {
                    this.doSignUp();
                })
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

    doSignUp = () => {
        this.setState({
            isLoading: true
        })
        this.props.doSignUp(this.state.user).then(data => {
            if(data){
                Toast.show({
                    type: 'success',
                    text1: 'Tài khoản',
                    text2: 'Đăng ký thành công.',
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
                        <Formik
                            innerRef={this.state.refUser}
                            initialValues={{name: '', yearOfBirth: '', gender: 0, address: '', identityNumber: '', numberPhone: '', password: '', rePass: '', permission: 0}}
                            validationSchema={SignupSchema}
                            onSubmit={values => {
                                this.signUp(values);
                            }}
                        >
                            {({
                                  handleChange,
                                  handleBlur,
                                  handleSubmit, values,
                                  errors,
                                  touched ,
                                  isValid
                            }) => (
                                <HideKeyboard>
                                    <SafeAreaView
                                        style={[
                                            { flex: 1, paddingBottom: 15 },
                                            background_color.white,
                                            height.h_100
                                        ]}
                                        onPress={Keyboard.dismiss}
                                    >
                                        <View
                                            style={[
                                                width.w_100,
                                                {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                            ]}
                                        >
                                            <AppInputInf
                                                lable={"Họ và tên:"}
                                                secureTextEntry={false}
                                                field={"name"}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                                returnKeyType="next"
                                            />
                                            {errors.fullName && touched.fullName ? (
                                                <AppError errors={ errors.fullName }/>
                                            ) : null}
                                        </View>
                                        <View
                                            style={[
                                                flex.flex_row,
                                                width.w_100,
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    {paddingLeft: 15, paddingRight: 10, marginTop: 10, flex: 1}
                                                ]}
                                            >
                                                <AppInputInf
                                                    lable={"Năm sinh:"}
                                                    secureTextEntry={false}
                                                    keyboardType={'numeric'}
                                                    field={"yearOfBirth"}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    values={values}
                                                    returnKeyType="next"
                                                />
                                                {errors.yearOfBirth && touched.yearOfBirth ? (
                                                    <AppError errors={ errors.yearOfBirth }/>
                                                ) : null}
                                            </View>
                                            <View
                                                style={[
                                                    {paddingLeft: 10, paddingRight: 15, marginTop: 10, flex: 1}
                                                ]}
                                            >
                                                <AppRadioButton
                                                    label="Giới tính"
                                                    data={this.state.genders}
                                                    field={"gender"}
                                                    values={values}
                                                    defaultValue={values.gender}
                                                />
                                            </View>
                                        </View>
                                        <View
                                            style={[
                                                width.w_100,
                                                {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                            ]}
                                        >
                                            <AppInputInf
                                                lable={"Địa chỉ:"}
                                                secureTextEntry={false}
                                                field={"address"}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                                returnKeyType="next"
                                            />
                                            {errors.address && touched.address ? (
                                                <AppError errors={ errors.address }/>
                                            ) : null}
                                        </View>
                                        <View
                                            style={[
                                                width.w_100,
                                                {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                            ]}
                                        >
                                            <AppInputInf
                                                lable={"Số CMNN/CCCD:"}
                                                keyboardType={'numeric'}
                                                secureTextEntry={false}
                                                field={"identityNumber"}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                                returnKeyType="next"
                                            />
                                            {errors.identityCardNumber && touched.identityCardNumber ? (
                                                <AppError errors={ errors.identityCardNumber }/>
                                            ) : null}
                                        </View>
                                        <View
                                            style={[
                                                width.w_100,
                                                {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                            ]}
                                        >
                                            <AppInputInf
                                                lable={"Số Điện Thoại:"}
                                                keyboardType={'numeric'}
                                                secureTextEntry={false}
                                                field={"numberPhone"}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                                returnKeyType="next"
                                            />
                                            {errors.phoneNumber && touched.phoneNumber ? (
                                                <AppError errors={ errors.phoneNumber }/>
                                            ) : null}
                                        </View>
                                        <View
                                            style={[
                                                width.w_100,
                                                {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                            ]}
                                        >
                                            <AppInputInf
                                                lable={"Mật khẩu:"}
                                                secureTextEntry={true}
                                                field={"password"}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                                returnKeyType="next"
                                            />
                                            {errors.pass && touched.pass ? (
                                                <AppError errors={ errors.pass }/>
                                            ) : null}
                                        </View>
                                        <View
                                            style={[
                                                width.w_100,
                                                {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                            ]}
                                        >
                                            <AppInputInf
                                                lable={"Nhập lại mật khẩu:"}
                                                secureTextEntry={true}
                                                field={"rePass"}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                                returnKeyType="done"
                                            />
                                            {errors.rePass && touched.rePass ? (
                                                <AppError errors={errors.rePass}/>
                                            ) : null}
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
                                                    onPress = { () => { this.backAction() } }
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
                                                    size={13}
                                                    textSize={18}
                                                    bg={color_primary}
                                                    disabled = { !this.isFormValid(isValid, touched) || values.password !== values.rePass }
                                                    onPress = { handleSubmit }
                                                    title="Đăng ký"
                                                />
                                            </View>
                                        </View>
                                    </SafeAreaView>
                                </HideKeyboard>
                            )}
                        </Formik>
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
                                                            let phoneNumber = this.state.user.numberPhone.substring(1, this.state.user.numberPhone.length);
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

const mapStateToProps = (doSignUp) => {
    return doSignUp;
};

const mapDispatchToProps = {
    doSignUp,
    doCheckUserDuplicate
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
