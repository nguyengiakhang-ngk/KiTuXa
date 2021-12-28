import React, {Component} from 'react';
import {
    Keyboard, ScrollView, TouchableWithoutFeedback, View
} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    flex,
    height,
    width
} from "../../utils/styles/MainStyle";
import AppError from "../../components/AppError";
import {Formik} from "formik";
import {AreaSchema} from "../../utils/validation/ValidationArea";
import AppInputInf from "../../components/AppInputInf";
import AppDialogSelect from "../../components/AppDialogSelect";
import AppButton from "../../components/AppButton";
import axios from "axios";
import {path} from "../../utils/config/define";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
export default class UpdateAreaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            khuTro: {},
            ss: ""
        }
    }

    isFormValid = (isValid, touched) => {
        return isValid && Object.keys(touched).length !== 0;
    }

    componentDidMount() {
        this.getUserData();
        this.getAreaById();
    }

    getUserData(){
        axios.get(path + "/getUser")
            .then((response)=>{
                this.setState({
                    isLoading: false,
                    data: response.data.map(item => ({key: item.id_tk, label: item.hoten}))
                });
            })
            .catch((error => {
                console.log(error);
            }));
    }

    getAreaById(){
        axios.get(path + `/getAreaById/${this.props.route.params.id_kt}`)
            .then((response)=>{
                this.setState({
                    khuTro: response.data
                })
            })
            .catch((error => {
                console.log(error);
            }));
    }

    updateArea = (values) => {
        axios.put(path + `/updateArea/${this.props.route.params.id_kt}`,{
            areaName: values.areaName,
            address: values.address,
            totalRoom: values.totalRoom,
            status: values.status,
            time: values.time,
            content: values.content,
            description: values.description,
            id_tk: values.id_tk
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
                        {   areaName: this.state.khuTro.ten_kt,
                            address: this.state.khuTro.diachi,
                            totalRoom: String(this.state.khuTro.sophong),
                            status: String(this.state.khuTro.tinhtrang_quangcao),
                            time: this.state.khuTro.gio_dong_mo_cua,
                            content: this.state.khuTro.noidung,
                            description: this.state.khuTro.mota,
                            id_tk: String(this.state.khuTro.id_tk),
                        }
                    }
                    validationSchema={AreaSchema}
                    onSubmit={ values => {
                            this.updateArea(values);
                        }
                    }
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
                                    { flex: 1, paddingBottom: 15 },
                                    background_color.white,
                                    height.h_100
                                ]}
                                onPress={Keyboard.dismiss}
                            >
                                <View
                                    style={[
                                        width.w_100,
                                        {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                    ]}
                                >
                                    <AppInputInf
                                        lable={"Tên khu:"}
                                        secureTextEntry={false}
                                        field={"areaName"}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                    />
                                    {errors.areaName && touched.areaName ? (
                                        <AppError errors={ errors.areaName }/>
                                    ) : null}
                                </View>
                                <View
                                    style={[
                                        width.w_100,
                                        {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                    ]}
                                >
                                    <AppDialogSelect
                                        lable={"Người đại diện:"}
                                        data={this.state.data}
                                        placeholder={""}
                                        value={values}
                                        field={"id_tk"}
                                        initValue = {
                                            this.state.khuTro.hoten
                                        }
                                    />
                                    {errors.nguoidung && touched.nguoidung ? (
                                        <AppError errors={ errors.nguoidung }/>
                                    ) : null}
                                </View>
                                <View
                                    style={[
                                        width.w_100,
                                        {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                    ]}
                                >
                                    <AppInputInf
                                        lable={"Địa chỉ:"}
                                        secureTextEntry={false}
                                        field={"address"}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                    />
                                    {errors.address && touched.address ? (
                                        <AppError errors={ errors.address }/>
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
                                            lable={"Số phòng:"}
                                            secureTextEntry={false}
                                            keyboardType={'numeric'}
                                            field={"totalRoom"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                        />
                                        {errors.totalRoom && touched.totalRoom ? (
                                            <AppError errors={ errors.totalRoom }/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            {paddingLeft: 10, paddingRight: 15, marginTop: 10, flex: 1}
                                        ]}
                                    >
                                        <AppInputInf
                                            lable={"Tình trạng:"}
                                            keyboardType={'numeric'}
                                            secureTextEntry={false}
                                            field={"status"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                        />
                                        {errors.status && touched.status ? (
                                            <AppError errors={ errors.status }/>
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
                                        lable={"Giờ đóng-mở cửa:"}
                                        secureTextEntry={false}
                                        field={"time"}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                    />
                                    {errors.time && touched.time ? (
                                        <AppError errors={ errors.time }/>
                                    ) : null}
                                </View>
                                <View
                                    style={[
                                        width.w_100,
                                        {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                    ]}
                                >
                                    <AppInputInf
                                        lable={"Nội dung:"}
                                        secureTextEntry={false}
                                        field={"content"}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        multiline={true}
                                        number={4}
                                    />
                                    {errors.content && touched.content ? (
                                        <AppError errors={ errors.content }/>
                                    ) : null}
                                </View>
                                <View
                                    style={[
                                        width.w_100,
                                        {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                    ]}
                                >
                                    <AppInputInf
                                        lable={"Mô tả:"}
                                        secureTextEntry={false}
                                        field={"description"}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        multiline={true}
                                        number={4}
                                    />
                                    {errors.description && touched.description ? (
                                        <AppError errors={ errors.description }/>
                                    ) : null}
                                </View>
                                <View
                                    style={[
                                        width.w_100,
                                        {paddingLeft: 15, paddingRight: 15, marginTop: 30}
                                    ]}
                                >
                                    <AppButton
                                        disabled = { false }
                                        onPress = { handleSubmit }
                                        title="Cập nhật"
                                    />
                                </View>
                            </SafeAreaView>
                        </HideKeyboard>
                    )}
                </Formik>
            </ScrollView>
        );
    }
}

