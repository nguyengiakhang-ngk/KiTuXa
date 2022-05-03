import React, {Component} from 'react';
import {
    Keyboard,
    SafeAreaView,
    Text, TouchableOpacity, TouchableWithoutFeedback,
    View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Formik } from 'formik';
import AppButton from "../../components/AppButton";
import {SignupSchema} from "../../utils/validation/ValidateLogin";
import AppError from "../../components/AppError";
import AppInputAuth from "../../components/AppInputAuth";
import AppCheckBox from "../../components/AppCheckBox";
import {background_color, flex, font, font_weight, text_color, text_size, width} from "../../utils/styles/MainStyle";
import {color_primary} from "../../utils/theme/Color";
import {connect} from "react-redux";
// import login from "../../redux/reducers/login";
import { loadListArea } from "../../redux/actions/area";
const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class LoginScreen extends Component{
    state = { checkedRemember: false };
    isFormValid (isValid, touched){
        return isValid && Object.keys(touched).length !== 0;
    }
    componentDidMount() {
        this.props.loadListArea();
    };
    viewSignUp = () => {
        this.props.navigation.navigate("SignUp");
    }
    login = async (username, password) => {
        // alert(username + "-" + password);
        // fetch("http://192.168.76.102:3001/login", {
        //     method: "POST",
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         "username": username,
        //         "password": password
        //     })
        // })
        // .then((response) => response.json())
        // .then((responseJson) => {
        //     alert(responseJson);
        // })
        // .catch((error => {console.log(error)}));
        // axios.post(path + "/login",{
        //     username: username,
        //     password: password
        // })
        // .then((response)=>{
        //     if(response.data){
        //         this.props.navigation.replace("Tab");
        //     }else{
        //         alert("Đăng nhập không thành công!");
        //     }
        // })
        // .catch((error => {
        //     console.log(error);
        // }));
    }
    render() {
        return (
            <Formik
                initialValues={{username: "", pass: ""}}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    // this.login(values.username, values.pass);
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
                                        <AppInputAuth
                                            secureTextEntry={false}
                                            placeholder={"Tên tài khoản"}
                                            field={"username"}
                                            icon={"user-alt"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                        />
                                        {errors.username && touched.username ? (
                                            <AppError errors={ errors.username } marginLeft={15}/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 15}
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
                                            <AppError errors={ errors.pass } marginLeft={15}/>
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
                                            // disabled = { !this.isFormValid(isValid, touched) }
                                            // onPress = { handleSubmit }
                                            onPress={() => {
                                                this.props.navigation.navigate("TabUser");
                                            }}
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
    console.log(JSON.stringify(state.area.areList));
    return state;
};

const mapDispatchToProps = {
    loadListArea
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
