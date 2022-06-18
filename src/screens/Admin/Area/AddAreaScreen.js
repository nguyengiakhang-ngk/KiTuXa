import React, {Component} from 'react';
import {
    ActivityIndicator,
    Keyboard, ScrollView, TouchableWithoutFeedback, View, BackHandler, Text, TextInput, TouchableOpacity
} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    flex, font, font_weight,
    height, padding, shadow, text_size,
    width
} from "../../../utils/styles/MainStyle";
import AppError from "../../../components/AppError";
import {Formik} from "formik";
import {AreaSchema} from "../../../utils/validation/ValidationArea";
import AppInputInf from "../../../components/AppInputInf";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import {color_danger, color_dark, color_primary, color_success} from "../../../utils/theme/Color";
import {doAddArea, doGetListArea} from "../../../redux/actions/area";
import { connect } from "react-redux";
import GetLocation from "react-native-get-location";
import Toast from "react-native-toast-message";
import DialogConfirm from "../../../components/DialogConfirm";
import {createOpenLink} from "react-native-open-maps";
import AppDialogSelect from "../../../components/AppDialogSelect";
import {cardExpiry} from "../../../utils/proccess/proccessApp";
import {Icon} from "@rneui/base";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

class AddAreaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            ref: React.createRef(),
            isConfirm: false,
            lat: '',
            lng: ''
        }
    }

    isFormValid = (isValid, touched) => {
        return isValid && Object.keys(touched).length !== 0;
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    backAction = () => {
        if( this.state.ref.current.values.areaName ||
            this.state.ref.current.values.address ||
            this.state.ref.current.values.totalRoom ||
            this.state.ref.current.values.time ||
            this.state.ref.current.values.content ||
            this.state.ref.current.values.description ){
            this.setState({
                isConfirm: true
            })

            return true;
        }

        this.props.navigation.goBack();
        return true;
    }

    getCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 0,
        }).then(location => {
                this.setState({
                    lng: location.longitude,
                    lat: location.latitude
                })
        })
    }

    addArea = (values) => {
        this.setState({
            isLoading: true
        })
                let area = {
                    areaName: values.areaName,
                    address: values.address,
                    totalRoom: values.totalRoom,
                    status: true,
                    time: values.time,
                    content: values.content,
                    description: values.description,
                    userId: this.props.user.id,
                    lng: Number(this.state.lng),
                    lat: Number(this.state.lat)
                }
                this.props.doAddArea(area).then(data => {
                    if(data){
                        Toast.show({
                            type: 'success',
                            text1: 'Khu',
                            text2: 'Thêm thành công.',
                            visibilityTime: 2000,
                            autoHide: true
                        });
                        setTimeout(() => {
                            this.props.navigation.goBack();
                        }, 2000)
                    }
                }).catch(error => {
                    Toast.show({
                        type: 'error',
                        text1: 'Khu',
                        text2: 'Đã xảy ra sự cố, vui lòng thử lại.',
                        visibilityTime: 2000,
                        autoHide: true
                    });
                    setTimeout(() => {
                        this.setState({
                            isLoading: false
                        })
                    }, 1000)
                })

    }
    render() {
        return (
            <ScrollView
                style={{ flex: 1}} contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
                {
                    this.state.isLoading ?
                        <ActivityIndicator size="large" color={color_primary} />
                        :
                        <Formik
                            innerRef={this.state.ref}
                            initialValues={{areaName: "", address: "", totalRoom:"", time:"", content:"", description:""}}
                            validationSchema={AreaSchema}
                            onSubmit={values => {
                                this.addArea(values);
                            }}
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
                                            style={{flexDirection: "row"}}
                                        >
                                            <View
                                                style={[
                                                    {paddingLeft: 15, paddingRight: 15, marginTop: 10, flex: 1}
                                                ]}
                                            >
                                                <Text style={[
                                                    text_size.sm,
                                                    font_weight.f_500,
                                                    font.serif,
                                                    { marginTop: 5, textAlignVertical: 'top', color: color_dark},
                                                ]}>Vĩ độ</Text>
                                                <TextInput
                                                    style={[
                                                        text_size.sm,
                                                        font_weight.f_500,
                                                        font.serif,
                                                        padding.p_0,
                                                        width.w_100,
                                                        background_color.white,
                                                        shadow.shadow,
                                                        { borderRadius: 7, padding: 12, paddingLeft: 10, paddingRight: 10, marginTop: 5, textAlignVertical: 'top', },
                                                    ]}
                                                    value={String(this.state.lat)}
                                                    onChangeText={(newText) => {
                                                        this.setState({
                                                            lat: newText
                                                        })
                                                    }}
                                                />
                                            </View>
                                            <View
                                                style={[
                                                    {paddingLeft: 15, paddingRight: 15, marginTop: 10, flex: 1}
                                                ]}
                                            >
                                                <Text style={[
                                                    text_size.sm,
                                                    font_weight.f_500,
                                                    font.serif,
                                                    { marginTop: 5, textAlignVertical: 'top', color: color_dark},
                                                ]}>Kinh độ</Text>
                                                <TextInput
                                                    style={[
                                                        text_size.sm,
                                                        font_weight.f_500,
                                                        font.serif,
                                                        padding.p_0,
                                                        width.w_100,
                                                        background_color.white,
                                                        shadow.shadow,
                                                        { borderRadius: 7, padding: 12, paddingLeft: 10, paddingRight: 10, marginTop: 5, textAlignVertical: 'top', },
                                                    ]}
                                                    value={String(this.state.lng)}
                                                    onChangeText={(newText) => {
                                                        this.setState({
                                                            lng: newText
                                                        })
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View
                                            style={[
                                                width.w_100,
                                                {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                            ]}
                                        >
                                            <TouchableOpacity
                                                style={[
                                                    width.w_100,
                                                    flex.flex_row,
                                                    flex.align_items_center,
                                                ]}
                                                onPress={createOpenLink({query: values.address, zoom: 30})}
                                            >
                                                <Icon
                                                    name='search-location'
                                                    type='font-awesome-5'
                                                    size={16}
                                                    color={color_success}
                                                />
                                                <Text
                                                    style={[
                                                        text_size.xs,
                                                        font.serif,
                                                        {
                                                            marginLeft: 5
                                                        }
                                                    ]}
                                                >
                                                    Lấy tọa độ từ google map
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={[
                                                width.w_100,
                                                {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                            ]}
                                        >
                                            <TouchableOpacity
                                                style={[
                                                    width.w_100,
                                                    flex.flex_row,
                                                    flex.align_items_center,
                                                ]}
                                                onPress={() => {this.getCurrentLocation()}}
                                            >
                                                <Icon
                                                    name='map-marker-alt'
                                                    type='font-awesome-5'
                                                    size={16}
                                                    color={color_success}
                                                />
                                                <Text
                                                    style={[
                                                        text_size.xs,
                                                        font.serif,
                                                        {
                                                            marginLeft: 9
                                                        }
                                                    ]}
                                                >
                                                    Lấy tọa độ từ vị trí hiện tại của bạn
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={[
                                                width.w_100,
                                                flex.flex_row,
                                                {paddingLeft: 15, paddingRight: 15, marginTop: 20}
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
                                                    onPress = { () => { this.backAction() } }
                                                    title="Hủy"
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
                                                    disabled = { !this.isFormValid(isValid, touched) }
                                                    onPress = { handleSubmit }
                                                    title="Thêm"
                                                />
                                            </View>
                                        </View>
                                    </SafeAreaView>
                                </HideKeyboard>
                            )}
                        </Formik>
                }
                <Toast ref={(ref) => {Toast.setRef(ref)}} />
                {
                    this.state.isConfirm ?
                        <DialogConfirm
                            content={"Bạn không lưu các thay đổi?"}
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
            </ScrollView>
        );
    }
}

const mapStateToProps = ({user}) => {
    return user;
};

const mapDispatchToProps = {
    doAddArea,
    doGetListArea
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAreaScreen)

