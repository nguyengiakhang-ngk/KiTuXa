import React, {Component, useState} from 'react';
import {
    Alert,
    Keyboard, Pressable, ScrollView, Text, TouchableWithoutFeedback, View
} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    flex, font,
    height, text_size,
    width
} from "../../../utils/styles/MainStyle";
import AppError from "../../../components/AppError";
import {Formik} from "formik";
import AppInputInf from "../../../components/AppInputInf";
import AppDialogSelect from "../../../components/AppDialogSelect";
import AppButton from "../../../components/AppButton";
import axios from "axios";
import {path} from "../../../constant/define";
import {ContractSchema} from "../../../utils/validation/ValidationContract";
import {AppDatePicker} from "../../../components/AppDatePicker";
import moment from "moment";
import {BillsSchema} from "../../../utils/validation/ValidationBill";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default class UpdateBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            dataTT: [{'key':'0','label':'Chưa thanh toán'},{'key':'1','label':'Đã thanh toán'}].map(item => ({key: item.key, label: item.label}))

        }

    }

    getBillData(){
        axios.get(path + `/getBillByID/${this.props.route.params.ID_HDon}`)
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

    isFormValid = (isValid, Ten_HD, GiamGia, Phat, Tong, GhiChu) => {
        return isValid && String(Ten_HD).length && String(GiamGia).length && String(Phat).length && String(Tong).length && String(GhiChu).length !== 0;
    }
    // componentDidMount() {
    //     alert(this.props.route.params.ID_HD);
    // }

    componentDidMount() {
        this.getBillData();
    }

    componentWillUnmount() {
        this.props.route.params.refresh();
    }

    updateBill = (values) => {
        axios.put(path + `/updateBill/${this.props.route.params.ID_HDon}`,{
            Ten_HD: values.Ten_HD,
            NgayThuTien: moment(values.NgayThuTien).format("YYYY-MM-DD"),
            GiamGia: values.GiamGia,
            Phat: values.Phat,
            Tong: values.Tong,
            TinhTrang: values.TinhTrang,
            GhiChu: values.GhiChu
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

    render() {

        return (
            <ScrollView
                style={{ flex: 1}} contentContainerStyle={{ flexGrow: 1 }}
            >
                <Formik
                    enableReinitialize
                    initialValues={
                        {   Ten_HD: this.state.data.Ten_HD,
                            NgayThuTien: this.state.data.NgayThuTien,
                            GiamGia: this.state.data.GiamGia,
                            Phat: this.state.data.Phat,
                            Tong: String(this.state.data.Tong),
                            TinhTrang:this.state.data.TinhTrang,
                            GhiChu:this.state.data.GhiChu}
                    }
                    validationSchema={BillsSchema}
                    onSubmit={values => {
                        this.updateBill(values);
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
                                            lable={"Tên Hóa Đơn:"}
                                            secureTextEntry={false}
                                            field={"Ten_HD"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                        />
                                        {errors.Ten_HD? (
                                            <AppError errors={errors.Ten_HD}/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                        ]}
                                    >
                                        <AppDatePicker
                                            label={"Ngày Thu Tiền:"}
                                            value={values}
                                            field={"NgayThuTien"}
                                            alreadydate={new Date(values.NgayThuTien)}
                                        />
                                        {errors.NgayThuTien? (
                                            <AppError errors={errors.NgayThuTien}/>
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
                                                lable={"Giảm giá(%):"}
                                                field={"GiamGia"}
                                                keyboardType={'numeric'}
                                                secureTextEntry={false}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                                maxLength={3}
                                            />
                                            {errors.GiamGia? (
                                                <AppError errors={errors.GiamGia}/>
                                            ) : null}
                                        </View>
                                        <View
                                            style={[
                                                {paddingLeft: 10, paddingRight: 15, marginTop: 10, flex: 1}
                                            ]}
                                        >
                                            <AppInputInf
                                                lable={"Phạt:"}
                                                keyboardType={'numeric'}
                                                secureTextEntry={false}
                                                field={"Phat"}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                            />
                                            {errors.Phat? (
                                                <AppError errors={errors.Phat}/>
                                            ) : null}
                                        </View>
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                        ]}
                                    >
                                        <AppInputInf
                                            lable={"Tổng:"}
                                            keyboardType={'numeric'}
                                            secureTextEntry={false}
                                            field={"Tong"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                        />
                                        {errors.Tong? (
                                            <AppError errors={errors.Tong}/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                        ]}
                                    >
                                        <AppDialogSelect
                                            lable={"Tình Trạng:"}
                                            data={this.state.dataTT}
                                            placeholder={""}
                                            value={values}
                                            field={"TinhTrang"}
                                            initValue = {
                                                this.state.data.TinhTrang == 0 ? "Chưa Thanh Toán" : "Đã Thanh Toán"
                                            }
                                        />
                                        {errors.TinhTrang? (
                                            <AppError errors={errors.TinhTrang}/>
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
                                            field={"GhiChu"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            numberOfLines={3}
                                        />
                                        {errors.GhiChu? (
                                            <AppError errors={errors.GhiChu}/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 30}
                                        ]}
                                    >
                                        <AppButton
                                            disabled={!this.isFormValid(isValid, values.Ten_HD, values.GiamGia, values.Phat, values.Tong, values.GhiChu)}
                                            onPress={handleSubmit}
                                            //onPress={() => alert(values.Ten_HD)}
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

