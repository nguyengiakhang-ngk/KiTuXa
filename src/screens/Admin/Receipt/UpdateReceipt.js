import React, { Component, useState } from 'react';
import {
    Alert, Image,
    Keyboard, Pressable, ScrollView, Text, TouchableWithoutFeedback, View, ActivityIndicator
} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    flex, font,
    height, text_size,
    width
} from "../../../utils/styles/MainStyle";
import { Formik } from "formik";
import AppInputInf from "../../../components/AppInputInf";
import AppDialogSelect from "../../../components/AppDialogSelect";
import AppButton from "../../../components/AppButton";
import axios from "axios";
import { url } from "../../../constant/define";
import { AppDatePicker } from "../../../components/AppDatePicker";
import moment from "moment";
import ImagePicker from "react-native-image-crop-picker";
import { ReceiptSchema } from "../../../utils/validation/ValidationReceipt";
import { connect } from 'react-redux';
import { doGetReceiptById, doUpdateReceipt } from '../../../redux/actions/receipt';
import { color_danger, color_primary } from '../../../utils/theme/Color';
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import Toast from "react-native-toast-message";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

class UpdateReceipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            image: '',
            dataTToanTMCK: [{ 'key': '0', 'label': 'Thanh toán tiền mặt' }, { 'key': '1', 'label': 'Chuyển khoản' }],
            dataTToanCKTM: [{ 'key': '1', 'label': 'Chuyển khoản' }, { 'key': '0', 'label': 'Thanh toán tiền mặt' }],
            dataTT: [{ 'key': '0', 'label': 'Chưa thanh toán' }, { 'key': '1', 'label': 'Đã thanh toán' }].map(item => ({ key: item.key, label: item.label }))

        }

    }

    getReceiptData() {
        this.props.doGetReceiptById({ id: this.props.route.params.id }).then(data => {
            this.setState({ data: data, isLoading: false })
        })
    }

    isFormValid = (isValid, amountOfMoney) => {
        return isValid && String(amountOfMoney).length !== 0;
    }
    // componentDidMount() {
    //     alert(this.props.route.params.ID_HD);
    // }

    componentDidMount() {
        this.getReceiptData();
    }

    componentWillUnmount() {
        this.props.route.params.refresh();
    }

    updateReceipt = (values) => {
        this.setState({ isLoading: true })
        const date = new Date();
        const minutes = date.getMinutes();
        let data = new FormData();
        data.append("image", {
            uri: this.state.image.path,
            type: "image/jpeg",
            name: this.state.image.filename || `temp_image_${minutes}.jpg`
        });
        data.append("receipt", JSON.stringify(values));
        console.log(data);
        this.props.doUpdateReceipt(data, { id: Number(this.props.route.params.id) });
        Toast.show({
            type: 'success',
            text1: 'Biên nhận',
            text2: 'Cập nhật thành công.',
            visibilityTime: 2000,
            autoHide: true
        });
        setTimeout(() => {
            this.setState({ isLoading: false })
            this.props.navigation.goBack();
        }, 1000)
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
                style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}
            >
                <Toast ref={(ref) => { Toast.setRef(ref) }} />
                {
                    this.state.isLoading ?
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={color_primary} />
                        </View>
                        :
                        <Formik
                            enableReinitialize
                            initialValues={
                                {
                                    amountOfMoney: String(this.state.data.amountOfMoney),
                                    dateOfPayment: this.state.data.dateOfPayment,
                                    paymentMethod: this.state.data.paymentMethod,
                                    image: this.state.data.image,
                                    note: this.state.data.note,
                                    status: String(this.state.data.status),
                                    billId: this.state.data.billId
                                }
                            }
                            validationSchema={ReceiptSchema}
                            onSubmit={values => {
                                this.updateReceipt(values);
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
                                                {/*{errors.SoTien ? (*/}
                                                {/*    <AppError errors={errors.SoTien}/>*/}
                                                {/*) : null}*/}
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
                                                    alreadydate={new Date(values.dateOfPayment)}
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
                                                    data={this.state.dataTToanTMCK}
                                                    placeholder={(this.state.dataTToanTMCK.filter(item => item.key === this.state.data.paymentMethod)[0]?.label)}
                                                    value={values}
                                                    field={"paymentMethod"}
                                                />
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 20 }
                                                ]}
                                            >
                                                <Pressable onPress={() => this.ChoosePhotoFromLibrary()}>
                                                    <Image
                                                        source={{
                                                            uri: this.state.image ? this.state.image.path : `${url}/${this.state.data.image}`
                                                        }}
                                                        style={[
                                                            width.w_100,
                                                            {
                                                                height: 250,
                                                                borderRadius: 10,
                                                                borderWidth: 2,
                                                                borderColor: '#E0E0E0'
                                                            }
                                                        ]} />
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
                                                    placeholder={(this.state.dataTT.filter(item => item.key === this.state.data.status)[0]?.label)}
                                                    value={values}
                                                    field={"status"}
                                                />
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
                                                        title="Chỉnh Sửa"
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
    doGetReceiptById, doUpdateReceipt
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateReceipt)