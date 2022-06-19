import React, { Component, useState } from 'react';
import {
    Alert,
    Keyboard, Pressable, ScrollView, Text, TouchableWithoutFeedback, View, TouchableOpacity
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
import { AppDatePicker } from "../../../components/AppDatePicker";
import moment from "moment";
import { BillsSchema } from "../../../utils/validation/ValidationBill";
import { connect } from 'react-redux';
import { doAddBill } from '../../../redux/actions/bill';
import { color_danger, color_primary } from '../../../utils/theme/Color';
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import { doGetListArea } from "../../../redux/actions/area";
import { doGetRoomByType } from '../../../redux/actions/room';
import { doLoadListContractByRoom } from "../../../redux/actions/contract";
import { doGetPriceOfRoom, doGetTypeOfRoomByArea } from '../../../redux/actions/typeOfRoom';

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

class AddBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            dataTT: [{ 'key': '0', 'label': 'Chưa thanh toán' }, { 'key': '1', 'label': 'Đã thanh toán' }].map(item => ({ key: item.key, label: item.label })),
            dataArea: [],
            dataP: [],
            dataC: [],
            total: "0",
            price: "0",
            typeOfRoom: [],
            typeOfRoomSelect: {'type': ''}
        }

    }

    componentDidMount() {
        this.getListArea();
    }

    getListArea() {
        this.props.doGetListArea({ userId: this.props.user.user.id }).then(data => {
            this.setState({
                dataArea: data.map(item => ({
                    key: item.id,
                    label: item.areaName,
                })),
            })
        })
    }

    getTypeRoom(option){
        this.props.doGetTypeOfRoomByArea({areaId: option.key}).then(data => {
            this.setState({
                typeOfRoom: data.map(item => ({
                    key: item.id,
                    label: item.name,
                }))
            })
        });
    }

    getPhongData(option) {
        // console.log(option.key);
        this.props.doGetRoomByType({ typeOfRoomId: option.key }).then(data => {
            this.setState({
                dataP: data.map(item => ({
                    key: item.id,
                    label: item.roomName,
                })),
            })
        })
        this.props.doGetPriceOfRoom({ typeOfRoomId: option.key }).then(data => {
            this.setState({
                price: data[0].price,
                // total: data[0].price
            })
        })
    }

    getContractData(option) {
        this.props.doLoadListContractByRoom({ roomId: option.key }).then(dataContract => {
            this.setState({
                dataC: dataContract.map(item => ({
                    key: item.id,
                    label: 'Mã HĐ: ' + item.id,
                    dayIn: item.dayIn,
                    duration: item.duration
                })),
            })
        })
    }

    calculatePrice = (option) => {
        let dayIn = new Date(option.dayIn);
        let duration = new Date(option.duration)
        let result = duration.getTime() - dayIn.getTime();
        let price = new Date(result).getDate() * this.state.price;
        this.setState({
            total: String(price),
            price: String(price)
        })

    }

    isFormValid = (isValid, touched) => {
        return isValid && Object.keys(touched).length !== 0;
    }

    componentWillUnmount() {
        this.props.route.params.refresh();
    }

    addBill = (values) => {
        this.props.doAddBill(values).then(data => {
            if (data) {
                alert("Thêm hóa đơn thành công!");
                this.props.navigation.goBack(null);
            } else {
                alert("Thêm hóa đơn thất bại! Vui lòng thử lại!")
            }
        })
    }

    render() {

        return (
            <ScrollView
                style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}
            >
                <Formik
                    initialValues={{
                        nameOfBill: "",
                        dateOfPayment: new Date(),
                        discount: "0", forfeit: "0", total: "0",
                        status: "", note: "", contractId: ""
                    }}
                    validationSchema={BillsSchema}
                    onSubmit={values => {
                        let price = Number(this.state.price) - (Number(this.state.price) * (Number(values.discount) / 100)) + Number(values.forfeit)
                        if (price !== Number(values.total)) {
                            values.total = String(price)
                        }
                        this.addBill(values);
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
                                        style={[width.w_100, {
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            marginTop: 10
                                        }]}>
                                        <AppDialogSelect
                                            lable={'Khu:'}
                                            data={this.state.dataArea}
                                            placeholder={'Vui lòng chọn khu...'}
                                            value={values}
                                            returnFilter={(key) => this.getTypeRoom(key)}
                                        />
                                    </View>
                                    <View
                                        style={[width.w_100, {
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            marginTop: 10
                                        }]}>
                                        <AppDialogSelect
                                            lable={'Loại Phòng:'}
                                            data={this.state.typeOfRoom}
                                            placeholder={'Vui lòng chọn loại phòng...'}
                                            value={this.state.typeOfRoomSelect}
                                            field={'type'}
                                            returnFilter={(option) => this.getPhongData(option)}
                                        />
                                    </View>
                                    <View
                                        style={[width.w_100, {
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            marginTop: 10
                                        }]}>
                                        <AppDialogSelect
                                            lable={'Phòng:'}
                                            data={this.state.dataP}
                                            placeholder={'Vui lòng chọn phòng...'}
                                            value={values}
                                            field={'roomId'}
                                            returnFilter={(option) => this.getContractData(option)}
                                        />
                                    </View>
                                    <View
                                        style={[width.w_100, {
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            marginTop: 10
                                        }]}>
                                        <AppDialogSelect
                                            lable={'Hợp đồng:'}
                                            data={this.state.dataC}
                                            placeholder={'Vui lòng chọn hợp đồng...'}
                                            value={values}
                                            field={'contractId'}
                                            returnFilter={(option) => this.calculatePrice(option)}
                                        />
                                    </View>
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
                                        {errors.nameOfBill && touched.nameOfBill ? (
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
                                            alreadydate={new Date()}
                                        />
                                        {errors.dateOfPayment && touched.dateOfPayment ? (
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
                                            {errors.discount && touched.discount ? (
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
                                            {errors.forfeit && touched.forfeit ? (
                                                <AppError errors={errors.forfeit} />
                                            ) : null}
                                        </View>
                                    </View>
                                    <View
                                        style={[
                                            width.w_100, flex.flex_row, flex.align_items_center, flex.justify_content_between,
                                            { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                        ]}
                                    >
                                        <View style={{
                                            width: '70%'
                                        }}>
                                            <AppInputInf
                                                lable={"Tổng:"}
                                                secureTextEntry={false}
                                                field={"total"}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={this.state.total}
                                                editable={false}
                                                placeholder={this.state.total}
                                            />
                                        </View>
                                        <TouchableOpacity
                                            style={{
                                                borderColor: color_primary, borderWidth: 1, marginTop: 25, paddingHorizontal: 10,
                                                paddingVertical: 12, marginLeft: 5, borderRadius: 10
                                            }}
                                            onPress={() => {
                                                let price = Number(this.state.price) - (Number(this.state.price) * (Number(values.discount) / 100)) + Number(values.forfeit);
                                                this.setState({ total: String(price) })
                                                values.total = String(price);
                                            }}
                                        >
                                            <Text style={{ textAlignVertical: 'center', fontSize: 20 }}>Tính tổng</Text>
                                        </TouchableOpacity>
                                        {errors.total && touched.total ? (
                                            <View />// <AppError errors={errors.total} />
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
                                            placeholder={"Vui lòng chọn tình trạng.."}
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
                                                disabled={!this.isFormValid(isValid, touched)}
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
            </ScrollView>
        );
    }
}

const mapStateToProps = ({ user }) => {
    return { user };
};

const mapDispatchToProps = {
    doAddBill, doGetRoomByType, doLoadListContractByRoom, doGetListArea, doGetPriceOfRoom, doGetTypeOfRoomByArea
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBill)

