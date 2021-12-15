import React, {Component} from 'react';
import {
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text, TextInput, TouchableOpacity, TouchableWithoutFeedback,
    View
} from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppButton from "../components/AppButton";
const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
export default class WellComeComponent extends Component{
    state = { checkedRemember: false };
    SignupSchema = Yup.object().shape({
        username: Yup.string()
            .min(6, 'Tên tài khoản quá ngắn!')
            .max(50, 'Tên tài khoản quá dài!')
            .required('Tên tài khoản rỗng!'),
        pass: Yup.string()
            .min(6, 'Mật khẩu quá ngắn!')
            .max(16, 'Mật khẩu quá ngắn dài!')
            .required('Mật khẩu rỗng!')
    });
    isFormValid (isValid, touched){
        return isValid && Object.keys(touched).length !== 0;
    }
    render() {
        return (
            <Formik
                initialValues={{username: "", pass: ""}}
                validationSchema={this.SignupSchema}
                onSubmit={values => {
                    alert(values.username + "-" + values.pass);
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
                        <SafeAreaView style={this.styles.container}>
                            <View style={this.styles.container} onPress={Keyboard.dismiss}>
                                <Icon
                                    raised
                                    name='hotel'
                                    type='font-awesome-5'
                                    color={this.colorBlueDark}
                                    size={50}/>
                                <Text style={[this.styles.textBlue, this.styles.textTitle]}>Ký túc xá</Text>
                            </View>
                            <View style={this.styles.formLogin}>
                                <View>
                                    <View style={this.styles.formControl}>
                                        <View style={[this.styles.formInput]}>
                                            <Icon
                                                name='user-alt'
                                                type='font-awesome-5'
                                                color={this.colorBlueDark}
                                                size={18}/>
                                            <TextInput
                                                placeholder={'Tên tài khoản'} style={ [this.styles.text, this.styles.input] }
                                                onChangeText={handleChange('username')}
                                                onBlur={handleBlur('username')}
                                                value={values.username}
                                            />
                                        </View>
                                        {errors.username && touched.username ? (
                                            <View style={{flexDirection: "row", marginLeft: 15, marginTop: 5}}>
                                                <Icon
                                                    name='exclamation-triangle'
                                                    type='font-awesome-5'
                                                    color={'red'}
                                                    size={16}/>
                                                <Text style={this.styles.textError}>{errors.username}</Text>
                                            </View>
                                        ) : null}
                                    </View>
                                    <View style={this.styles.formControl}>
                                        <View style={[this.styles.formInput]}>
                                            <Icon
                                                name='lock'
                                                type='font-awesome-5'
                                                color={this.colorBlueDark}
                                                size={18}/>
                                            <TextInput
                                                secureTextEntry={true} placeholder={'Mật khẩu'} style={[this.styles.text, this.styles.input]}
                                                onChangeText={handleChange('pass')}
                                                onBlur={handleBlur('pass')}
                                                value={values.pass}
                                            />
                                        </View>
                                        {errors.pass && touched.pass ? (
                                            <View style={{flexDirection: "row", marginLeft: 15, marginTop: 5}}>
                                                <Icon
                                                    name='exclamation-triangle'
                                                    type='font-awesome-5'
                                                    color={'red'}
                                                    size={16}/>
                                                <Text style={this.styles.textError}>{errors.pass}</Text>
                                            </View>
                                        ) : null}
                                    </View>
                                    <View style={[this.styles.formControl, this.styles.viewRow]}>
                                        <CheckBox
                                            containerStyle={this.styles.containerCheckbox}
                                            textStyle={[this.styles.text, this.styles.textBlue, this.styles.titleCheckbox]}
                                            title='Nhớ mật khẩu'
                                            checked={this.state.checkedRemember}
                                            onPress={() => this.setState({checkedRemember: !this.state.checkedRemember})}
                                            uncheckedColor={this.colorBlueDark}
                                            checkedColor={this.colorBlueDark}
                                        />
                                        <Text style={[this.styles.text, this.styles.textBlue]}>Quên mật khẩu?</Text>
                                    </View>
                                    <View style={[this.styles.formAction]}>
                                        <AppButton
                                            disabled = { this.isFormValid(isValid, touched) }
                                            onPress = { handleSubmit }
                                            title="Đăng nhập"/>
                                    </View>
                                </View>
                                <View style={[this.styles.view, {flexDirection: "row", justifyContent: 'center', marginBottom: 20}]}>
                                    <Text style={this.styles.text}>Bạn chưa có tài khoản?&nbsp;</Text>
                                    <Text style={[this.styles.text, this.styles.textBlue]}>Đăng ký</Text>
                                </View>
                            </View>
                        </SafeAreaView>
                    </HideKeyboard>
                )}
            </Formik>
        );
    }
    colorBlueDark = "#0e4582";
    styles = StyleSheet.create({
        containerIOS: {
            flex: 1,
        },
        container: {
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        },
        formLogin: {
            width: '100%',
            flex: 2,
            justifyContent: "space-between"
        },
        textTitle: {
            fontFamily: 'serif',
            fontSize: 35,
            fontWeight: 'bold'
        },
        formControl: {
            width: '100%',
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 15
        },
        formAction: {
            width: '100%',
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 30
        },
        viewRow:{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: "center"
        },
        formInput: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 25,
            backgroundColor: 'white',
            padding: 15,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,
            elevation: 11,
        },
        input: {
            width: '100%',
            paddingRight: 40,
            marginLeft: 10,
            padding: 0
        },
        containerCheckbox: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            padding: 0,
            marginLeft: 0
        },
        titleCheckbox: {
            marginStart: 2
        },
        text: {
            fontWeight: '500',
            fontSize: 18,
            fontFamily: 'serif',
        },
        textBlue: {
            color: this.colorBlueDark
        },
        textWhite: {
            color: '#FFFFFF'
        },
        textError: {
            fontSize: 16,
            fontFamily: 'serif',
            color: 'red',
            marginLeft: 5
        }
    });
}
