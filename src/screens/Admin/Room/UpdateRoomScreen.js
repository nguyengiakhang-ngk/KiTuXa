import React, {Component} from 'react';
import {
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
import {doUpdateRoom} from "../../../redux/actions/room";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class UpdateRoomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeRoomData: [],
            room: this.props.route.params.room,
            initValue: ''
        }
    }

    isFormValid = (isValid) => {
        return isValid;
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
            },() => {
                data.map(typeRoom => {
                    if(typeRoom.id === this.state.room.typeOfRoomId){
                        this.setState({
                            initValue: typeRoom.name
                        })
                    }
                })
            })
        })
    }

    updateRoom = (values) => {
        let room = {
            roomName: values.roomName,
            note: values.note,
            typeOfRoomId: values.typeOfRoomId
        }
        this.props.doUpdateRoom(room, {id: this.state.room.id}).then(data => {
            if(data) {
                this.props.navigation.goBack();
            }
        })
    }

    render() {
        return (
            <SafeAreaView
                style={[
                    {flex: 1},
                    height.h_100,
                    position.relative,
                    background_color.white
                ]}
            >
                <ScrollView
                    style={{ flex: 1}} contentContainerStyle={{ flexGrow: 1 }}
                    nestedScrollEnabled
                >
                    <Formik
                        initialValues={{typeOfRoomId: this.state.room.typeOfRoomId, roomName: this.state.room.roomName, note: this.state.room.note}}
                        validationSchema={RoomSchema}
                        onSubmit={(values) => {
                            this.updateRoom(values)
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
                                        <AppDialogSelect
                                            lable={"Loại phòng:"}
                                            data={this.state.typeRoomData}
                                            field={"typeOfRoomId"}
                                            value={values}
                                            placeholder={"Vui lòng chọn"}
                                            initValue={this.state.initValue}
                                        />
                                        {errors.typeOfRoomId && touched.typeOfRoomId ? (
                                            <AppError errors={ errors.typeOfRoomId }/>
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
                                            <AppError errors={ errors.roomName }/>
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
                                            <AppError errors={ errors.note }/>
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
                                                onPress = { () => { this.props.navigation.goBack() } }
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
                                                disabled = { !this.isFormValid(isValid) }
                                                onPress = { handleSubmit }
                                                title="Lưu"
                                            />
                                        </View>
                                    </View>
                                </SafeAreaView>
                            </HideKeyboard>
                        )}
                    </Formik>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({user, area}) => {
    return {user, area};
};

const mapDispatchToProps = {
    doGetListTypeOfRoom,
    doUpdateRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRoomScreen)

