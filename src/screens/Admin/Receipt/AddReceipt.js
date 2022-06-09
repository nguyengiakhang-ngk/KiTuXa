import React, {Component, useState} from 'react';
import {
    Image, ImageBackground,
    Keyboard, Pressable, ScrollView, TouchableWithoutFeedback, View
} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    height,
    width
} from "../../../utils/styles/MainStyle";
import AppError from "../../../components/AppError";
import {Formik} from "formik";
import AppInputInf from "../../../components/AppInputInf";
import AppDialogSelect from "../../../components/AppDialogSelect";
import AppButton from "../../../components/AppButton";
import axios from "axios";
import {path} from "../../../constant/define";
import {AppDatePicker} from "../../../components/AppDatePicker";
import moment from "moment";
import {ReceiptSchema} from "../../../utils/validation/ValidationReceipt";
import AppItemHome from "../../../components/AppItemHome";
import ImagePicker from 'react-native-image-crop-picker';
import {Icon} from "@rneui/base";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default class AddReceipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            image: '',
            dataTT: [{'key':'0','label':'Chưa thanh toán'},{'key':'1','label':'Đã thanh toán'}].map(item => ({key: item.key, label: item.label})),
            dataTToan: [{'key':'0','label':'Thanh toán tiền mặt'},{'key':'1','label':'Chuyển khoản'}].map(item => ({key: item.key, label: item.label}))

        }

    }


    isFormValid = (isValid, touched) => {
        return isValid && Object.keys(touched).length !== 0;
    }
    // componentDidMount() {
    //     alert(this.props.route.params.ID_HD);
    // }

    componentWillUnmount() {
        this.props.route.params.refresh();
    }

    addReceipt = (values) => {
        let dataImage = new FormData();
        dataImage.append("Anh_GD", {
            uri: this.state.image,
            type: "image/jpeg",
            name: this.state.image.filename || `temp_image.jpg`
        });
        dataImage.append("ID_HD", this.props.route.params.ID_HD);
        dataImage.append("SoTien",  values.SoTien);
        dataImage.append("ThoiGian_ThuTien",  moment(values.ThoiGian_ThuTien).format("YYYY-MM-DD"));
        dataImage.append("PT_ThanhToan",  values.PT_ThanhToan);
        dataImage.append("Ghi_Chu",  values.Ghi_Chu);
        dataImage.append("Tinh_Trang",  values.Tinh_Trang);
        axios.post(path + "/addReceipt",
        dataImage
        )
            .then((response)=>{
                if(response.data){
                    this.props.navigation.goBack();
                }
            })
            .catch((error => {
                console.log(error);
            }));
    }

    ChoosePhotoFromLibrary(){
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            //alert(image.path);
            this.setState({
                image: image.path
            })
        });
    }

    render() {

        return (
            <ScrollView
                style={{ flex: 1}} contentContainerStyle={{ flexGrow: 1 }}
            >
                <Formik
                    initialValues={{SoTien: "", ThoiGian_ThuTien: new Date(), PT_ThanhToan: "", Anh_GD: "", Ghi_Chu: "", Tinh_Trang:""}}
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
                          touched ,
                          isValid
                      }) => {
                        return (
                            <HideKeyboard>
                                <SafeAreaView
                                    style={[
                                        {flex: 1, paddingBottom: 15},
                                        background_color.white,
                                        height.h_100
                                    ]}
                                    onPress={Keyboard.dismiss}
                                >
                                    <View
                                        style={[
                                            {paddingLeft: 15, paddingRight: 10, marginTop: 10}
                                        ]}
                                    >
                                        <AppInputInf
                                            lable={"Số Tiền:"}
                                            secureTextEntry={false}
                                            field={"SoTien"}
                                            keyboardType={'numeric'}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                        />
                                        {errors.SoTien && touched.SoTien ? (
                                            <AppError errors={errors.SoTien}/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                        ]}
                                    >
                                        <AppDatePicker
                                            label={"Thời Gian Thu Tiền:"}
                                            value={values}
                                            field={"ThoiGian_ThuTien"}
                                            alreadydate={new Date()}
                                        />
                                    </View>

                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                        ]}
                                    >
                                        <AppDialogSelect
                                            lable={"Phương thức thanh toán:"}
                                            data={this.state.dataTToan}
                                            placeholder={"Vui lòng chọn phương thức thanh toán.."}
                                            value={values}
                                            field={"PT_ThanhToan"}
                                        />
                                        {errors.PT_ThanhToan && touched.PT_ThanhToan ? (
                                            <AppError errors={errors.PT_ThanhToan}/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 20}
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
                                        <Pressable onPress = {() => this.ChoosePhotoFromLibrary()}>
                                            {this.state.image.length == 0 ?
                                                <Icon
                                                    name= {'image'}
                                                    type='font-awesome-5'
                                                    size={200}
                                                    color={'#CCC'}
                                                />
                                                :
                                                <Image
                                                    source={{
                                                        uri: this.state.image,
                                                    }}
                                                    style={[
                                                        width.w_100,
                                                        {
                                                            height: 200,
                                                            borderRadius: 10,
                                                            borderWidth: 2,
                                                            borderColor: '#E0E0E0'
                                                        }
                                                    ]}/>
                                            }
                                        </Pressable>
                                    </View>

                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 20}
                                        ]}
                                    >
                                        <AppDialogSelect
                                            lable={"Tình Trạng:"}
                                            data={this.state.dataTT}
                                            placeholder={"Vui lòng chọn tình trạng.."}
                                            value={values}
                                            field={"Tinh_Trang"}
                                        />
                                        {errors.Tinh_Trang && touched.Tinh_Trang ? (
                                            <AppError errors={errors.Tinh_Trang}/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                        ]}
                                    >
                                        <AppInputInf
                                            lable={"Ghi Chú:"}
                                            secureTextEntry={false}
                                            field={"Ghi_Chu"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            multiline={true}
                                            number={4}
                                        />
                                        {errors.Ghi_Chu && touched.Ghi_Chu ? (
                                            <AppError errors={errors.Ghi_Chu}/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 30}
                                        ]}
                                    >
                                        <AppButton
                                            disabled={!this.isFormValid(isValid, touched)}
                                            onPress={handleSubmit}
                                            //onPress={() => alert(values.Ten_HD)}
                                            title="Thêm"
                                        />
                                    </View>
                                </SafeAreaView>
                            </HideKeyboard>
                        );
                    }}
                </Formik>
            </ScrollView>
        );
    }
}

