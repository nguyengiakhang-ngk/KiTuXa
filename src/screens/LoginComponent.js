import React, {Component} from 'react';
import {
    Keyboard,
    SafeAreaView,
    Text, TouchableWithoutFeedback,
    View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Formik } from 'formik';
import AppButton from "../components/AppButton";
import {SignupSchema} from "../utils/validation/ValidateLogin";
import AppError from "../components/AppError";
import AppInputAuth from "../components/AppInputAuth";
import AppCheckBox from "../components/AppCheckBox";
import {background_color, flex, font, font_weight, text_color, text_size, width} from "../utils/styles/MainStyle";
import {color_primary} from "../utils/theme/Color";
const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
export default class WellComeComponent extends Component{
    state = { checkedRemember: false };
    isFormValid (isValid, touched){
        return isValid && Object.keys(touched).length !== 0;
    }
    render() {
        return (
            <Formik
                initialValues={{username: "", pass: ""}}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    alert(values.username + "-" + values.pass + "-" + this.state.checkedRemember);
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
                                {flex: 1},
                                background_color.white,
                                flex.justify_content_center,
                                flex.align_items_center
                            ]}
                        >
                            <View
                                style={[
                                    {flex: 1},
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
                                    {flex: 2},
                                    flex.justify_content_between
                                ]}
                            >
                                <View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 15}
                                        ]}
                                    >
                                        <AppInputAuth placeholder={"Tên tài khoản"}
                                                      field={"username"}
                                                      icon={"user-alt"}
                                                      handleChange={handleChange}
                                                      handleBlur={handleBlur}
                                                      values={values}
                                        />
                                        {errors.username && touched.username ? (
                                            <AppError errors={ errors.username }/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 15}
                                        ]}
                                    >
                                        <AppInputAuth placeholder={"Mật khẩu"}
                                                      field={"pass"}
                                                      icon={"lock"}
                                                      handleChange={handleChange}
                                                      handleBlur={handleBlur}
                                                      values={values}
                                        />
                                        {errors.pass && touched.pass ? (
                                            <AppError errors={ errors.pass }/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 15},
                                            flex.flex_row,
                                            flex.align_items_center,
                                            flex.justify_content_between
                                        ]}
                                    >
                                        <AppCheckBox
                                            title={"Nhớ mật khẩu"}
                                            values={this.state.checkedRemember}
                                            onPress={() => this.setState({checkedRemember: !this.state.checkedRemember})}
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
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 30}
                                        ]}
                                    >
                                        <AppButton
                                            disabled = { !this.isFormValid(isValid, touched) }
                                            onPress = { handleSubmit }
                                            title="Đăng nhập"
                                        />
                                    </View>
                                </View>
                                <View
                                    style={[
                                        flex.flex_row,
                                        flex.justify_content_center,
                                        {marginBottom: 20}
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
                                </View>
                            </View>
                        </SafeAreaView>
                    </HideKeyboard>
                )}
            </Formik>
        );
    }
}
