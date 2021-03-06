import React, { Component, useState } from 'react';
import {
    Image, ImageBackground,
    Keyboard, Pressable, ScrollView, TouchableWithoutFeedback, View, Text,
    ActivityIndicator
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
    font_weight,
} from "../../../utils/styles/MainStyle";
import AppError from "../../../components/AppError";
import { Formik } from "formik";
import AppInputInf from "../../../components/AppInputInf";
import AppDialogSelect from "../../../components/AppDialogSelect";
import Toast from "react-native-toast-message";
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
import { doAddTrouble } from '../../../redux/actions/trouble';
import { TroubleSchema } from '../../../utils/validation/ValidationTrouble';
import { color_danger, color_primary } from '../../../utils/theme/Color';
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import { doGetListArea } from "../../../redux/actions/area";
import { doGetRoomByType } from '../../../redux/actions/room';

import { doGetTypeOfRoomByArea } from '../../../redux/actions/typeOfRoom';

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

class AddTrouble extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [],
            image: '',
            dataMD: [
                {
                    'key': '0',
                    'label': 'Th???p'
                },
                {
                    'key': '1',
                    'label': 'Trung b??nh'
                },
                {
                    'key': '2',
                    'label': 'Cao'
                }
            ],
            dataArea: [],
            dataP: [],
            typeOfRoom: [],
            typeOfRoomSelect: { 'type': '' }
        }

    }

    componentDidMount() {
        this.getListArea()
    }


    isFormValid = (name, level, image) => {
        return String(name).length !== 0 && String(level).length !== 0 && image;
    }

    componentWillUnmount() {
        this.props.route.params?.refresh();
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

    getTypeRoom(option) {
        this.props.doGetTypeOfRoomByArea({ areaId: option.key }).then(data => {
            this.setState({
                typeOfRoom: data.map(item => ({
                    key: item.id,
                    label: item.name,
                }))
            })
        });
    }

    getPhongData(option) {
        this.props.doGetRoomByType({ typeOfRoomId: option.key }).then(data => {
            this.setState({
                dataP: data.map(item => ({
                    key: item.id,
                    label: item.roomName,
                })),
            }, () => {
                console.log('dataP: ', this.state.dataP);
            })
        })
    }

    addTrouble = (values) => {
        const date = new Date();
        const minutes = date.getMinutes();
        let data = new FormData();
        data.append("image", {
            uri: this.state.image.path,
            type: "image/jpeg",
            name: this.state.image.filename || `temp_image_${minutes}.jpg`
        });
        data.append("trouble", JSON.stringify(values));
        this.props.doAddTrouble(data).then(data => {
            if (data) {
                this.setState({ isLoading: true })
                Toast.show({
                    type: 'success',
                    text1: 'S??? c???',
                    text2: 'Th??m th??nh c??ng.',
                    visibilityTime: 2000,
                    autoHide: true
                });
                setTimeout(() => {
                    this.props.navigation.goBack();
                }, 2000)
                // alert("B??o c??o s??? c??? th??nh c??ng!");
                // this.props.navigation.goBack(null);
            }
            else {
                alert("B??o c??o s??? c??? kh??ng th??nh c??ng! Vui l??ng th??? l???i!");
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
                        <ActivityIndicator size="large" color={color_primary} />
                        :
                        <Formik
                            initialValues={{
                                dateOfTrouble: new Date(),
                                dateOfSolve: new Date(),
                                name: new Date(),
                                describe: '',
                                image: "",
                                level: "",
                                status: '0',
                                roomId: ''
                            }}
                            validationSchema={TroubleSchema}
                            onSubmit={values => {
                                this.addTrouble(values);
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
                                                    placeholder={'Vui l??ng ch???n khu...'}
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
                                                    lable={'Lo???i Ph??ng:'}
                                                    data={this.state.typeOfRoom}
                                                    placeholder={'Vui l??ng ch???n lo???i ph??ng...'}
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
                                                    lable={'Ph??ng:'}
                                                    data={this.state.dataP}
                                                    placeholder={'Vui l??ng ch???n ph??ng...'}
                                                    value={values}
                                                    field={'roomId'}
                                                />
                                            </View>
                                            <View
                                                style={[
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                                ]}
                                            >
                                                <AppInputInf
                                                    lable={"T??n s??? c???:"}
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
                                                    label={"Th???i gian x???y ra s??? c???:"}
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
                                                    lable={"M???c ?????:"}
                                                    data={this.state.dataMD}
                                                    placeholder={"Ch???n m???c ????? s??? c???..."}
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
                                                        Ch???n ???nh
                                                    </Text>
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
                                                    { paddingLeft: 15, paddingRight: 10, marginTop: 10 }
                                                ]}
                                            >
                                                <AppInputInf
                                                    lable={"T??nh tr???ng s??? c???:"}
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
                                                        title="H???y"
                                                    />
                                                </View>
                                                <View
                                                    style={{ flex: 1 }}
                                                >
                                                    <AppButtonActionInf
                                                        size={13}
                                                        textSize={18}
                                                        bg={color_primary}
                                                        disabled={!this.isFormValid(values.name, values.level, this.state.image)}
                                                        onPress={handleSubmit}
                                                        //onPress={() => alert(values.Ten_HD)}
                                                        title="Th??m"
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

const mapStateToProps = ({ user }) => {
    return { user };
};

const mapDispatchToProps = {
    doAddTrouble, doGetListArea, doGetRoomByType, doGetTypeOfRoomByArea
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTrouble)