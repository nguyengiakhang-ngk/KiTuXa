import React, { Component, useState } from 'react';
import {
    Alert,
    Keyboard, Pressable, ScrollView, Text, Touchable, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    flex, font,
    height, text_size,
    width
} from "../../../utils/styles/MainStyle";
import AppError from "../../../components/AppError";
import { Formik } from "formik";
import AppInputInf from "../../../components/AppInputInf";
import AppDialogSelect from "../../../components/AppDialogSelect";
import AppButton from "../../../components/AppButton";
import axios from "axios";
import { path } from "../../../constant/define";
import { ContractSchema } from "../../../utils/validation/ValidationContract";
import { AppDatePicker } from "../../../components/AppDatePicker";
import moment from "moment";
import { BillsSchema } from "../../../utils/validation/ValidationBill";
import { doUpdateBill, doLoadBillById } from '../../../redux/actions/bill';
import { connect } from 'react-redux';
import { color_danger, color_primary } from '../../../utils/theme/Color';
import AppButtonActionInf from "../../../components/AppButtonActionInf";


const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

class UpdateBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            dataTT: [{ 'key': '0', 'label': 'Chưa thanh toán' }, { 'key': '1', 'label': 'Đã thanh toán' }].map(item => ({ key: item.key, label: item.label }))

        }

    }

    getBillData() {
        this.props.doLoadBillById({ id: this.props.route.params.id }).then(data => {
            this.setState({
                data: data
            })
        })
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
        this.props.doUpdateBill(values, { id: this.props.route.params.id }).then(data => {
            if (data) {
                alert('Cập nhật hóa đơn thành công!');
                this.props.navigation.goBack(null);
            }
        })
    }

    render() {

        return (
            <ScrollView
                style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}
            >
                <Formik
                    enableReinitialize
                    initialValues={{
                        nameOfBill: this.state.data.nameOfBill,
                        dateOfPayment: this.state.data.dateOfPayment,
                        discount: this.state.data.discount,
                        forfeit: this.state.data.forfeit,
                        total: String(this.state.data.total),
                        status: this.state.data.status,
                        note: this.state.data.note
                    }
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
                                            lable={"Tên Hóa Đơn:"}
                                            secureTextEntry={false}
                                            field={"nameOfBill"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                        />
                                        {errors.nameOfBill ? (
                                            <AppError errors={errors.nameOfBill} />
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                        ]}
                                    >
                                        <AppDatePicker
                                            label={"Ngày Thu Tiền:"}
                                            value={values}
                                            field={"dateOfPayment"}
                                            alreadydate={new Date(values.dateOfPayment)}
                                        />
                                        {errors.dateOfPayment ? (
                                            <AppError errors={errors.dateOfPayment} />
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
                                                { paddingLeft: 15, paddingRight: 10, marginTop: 10, flex: 1 }
                                            ]}
                                        >
                                            <AppInputInf
                                                lable={"Giảm giá(%):"}
                                                field={"discount"}
                                                keyboardType={'numeric'}
                                                secureTextEntry={false}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                                maxLength={3}
                                            />
                                            {errors.discount ? (
                                                <AppError errors={errors.discount} />
                                            ) : null}
                                        </View>
                                        <View
                                            style={[
                                                { paddingLeft: 10, paddingRight: 15, marginTop: 10, flex: 1 }
                                            ]}
                                        >
                                            <AppInputInf
                                                lable={"Phạt:"}
                                                keyboardType={'numeric'}
                                                secureTextEntry={false}
                                                field={"forfeit"}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                            />
                                            {errors.forfeit ? (
                                                <AppError errors={errors.forfeit} />
                                            ) : null}
                                        </View>
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                        ]}
                                    >
                                        <AppInputInf
                                            lable={"Tổng:"}
                                            keyboardType={'numeric'}
                                            secureTextEntry={false}
                                            field={"total"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                        />
                                        {errors.total ? (
                                            <AppError errors={errors.total} />
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                        ]}
                                    >
                                        <AppDialogSelect
                                            lable={"Tình Trạng:"}
                                            data={this.state.dataTT}
                                            placeholder={""}
                                            value={values}
                                            field={"status"}
                                            placeholder={this.state.data.status == 0 ? "Chưa thanh toán" : "Đã thanh toán"}
                                        />
                                        {errors.status ? (
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
                                            numberOfLines={3}
                                        />
                                        {errors.note ? (
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
                                                disabled={!this.isFormValid(isValid, values.nameOfBill, values.discount, values.forfeit, values.total, values.note)}
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
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return { state };
};

const mapDispatchToProps = {
    doUpdateBill, doLoadBillById
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBill)
