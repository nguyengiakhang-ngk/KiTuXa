import React, { Component } from 'react';
import {
    Modal,
    ScrollView, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { connect } from "react-redux";
import { SliderBox } from "react-native-image-slider-box";
import {
    flex,
    font,
    font_weight,
    text_color,
    text_size,
    width,
} from "../../../utils/styles/MainStyle";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import { color_danger, color_dark, color_primary } from "../../../utils/theme/Color";
import { Image } from "react-native";
import { Icon } from "@rneui/base";
import { doGetAreaById } from "../../../redux/actions/area";
import GetLocation from 'react-native-get-location';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from "@react-native-community/async-storage";
import { doAddSaveRoom, doDeleteSaveRoom, doGetSaveRoom } from "../../../redux/actions/saveRoom";
import { doGetRoomByType } from '../../../redux/actions/room';
import { doAddBookTicket } from '../../../redux/actions/bookticket';
import AppDialogSelect from '../../../components/AppDialogSelect';
import { AppDatePicker } from '../../../components/AppDatePicker';
import AppInputInf from '../../../components/AppInputInf';
import { background_color, shadow, padding } from '../../../utils/styles/MainStyle';


class DetailRoomScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            room: this.props.route.params.room,
            area: {},
            images: [
                "http://192.168.1.11:3001/uploads/typeOfRoom/48dc8016935adfc9ff95502692dcc433.jpg",
                "http://192.168.1.11:3001/uploads/typeOfRoom/48dc8016935adfc9ff95502692dcc433.jpg",
                "http://192.168.1.11:3001/uploads/typeOfRoom/48dc8016935adfc9ff95502692dcc433.jpg",
                "http://192.168.1.11:3001/uploads/typeOfRoom/48dc8016935adfc9ff95502692dcc433.jpg"
            ],
            isViewImage: false,
            viewImageIndex: 0,
            location: {},
            isMap: false,
            user: null,
            ticket: null,


            //Modal đặt
            isVisible: false,
            listRoomByType: [],
            roomBook: '',
            startBook: {'startBook': new Date()},
            endBook: {'endBook': new Date()},
            prepayment: "0",
            note: '',
        }
    }

    async componentDidMount() {
        let user = await AsyncStorage.getItem('@user');
        if (user) {
            this.setState({
                user: JSON.parse(user)
            }, () => {
                this.props.doGetSaveRoom({ userId: this.state.user.id, typeOfRoomId: this.state.room.id }).then(data => {
                    this.setState({
                        ticket: data
                    })
                })
            })
        }
        this.props.doGetAreaById({ areaId: this.state.room.areaId }).then(data => {
            if (data) {
                this.setState({
                    area: data
                })
            }
        })
        // console.log(">>>>>log Room by type:>>>", this.state.room);
        this.props.doGetRoomByType({typeOfRoomId: this.state.room.id}).then(data => {
            if (data) {
                console.log(">>>>>log Room by type:>>>", data);
                this.setState({
                    listRoomByType: data.map(item => ({
                        key: item.id,
                        label: item.roomName
                    }))
                })
            }
        })
    }

    addBookTicket() {
        let formData = {
            "prepayment": this.state.prepayment,
            "status": "0",
            "note": this.state.note.note,
            "startBook": this.state.startBook.startBook,
            "endBook": this.state.endBook.endBook,
            "roomId": this.state.roomBook,
            "userId": this.props.user.user.id
        }
        this.props.doAddBookTicket(formData).then(data => {
            if(data){
                this.setState({
                    isVisible: false,
                    roomBook: '',
                    startBook: '',
                    endBook: '',
                    prepayment: '',
                    note: '',
                })
            }else{
                alert("Đã xảy ra lỗi! Vui lòng thử lại!");
            }
        })
    }

    saveTicket = () => {
        if (this.state.user) {
            if (this.state.ticket) {
                this.props.doDeleteSaveRoom({ id: this.state.ticket.id }).then(data => {
                    this.setState({
                        ticket: null
                    })
                })
            } else {
                this.props.doAddSaveRoom({ userId: this.state.user.id, typeOfRoomId: this.state.room.id }).then(data => {
                    this.setState({
                        ticket: data
                    })
                })
            }
        } else {
            alert("Vui lòng đăng nhập để sử dụng!")
        }
    }



    render() {
        return (
            <View
                style={[
                    {
                        flex: 1
                    }
                ]}
            >
                <SliderBox
                    onCurrentImagePressed={(index) => {
                        this.setState({
                            isViewImage: true,
                            viewImageIndex: index
                        })
                    }}
                    images={this.state.images}
                />
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                >
                    <View style={{ flex: 1, height: '100%' }}>
                        <View
                            style={[
                                flex.flex_row,
                                flex.align_items_center,
                                {
                                    paddingHorizontal: 10,
                                    marginTop: 5
                                }
                            ]}
                        >
                            <Icon
                                name='signature'
                                type='font-awesome-5'
                                color={color_danger}
                                size={30}
                            />
                            <Text
                                style={[
                                    text_size.xl,
                                    text_color.primary,
                                    font.serif,
                                    font_weight.bold,
                                    {
                                        marginLeft: 10
                                    }
                                ]}
                            >
                                {this.state.room?.name}
                            </Text>
                        </View>
                        <View
                            style={[
                                flex.flex_row,
                                {
                                    paddingHorizontal: 10
                                }
                            ]}
                        >
                            <View
                                style={[
                                    {
                                        width: '50%'
                                    }
                                ]}
                            >
                                <View
                                    style={[
                                        flex.flex_row,
                                        flex.align_items_center,
                                        {
                                            marginTop: 5
                                        }
                                    ]}
                                >
                                    <Icon
                                        name='chart-area'
                                        type='font-awesome-5'
                                        color={color_primary}
                                        size={18}
                                    />
                                    <Text
                                        style={[
                                            text_size.sm,
                                            font.serif,
                                            {
                                                marginLeft: 10,
                                                color: color_dark
                                            }
                                        ]}
                                    >
                                        {this.state.room?.stretch} (m2)
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        flex.flex_row,
                                        flex.align_items_center,
                                        {
                                            marginTop: 5
                                        }
                                    ]}
                                >
                                    <Icon
                                        name='users'
                                        type='font-awesome-5'
                                        color={color_primary}
                                        size={18}
                                    />
                                    <Text
                                        style={[
                                            text_size.sm,
                                            font.serif,
                                            {
                                                marginLeft: 10,
                                                color: color_dark
                                            }
                                        ]}
                                    >
                                        {this.state.room?.numberOfCustomer} khách/phòng
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        flex.flex_row,
                                        flex.align_items_center,
                                        {
                                            marginTop: 5
                                        }
                                    ]}
                                >
                                    <Icon
                                        name='user-alt'
                                        type='font-awesome-5'
                                        color={color_primary}
                                        size={18}
                                    />
                                    <Text
                                        style={[
                                            text_size.sm,
                                            font.serif,
                                            {
                                                marginLeft: 10,
                                                color: color_dark
                                            }
                                        ]}
                                    >
                                        Đối tượng: {this.state.room?.typeOfCustomer}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    {
                                        width: '50%',
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        alignItems: "center"
                                    }
                                ]}
                            >
                                <View
                                    style={{ width: '60%' }}
                                >
                                    <AppButtonActionInf
                                        size={10}
                                        textSize={16}
                                        bg={color_primary}
                                        title="Đặt"
                                        onPress={() => this.setState({ isVisible: true })}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.saveTicket()
                                    }}
                                    style={{
                                        marginLeft: 15
                                    }}
                                >
                                    <Icon
                                        name={this.state.ticket ? 'bookmark' : 'bookmark-border'}
                                        type='material'
                                        color={color_primary}
                                        size={40}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={[
                                {
                                    paddingHorizontal: 10,
                                    marginTop: 5
                                }
                            ]}
                        >
                            <View
                                style={[
                                    flex.flex_row,
                                    {
                                        marginTop: 5
                                    }
                                ]}
                            >
                                <Icon
                                    style={{ marginTop: 2 }}
                                    name='note'
                                    type='material'
                                    color={color_primary}
                                    size={20}
                                />
                                <Text
                                    style={[
                                        text_size.sm,
                                        font.serif,
                                        {
                                            marginLeft: 8,
                                            color: color_dark
                                        }
                                    ]}
                                >
                                    {this.state.room?.note}
                                </Text>
                            </View>
                            <View
                                style={[
                                    flex.flex_row,
                                    {
                                        marginTop: 5
                                    },
                                    flex.align_items_center
                                ]}
                            >
                                <Icon
                                    name='chart-area'
                                    type='font-awesome-5'
                                    color={color_primary}
                                    size={18}
                                />
                                <Text
                                    style={[
                                        text_size.sm,
                                        font.serif,
                                        {
                                            marginLeft: 8,
                                            color: color_dark
                                        }
                                    ]}
                                >
                                    Khu: {this.state.area?.areaName}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={[
                                    flex.flex_row,
                                    {
                                        marginTop: 5
                                    },
                                    flex.align_items_center
                                ]}
                                onPress={() => {
                                    this.setState({
                                        isMap: true
                                    })
                                }}
                            >
                                <Icon
                                    name='my-location'
                                    type='material'
                                    color={color_primary}
                                    size={18}
                                />
                                <Text
                                    style={[
                                        text_size.sm,
                                        font.serif,
                                        {
                                            marginLeft: 8,
                                            color: color_dark
                                        }
                                    ]}
                                >
                                    {this.state.area?.address}
                                </Text>
                            </TouchableOpacity>
                            <View
                                style={[
                                    flex.flex_row,
                                    {
                                        marginTop: 5
                                    }
                                ]}
                            >
                                <Icon
                                    style={{ marginTop: 2 }}
                                    name='description'
                                    type='material'
                                    color={color_primary}
                                    size={20}
                                />
                                <Text
                                    style={[
                                        text_size.sm,
                                        font.serif,
                                        {
                                            marginLeft: 8,
                                            color: color_dark
                                        }
                                    ]}
                                >
                                    Mô tả khu: {this.state.area?.description}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {
                    this.state.isViewImage ?
                        <Modal animationType={'fade'} isVisible={true} transparent={true}>
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
                                            height: '90%',
                                            backgroundColor: 'black',
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }
                                    ]}
                                >
                                    <Image
                                        resizeMode={"stretch"}
                                        style={[
                                            {
                                                height: '100%',
                                                width: '100%'
                                            }
                                        ]}
                                        source={
                                            {
                                                uri: this.state.images[this.state.viewImageIndex]
                                            }
                                        }
                                    />
                                    <TouchableOpacity
                                        style={[
                                            {
                                                position: "absolute",
                                                top: 5,
                                                right: 5
                                            }
                                        ]}
                                        onPress={() => {
                                            this.setState({
                                                isViewImage: false
                                            })
                                        }}
                                    >
                                        <Icon
                                            name='times-circle'
                                            type='font-awesome-5'
                                            color='white'
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        : null
                }
                {
                    this.state.isVisible
                        ?
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={true}
                            onRequestClose={() => {
                                this.setState({ isVisible: false });
                            }}
                        >
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
                                <ScrollView
                                    style={[
                                        {
                                            width: '90%',
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            padding: 15,
                                        }
                                    ]}
                                >
                                    <View style=
                                        {[
                                            width.w_100,
                                            flex.justify_content_center,
                                        ], { margin: 10 }}>
                                        <View style={[flex.align_items_center, width.w_100]}>
                                            <Text style={[font_weight.bold, text_size.lg, width.w_100, {textAlign: 'center'}]}>Đặt phòng</Text>
                                            <View
                                                style={[width.w_100, {
                                                    paddingLeft: 15,
                                                    paddingRight: 15,
                                                    marginTop: 10
                                                }]}>
                                                <AppDialogSelect
                                                    lable={'Phòng:'}
                                                    data={this.state.listRoomByType}
                                                    placeholder={'Vui lòng chọn Phòng...'}
                                                    value={this.state.roomBook}
                                                    returnFilter={(key) => this.setState({roomBook: key.key})}
                                                />
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                                ]}
                                            >
                                                <AppDatePicker
                                                    label={"Thời gian bắt đầu:"}
                                                    value={this.state.startBook}
                                                    field={"startBook"}
                                                    alreadydate={new Date()}
                                                    minimumDate={new Date()}
                                                />
                                            </View>
                                            <View
                                                style={[
                                                    width.w_100,
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 10 }
                                                ]}
                                            >
                                                <AppDatePicker
                                                    label={"Thời gian kết thúc:"}
                                                    value={this.state.endBook}
                                                    field={"endBook"}
                                                    alreadydate={new Date()}
                                                />
                                            </View>
                                            <View
                                                style={[
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 10, width: '100%' }
                                                ]}
                                            >
                                                <Text style={[
                                                    text_size.sm,
                                                    font_weight.f_500,
                                                    font.serif,
                                                    { marginTop: 5, textAlignVertical: 'top', },
                                                ]}>Tiền cọc</Text>
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
                                                    keyboardType={'numeric'}
                                                    secureTextEntry={false}
                                                    placeholder={'0'}
                                                    onChangeText={(value) => { this.setState({ prepayment: value }) }}
                                                />
                                            </View>
                                            <View
                                                style={[
                                                    { paddingLeft: 15, paddingRight: 15, marginTop: 10, width: '100%', marginBottom: 20 }
                                                ]}
                                            >
                                                <Text style={[
                                                    text_size.sm,
                                                    font_weight.f_500,
                                                    font.serif,
                                                    {marginTop: 5, textAlignVertical: 'top'},
                                                ]}>Ghi chú</Text>
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
                                                    secureTextEntry={false}
                                                    onChangeText={(value) => { this.setState({ note: value }) }}
                                                />
                                            </View>
                                        </View>
                                        <View style={[flex.flex_row, flex.align_items_center, flex.justify_content_between, width.w_100, { alignSelf: 'flex-end' }]}>
                                            <View
                                                style={[
                                                    {
                                                        width: 110,
                                                    }
                                                ]}
                                            >
                                                <AppButtonActionInf
                                                    size={13}
                                                    textSize={18}
                                                    bg={color_danger}
                                                    onPress={() => {
                                                        this.setState({
                                                            isVisible: false,
                                                            roomBook: '',
                                                            startBook: '',
                                                            endBook: '',
                                                            prepayment: '',
                                                            note: '',
                                                        })
                                                    }}
                                                    title="Hủy"
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    width: 110,
                                                }}
                                            >
                                                <AppButtonActionInf
                                                    size={13}
                                                    textSize={18}
                                                    bg={color_primary}
                                                    disabled={
                                                        this.state.roomBook.length == 0
                                                    }
                                                    onPress={() => { this.addBookTicket() }}
                                                    title="Duyệt"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </Modal>
                        :
                        <View />
                }
                {
                    this.state.isMap ?
                        <Modal animationType={'fade'} isVisible={true} transparent={true}>
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
                                            height: '90%',
                                            backgroundColor: 'black',
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }
                                    ]}
                                >
                                    <MapView
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        initialRegion={{
                                            latitude: this.state.area?.lat,
                                            longitude: this.state.area?.lng,
                                            latitudeDelta: 0.0005,
                                            longitudeDelta: 0.0005
                                        }}
                                    >
                                        <Marker coordinate={{
                                            latitude: this.state.area?.lat,
                                            longitude: this.state.area?.lng
                                        }}>

                                        </Marker>
                                    </MapView>
                                    <TouchableOpacity
                                        style={[
                                            {
                                                position: "absolute",
                                                top: 5,
                                                right: 5
                                            }
                                        ]}
                                        onPress={() => {
                                            this.setState({
                                                isMap: false
                                            })
                                        }}
                                    >
                                        <Icon
                                            name='times-circle'
                                            type='font-awesome-5'
                                            color={color_primary}
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        : null
                }
            </View>
        );
    }
}

const mapStateToProps = ({ user }) => {
    return { user };
};

const mapDispatchToProps = {
    doGetAreaById,
    doGetSaveRoom,
    doAddSaveRoom,
    doDeleteSaveRoom,
    doGetRoomByType,
    doAddBookTicket
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailRoomScreen)
