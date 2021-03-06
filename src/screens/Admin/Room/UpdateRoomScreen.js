import React, {Component} from 'react';
import {
    ActivityIndicator,
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
import {Formik} from "formik";
import AppInputInf from "../../../components/AppInputInf";
import {RoomSchema} from "../../../utils/validation/ValidationRoom";
import {color_danger, color_dark, color_primary} from "../../../utils/theme/Color";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import {connect} from "react-redux";
import AppDialogSelect from "../../../components/AppDialogSelect";
import {doGetListTypeOfRoom} from "../../../redux/actions/typeOfRoom";
import {doGetBillMaterialRoom, doUpdateRoom} from "../../../redux/actions/room";
import {Icon} from "@rneui/base";
import {cardExpiry} from "../../../utils/proccess/proccessApp";
import {url} from "../../../constant/define";
import Toast from "react-native-toast-message";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class UpdateRoomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            typeRoomData: [],
            room: this.props.route.params.room,
            initValue: '',
            material: [],
            viewDetailMaterial: null,
            isViewDetailMaterial: false
        }
    }

    isFormValid = (isValid) => {
        return isValid;
    }

    componentDidMount() {
        this.getTypeOfRoom();
        this.getMaterial();
    }

    componentWillUnmount() {

    }

    getMaterial = () => {
        this.props.doGetBillMaterialRoom({roomId: this.state.room.id}).then(data => {
            this.setState({
                material: data
            })
        })
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
                setTimeout(() => {
                    this.setState({
                        isLoading: false
                    })
                }, 1000)
            })
        })
    }

    updateRoom = (values) => {
        this.setState({
            isLoading: true
        })
        let room = {
            roomName: values.roomName,
            note: values.note,
            typeOfRoomId: values.typeOfRoomId
        }
        this.props.doUpdateRoom(room, {id: this.state.room.id}).then(async data => {
            if (data) {
                Toast.show({
                    type: 'success',
                    text1: 'Ph??ng',
                    text2: 'C???p nh???t th??nh c??ng.',
                    visibilityTime: 2000,
                    autoHide: true
                });
                setTimeout(() => {
                    this.props.navigation.goBack();
                }, 2000)
            }
        })
    }

    renderSelected = (item, index) => {
        return (
            <TouchableOpacity
                key={item.id}
                style={{
                    flexDirection: "row",
                    borderWidth: 2,
                    borderColor: color_primary,
                    borderRadius: 20,
                    padding: 5,
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                    width: '30%',
                    marginRight: '3%'
                }}
                onPress={() => {
                    this.setState({
                        viewDetailMaterial: item,
                        isViewDetailMaterial: true
                    })
                }}
            >
                <View
                    style={{flexDirection: "row"}}
                >
                    <Icon
                        name='laravel'
                        type='font-awesome-5'
                        size={18}
                        color={color_danger}
                    />
                    <Text
                        style={[
                            text_size.xs,
                            font.serif,
                            {
                                color: color_dark,
                                marginLeft: 5
                            }
                        ]}
                    >
                        {item.name}
                    </Text>
                </View>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        {
                            color: color_dark,
                            marginLeft: 5
                        }
                    ]}
                >
                    sl: {item.quantity}
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <ScrollView
                style={{ flex: 1}} contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
                <Toast ref={(ref) => {Toast.setRef(ref)}} />
                {
                    this.state.isLoading ?
                        <ActivityIndicator size="large" color={color_primary}/>
                        :
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
                                                lable={"Lo???i ph??ng:"}
                                                data={this.state.typeRoomData}
                                                field={"typeOfRoomId"}
                                                value={values}
                                                placeholder={"Vui l??ng ch???n"}
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
                                                lable={"T??n ph??ng:"}
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
                                                <AppError errors={ errors.note }/>
                                            ) : null}
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
                                                V???t ch???t
                                            </Text>
                                            <View
                                                style={{ flex: 1, marginTop: 5, flexDirection: "row", flexWrap: "wrap" }}
                                            >
                                                {
                                                    this.state.material?.map((item, index) => {
                                                        return (
                                                            this.renderSelected(item, index)
                                                        )
                                                    })
                                                }
                                            </View>
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
                                                    disabled = { !this.isFormValid(isValid) }
                                                    onPress = { handleSubmit }
                                                    title="L??u"
                                                />
                                            </View>
                                        </View>
                                    </SafeAreaView>
                                </HideKeyboard>
                            )}
                        </Formik>
                }
                {
                    this.state.isViewDetailMaterial ?
                        <Modal transparent visible={this.state.isViewDetailService}>
                            <View
                                style={[
                                    {
                                        flex: 1,
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }
                                ]}
                            >
                                <View
                                    style={[
                                        {
                                            width: '90%',
                                            backgroundColor: 'white',
                                            borderRadius: 5
                                        }
                                    ]}
                                >
                                    <SafeAreaView
                                        style={[
                                            { margin: 15 },
                                            background_color.white,
                                            flex.justify_content_between
                                        ]}
                                        onPress={Keyboard.dismiss}
                                    >
                                        <View
                                            style={[
                                                width.w_100
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    width.w_100
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        text_size.sm,
                                                        font.serif
                                                    ]}
                                                >
                                                    <Text style={[text_color.primary]}>V???t ch???t:</Text> {this.state.viewDetailMaterial.name}
                                                </Text>
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    {
                                                        marginTop: 10
                                                    }
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        text_size.sm,
                                                        font.serif
                                                    ]}
                                                >
                                                    <Text style={[text_color.primary]}>S??? l?????ng:</Text> {this.state.viewDetailMaterial.quantity}
                                                </Text>
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    {
                                                        marginTop: 10
                                                    }
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        text_size.sm,
                                                        font.serif
                                                    ]}
                                                >
                                                    <Text style={[text_color.primary]}>Gi??: </Text>
                                                    {cardExpiry(this.state.viewDetailMaterial.price)} vn??
                                                </Text>
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    flex.flex_row,
                                                    flex.align_items_center,
                                                    {
                                                        marginTop: 10
                                                    }
                                                ]}
                                            >
                                                {/*    */}
                                            </View>
                                            {
                                                (this.state.viewDetailMaterial?.media) ?
                                                    <View
                                                        style={[
                                                            width.w_100
                                                        ]}
                                                    >
                                                        <Image
                                                            style={[
                                                                width.w_100,
                                                                { height: 180 }
                                                            ]}
                                                            source={
                                                                {
                                                                    uri: `${url}/${this.state.viewDetailMaterial?.media}`
                                                                }
                                                            }
                                                        />
                                                    </View>
                                                    : <View />
                                            }
                                        </View>
                                        <View
                                            style={[
                                                width.w_100,
                                                flex.align_items_center,
                                                { paddingLeft: 15, paddingRight: 15, marginTop: 20 }
                                            ]}
                                        >
                                            <View>
                                                <AppButtonActionInf
                                                    size={10}
                                                    textSize={18}
                                                    bg={color_primary}
                                                    onPress={() => {
                                                        this.setState({
                                                            isViewDetailMaterial: false
                                                        })
                                                    }}
                                                    title={'????ng'}
                                                />
                                            </View>
                                        </View>
                                    </SafeAreaView>
                                </View>
                            </View>
                        </Modal>
                        : <View />

                }
            </ScrollView>
        );
    }
}

const mapStateToProps = ({user, area}) => {
    return {user, area};
};

const mapDispatchToProps = {
    doGetListTypeOfRoom,
    doUpdateRoom,
    doGetBillMaterialRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRoomScreen)

