import React, { Component } from 'react';
import {
    ActivityIndicator,
    BackHandler,
    FlatList,
    Image,
    Keyboard, Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    flex, font,
    height, position, text_color, text_size,
    width
} from "../../../utils/styles/MainStyle";
import AppError from "../../../components/AppError";
import { Formik } from "formik";
import AppInputInf from "../../../components/AppInputInf";
import axios from "axios";
import { path } from "../../../constant/define";
import { RoomTypeSchema } from "../../../utils/validation/ValidationRoomType";
import ImagePicker from 'react-native-image-crop-picker';
import { Icon } from "@rneui/base";
import { color_danger, color_primary, color_success, color_white } from "../../../utils/theme/Color";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import { connect } from "react-redux";
import { doAddTypeOfRoom } from "../../../redux/actions/typeOfRoom";
import { doAddImageOfTypeRoom } from "../../../redux/actions/imageTypeOfRoom";
import AppDialogSelect from "../../../components/AppDialogSelect";
import {doGetListArea} from "../../../redux/actions/area";
import {doAddPriceTypeOfRoom} from "../../../redux/actions/priceTypeOfRoom";
import {Multiselect} from "multiselect-react-dropdown";
import {doGetListFreeService} from "../../../redux/actions/freeService";
import ModalSelectMutiselect from "../../../components/ModalSelectMutiselect";
import {doAddFreeTicket} from "../../../redux/actions/freeTocket";
import {doGetListPaidService} from "../../../redux/actions/paidService";
import {doAddPaidTicket} from "../../../redux/actions/paidTicket";
import DialogConfirm from "../../../components/DialogConfirm";
import Toast from "react-native-toast-message";
const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class AddRoomTypeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            imageList: [],
            dataFreeService: [],
            dataPaidService: [],
            areaData: [],
            initValue: '',
            isConfirm: false,
            ref: React.createRef()
        }
    }

    isFormValid = (isValid, touched) => {
        return isValid && Object.keys(touched).length !== 0;
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        this.getFreeServiceData();
        this.getAreaList();
    }

    getFreeServiceData(){
        this.props.doGetListFreeService({userId: this.props.user.user.id}).then(data =>{
            this.setState({
                dataFreeService: data.map(item => ({id: item.id, name: item.name, checked: false}))
            })
        });
        this.props.doGetListPaidService({userId: this.props.user.user.id}).then(data =>{
            this.setState({
                dataPaidService: data.map(item => ({id: item.id, name: item.name, checked: false}))
            })
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    backAction = () => {
        const indexFree = this.state.dataFreeService.findIndex(object => {
            return object.checked === true;
        });
        const indexPaid = this.state.dataPaidService.findIndex(object => {
            return object.checked === true;
        });
        if( this.state.ref.current.values.roomTypeName ||
            this.state.ref.current.values.price ||
            this.state.ref.current.values.acreage ||
            this.state.ref.current.values.totalGuest ||
            this.state.ref.current.values.object ||
            this.state.ref.current.values.note ||
            this.state.imageList.length || indexFree > -1 || indexPaid > -1){
            this.setState({
                isConfirm: true
            })

            return true;
        }

        this.props.navigation.goBack();
        return true;
    }

    getAreaList = () => {
        this.props.doGetListArea({ userId: this.props.user.user.id }).then(data => {
            this.setState({
                areaData: data.map(item => ({key: item.id, label: item.areaName}))
            },() => {
                this.setState({
                    initValue: this.state.areaData[0].label
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            isLoading: false
                        })
                    }, 500)
                })
            })
        })
    }

    chooseImage() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            compressImageQuality: 0.8,
            maxFiles: 6,
            mediaType: "any",
            includeBase64: true,
        }).then(res => {
            console.log('Res: ', res);
            res.map(image => {
                this.state.imageList.push({
                    filename: image.filename,
                    path: image.path,
                    data: image.data
                });
                this.setState({
                    imageList: this.state.imageList
                });
            });
        })
            .catch(error => console.log('Error: ', error.message));
    }
    removeImage(index) {
        this.state.imageList.splice(index, 1);
        this.setState({
            imageList: this.state.imageList
        });
    }
    imageListView() {
        return this.state.imageList.map((image, index) => {
            return (
                <View
                    key={index}
                    style={[
                        {
                            width: '49%',
                            marginBottom: 7,
                        }
                    ]}
                >
                    <Image
                        source=
                        {{ uri: image.path }}
                        style={{
                            width: '100%',
                            height: 150,
                            borderTopRightRadius: 5,
                            borderTopLeftRadius: 5,
                            overflow: 'hidden',
                        }}
                    />
                    <TouchableOpacity
                        style={[
                            flex.flex_row,
                            flex.justify_content_center,
                            flex.align_items_center,
                            width.w_100,
                            {
                                backgroundColor: color_danger,
                                marginTop: -0.1,
                                paddingTop: 2,
                                paddingBottom: 2,
                                borderBottomRightRadius: 5,
                                borderBottomLeftRadius: 5
                            }
                        ]}
                        onPress={() => this.removeImage(index)}
                    >
                        <Icon
                            name='times-circle'
                            type='font-awesome-5'
                            size={18}
                            color={color_white}
                        />
                        <Text
                            style={[
                                text_color.white,
                                font.serif,
                                text_size.xs,
                                {
                                    marginLeft: 3
                                }
                            ]}
                        >
                            X??a
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    addRoomType = (values) => {
        if(this.state.imageList.length) {
            this.setState({
                isLoading: true
            })
            let typeOfRoom = {
                name: values.roomTypeName,
                stretch: values.acreage,
                numberOfCustomer: values.totalGuest,
                typeOfCustomer: values.object,
                note: values.note,
                areaId: values.areaId
            }
            this.props.doAddTypeOfRoom(typeOfRoom).then(async data => {
                if (data) {
                    let price = values.price.split(".").join("");
                    this.props.doAddPriceTypeOfRoom({price: price, typeOfRoomId: data}).then(data => {
                        // alert(data);
                    })
                    this.state.dataFreeService.map(item => {
                        if (item.checked) {
                            this.props.doAddFreeTicket({typeOfRoomId: data, freeServiceId: item.id}).then(data => {
                                // alert(data);
                            })
                        }
                    })
                    this.state.dataPaidService.map(item => {
                        if (item.checked) {
                            this.props.doAddPaidTicket({typeOfRoomId: data, paidServiceId: item.id}).then(data => {
                                // alert(data);
                            })
                        }
                    })
                    await this.mapImageRoomType(data);
                    Toast.show({
                        type: 'success',
                        text1: 'Lo???i ph??ng',
                        text2: 'Th??m th??nh c??ng.',
                        visibilityTime: 2000,
                        autoHide: true
                    });
                    setTimeout(() => {
                        this.props.navigation.goBack();
                    }, 2000)
                }
            })
        } else{
            Toast.show({
                type: 'error',
                text1: 'Lo???i ph??ng',
                text2: 'Vui l??ng th??m ??t nh???t 1 ???nh lo???i ph??ng.',
                visibilityTime: 2000,
                autoHide: true
            });
        }
    }

    mapImageRoomType = (typeOfRoomId) => {
        this.state.imageList.map((item) => {
            this.uploadImageRoomType(item, typeOfRoomId);
        });
    }

    uploadImageRoomType = (item, typeOfRoomId) => {
        const date = new Date();
        let dataImage = new FormData();
        dataImage.append("image", {
            uri: item.path,
            type: "image/jpeg",
            name: item.filename || `temp_image_${date.getMilliseconds()}.jpg`
        });
        dataImage.append("imageOfTypeRoom", JSON.stringify({ typeOfRoomId: typeOfRoomId }));
        this.props.doAddImageOfTypeRoom(dataImage).then(data => {

        })
    }

    render() {
        return (
            <SafeAreaView
                style={[
                    { flex: 1 },
                    height.h_100,
                    position.relative,
                    background_color.white,
                    flex.justify_content_center
                ]}
            >
                {
                    this.state.isLoading ?
                        <ActivityIndicator size="large" color={color_primary}/>
                        :
                        <ScrollView
                            style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}
                            nestedScrollEnabled
                        >
                            <Formik
                                innerRef={this.state.ref}
                                initialValues={{ roomTypeName: "", price: "", acreage: "", totalGuest: "", object: "", note: "", areaId: this.state.areaData[0] }}
                                validationSchema={RoomTypeSchema}
                                onSubmit={(values) => {
                                    this.addRoomType(values)
                                }}
                            >
                                {({
                                      handleChange,
                                      handleBlur,
                                      handleSubmit, values,
                                      errors,
                                      touched,
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
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                                ]}
                                            >
                                                <AppDialogSelect
                                                    lable={"Khu:"}
                                                    data={this.state.areaData}
                                                    field={"areaId"}
                                                    value={values}
                                                    placeholder={"Vui l??ng ch???n"}
                                                    initValue={this.state.initValue}
                                                />
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                                ]}
                                            >
                                                <AppInputInf
                                                    lable={"T??n lo???i ph??ng:"}
                                                    secureTextEntry={false}
                                                    field={"roomTypeName"}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    values={values}
                                                />
                                                {errors.roomTypeName && touched.roomTypeName ? (
                                                    <AppError errors={errors.roomTypeName} />
                                                ) : null}
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                                ]}
                                            >
                                                <AppInputInf
                                                    lable={"Gi?? lo???i ph??ng:"}
                                                    secureTextEntry={false}
                                                    keyboardType={'numeric'}
                                                    field={"price"}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    values={values}
                                                    formatNum={true}
                                                />
                                                {errors.price && touched.price ? (
                                                    <AppError errors={errors.price} />
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
                                                        lable={"Di???n t??ch (m2):"}
                                                        secureTextEntry={false}
                                                        keyboardType={'numeric'}
                                                        field={"acreage"}
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        values={values}
                                                    />
                                                    {errors.acreage && touched.acreage ? (
                                                        <AppError errors={errors.acreage} />
                                                    ) : null}
                                                </View>
                                                <View
                                                    style={[
                                                        { paddingLeft: 10, paddingRight: 15, marginTop: 10, flex: 1 }
                                                    ]}
                                                >
                                                    <AppInputInf
                                                        lable={"S??? l?????ng kh??ch:"}
                                                        keyboardType={'numeric'}
                                                        secureTextEntry={false}
                                                        field={"totalGuest"}
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        values={values}
                                                    />
                                                    {errors.totalGuest && touched.totalGuest ? (
                                                        <AppError errors={errors.totalGuest} />
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
                                                    lable={"?????i t?????ng:"}
                                                    secureTextEntry={false}
                                                    field={"object"}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    values={values}
                                                />
                                                {errors.object && touched.object ? (
                                                    <AppError errors={errors.object} />
                                                ) : null}
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                                ]}
                                            >
                                                <AppInputInf
                                                    lable={"L??u ??:"}
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
                                                    {paddingLeft: 15, paddingRight: 15, marginTop: 15}
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        text_size.sm,
                                                        font.serif
                                                    ]}
                                                >
                                                    D???ch v??? mi???n ph??:
                                                </Text>
                                                <ModalSelectMutiselect
                                                    data={this.state.dataFreeService}
                                                    onChangeSelect={(value) => {
                                                        this.state.dataFreeService[value].checked = !this.state.dataFreeService[value].checked;
                                                        this.setState({
                                                            dataFreeService: this.state.dataFreeService
                                                        })
                                                    }}
                                                />
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        text_size.sm,
                                                        font.serif
                                                    ]}
                                                >
                                                    D???ch v??? c?? ph??:
                                                </Text>
                                                <ModalSelectMutiselect
                                                    data={this.state.dataPaidService}
                                                    onChangeSelect={(value) => {
                                                        this.state.dataPaidService[value].checked = !this.state.dataPaidService[value].checked;
                                                        this.setState({
                                                            dataPaidService: this.state.dataPaidService
                                                        })
                                                    }}
                                                />
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                                ]}
                                            >
                                                <TouchableOpacity
                                                    style={[
                                                        width.w_100,
                                                        flex.flex_row,
                                                        flex.align_items_center,
                                                    ]}
                                                    onPress={() => this.chooseImage()}
                                                >
                                                    <Icon
                                                        name='plus-circle'
                                                        type='font-awesome-5'
                                                        size={20}
                                                        color={color_success}
                                                    />
                                                    <Text
                                                        style={[
                                                            text_size.sm,
                                                            font.serif,
                                                            {
                                                                marginLeft: 3
                                                            }
                                                        ]}
                                                    >
                                                        Th??m ???nh lo???i ph??ng:
                                                    </Text>
                                                </TouchableOpacity>
                                                <View
                                                    style={[
                                                        width.w_100,
                                                        flex.flex_row,
                                                        flex.flex_wrap,
                                                        flex.justify_content_between,
                                                        {
                                                            marginTop: 5
                                                        }
                                                    ]}
                                                >
                                                    {this.imageListView()}
                                                </View>
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
                                                        onPress={() => { this.backAction() }}
                                                        title="H???y"
                                                    />
                                                </View>
                                                <View
                                                    style={[
                                                        {
                                                            flex: 1
                                                        }
                                                    ]}
                                                >
                                                    <AppButtonActionInf
                                                        size={13}
                                                        textSize={18}
                                                        bg={color_primary}
                                                        disabled={!this.isFormValid(isValid, touched)}
                                                        onPress={handleSubmit}
                                                        title="Th??m"
                                                    />
                                                </View>
                                            </View>
                                        </SafeAreaView>
                                    </HideKeyboard>
                                )}
                            </Formik>
                        </ScrollView>
                }
                <Toast ref={(ref) => {Toast.setRef(ref)}} />
                {
                    this.state.isConfirm ?
                        <DialogConfirm
                            content={"B???n kh??ng l??u c??c thay ?????i?"}
                            cancel={() => {
                                this.setState({
                                    isConfirm: false
                                })
                            }}
                            confirm={() => {
                                this.props.navigation.goBack();
                            }}
                        />
                        : null
                }
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({ user, area }) => {
    return { user, area };
};

const mapDispatchToProps = {
    doAddTypeOfRoom,
    doAddImageOfTypeRoom,
    doGetListArea,
    doAddPriceTypeOfRoom,
    doGetListFreeService,
    doAddFreeTicket,
    doGetListPaidService,
    doAddPaidTicket
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoomTypeScreen)

