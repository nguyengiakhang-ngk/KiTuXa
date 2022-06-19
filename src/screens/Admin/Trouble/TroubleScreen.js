import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View, Image, Modal, ActivityIndicator } from "react-native";
import axios from "axios";
import { path } from "../../../constant/define";
import { flex, font, font_weight, height, position, text_color, text_size, width, background_color } from "../../../utils/styles/MainStyle";
import { color_danger, color_primary, color_success, color_secondary } from "../../../utils/theme/Color";
import { Icon } from "@rneui/base";
import AppFAB from "../../../components/AppFAB";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import moment from "moment/moment";
import { connect } from 'react-redux';
import { doGetListTroubleByRoom, doDeleteTrouble } from '../../../redux/actions/trouble'
import AppDialogSelect from "../../../components/AppDialogSelect";
import { doGetListArea } from "../../../redux/actions/area";
import { doGetRoomByArea } from '../../../redux/actions/room';
import DialogConfirm from "../../../components/DialogConfirm";
import Toast from "react-native-toast-message";


class TroubleScreen extends Component {
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
            isConfirm: false,
            troubleDelete: ''
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

        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 2000)
    }

    getPhongData(option) {
        console.log(this.state.filterArea, 'hello');
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


    viewTroubleDetails(item) {
        this.setState({isVisible: true})
    }

    viewAddTrouble(roomId) {
        this.props.navigation.navigate("AddTrouble",
            {
                roomId: roomId,
                refresh: () => { this.refresh() }
            });
    }
    deleteTrouble(trouble) {
        this.props.doDeleteTrouble({ id: trouble.id, image: trouble.image }).then(data => {
            this.setState({
                troubleDelete: '',
                isConfirm: false
            })
            this.refresh()
            Toast.show({
                type: 'success',
                text1: 'Sự cố',
                text2: 'Xóa thành công.',
                visibilityTime: 2000,
                autoHide: true
            });
        })
    }

    updateTrouble(id) {
        this.props.navigation.navigate("UpdateTrouble", {
            id: id,
            refresh: () => { this.refresh() }
        });
    }

    getTroubleData(option) {
        this.props.doGetListTroubleByRoom({ roomId: option.key }).then(data => {
            this.setState({
                data: data
            }, () => { console.log(data) })
        })
    }

    componentDidMount() {
        this.getListArea();
    }

    refresh() {
        this.getPhongData(this.state.filterArea.filterArea);
    }

    _renderEmpty = () => {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: 'center'
                }}
            >
                <Text
                    style={[
                        text_size.lg,
                        font.serif,
                        {
                            color: color_secondary
                        }
                    ]}
                >
                    Không có dữ liệu
                </Text>
            </View>
        )
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
                                backgroundColor: "#FFFFFF",
                                padding: 5,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: color_primary,
                                marginRight: 10
                            }
                        ]}
                    >
                        <Image
                            source={require("../../../../assets/icons/report.png")}
                            style={{
                                width: 40,
                                height: 40
                            }}
                        />
                    </View>
                    <View style={{ width: 200 }}>
                        <Text
                            style={[
                                text_size.sm,
                                font.serif,
                                font_weight.bold,
                                text_color.primary,
                            ]}
                            numberOfLines={1}
                        >
                            Tên: {item.name}
                        </Text>
                        <View
                            style={[
                                flex.flex_row,
                                { marginTop: 2 }
                            ]}
                        >
                            <Icon
                                name={"calendar-day"}
                                type='font-awesome-5'
                                size={16}
                                color={color_primary}
                            />
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    { marginLeft: 10 }
                                ]}
                            >
                                Ngày bị: {moment(item.dateOfTrouble).format('DD-MM-YYYY')}
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={[
                        flex.flex_row
                    ]}
                >
                    {
                        item.status == 0
                            ?
                            <View style={flex.flex_row}>
                                <TouchableOpacity
                                    style={[
                                        { marginRight: 10 }
                                    ]}
                                    onPress={() => item.status === '0' ? this.setState({ isConfirm: true, troubleDelete: item }) : ""}
                                >
                                    <Icon
                                        name={"trash-alt"}
                                        type='font-awesome-5'
                                        size={22}
                                        color={color_danger}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        { marginRight: 10 }
                                    ]}
                                    onPress={() => this.updateTrouble(item.id)}
                                >
                                    <Icon
                                        name={"pencil-alt"}
                                        type='font-awesome-5'
                                        size={22}
                                        color={color_success}
                                    />
                                </TouchableOpacity>
                            </View>
                            :
                            <View />
                    }
                    <TouchableOpacity
                        onPress={() => this.viewTroubleDetails(item)}
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
                    Danh sách sự cố
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
                    <AppFAB
                        bg={color_primary}
                        name='plus'
                        size={20}
                        color={'white'}
                        onPress={() => this.viewAddTrouble(1)}
                    />
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
                            placeholder={'Tất cả'}
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
                            placeholder={'Tất cả'}
                            value={this.state.filterRoom}
                            field={'filterRoom'}
                            returnFilter={(key) => this.getTroubleData(key)}
                        />
                    </View>
                </View>
                {
                    this.state.isConfirm ?
                        <DialogConfirm
                            content={"Bạn có chắc chắn muốn xóa?"}
                            cancel={() => {
                                this.setState({
                                    isConfirm: false
                                })
                            }}
                            confirm={() => {
                                this.deleteTrouble(this.state.troubleDelete);
                            }}
                        />
                        : null
                }
                <Toast ref={(ref) => {Toast.setRef(ref)}} />
                {
                    this.state.isLoading
                    ?
                    <ActivityIndicator size="large" color={color_primary} />
                    :
                    (
                        this.state.data.length > 0
                        ?
                        <FlatList contentContainerStyle={{ paddingHorizontal: 10 }} data={this.state.data} renderItem={this._renderItem} keyExtractor={(item, index) => index.toString()} />
                        :
                        this._renderEmpty()
                    )
                }
                
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({ listReceiptByContract, user }) => {
    return { listReceiptByContract, user };
};

const mapDispatchToProps = {
    doGetListTroubleByRoom, doDeleteTrouble, doGetListArea, doGetRoomByArea
};

export default connect(mapStateToProps, mapDispatchToProps)(TroubleScreen)