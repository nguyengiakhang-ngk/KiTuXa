import React, {Component} from 'react';
import {
    ActivityIndicator,
    Keyboard, ScrollView, TouchableWithoutFeedback, View
} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    flex,
    height, position,
    width
} from "../../../utils/styles/MainStyle";
import AppError from "../../../components/AppError";
import {Formik} from "formik";
import AppInputInf from "../../../components/AppInputInf";
import {RoomSchema} from "../../../utils/validation/ValidationRoom";
import {color_danger, color_primary} from "../../../utils/theme/Color";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import {connect} from "react-redux";
import AppDialogSelect from "../../../components/AppDialogSelect";
import {doGetListTypeOfRoom} from "../../../redux/actions/typeOfRoom";
import {doAddRoom} from "../../../redux/actions/room";
import Toast from "react-native-toast-message";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class AddRoomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            typeRoomData: []
        }
    }

    isFormValid = (isValid, touched) => {
        return isValid && Object.keys(touched).length !== 0;
    }

    componentDidMount() {
        this.getTypeOfRoom();
    }

    componentWillUnmount() {

    }

    getTypeOfRoom = () => {
        this.props.doGetListTypeOfRoom({userId: this.props.user.user.id}).then(data => {
            this.setState({
                typeRoomData: data.map(item => ({key: item.id, label: item.name}))
            }, () => {
                setTimeout(() => {
                    this.setState({
                        isLoading: false
                    })
                }, 500)
            })
        })
    }

    addRoom = (values) => {
        this.setState({
            isLoading: true
        })
        let room = {
            roomName: values.roomName,
            note: values.note,
            typeOfRoomId: values.typeOfRoomId
        }
        this.props.doAddRoom(room).then(data => {
            if(data) {
                Toast.show({
                    type: 'success',
                    text1: 'Phòng',
                    text2: 'Thêm thành công.',
                    visibilityTime: 2000,
                    autoHide: true
                });
                setTimeout(() => {
                    this.props.navigation.goBack();
                }, 2000)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Phòng',
                    text2: 'Vui lòng thêm ít nhất 1 ảnh loại phòng.',
                    visibilityTime: 2000,
                    autoHide: true
                });
            }
        })
    }

    render() {
        return (
            <ScrollView
                style={{ flex: 1}} contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
                {
                    this.state.isLoading ?
                        <ActivityIndicator size="large" color={color_primary}/>
                        :
                        <Formik
                            initialValues={{typeOfRoomId: "", roomName: "", note: ""}}
                            validationSchema={RoomSchema}
                            onSubmit={(values) => {
                                this.addRoom(values)
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
                                            {flex: 1, paddingBottom: 15},
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
                                            <AppDialogSelect
                                                lable={"Loại phòng:"}
                                                data={this.state.typeRoomData}
                                                field={"typeOfRoomId"}
                                                value={values}
                                                placeholder={"Vui lòng chọn"}
                                                initValue={''}
                                            />
                                            {errors.typeOfRoomId && touched.typeOfRoomId ? (
                                                <AppError errors={errors.typeOfRoomId}/>
                                            ) : null}
                                        </View>
                                        <View
                                            style={[
                                                width.w_100,
                                                {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                            ]}
                                        >
                                            <AppInputInf
                                                lable={"Tên phòng:"}
                                                secureTextEntry={false}
                                                field={"roomName"}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                            />
                                            {errors.roomName && touched.roomName ? (
                                                <AppError errors={errors.roomName}/>
                                            ) : null}
                                        </View>
                                        <View
                                            style={[
                                                width.w_100,
                                                {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                            ]}
                                        >
                                            <AppInputInf
                                                lable={"Lưu ý:"}
                                                secureTextEntry={false}
                                                field={"note"}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                                multiline={true}
                                                number={4}
                                            />
                                            {errors.note && touched.note ? (
                                                <AppError errors={errors.note}/>
                                            ) : null}
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
                                                    onPress={() => {
                                                        this.props.navigation.goBack()
                                                    }}
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
                                                    disabled={!this.isFormValid(isValid, touched)}
                                                    onPress={handleSubmit}
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
            </ScrollView>
        );
    }
}

const mapStateToProps = ({user, area}) => {
    return {user, area};
};

const mapDispatchToProps = {
    doGetListTypeOfRoom,
    doAddRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoomScreen)

