import React, { Component, useState } from 'react';
import {
    Alert,
    Keyboard,
    Pressable,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    TextInput
} from 'react-native';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import { background_color, flex, font, font_weight, padding, shadow, text_size, width, height, text_color } from "../../../utils/styles/MainStyle";
import AppError from '../../../components/AppError';
import { Formik } from 'formik';
import AppInputInf from '../../../components/AppInputInf';
import AppDialogSelect from '../../../components/AppDialogSelect';
import AppButton from '../../../components/AppButton';
import axios from 'axios';
import { path } from '../../../constant/define';
import { ContractSchema } from '../../../utils/validation/ValidationContract';
import { AppDatePicker } from '../../../components/AppDatePicker';
import AppSelectSearch from "../../../components/AppSelectSearch";
import moment from 'moment';
import { connect } from 'react-redux';
import { doGetUserById } from '../../../redux/actions/user';
import { doGetRoomById } from '../../../redux/actions/room';
import { doUpdateContract, doLoadListContractById } from '../../../redux/actions/contract';
import { color_danger, color_primary } from '../../../utils/theme/Color';
import AppButtonActionInf from "../../../components/AppButtonActionInf";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

class UpdateContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: {},
            dataP: [],
            dataK: [],
        };
    }

    isFormValid = (isValid, numberOfElectric, numberOfWater) => {
        return isValid && String(numberOfElectric).length && String(numberOfWater).length !== 0;
    };

    getContract() {
        this.props.doLoadListContractById({ id: this.props.route.params.id }).then(data => {
            this.setState({
                data: data
            }, () => {
                console.log(data.roomId);
                this.getPhongData(data.roomId);
                this.getUserData(data.userId);
            })
        })
    }

    getPhongData(id) {
        this.props.doGetRoomById({ id: id }).then(data => {
            console.log("check",data);
            this.setState({
                dataP: [data]
            })

            console.log(data, "Data P : ")
        })
    }
    getUserData(id) {
        this.props.doGetUserById({ userId: id }).then(data => {
            this.setState({
                dataK: [data]
            })

            console.log(data, "Data K : ")
        })
    }

    componentDidMount() {
        this.getContract();
    }
    componentWillUnmount() {
        this.props.route.params.refresh();
    }

    UpdateContract = (values) => {
        this.props.doUpdateContract(values, { id: this.props.route.params.id }).then(data => {
            if (data) {
                alert("Cập nhật hợp đồng thành công!");
                this.props.navigation.goBack(null);
            } else {
                alert("Cập nhật hợp đồng không thành công! Vui lòng thử lại!");
            }
        })
    };



    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        font_weight.bold,
                        text_color.white,
                        width.w_100,
                        background_color.blue,
                        {
                            textAlign: 'center',
                            paddingVertical: 15,
                            lineHeight: 20,
                            letterSpacing: 0,
                        }
                    ]}
                >
                    Cập nhật hợp đồng
                </Text>
                {
                    this.state.data !== {}
                        ?
                        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    userId: this.state.data.userId,
                                    roomId: this.state.data.roomId,
                                    duration: this.state.data.duration,
                                    dateOfPayment: this.state.data.dateOfPayment,
                                    numberOfElectric: this.state.data.numberOfElectric,
                                    numberOfWater: this.state.data.numberOfWater,
                                    dayIn: this.state.data.dayIn,
                                    status: this.state.data.status,
                                    term: this.state.data.term
                                }}
                                validationSchema={ContractSchema}
                                onSubmit={values => {
                                    this.UpdateContract(values);
                                    // this.state.termData
                                    //alert(this.state.date);
                                }}>
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => {
                                    return (
                                        <HideKeyboard>
                                            <SafeAreaView
                                                style={[styles.container, background_color.white, height.h_100]}
                                                onPress={Keyboard.dismiss}>
                                                <View
                                                    style={[width.w_100, styles.splitView]}>
                                                    <AppDialogSelect
                                                        lable={'Phòng:'}
                                                        data={this.state.dataP}
                                                        placeholder={this.state.dataP[0]?.roomName}
                                                        value={values}
                                                        field={'roomId'}
                                                    />
                                                    {errors.roomId && touched.roomId ? (
                                                        <AppError errors={errors.roomId} />
                                                    ) : null}
                                                </View>

                                                <View
                                                    style={[width.w_100, styles.splitView]}>
                                                    <AppDialogSelect
                                                        lable={'Khách thuê:'}
                                                        data={this.state.dataK}
                                                        placeholder={this.state.dataK[0]?.name}
                                                        value={values}
                                                        field={'userId'}
                                                    />
                                                    {errors.userId && touched.userId ? (
                                                        <AppError errors={errors.userId} />
                                                    ) : null}
                                                </View>

                                                <View
                                                    style={[width.w_100, styles.splitView]}>
                                                    <AppDatePicker
                                                        label={'Ngày Vào:'}
                                                        value={values}
                                                        field={'dayIn'}
                                                        alreadydate={new Date()}
                                                        maximumDate={new Date()}
                                                    />
                                                    {errors.dayIn && touched.dayIn ? (
                                                        <AppError errors={errors.dayIn} />
                                                    ) : null}
                                                </View>

                                                <View
                                                    style={[width.w_100, styles.splitView]}>
                                                    <AppDatePicker
                                                        label={'Thời Hạn:'}
                                                        value={values}
                                                        field={'duration'}
                                                        alreadydate={new Date()}
                                                    />
                                                    {errors.ThoiHan && touched.ThoiHan ? (
                                                        <AppError errors={errors.ThoiHan} />
                                                    ) : null}
                                                </View>
                                                <View
                                                    style={[width.w_100, styles.splitView]}>
                                                    <AppDatePicker
                                                        label={'Ngày Thanh Toán:'}
                                                        value={values}
                                                        field={'dateOfPayment'}
                                                        alreadydate={new Date()}
                                                    />
                                                    {errors.dateOfPayment && touched.dateOfPayment ? (
                                                        <AppError errors={errors.dateOfPayment} />
                                                    ) : null}
                                                </View>
                                                <View style={[flex.flex_row, width.w_100]}>
                                                    <View
                                                        style={[{ flex: 1 }, styles.splitView]}>
                                                        <AppInputInf
                                                            lable={'Chỉ Số Nước:'}
                                                            keyboardType={'numeric'}
                                                            secureTextEntry={false}
                                                            field={'numberOfWater'}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            values={values}
                                                        />
                                                        {errors.numberOfWater && touched.numberOfWater ? (
                                                            <AppError errors={errors.numberOfWater} />
                                                        ) : null}
                                                    </View>
                                                    <View
                                                        style={[{ flex: 1 }, styles.splitView]}>
                                                        <AppInputInf
                                                            lable={'Chỉ Số Điện:'}
                                                            keyboardType={'numeric'}
                                                            secureTextEntry={false}
                                                            field={'numberOfElectric'}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            values={values}
                                                        />
                                                        {errors.numberOfElectric && touched.numberOfElectric ? (
                                                            <AppError errors={errors.numberOfElectric} />
                                                        ) : null}
                                                    </View>
                                                </View>
                                                <View
                                                    style={[{ flex: 1 }, styles.splitView]}>
                                                    <AppInputInf
                                                        lable={'Điều khoản:'}
                                                        secureTextEntry={false}
                                                        field={'term'}
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        values={values}
                                                        number={5}
                                                        multiline={true}
                                                        keyboardType="name-phone-pad"
                                                        returnKeyType='none'
                                                    />
                                                    {errors.term && touched.term ? (
                                                        <AppError errors={errors.term} />
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
                                                            disabled={!this.isFormValid(isValid, values.numberOfElectric, values.numberOfWater)}
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
                        :
                        <View />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 15,
    },
    splitView: {
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 10
    }
})

const mapStateToProps = ({ userAddContract }) => {
    return { userAddContract };
};

const mapDispatchToProps = {
    doGetUserById, doGetRoomById, doUpdateContract, doLoadListContractById
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContract)
