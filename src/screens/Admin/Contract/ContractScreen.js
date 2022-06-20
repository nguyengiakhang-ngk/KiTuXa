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
import { doLoadListContractByRoom, doDeleteContract, doLoadListContractByArea } from "../../../redux/actions/contract";
import AppSelectFilter from "../../../components/AppSelectFilter";
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
            dataType: [],
            dataRoom: [],
            filterArea: 'Tất cả',
            filterType: 'Tất cả',
            filterRoom: 'Tất cả',
            isConfirm: false,
            contractDelete: ''
        }
    }

    getListArea() {
        this.props.doLoadListContractByArea({ userId: this.props.user.user.id }).then(data => {
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
                dataAll: data,
                data: listContract,
                dataArea: [
                    {
                        key: -1,
                        label: 'Tất cả',
                        typeofrooms: listType
                    },
                    ...data.map(item => ({ key: item.id, label: item.areaName, typeofrooms: item.typeofrooms }))
                ],
                dataType: [
                    {
                        key: -1,
                        label: 'Tất cả',
                        rooms: listRoom
                    },
                    ...listType.map(item => ({ key: item.id, label: item.name, rooms: item.rooms }))
                ],
                dataRoom: [
                    {
                        key: -1,
                        label: 'Tất cả',
                        contracts: listContract
                    },
                    ...listRoom.map(item => ({ key: item.id, label: item.roomName, contracts: item.contracts }))
                ],
            })
        })
        
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 2000)
    }

    filterType(option) {
        if (option.key === -1) {
            this.setState({
                filterArea: "Tất cả"
            })
        } else {
            this.setState({
                filterArea: option.label
            })
        }
        const listRoom = [];
        const listType = [];
        const listContract = [];
        option.typeofrooms.map(itemType => {
            listType.push(itemType);
            itemType.rooms.map(itemRoom => {
                listRoom.push(itemRoom);
                itemRoom.contracts.map(itemTr => {
                    listContract.push(itemTr);
                })
            })
        })
        this.setState({
            data: listContract,
            dataType: [
                {
                    key: -1,
                    label: 'Tất cả'
                },
                ...listType.map(item => ({ key: item.id, label: item.name, rooms: item.rooms }))
            ],
            dataRoom: [
                {
                    key: -1,
                    label: 'Tất cả'
                },
                ...listRoom.map(item => ({ key: item.id, label: item.roomName, contracts: item.contracts }))
            ],
            filterType: 'Tất cả',
            filterRoom: 'Tất cả'
        })
    }

    getRoomData(option) {
        console.log(option)
        if (option.key === -1) {
            this.setState({
                filterType: "Tất cả",
            })
        } else {
            this.setState({
                TypeSelect: option.key,
                filterType: option.label,
            })
        }
        const listRoom = [];
        const listContract = [];
        option.rooms.map(itemRoom => {
            listRoom.push(itemRoom);
            itemRoom.contracts.map(itemTr => {
                listContract.push(itemTr);
            })
        })
        this.setState({
            data: listContract,
            dataRoom: [
                {
                    key: -1,
                    label: "Tất cả"
                },
                ...listRoom.map(item => ({ key: item.id, label: item.roomName, contracts: item.contracts }))
            ],
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

    getContractsData(option) {
        
        if (option.key === -1) {
            this.setState({
                filterRoom: "Tất cả"
            })
        } else {
            this.setState({
                filterRoom: option.label
            })
        }
        const listContract = [];
        option.contracts.map(itemB => {
            listContract.push(itemB);
        })
        console.log(listContract)
        this.setState({
            data: listContract
        })
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
                    flex.flex_row, flex.justify_content_between, flex.align_items_center, {marginHorizontal: 5}
                ]}>
                    <View
                        style={{
                            marginTop: 10,
                            width: '30%'
                        }}>
                        <AppSelectFilter
                            lable={'Khu:'}
                            data={this.state.dataArea}
                            value={this.state.filterArea}
                            returnFilter={(key) => this.filterType(key)}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            width: '30%'
                        }}>
                        <AppSelectFilter
                            lable={'Loại Phòng:'}
                            data={this.state.dataType}
                            value={this.state.filterType}
                            returnFilter={(key) => this.getRoomData(key)}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            width: '30%'
                        }}>
                        <AppSelectFilter
                            lable={'Phòng:'}
                            data={this.state.dataRoom}
                            value={this.state.filterRoom}
                            returnFilter={(key) => this.getContractsData(key)}
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
                    <View style={{flex: 1, justifyContent: 'center'}}>
                            <ActivityIndicator size="large" color={color_primary} />
                        </View>
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
    doLoadListContractByRoom, 
    doDeleteContract, doGetListArea, 
    doGetRoomByArea, doLoadListBillByArea,
    doLoadListContractByArea
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractScreen)