import React, { Component, useState } from 'react';
import {
    Image, ImageBackground,
    Keyboard, Pressable, ScrollView, TouchableWithoutFeedback, View, Text, ActivityIndicator
} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    height,
    width,
    text_size,
    font,
    flex,
    text_color,
    font_weight
} from "../../../utils/styles/MainStyle";
import AppError from "../../../components/AppError";
import { Formik } from "formik";
import AppInputInf from "../../../components/AppInputInf";
import AppDialogSelect from "../../../components/AppDialogSelect";
import AppButton from "../../../components/AppButton";
import axios from "axios";
import { path } from "../../../constant/define";
import { AppDatePicker } from "../../../components/AppDatePicker";
import moment from "moment";
import { ReceiptSchema } from "../../../utils/validation/ValidationReceipt";
import AppItemHome from "../../../components/AppItemHome";
import ImagePicker from 'react-native-image-crop-picker';
import { Icon } from "@rneui/base";
import { connect } from 'react-redux';
import { doAddReceipt } from '../../../redux/actions/receipt';
import { color_danger, color_primary } from '../../../utils/theme/Color';
import AppButtonActionInf from "../../../components/AppButtonActionInf";



const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

class AddReceipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [],
            image: '',
            dataTT: [{ 'key': '0', 'label': 'Chưa thanh toán' }, { 'key': '1', 'label': 'Đã thanh toán' }].map(item => ({ key: item.key, label: item.label })),
            dataTToan: [{ 'key': '0', 'label': 'Thanh toán tiền mặt' }, { 'key': '1', 'label': 'Chuyển khoản' }].map(item => ({ key: item.key, label: item.label }))

        }

    }


    isFormValid = (isValid, amountOfMoney) => {
        return isValid && String(amountOfMoney).length !== 0;
    }
    // componentDidMount() {
    //     alert(this.props.route.params.ID_HD);
    // }

    componentWillUnmount() {
        this.props.route.params.refresh();
    }

    addReceipt = (values) => {
        const date = new Date();
        const minutes = date.getMinutes();
        let data = new FormData();
        data.append("image", {
            uri: this.state.image.path,
            type: "image/jpeg",
            name: this.state.image.filename || `temp_image_${minutes}.jpg`
        });
        data.append("receipt", JSON.stringify(values));
        this.props.doAddReceipt(data).then(data => {
            if (data) {
                this.setState({ isLoading: true })
                Toast.show({
                    type: 'success',
                    text1: 'Biên nhận',
                    text2: 'Thêm thành công.',
                    visibilityTime: 2000,
                    autoHide: true
                });
                setTimeout(() => {
                    this.setState({ isLoading: false })
                    this.props.navigation.goBack();
                }, 2000)
                // alert("Thêm biên nhận thành công!");
                // this.props.navigation.goBack(null);
            }
            else {
                alert("Thêm biên nhận không thành công! Vui lòng thử lại!");
            }
        })
    }

    ChoosePhotoFromLibrary() {
        ImagePicker.openPicker({
            multiple: false,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            compressImageQuality: 0.8,
            mediaType: "any",
            includeBase64: true,
        }).then(res => {
            this.setState({
                image: {
                    filename: res.filename,
                    path: res.path,
                    data: res.data
                }
            })
        });
    }

    render() {

        return (
            <ScrollView
                style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
                {
                    this.state.isLoading
                        ?
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <ActivityIndicator size="large" color={color_primary} />
                        </View>
                        :
                        <Formik
                            initialValues={{
                                amountOfMoney: "",
                                dateOfPayment: new Date(),
                                paymentMethod: '0',
                                image: "",
                                note: "",
                                status: '0',
                                billId: this.props.route.params.billId
                            }}
                            validationSchema={ReceiptSchema}
                            onSubmit={values => {
                                this.addReceipt(values);
                                //alert(this.state.date);
                            }}
                        >
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit, values,
                                errors,
                                touched,
                                isValid
                            }) => {
                                return (
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
                                                    { paddingLeft: 15, paddingRight: 10, marginTop: 10 }
                                                ]}
                                            >
                                                <AppInputInf
                                                    lable={"Số Tiền:"}
                                                    secureTextEntry={false}
                                                    field={"amountOfMoney"}
                                                    keyboardType={'numeric'}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    values={values}
                                                />
                                                {errors.amountOfMoney && touched.amountOfMoney ? (
                                                    <AppError errors={errors.amountOfMoney} />
                                                ) : null}
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                                ]}
                                            >
                                                <AppDatePicker
                                                    label={"Thời Gian Thu Tiền:"}
                                                    value={values}
                                                    field={"dateOfPayment"}
                                                    alreadydate={new Date()}
                                                />
                                            </View>

                                            <View
                                                style={[
                                                    width.w_100,
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                                ]}
                                            >
                                                <AppDialogSelect
                                                    lable={"Phương thức thanh toán:"}
                                                    data={this.state.dataTToan}
                                                    placeholder={"Chọn phương thức thanh toán..."}
                                                    value={values}
                                                    field={"paymentMethod"}
                                                />
                                                {errors.paymentMethod && touched.paymentMethod ? (
                                                    <AppError errors={errors.paymentMethod} />
                                                ) : null}
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 20 }
                                                ]}
                                            >
                                                {/*<AppItemHome*/}
                                                {/*    bg = {'orange'}*/}
                                                {/*    name = 'file-invoice-dollar'*/}
                                                {/*    size = {200}*/}
                                                {/*    color = {'white'}*/}
                                                {/*    colorText = {'black'}*/}
                                                {/*    // label = {'Biên nhận'}*/}
                                                {/*    onPress = {() => this.ChoosePhotoFromLibrary()}*/}
                                                {/*/>*/}
                                                <Pressable onPress={() => this.ChoosePhotoFromLibrary()}>
                                                    {this.state.image.length == 0 ?
                                                        <Icon
                                                            name={'image'}
                                                            type='font-awesome-5'
                                                            size={200}
                                                            color={'#CCC'}
                                                        />
                                                        :
                                                        <Image
                                                            source={{
                                                                uri: this.state.image.path
                                                            }}
                                                            style={[
                                                                width.w_100,
                                                                {
                                                                    height: 200,
                                                                    borderRadius: 10,
                                                                    borderWidth: 2,
                                                                    borderColor: '#E0E0E0'
                                                                }
                                                            ]} />
                                                    }
                                                </Pressable>
                                            </View>

                                            <View
                                                style={[
                                                    width.w_100,
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 20 }
                                                ]}
                                            >
                                                <AppDialogSelect
                                                    lable={"Tình Trạng:"}
                                                    data={this.state.dataTT}
                                                    placeholder={"Vui lòng chọn tình trạng..."}
                                                    value={values}
                                                    field={"status"}
                                                />
                                                {errors.status && touched.status ? (
                                                    <AppError errors={errors.status} />
                                                ) : null}
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                                ]}
                                            >
                                                <AppInputInf
                                                    lable={"Ghi Chú:"}
                                                    secureTextEntry={false}
                                                    field={"note"}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    values={values}
                                                    multiline={true}
                                                    number={4}
                                                />
                                                {errors.note && touched.note ? (
                                                    <AppError errors={errors.note} />
                                                ) : null}
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    flex.flex_row,
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 20 }
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
                                                        onPress={() => { this.props.navigation.goBack() }}
                                                        title="Hủy"
                                                    />
                                                </View>
                                                <View
                                                    style={{ flex: 1 }}
                                                >
                                                    <AppButtonActionInf
                                                        size={13}
                                                        textSize={18}
                                                        bg={color_primary}
                                                        disabled={!this.isFormValid(isValid, values.amountOfMoney)}
                                                        onPress={handleSubmit}
                                                        //onPress={() => alert(values.Ten_HD)}
                                                        title="Thêm"
                                                    />
                                                </View>
                                            </View>
                                        </SafeAreaView>
                                    </HideKeyboard>
                                );
                            }}
                        </Formik>
                }
            </ScrollView>

        );
    }
}

const mapStateToProps = state => {
    return { state };
};

const mapDispatchToProps = {
    doAddReceipt
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReceipt)