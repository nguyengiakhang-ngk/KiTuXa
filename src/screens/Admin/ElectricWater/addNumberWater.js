import React, { Component, useState } from 'react';
import {
    Image, ImageBackground,
    Keyboard, Pressable, ScrollView, TouchableWithoutFeedback, View, Text
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
    font_weight
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
import { ReceiptSchema } from "../../../utils/validation/ValidationReceipt";
import AppItemHome from "../../../components/AppItemHome";
import ImagePicker from 'react-native-image-crop-picker';
import { Icon } from "@rneui/base";
import { connect } from 'react-redux';
import { color_danger, color_primary } from '../../../utils/theme/Color';
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import { doGetListArea } from "../../../redux/actions/area";
import { doGetRoomByArea } from '../../../redux/actions/room';
import { doAddNumberWater } from '../../../redux/actions/room';

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

class AddNumberWater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            image: '',
            dataArea: [],
            dataP: []
        }

    }

    componentDidMount() {
        this.getListArea()
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
            }, () => {
                console.log('dataP: ', this.state.dataP);
            })
        })
    }

    getPhongData(option) {
        this.props.doGetRoomByArea({ areaId: option.key }).then(data => {
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

    AddNumberWater(values) {
        this.props.doAddNumberWater(values).then(data => {
            if(data){
                alert("Th??m s??? n?????c th??nh c??ng!");
                this.props.navigation.goBack(null);
            }else{
                alert("Th??m s??? n?????c kh??ng th??nh c??ng! Vui l??ng th??? l???i!")
            }
        })
    }

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
                        {
                            textAlign: 'center',
                            paddingVertical: 15,
                            lineHeight: 20,
                            letterSpacing: 0,
                            backgroundColor: color_primary
                        }
                    ]}
                >
                    Th??m s??? n?????c
                </Text>
                <ScrollView
                    style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}
                >
                    <Formik
                        initialValues={{
                            number: '',
                            dayOfNumber: new Date(),
                            RoomId: ''
                        }}
                        onSubmit={values => {
                            this.AddNumberWater(values);
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
                                                returnFilter={(key) => this.getPhongData(key)}
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
                                                lable={"S??? n?????c:"}
                                                secureTextEntry={false}
                                                field={"number"}
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
                                                label={"Th???i gian c???a s??? n?????c:"}
                                                value={values}
                                                field={"dayOfNumber"}
                                                alreadydate={new Date()}
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
                                                    disabled={String(values.number).length == 0}
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
                </ScrollView>
            </View>

        );
    }
}

const mapStateToProps = ({ user }) => {
    return { user };
};

const mapDispatchToProps = {
    doAddNumberWater, doGetListArea, doGetRoomByArea
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNumberWater)