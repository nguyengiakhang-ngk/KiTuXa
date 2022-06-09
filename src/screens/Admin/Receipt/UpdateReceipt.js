import React, {Component, useState} from 'react';
import {
    Alert, Image,
    Keyboard, Pressable, ScrollView, Text, TouchableWithoutFeedback, View
} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    flex, font,
    height, text_size,
    width
} from "../../../utils/styles/MainStyle";
import {Formik} from "formik";
import AppInputInf from "../../../components/AppInputInf";
import AppDialogSelect from "../../../components/AppDialogSelect";
import AppButton from "../../../components/AppButton";
import axios from "axios";
import {path} from "../../../constant/define";
import {AppDatePicker} from "../../../components/AppDatePicker";
import moment from "moment";
import ImagePicker from "react-native-image-crop-picker";
import {ReceiptSchema} from "../../../utils/validation/ValidationReceipt";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default class UpdateReceipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            image: '',
            dataTToan: [{'key':'0','label':'Thanh toán tiền mặt'},{'key':'1','label':'Chuyển khoản'}].map(item => ({key: item.key, label: item.label})),
            dataTT: [{'key':'0','label':'Chưa thanh toán'},{'key':'1','label':'Đã thanh toán'}].map(item => ({key: item.key, label: item.label}))

        }

    }

    getReceiptData(){
        axios.get(path + `/getReceiptByID/${this.props.route.params.ID_BN}`)
            .then((response)=>{
                this.setState({
                    isLoading: false,
                    data: response.data
                });
            })
            .catch((error => {
                console.log(error);
            }));
    }

    isFormValid = (isValid,SoTien) => {
        return isValid && String(SoTien).length !== 0;
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
        if (this.state.image !== ''){
            let dataupdateBN = new FormData();
            dataupdateBN.append("Anh_GD", {
                uri: this.state.image,
                type: "image/jpeg",
                name: this.state.image.filename || `temp_image.jpg`
            });
            dataupdateBN.append("SoTien",  values.SoTien);
            dataupdateBN.append("ThoiGian_ThuTien",  moment(values.ThoiGian_ThuTien).format("YYYY-MM-DD"));
            dataupdateBN.append("PT_ThanhToan",  values.PT_ThanhToan);
            dataupdateBN.append("Ghi_Chu",  values.Ghi_Chu);
            dataupdateBN.append("Tinh_Trang",  values.Tinh_Trang);
            axios.put(path + `/updateReceiptwithImage/${this.props.route.params.ID_BN}`,
                dataupdateBN
            )
                .then((response)=>{
                    if(response.data){
                        this.props.navigation.goBack();
                    }
                })
                .catch((error => {
                    console.log(error);
                }));
        }else{
            axios.put(path + `/updateReceiptwithoutImage/${this.props.route.params.ID_BN}`,{
                SoTien: values.SoTien,
                ThoiGian_ThuTien: moment(values.ThoiGian_ThuTien).format("YYYY-MM-DD"),
                PT_ThanhToan: values.PT_ThanhToan,
                Ghi_Chu: values.Ghi_Chu,
                Tinh_Trang: values.Tinh_Trang,
            })
                .then((response)=>{
                    if(response.data){
                        this.props.navigation.goBack();
                    }
                })
                .catch((error => {
                    console.log(error);
                }));
        }
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
                    enableReinitialize
                    initialValues={
                        {
                            SoTien: String(this.state.data.SoTien),
                            //ThoiGian_ThuTien: moment(this.state.data.ThoiGian_ThuTien).format('DD-MM-YYYY'),
                            ThoiGian_ThuTien: this.state.data.ThoiGian_ThuTien,
                            PT_ThanhToan: this.state.data.PT_ThanhToan,
                            Ghi_Chu: this.state.data.Ghi_Chu,
                            Tinh_Trang: String(this.state.data.Tinh_Trang)
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
                                        {/*{errors.SoTien ? (*/}
                                        {/*    <AppError errors={errors.SoTien}/>*/}
                                        {/*) : null}*/}
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
                                            alreadydate={new Date(values.ThoiGian_ThuTien)}
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
                                            placeholder={""}
                                            value={values}
                                            field={"PT_ThanhToan"}
                                            initValue = {
                                                this.state.data.PT_ThanhToan == 0 ? "Thanh Toán Tiền Mặt" : "Chuyển Khoản"
                                            }
                                        />
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 20}
                                        ]}
                                    >
                                        <Pressable onPress = {() => this.ChoosePhotoFromLibrary()}>
                                            <Image
                                                source={{
                                                    uri: this.state.image ? this.state.image : `${path}/${this.state.data.Anh_GD}`
                                                }}
                                                style={[
                                                    width.w_100,
                                                    {
                                                        height: 250,
                                                        borderRadius: 10,
                                                        borderWidth: 2,
                                                        borderColor: '#E0E0E0'
                                                    }
                                                ]}/>
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
                                            placeholder={""}
                                            value={values}
                                            field={"Tinh_Trang"}
                                            initValue = {
                                                this.state.data.Tinh_Trang == 0 ? "Chưa Thanh Toán" : "Đã Thanh Toán"
                                            }
                                        />
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
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 30}
                                        ]}
                                    >
                                        <AppButton
                                            disabled={!this.isFormValid(isValid, values.SoTien)}
                                            onPress={ handleSubmit }
                                            //onPress={() => alert(this.state.image)}
                                            title="Chỉnh Sửa"
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

