import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View, Modal, Image } from "react-native";
import axios from "axios";
import { url } from "../../../constant/define";
import { flex, font, font_weight, height, position, text_color, text_size, width, background_color } from "../../../utils/styles/MainStyle";
import {color_danger, color_primary, color_secondary, color_success, color_dark} from "../../../utils/theme/Color";
import { Icon } from "@rneui/base";
import AppFAB from "../../../components/AppFAB";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import moment from "moment";
import { connect } from "react-redux";
import AppButtonActionInf from '../../../components/AppButtonActionInf';
import { doLoadListContractByRoom, doDeleteContract } from "../../../redux/actions/contract";
import AppDialogSelect from "../../../components/AppDialogSelect";
import { doGetListArea } from "../../../redux/actions/area";
import { doGetRoomByArea } from '../../../redux/actions/room';
import { doGetBookTicketByRoom } from '../../../redux/actions/room';
import {checkedBookTicket, doApproveBookTicket} from '../../../redux/actions/bookticket';
import { get } from 'lodash';
import {doAddNotification, doUpdateNotification} from "../../../redux/actions/notification";
import Toast from "react-native-toast-message";

class ListBookTicketScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            dataArea: [],
            dataRoom: [],
            filterArea: [],
            filterRoom: [],
            isVisible: false,
            booktickets: ''
        }
    }

    getListArea() {
        this.props.doGetListArea({ userId: this.props.user.user.id }).then(data => {
            this.setState({
                dataArea: data.map(item => ({
                    key: item.id,
                    label: item.areaName,
                })),
            }, () => {
                console.log('dataA: ', this.state.dataArea);
            })
        })
    }

    getPhongData(option) {
        this.props.doGetRoomByArea({ areaId: option.key }).then(data => {
            this.setState({
                dataRoom: data.map(item => ({
                    key: item.id,
                    label: item.roomName,
                })),
            }, () => {
                console.log('dataP: ', this.state.dataP);
            })
        })
    }

    onSelectUser = (user) => {
        this.setState({
            selectUser: user
        })
    }

    getBookTicketData(key) {
        this.props.doGetBookTicketByRoom({ roomId: key }).then(data => {
            this.setState({
                isVisible: false
            })
            console.log(">>>>>", data);
            this.setState({
                data: data
            }, () => {
                // console.log(this.state.data[0].typeofroom.imageofrooms[0].image, '<<<<')
            })
        })
    }

    updateNotification() {
        this.props.doUpdateNotification({id: this.state.booktickets.id}).then(data => {
            this.getBookTicketData(this.state.booktickets?.roomId)
        })
    }

    checkedBook = (status) => {
        if(status === 1){
            let checkDate = true;
            let startDate = new Date(this.state.booktickets?.startBook);
            let endDate = new Date(this.state.booktickets?.endBook);
            this.state.data.map(item => {
                if (item?.status === 1) {
                    let timeCheckS = new Date(item?.startBook);
                    let timeCheckE = new Date(item?.endBook);
                    if (
                        startDate.getTime() >= timeCheckS.getTime() && startDate.getTime() <= timeCheckE.getTime() ||
                        endDate.getTime() >= timeCheckS.getTime() && endDate.getTime() <= timeCheckE.getTime() ||
                        startDate.getTime() < timeCheckS.getTime() && endDate.getTime() > timeCheckE.getTime()
                    ) {
                        checkDate = false;
                    }
                }
            })
            if(checkDate) {
                this.props.checkedBookTicket({status: status}, {id: this.state.booktickets?.id}).then(data => {
                    this.props.doAddNotification({
                        status: 0,
                        statusView: 0,
                        RoomId: this.state.booktickets?.roomId,
                        UserId: this.state.booktickets?.userId,
                        notificationTypeId: 1,
                        bookticketId: this.state.booktickets?.id
                    })
                    this.updateNotification();
                })
            } else{
                this.setState({
                    isVisible: false
                })
                Toast.show({
                    type: 'error',
                    text1: 'Duyệt phòng',
                    text2: 'Phòng đã được duyệt trong khoảng thời gian này.',
                    visibilityTime: 4000,
                    autoHide: true
                });
            }
        } else {
            this.props.checkedBookTicket({status: status}, {id: this.state.booktickets?.id}).then(data => {
                this.props.doAddNotification({
                    status: 0,
                    statusView: 0,
                    RoomId: this.state.booktickets?.roomId,
                    UserId: this.state.booktickets?.userId,
                    notificationTypeId: 1,
                    bookticketId: this.state.booktickets?.id
                })
                this.updateNotification();
            })
        }
    }

    viewBookTicket(item) {
        this.setState({ isVisible: true, booktickets: item });
    }


    componentDidMount() {
        this.getListArea()
    }

    _renderItem = ({ item, index }) => {
        // if(item.)
        return (
            <View
                style={[
                    width.w_100,
                    { borderBottomWidth: 1, marginTop: 10, paddingBottom: 10 },
                    flex.flex_row,
                    flex.justify_content_between,
                    flex.align_items_center
                ]}
            >
                <View
                    style={[
                        flex.flex_row
                    ]}
                >
                    <View
                        style={[
                            {
                                backgroundColor: color_primary,
                                padding: 15,
                                borderRadius: 10,
                                marginRight: 10,
                                justifyContent: 'center'
                            }
                        ]}
                    >
                        <Icon
                            name={"clipboard-check"}
                            type='font-awesome-5'
                            size={32}
                            color={'white'}
                        />
                    </View>
                    <View style={{ width: 200 }}>
                        <Text
                            style={[
                                text_size.sm,
                                font.serif,
                                font_weight.bold,
                                text_color.primary
                            ]}
                            numberOfLines={1}
                        >
                            Mã phiếu đặt: {item.id}
                        </Text>
                        <View
                            style={[
                                flex.flex_row,
                                { marginTop: 2 }
                            ]}
                        >
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    { color: new Date(item.endBook).getTime() < new Date().getTime() ? color_danger : 'black' }
                                ]}
                            >
                                Từ: {moment(item.startBook).format('DD-MM-YYYY')}{"\n"}
                                đến: {moment(item.endBook).format('DD-MM-YYYY')}
                            </Text>
                        </View>
                        <View
                            style={[
                                flex.flex_row,
                                flex.align_items_center,
                                { marginTop: 2 }
                            ]}
                        >
                            <Icon
                                name={item.status === 0 ? "circle-notch" : (item.status === 1 ? "check-circle" : "times-circle")}
                                type='font-awesome-5'
                                size={16}
                                color={item.status === 0 ? color_primary : (item.status === 1 ? color_success : color_danger)}
                            />
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    {
                                        marginLeft: 5,
                                        color: item.status === 0 ? color_primary : (item.status === 1 ? color_success : color_danger)
                                    }
                                ]}
                            >
                                {/*this.state.bookticket?.status*/}
                                {item.status === 0 ? "Chưa duyệt" : (item.status === 1 ? "Đã duyệt" : "Không duyệt")}
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={[
                        flex.flex_row
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => this.viewBookTicket(item)}
                    >
                        <Icon
                            name={"eye"}
                            type='font-awesome-5'
                            size={22}
                            color={color_success}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    render() {
        return (
            <SafeAreaView
                style={[
                    { flex: 1 },
                    height.h_100,
                    position.relative
                ]}
            >
                {
                    this.state.isVisible
                        ?
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
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            overflow: "hidden"
                                        }
                                    ]}
                                >
                                    <View>
                                        <Image
                                            source={
                                                {
                                                    uri: `${url}/${this.state.booktickets.room.typeofroom.imageofrooms[0]?.image}`
                                                }
                                            }
                                            style={{
                                                width: '100%',
                                                height: 250
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            padding: 10,
                                            flexDirection: "row"
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: '50%',
                                                paddingRight: 5
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>Tên người đặt:</Text> {this.state.booktickets.user?.name}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>SĐT:</Text> {this.state.booktickets.user?.numberPhone}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>Địa chỉ:</Text> {this.state.booktickets.user?.address}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>Đặt cọc:</Text> {this.state.booktickets?.prepayment}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                width: '50%',
                                                paddingLeft: 5
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>Khu:</Text> {this.state.booktickets.room.typeofroom.area?.areaName}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>Loại phòng:</Text> {this.state.booktickets.room.typeofroom?.name}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>Phòng:</Text> {this.state.booktickets.room?.roomName}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif,
                                                    text_color.danger
                                                ]}
                                            >
                                                <Text style={[font_weight.bold]}>Giá:</Text> {this.state.booktickets.room.typeofroom.priceofrooms[this.state.booktickets.room.typeofroom.priceofrooms?.length-1]?.price}
                                            </Text>
                                        </View>
                                    </View>
                                    {
                                        this.state.booktickets?.status ?
                                            <View style={[
                                                flex.flex_row,
                                                flex.justify_content_center,
                                                {
                                                    padding: 10
                                                }
                                            ]}>
                                                <View
                                                    style={[
                                                        {
                                                            width: '30%',
                                                            paddingHorizontal: 5
                                                        }
                                                    ]}
                                                >
                                                    <AppButtonActionInf
                                                        size={10}
                                                        textSize={16}
                                                        bg={color_secondary}
                                                        onPress={() => {
                                                            this.setState({
                                                                isVisible: false
                                                            })
                                                        }}
                                                        title="Hủy"
                                                    />
                                                </View>
                                                <View
                                                    style={[
                                                        {
                                                            width: this.state.booktickets?.status === 2 ? '50%' :'40%',
                                                            paddingHorizontal: 5
                                                        }
                                                    ]}
                                                >
                                                    {
                                                        this.state.booktickets?.status === 2 ?
                                                            <AppButtonActionInf
                                                                size={10}
                                                                textSize={16}
                                                                bg={color_danger}
                                                                title="Đã không duyệt"
                                                            />
                                                            :
                                                            <AppButtonActionInf
                                                                size={10}
                                                                textSize={16}
                                                                bg={color_primary}
                                                                title="Đã duyệt"
                                                            />
                                                    }
                                                </View>
                                            </View>
                                            :
                                            <View style={[
                                                flex.flex_row,
                                                flex.justify_content_between,
                                                {
                                                    padding: 10
                                                }
                                            ]}>
                                                <View
                                                    style={[
                                                        {
                                                            width: '30%',
                                                            paddingHorizontal: 5
                                                        }
                                                    ]}
                                                >
                                                    <AppButtonActionInf
                                                        size={10}
                                                        textSize={16}
                                                        bg={color_secondary}
                                                        onPress={() => {
                                                            this.setState({
                                                                isVisible: false
                                                            })
                                                        }}
                                                        title="Hủy"
                                                    />
                                                </View>
                                                <View
                                                    style={[
                                                        {
                                                            width: '40%',
                                                            paddingHorizontal: 5
                                                        }
                                                    ]}
                                                >
                                                    <AppButtonActionInf
                                                        size={10}
                                                        textSize={16}
                                                        bg={color_danger}
                                                        title="Không duyệt"
                                                        onPress={() => {
                                                            this.checkedBook(2)
                                                        }}
                                                    />
                                                </View>
                                                <View
                                                    style={[
                                                        {
                                                            width: '30%',
                                                            paddingHorizontal: 5
                                                        }
                                                    ]}
                                                >
                                                    <AppButtonActionInf
                                                        size={10}
                                                        textSize={16}
                                                        bg={color_primary}
                                                        title="Duyệt"
                                                        onPress={() => {
                                                            this.checkedBook(1)
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                    }
                                </View>
                            </View>
                        </Modal>
                        :
                        <View />
                }
                {/*<Text*/}
                {/*    style={[*/}
                {/*        text_size.xs,*/}
                {/*        font.serif,*/}
                {/*        font_weight.bold,*/}
                {/*        text_color.white,*/}
                {/*        width.w_100,*/}
                {/*        background_color.blue,*/}
                {/*        {*/}
                {/*            textAlign: 'center',*/}
                {/*            paddingVertical: 15,*/}
                {/*            lineHeight: 20,*/}
                {/*            letterSpacing: 0,*/}
                {/*        }*/}
                {/*    ]}*/}
                {/*>*/}
                {/*    Danh sách phiếu đặt*/}
                {/*</Text>*/}
                <View
                    style={[
                        position.absolute,
                        {
                            bottom: 25,
                            right: 25,
                            zIndex: 9999
                        }
                    ]}
                >
                </View>
                <View style={[
                    flex.flex_row, flex.justify_content_between
                ]}>
                    <View
                        style={{
                            paddingLeft: 15,
                            paddingRight: 15,
                            marginTop: 10,
                            width: '50%'
                        }}>
                        <AppDialogSelect
                            lable={'Khu:'}
                            data={this.state.dataArea}
                            value={this.state.filterArea}
                            field={'filterArea'}
                            returnFilter={(key) => this.getPhongData(key)}
                        />
                    </View>
                    <View
                        style={{
                            paddingLeft: 15,
                            paddingRight: 15,
                            marginTop: 10,
                            width: '50%'
                        }}>
                        <AppDialogSelect
                            lable={'Phòng:'}
                            data={this.state.dataRoom}
                            value={this.state.filterRoom}
                            field={'filterArea'}
                            returnFilter={(key) => this.getBookTicketData(key.key)}
                        />
                    </View>
                </View>

                <FlatList data={this.state.data} renderItem={this._renderItem} keyExtractor={(item, index) => index.toString()} contentContainerStyle={{ marginHorizontal: 10, paddingVertical: 10 }} />
                <Toast ref={(ref) => {Toast.setRef(ref)}} />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({ listContractByRoom, user }) => {
    return { listContractByRoom, user };
};

const mapDispatchToProps = {
    doLoadListContractByRoom, doGetBookTicketByRoom, doGetListArea, doGetRoomByArea, doApproveBookTicket, checkedBookTicket, doAddNotification, doUpdateNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBookTicketScreen)
