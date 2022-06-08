import React, { Component } from 'react';
import {
    Keyboard,
    SafeAreaView,
    Text, TouchableOpacity, TouchableWithoutFeedback,
    View
} from 'react-native';
import { Icon } from '@rneui/base';
import { Formik } from 'formik';
import AppButton from "../../components/AppButton";
import { SignupSchema } from "../../utils/validation/ValidateLogin";
import AppError from "../../components/AppError";
import AppInputAuth from "../../components/AppInputAuth";
import AppCheckBox from "../../components/AppCheckBox";
import {background_color, flex, font, font_weight, text_color, text_size, width} from "../../utils/styles/MainStyle";
import {color_primary} from "../../utils/theme/Color";
import {connect} from "react-redux";
import {doLogin} from "../../redux/actions/user";
import AsyncStorage from "@react-native-community/async-storage";
const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class LoginScreen extends Component {
    state = { checkedRemember: false };
    isFormValid(isValid, touched) {
        return isValid && Object.keys(touched).length !== 0;
    }
    componentDidMount() {

    };
    viewSignUp = () => {
        this.props.navigation.navigate("SignUp");
    }
    login = (numberPhone, password) => {
        this.props.doLogin({numberPhone: numberPhone, password: password})
            .then(async data => {
                if (data === 1) {
                    alert("Tài khoản không tồn tại");
                } else if (data === 2) {
                    alert("Sai mật khẩu!");
                } else {
                    try {
                        await AsyncStorage.setItem('@user', JSON.stringify(data));
                        this.props.navigation.replace('TabUser', {userData: data});
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
    }
    render() {
        return (
            <Formik
                initialValues={{numberPhone: "", pass: ""}}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    this.login(values.numberPhone, values.pass);
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit, values,
                    errors,
                    touched,
                    isValid
                }) => (
                    <HideKeyboard>
                        <SafeAreaView
                            style={[
                                { flex: 1 },
                                background_color.white,
                                flex.justify_content_center,
                                flex.align_items_center
                            ]}
                        >
                            <View
                                style={[
                                    { flex: 1 },
                                    background_color.white,
                                    flex.justify_content_center,
                                    flex.align_items_center
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
                                    Ký túc xá
                                </Text>
                            </View>
                            <View
                                style={[
                                    width.w_100,
                                    { flex: 2 },
                                    flex.justify_content_between
                                ]}
                            >
                                <View>
                                    <View
                                        style={[
                                            width.w_100,
                                            { paddingLeft: 15, paddingRight: 15, marginTop: 15 }
                                        ]}
                                    >
                                        <AppInputAuth
                                            secureTextEntry={false}
                                            placeholder={"Tên tài khoản"}
                                            field={"numberPhone"}
                                            icon={"user-alt"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                        />
                                        {errors.numberPhone && touched.numberPhone ? (
                                            <AppError errors={ errors.numberPhone } marginLeft={15}/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            { paddingLeft: 15, paddingRight: 15, marginTop: 15 }
                                        ]}
                                    >
                                        <AppInputAuth
                                            secureTextEntry={true}
                                            placeholder={"Mật khẩu"}
                                            field={"pass"}
                                            icon={"lock"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                        />
                                        {errors.pass && touched.pass ? (
                                            <AppError errors={errors.pass} marginLeft={15} />
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            { paddingLeft: 15, paddingRight: 15, marginTop: 15 },
                                            flex.flex_row,
                                            flex.align_items_center,
                                            flex.justify_content_between
                                        ]}
                                    >
                                        <AppCheckBox
                                            title={"Nhớ mật khẩu"}
                                            values={this.state.checkedRemember}
                                            onPress={() => {
                                                this.setState({ checkedRemember: !this.state.checkedRemember })
                                                this.props.navigation.navigate("Tab");
                                            }}
                                        />
                                        <Text
                                            style={[
                                                font_weight.f_500,
                                                font.serif,
                                                text_size.sm,
                                                text_color.primary
                                            ]}
                                        >
                                            Quên mật khẩu?
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            { paddingLeft: 15, paddingRight: 15, marginTop: 30 }
                                        ]}
                                    >
                                        <AppButton
                                            disabled = { !this.isFormValid(isValid, touched) }
                                            onPress = { handleSubmit }
                                            //disabled = { !this.isFormValid(isValid, touched) }
                                            title="Đăng nhập"
                                        />
                                    </View>
                                </View>
                                <View
                                    style={[
                                        flex.flex_row,
                                        flex.justify_content_center,
                                        { marginBottom: 20 }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            font_weight.f_500,
                                            font.serif,
                                            text_size.sm
                                        ]}
                                    >
                                        Bạn chưa có tài khoản?&nbsp;
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => { this.viewSignUp() }}
                                    >
                                        <Text
                                            style={[
                                                font_weight.f_500,
                                                font.serif,
                                                text_size.sm,
                                                text_color.primary
                                            ]}
                                        >
                                            Đăng ký
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </SafeAreaView>
                    </HideKeyboard>
                )}
            </Formik>
        );
    }
}

const mapStateToProps = state => {
    console.log(JSON.stringify(state));
    return state;
};

const mapDispatchToProps = {
    doLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
