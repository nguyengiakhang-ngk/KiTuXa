import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import axios from "axios";
import { path } from "../../../constant/define";
import { flex, font, font_weight, height, position, text_color, text_size, width, background_color } from "../../../utils/styles/MainStyle";
import { color_danger, color_primary, color_success, color_secondary } from "../../../utils/theme/Color";
import { Icon } from "@rneui/base";
import AppFAB from "../../../components/AppFAB";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import moment from "moment";
import { connect } from "react-redux";
import { doLoadListContractByRoom, doDeleteContract } from "../../../redux/actions/contract";
import AppDialogSelect from "../../../components/AppDialogSelect";
import { doGetListArea } from "../../../redux/actions/area";
import { doGetRoomByArea } from '../../../redux/actions/room';
import Toast from "react-native-toast-message";
import DialogConfirm from "../../../components/DialogConfirm";
import { doLoadListBillByArea } from '../../../redux/actions/bill';

class ContractScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            dataArea: [],
            dataRoom: [],
            filterArea: [],
            filterRoom: [],
            isConfirm: false,
            contractDelete: ''
        }
    }

    getListArea() {
        this.props.doLoadListBillByArea({ userId: this.props.user.user.id }).then(data => {
            // console.log(data);
            const listRoom = [];
            const listType = [];
            const listContract = [];
            data.map(item => {
                item?.typeofrooms.map(itemType => {
                    listType.push(itemType);
                    itemType.rooms.map(itemRoom => {
                        listRoom.push(itemRoom);
                        itemRoom.contracts.map(itemTr => {
                            listContract.push(itemTr)
                        })
                    })
                })
            });
            this.setState({
                data: listContract,
            })
        })

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

    viewContractDetail(id) {
        this.props.navigation.navigate("ContractDetail", {
            id: id,
            refresh: () => { this.refresh() }
        });
    }

    refresh() {
        this.getListArea();
    }

    onSelectUser = (user) => {
        this.setState({
            selectUser: user
        })
    }

    viewAddContract(userId) {
        this.props.navigation.navigate("AddContract",
            {
                refresh: () => { this.refresh() }
            });
    }

    getContractData(option) {
        this.props.doLoadListContractByRoom({ roomId: option.key }).then(data => {
            this.setState({
                data: data
            })
        })
        console.log(this.state.data);
    }

    updateContract = (id) => {
        this.props.navigation.navigate("UpdateContract",
            {
                id: id,
                refresh: () => { this.refresh() }
            });
    }

    deleteContract(id) {
        this.props.doDeleteContract({ id: id }).then(data => {
            this.setState({
                contractDelete: '',
                isConfirm: false
            })
            this.refresh()
            Toast.show({
                type: 'success',
                text1: 'Hợp đồng',
                text2: 'Xóa thành công.',
                visibilityTime: 2000,
                autoHide: true
            });
        })
    }

    componentDidMount() {
        this.getListArea()

        // this.focusEventListener = this.props.navigation.addListener(
        //     'didFocus',
        //     () => {
        //         this.getContractData();
        //     }
        // )
    }

    // refresh(){
    //     this.getContractData();
    // }

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
                                justifyContent:'center'
                            }
                        ]}
                    >
                        <Icon
                            name={"file-contract"}
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
                            Mã HĐ: {item.id}
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
                                color={new Date(item.duration).getTime() < new Date().getTime() ? color_danger : color_primary}
                            />
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    { marginLeft: 10, color: new Date(item.duration).getTime() < new Date().getTime() ? color_danger : 'black' }
                                ]}
                            >
                                Thời hạn: {moment(item.duration).format('DD-MM-YYYY')}
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
                        style={[
                            { marginRight: 10 }
                        ]}
                        onPress={() => item.status === '0' ? this.setState({ isConfirm: true, contractDelete: item.id }) : ""}
                    >
                        <Icon
                            name={"trash-alt"}
                            type='font-awesome-5'
                            size={item.status == 0 ? 22 : 0}
                            color={item.status == 0 ? color_danger : "transparent"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            { marginRight: 10 }
                        ]}
                        onPress={() => this.updateContract(item.id)}
                    >
                        <Icon
                            name={"pencil-alt"}
                            type='font-awesome-5'
                            size={item.status == 0 ? 22 : 0}
                            color={item.status == 0 ? color_success : "transparent"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.viewContractDetail(item.id)}
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
                    Danh sách hợp đồng
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
                        onPress={() => this.viewAddContract(1)}
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
                            placeholder={'Tất cả'}
                            returnFilter={(key) => this.getContractData(key)}
                        />
                    </View>
                </View>
                <Toast ref={(ref) => {Toast.setRef(ref)}} />
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
                                this.deleteContract(this.state.contractDelete);
                            }}
                        />
                        : null
                }
                {
                    this.state.isLoading
                    ?
                    <ActivityIndicator size="large" color={color_primary} />
                    :
                    (
                        this.state.data.length > 0
                        ?
                        <FlatList data={this.state.data} renderItem={this._renderItem} keyExtractor={(item, index) => index.toString()} contentContainerStyle={{ marginHorizontal: 10, paddingVertical: 10 }} />
                        :
                        this._renderEmpty()
                    )
                }
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({ listContractByRoom, user }) => {
    return { listContractByRoom, user };
};

const mapDispatchToProps = {
    doLoadListContractByRoom, doDeleteContract, doGetListArea, doGetRoomByArea, doLoadListBillByArea
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractScreen)