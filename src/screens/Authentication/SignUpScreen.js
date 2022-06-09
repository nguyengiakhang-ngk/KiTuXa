import React, {Component} from 'react';
import {
    Keyboard,
    SafeAreaView, ScrollView, Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { Formik } from 'formik';
import {SignupSchema} from "../../utils/validation/ValidateSignUp";
import {
    background_color,
    flex, font,
    height,
    width
} from "../../utils/styles/MainStyle";
import AppInputInf from "../../components/AppInputInf";
import AppError from "../../components/AppError";
import AppButton from "../../components/AppButton";
import AppRadioButton from "../../components/AppRadioButton";
import { connect } from 'react-redux';
import { doSignUp } from '../../redux/actions/user';
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
                    value: '1'
                },
                {
                    label: 'Nữ',
                    value: '0'
                },
            ]
        }
    }

    isFormValid (isValid, touched){
        return isValid && Object.keys(touched).length !== 0;
    }

    signUp = async (values) => {
        this.props.doSignUp(values).then(data => {
            if(data){
                alert("Đăng ký thành công!");
                this.props.navigation.replace('Login');
            }else{
                alert("Đăng ký thất bại! Vui lòng thử lại!");
            }
        });
        
    }

    render() {
        return (
            <ScrollView
                style={{ flex: 1}} contentContainerStyle={{ flexGrow: 1 }}
            >
                <Formik
                    initialValues={{name: '', yearOfBirth: '', gender: 1, address: '', identityNumber: '', numberPhone: '', password: '', rePass: '', permission: 0}}
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
                                        {paddingLeft: 15, paddingRight: 15, marginTop: 30}
                                    ]}
                                >
                                    <AppButton
                                        disabled = { !this.isFormValid(isValid, touched) || values.password !== values.rePass }
                                        onPress = { handleSubmit }
                                        title="Thêm"
                                    />
                                </View>
                            </SafeAreaView>
                        </HideKeyboard>
                    )}
                </Formik>
            </ScrollView>
        );
    }
}

const mapStateToProps = (doSignUp) => {
    return doSignUp;
};

const mapDispatchToProps = {
    doSignUp
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
