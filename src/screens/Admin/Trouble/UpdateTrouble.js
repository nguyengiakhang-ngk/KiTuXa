import React, { Component, useState } from 'react';
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
import { doGetTroubleById, doUpdateTrouble } from '../../../redux/actions/trouble'
import { TroubleSchema } from '../../../utils/validation/ValidationTrouble';
import { color_danger, color_primary } from '../../../utils/theme/Color';
import AppButtonActionInf from "../../../components/AppButtonActionInf";


const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

class UpdateTrouble extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            image: '',
            dataMD: [
                {
                    'key': '0',
                    'label': 'Thấp'
                },
                {
                    'key': '1',
                    'label': 'Trung bình'
                },
                {
                    'key': '2',
                    'label': 'Cao'
                }
            ],
            dataTT: [
                {
                    'key': 0,
                    'label': 'Chưa giải quyết'
                },
                {
                    'key': 1,
                    'label': 'Đã giải quyết'
                }
            ]
        }

    }

    getTroubleData() {
        this.props.doGetTroubleById({ id: this.props.route.params.id }).then(data => {
            this.setState({ data: data }, () => console.log('trb: ', data))
        })
    }

    isFormValid = (name, level, image) => {
        return String(name).length !== 0 && String(level).length !== 0 && image;
    }

    componentDidMount() {
        this.getTroubleData();
    }

    componentWillUnmount() {
        this.props.route.params.refresh();
    }

    updateTrouble = (values) => {
        console.log("Values>>>>",JSON.stringify(values));
        const date = new Date();
        const minutes = date.getMinutes();
        let data = new FormData();
        data.append("image", {
            uri: this.state.image.path,
            type: "image/jpeg",
            name: this.state.image.filename || `temp_image_${minutes}.jpg`
        });
        data.append("trouble", JSON.stringify(values));
        this.props.doUpdateTrouble(data, { id: this.props.route.params.id }).then(data => {
            console.log("returnData>>>",data);
            if (data) {
                alert("Cập nhật sự cố thành công!");
                this.props.navigation.goBack(null);
            } else {
                alert("Cập nhật sự cố không thành công! Vui lòng thử lại!");
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
                style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}
            >
                <Formik
                    enableReinitialize
                    initialValues={
                        {
                            dateOfTrouble: moment(this.state.data.dateOfTrouble).format('DD-MM-YYYY'),
                            //ThoiGian_ThuTien: moment(this.state.data.ThoiGian_ThuTien).format('DD-MM-YYYY'),
                            dateOfSolve: this.state.data.dateOfSolve,
                            name: this.state.data.name,
                            describe: this.state.data.describe,
                            image: this.state.data.image,
                            level: this.state.data.level,
                            status: this.state.data.status,
                            roomId: this.state.data.roomId
                        }
                    }
                    validationSchema={TroubleSchema}
                    onSubmit={values => {
                        this.updateTrouble(values);
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
                                            { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                        ]}
                                    >
                                        <AppInputInf
                                            lable={"Tên sự cố:"}
                                            secureTextEntry={false}
                                            field={"name"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                        />
                                        {errors.name && touched.name ? (
                                            <AppError errors={errors.name} />
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                        ]}
                                    >
                                        <AppDatePicker
                                            label={"Thời gian xảy ra sự cố:"}
                                            value={values}
                                            field={"dateOfTrouble"}
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
                                            lable={"Mức độ:"}
                                            data={this.state.dataMD}
                                            placeholder={(this.state.dataMD.filter(item => item.key == this.state.data.level)[0]?.label)}
                                            value={values}
                                            field={"level"}
                                        />
                                        {errors.level && touched.level ? (
                                            <AppError errors={errors.level} />
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            { paddingLeft: 15, paddingRight: 15, marginTop: 20 }
                                        ]}
                                    >
                                        <Pressable onPress={() => this.ChoosePhotoFromLibrary()}>
                                            <Text
                                                style={[
                                                    text_size.sm,
                                                    font.serif
                                                ]}
                                            >
                                                Chọn ảnh
                                            </Text>
                                            <Image
                                                source={{
                                                    uri: this.state.image ? this.state.image.path : `${url}/${this.state.data.image}`
                                                }}
                                                style={[
                                                    width.w_100,
                                                    {
                                                        height: 200,
                                                        borderRadius: 10,
                                                        borderWidth: 2,
                                                        borderColor: '#E0E0E0'
                                                    }
                                                ]}
                                            />
                                        </Pressable>
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                        ]}
                                    >
                                        <AppDialogSelect
                                            lable={"Tình trạng:"}
                                            data={this.state.dataTT}
                                            placeholder={"Chưa giải quyết"}
                                            value={values}
                                            field={"status"}
                                        />
                                        {errors.status && touched.status ? (
                                            <AppError errors={errors.status} />
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            { paddingLeft: 15, paddingRight: 10, marginTop: 10 }
                                        ]}
                                    >
                                        <AppInputInf
                                            lable={"Tình trạng sự cố:"}
                                            secureTextEntry={false}
                                            field={"describe"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                        />
                                        {errors.describe && touched.describe ? (
                                            <AppError errors={errors.describe} />
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
                                                disabled={!this.isFormValid(values.name, values.level, values.image)}
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
    doGetTroubleById, doUpdateTrouble
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTrouble)