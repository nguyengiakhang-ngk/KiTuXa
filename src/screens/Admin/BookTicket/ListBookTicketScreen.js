import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View, Modal, Image } from "react-native";
import axios from "axios";
import { url } from "../../../constant/define";
import { flex, font, font_weight, height, position, text_color, text_size, width, background_color } from "../../../utils/styles/MainStyle";
import { color_danger, color_primary, color_success } from "../../../utils/theme/Color";
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
import { doApproveBookTicket } from '../../../redux/actions/bookticket';
import { get } from 'lodash';

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

    refresh() {
        this.getListArea();
        this.getBookTicketData({'key': this.state.filterRoom.filterRoom})
    }

    onSelectUser = (user) => {
        this.setState({
            selectUser: user
        })
    }

    getBookTicketData(option) {
        this.props.doGetBookTicketByRoom({ roomId: option.key }).then(data => {
            console.log(">>>>>", data);
            this.setState({
                data: data
            }, () => {
                console.log(this.state.data[0].typeofroom.imageofrooms[0].image, '<<<<')
            })
        })
    }

    approveBookticket(id) {
        this.props.doApproveBookTicket({id: id}).then(data =>{
            if(data){
                this.setState({isVisible: false, booktickets: ''})
                this.refresh()
            }else{
                alert("Duyệt thất bại! Vui lòng thử lại!")
            }
        })
    }

    viewBookTicket(item) {
        this.setState({ isVisible: true, booktickets: item });
    }


    componentDidMount() {
        this.getListArea()
    }

    _renderItem = ({ item, index }) => {
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
                            {/* <Icon
                                name={"calendar-day"}
                                type='font-awesome-5'
                                size={16}
                                color={new Date(item.duration).getTime() < new Date().getTime() ? color_danger : color_primary}
                            /> */}
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    { marginLeft: 10, color: new Date(item.endBook).getTime() < new Date().getTime() ? color_danger : 'black' }
                                ]}
                            >
                                Từ: {moment(item.startBook).format('DD-MM-YYYY')}{"\n"}
                                đến: {moment(item.endBook).format('DD-MM-YYYY')}
                            </Text>
                        </View>
                        <View
                            style={[
                                flex.flex_row,
                                { marginTop: 2 }
                            ]}
                        >
                            <Icon
                                name={item.status == 0 ? "circle-notch" : "check-circle"}
                                type='font-awesome-5'
                                size={16}
                                color={item.status == 0 ? color_danger : color_success}
                            />
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    { marginLeft: 5 }
                                ]}
                            >
                                {item.status == 0 ? "Chưa được duyệt" : "Đã được duyệt"}
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
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={true}
                            onRequestClose={() => {
                                this.setState({ isVisible: false, booktickets: '' });
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
                                <View
                                    style={[
                                        {
                                            width: '90%',
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            padding: 15,
                                        }
                                    ]}
                                >
                                    <View style={[
                                        width.w_100,
                                        flex.justify_content_center,
                                    ], { margin: 10 }}>
                                        <View style={[
                                            flex.flex_row, width.w_100
                                        ], { marginBottom: 10, flexDirection: 'row' }}>
                                            <Image
                                                source={{
                                                    uri: `${url}/${this.state.data[0].typeofroom.imageofrooms[0].image}`
                                                }}
                                                resizeMode={'stretch'}
                                                style={{
                                                    width: 150,
                                                    height: 150
                                                }}
                                            />
                                            <View style={{ marginLeft: 10 }}>
                                                <Text
                                                    style={[
                                                        font.serif,
                                                    ], { marginBottom: 10, fontSize: 16, color: color_primary }}
                                                >
                                                    Tên phòng: {this.state.data[0].roomName}
                                                </Text>
                                                <Text style={[
                                                    text_size.xl,
                                                    font.serif,
                                                ], { marginBottom: 10, fontSize: 16, color: color_primary }}>Giá: {this.state.data[0].typeofroom.priceofrooms[0].price}
                                                </Text>
                                                <Text
                                                    style={[
                                                        font.serif,
                                                    ], { marginBottom: 10, fontSize: 16, color: color_primary }}
                                                >
                                                    Từ: {moment(this.state.booktickets.startBook).format('DD-MM-YYYY')}{"\n"}
                                                    đến: {moment(this.state.booktickets.endBook).format('DD-MM-YYYY')}
                                                </Text>
                                                <Text
                                                    style={[
                                                        font.serif,
                                                    ], { marginBottom: 10, fontSize: 16, color: color_primary }}
                                                >
                                                    Người thuê: {this.state.booktickets.user.name}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={[flex.flex_row, flex.align_items_center, flex.justify_content_between, width.w_100, { alignSelf: 'flex-end' }]}>
                                            <View
                                                style={[
                                                    {
                                                        width: 150,
                                                        marginRight: 15
                                                    }
                                                ]}
                                            >
                                                <AppButtonActionInf
                                                    size={13}
                                                    textSize={18}
                                                    bg={color_danger}
                                                    onPress={() => { this.setState({ isVisible: false, booktickets: '' }) }}
                                                    title="Hủy"
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    width: 150,
                                                }}
                                            >
                                                <AppButtonActionInf
                                                    size={13}
                                                    textSize={18}
                                                    disabled={this.state.booktickets.status == 1 ? true : false}
                                                    bg={color_primary}
                                                    onPress={() => { this.approveBookticket(this.state.booktickets.id) }}
                                                    //onPress={() => alert(values.Ten_HD)}
                                                    title="Duyệt"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        :
                        <View />
                }
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        font_weight.bold,
                        text_color.white,
                        width.w_100,
                        background_color.blue,
                        {
                            textAlign: 'center',
                            paddingVertical: 15,
                            lineHeight: 20,
                            letterSpacing: 0,
                        }
                    ]}
                >
                    Danh sách phiếu đặt
                </Text>
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
                    {/* <AppFAB
                        bg={color_primary}
                        name='plus'
                        size={20}
                        color={'white'}
                        onPress={() => this.viewAddContract(1)}
                    /> */}
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
                            returnFilter={(key) => this.getBookTicketData(key)}
                        />
                    </View>
                </View>

                <FlatList data={this.state.data[0]?.booktickets} renderItem={this._renderItem} keyExtractor={(item, index) => index.toString()} contentContainerStyle={{ marginHorizontal: 10, paddingVertical: 10 }} />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({ listContractByRoom, user }) => {
    return { listContractByRoom, user };
};

const mapDispatchToProps = {
    doLoadListContractByRoom, doGetBookTicketByRoom, doGetListArea, doGetRoomByArea, doApproveBookTicket
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBookTicketScreen)