import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import axios from "axios";
import { flex, font, font_weight, height, position, text_color, text_size, width, background_color } from "../../../utils/styles/MainStyle";
import { color_danger, color_primary, color_success, color_secondary } from "../../../utils/theme/Color";
import { Icon } from "@rneui/base";
import AppFAB from "../../../components/AppFAB";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import moment from "moment/moment";
import { connect } from "react-redux";
import { doLoadListBillByContract, doDeleteBill, doLoadListBillByArea } from "../../../redux/actions/bill";
import AppSelectFilter from "../../../components/AppSelectFilter";
import { doGetListArea } from "../../../redux/actions/area";
import { doGetRoomByArea } from '../../../redux/actions/room';
import { doLoadListContractByRoom } from "../../../redux/actions/contract";
import DialogConfirm from "../../../components/DialogConfirm";
import Toast from "react-native-toast-message";
import { orderBy } from 'lodash';

class BillsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            dataArea: [],
            dataType: [],
            dataRoom: [],
            dataContract: [],
            filterArea: 'Tất cả',
            filterType: 'Tất cả',
            filterRoom: 'Tất cả',
            filterContract: 'Tất cả',
            // typeOfRoom: [],

            dataAll: [],
            isConfirm: false,
            AreaSelect: -1,
            TypeSelect: -1,
            RoomSelect: -1,
            ContractSelect: -1,
            billDelete: ''
        }
    }

    viewBillDetails(id) {
        this.props.navigation.navigate("BillDetails", {
            id: id
        });
    }

    updateBill(id) {
        this.props.navigation.navigate("UpdateBill", {
            id: id,
            refresh: () => { this.refresh() }
        });
    }

    getListArea() {
        this.props.doGetListArea({ userId: this.props.user.user.id }).then(data => {
            this.setState({
                dataArea: [
                    {
                        key: 0,
                        label: "Tất cả"
                    },
                    ...data.map(item => ({ key: item.id, label: item.areaName }))
                ],
            })
        })
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
        const listBill = [];
        option.typeofrooms.map(itemType => {
            listType.push(itemType);
            itemType.rooms.map(itemRoom => {
                listRoom.push(itemRoom);
                itemRoom.contracts.map(itemTr => {
                    listContract.push(itemTr)
                    itemTr.bills.map(itemB => {
                        listBill.push(itemB);
                    })
                })
            })
        })
        this.setState({
            data: listBill,
            dataType: [
                {
                    key: -1,
                    label: 'Tất cả',
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
            dataContract: [
                {
                    key: -1,
                    label: 'Tất cả'
                },
                ...listContract.map(item => ({ key: item.id, label: "Mã HĐ: " + item.id, bills: item.bills }))
            ],
            filterContract: "Tất cả",
            filterType: 'Tất cả',
            filterRoom: 'Tất cả'
        })
    }

    getRoomData(option) {
        console.log(option)
        if (option.key === -1) {
            this.setState({
                // data: listBill,
                // filterType: "Tất cả",
                filterContract: "Tất cả",
                filterRoom: "Tất cả",
            })
        } else {
            this.setState({
                TypeSelect: option.key,
                filterType: option.label,
            })
        }
        const listRoom = [];
        const listContract = [];
        const listBill = [];
        option.rooms.map(itemRoom => {
            listRoom.push(itemRoom);
            itemRoom.contracts.map(itemTr => {
                listContract.push(itemTr);
                itemTr.bills.map(itemB => {
                    listBill.push(itemB);
                })
            })
        })
        this.setState({
            data: listBill,
            TypeSelect: option.key,
            filterType: option.label,
            filterContract: "Tất cả",
            filterRoom: "Tất cả",
            dataRoom: [
                {
                    key: -1,
                    label: "Tất cả"
                },
                ...listRoom.map(item => ({ key: item.id, label: item.roomName, contracts: item.contracts }))
            ],
            dataContract: [
                {
                    key: -1,
                    label: "Tất cả"
                },
                ...listContract.map(item => ({ key: item.id, label: "Mã HĐ: " + item.id, bills: item.bills }))
            ],
        })
    }

    getContractData(option) {
        if (option.key === -1) {
            this.setState({
                filterRoom: "Tất cả",
                filterContract: "Tất cả",
            })
        } else {
            this.setState({
                filterRoom: option.label,
                filterContract: "Tất cả",
                RoomSelect: option.key,
            })
        }
        const listContract = [];
        const listBill = [];
        option.contracts.map(itemTr => {
            listContract.push(itemTr);
            itemTr.bills.map(itemB => {
                listBill.push(itemB);
            })
        })
        this.setState({
            data: listBill,
            dataContract: [
                {
                    key: -1,
                    label: 'Tất cả'
                },
                ...listContract.map(item => ({ key: item.id, label: "Mã HĐ: " + item.id, bills: item.bills }))
            ],
        })
    }

    getBillsData(option) {
        if (option.key === -1) {
            this.setState({
                filterContract: "Tất cả"
            })
        } else {
            this.setState({
                filterContract: option.label
            })
        }
        const listBill = [];
        option.bills.map(itemB => {
            listBill.push(itemB);
        })
        this.setState({
            data: listBill
        })
    }

    getListAreaAll() {
        this.props.doLoadListBillByArea({ userId: this.props.user.user.id }).then(data => {
            // console.log(data);
            const listRoom = [];
            const listType = [];
            const listContract = [];
            const listBill = [];
            data.map(item => {
                item?.typeofrooms.map(itemType => {
                    listType.push(itemType);
                    itemType.rooms.map(itemRoom => {
                        listRoom.push(itemRoom);
                        itemRoom.contracts.map(itemTr => {
                            listContract.push(itemTr)
                            itemTr.bills.map(itemB => {
                                listBill.push(itemB);
                            })
                        })
                    })
                })
            });

            this.setState({
                dataAll: data,
                data: listBill,
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
                dataContract: [
                    {
                        key: -1,
                        label: 'Tất cả',
                        bills: listBill
                    },
                    ...listContract.map(item => ({ key: item.id, label: "Mã HĐ: " + item.id, bills: item.bills }))
                ],
            }, () => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }



    deleteBill(id) {
        this.props.doDeleteBill({ id: id }).then(data => {
            this.setState({
                billDelete: '',
                isConfirm: false
            })
            this.refresh()
            Toast.show({
                type: 'success',
                text1: 'Hóa đơn',
                text2: 'Xóa thành công.',
                visibilityTime: 2000,
                autoHide: true
            });
        })
        console.log(this.state.data);
    }

    componentDidMount() {
        // this.getListArea();
        this.getListAreaAll()
    }

    refresh() {
        this.setState({isLoading: true})
        this.getListAreaAll();
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
                            name={"file-invoice-dollar"}
                            type='font-awesome-5'
                            size={32}
                            color={'white'}
                        />
                    </View>
                    <View>
                        <Text
                            style={[
                                text_size.sm,
                                font.serif,
                                font_weight.bold,
                                text_color.primary, {width: 220}
                            ]}
                            numberOfLines={1}
                        >
                            {item.nameOfBill}
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
                                Ngày Thu: {moment(item.dateOfPayment).format('DD-MM-YYYY')}
                            </Text>
                        </View>
                        <View
                            style={[
                                flex.flex_row,
                                { marginTop: 2 }
                            ]}
                        >
                            <Icon
                                name={item.status === '0' ? "circle-notch" : "check-circle"}
                                type='font-awesome-5'
                                size={16}
                                color={item.status === '0' ? color_danger : color_success}
                            />
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    { marginLeft: 5 }
                                ]}
                            >
                                {item.status === '0' ? "Chưa thanh toán" : "Đã thanh toán"}
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
                        onPress={() => item.status === '0' ? this.setState({ isConfirm: true, billDelete: item.id }) : ""}
                    >
                        <Icon
                            name={"trash-alt"}
                            type='font-awesome-5'
                            size={item.status === '0' ? 22 : 0}
                            color={item.status === '0' ? color_danger : "transparent"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            { marginRight: 10 }
                        ]}
                        onPress={() => this.updateBill(item.id)}
                    >
                        <Icon
                            name={"pencil-alt"}
                            type='font-awesome-5'
                            size={item.status === '0' ? 22 : 0}
                            color={item.status === '0' ? color_success : "transparent"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.viewBillDetails(item.id)}
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
                            zIndex: 9999,
                        }
                    ]}
                >
                    <AppFAB
                        bg={color_primary}
                        name='plus'
                        size={20}
                        color={'white'}
                        onPress={() => this.props.navigation.navigate('AddBill', { contractId: 1, refresh: () => this.refresh() })}
                    />
                </View>
                <View style={[
                    flex.flex_row, flex.justify_content_between, { marginHorizontal: 5 }
                ]}>
                    <View
                        style={{
                            marginTop: 10,
                            width: '49%'
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
                            width: '49%'
                        }}>
                        <AppSelectFilter
                            lable={'Loại Phòng:'}
                            data={this.state.dataType}
                            value={this.state.filterType}
                            returnFilter={(key) => this.getRoomData(key)}
                        />
                    </View>
                </View>
                <View style={[
                    flex.flex_row,
                    flex.justify_content_between,
                    { marginHorizontal: 5 }
                ]}>
                    <View
                        style={{
                            marginTop: 10,
                            width: '49%'
                        }}>
                        <AppSelectFilter
                            lable={'Phòng:'}
                            data={this.state.dataRoom}
                            value={this.state.filterRoom}
                            returnFilter={(key) => this.getContractData(key)}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            width: '49%'
                        }}>
                        <AppSelectFilter
                            lable={'Hợp đồng:'}
                            data={this.state.dataContract}
                            value={this.state.filterContract}
                            returnFilter={(key) => this.getBillsData(key)}
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
                                this.deleteBill(this.state.billDelete);
                            }}
                        />
                        : null
                }
                <Toast ref={(ref) => { Toast.setRef(ref) }} />
                {
                    this.state.isLoading
                        ?
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={color_primary} />
                        </View>
                        :
                        (
                            this.state.data.length > 0
                                ?
                                <FlatList data={orderBy(this.state.data, ['id'],['desc'])} renderItem={this._renderItem} keyExtractor={(item, index) => index.toString()} contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }} />
                                :
                                this._renderEmpty()
                        )
                }
            </SafeAreaView>
        )
    }
}
const mapStateToProps = ({ listBillByContract, user }) => {
    return { listBillByContract, user };
};

const mapDispatchToProps = {
    doLoadListBillByContract, doDeleteBill, doGetListArea, doGetRoomByArea,
    doLoadListContractByRoom, doLoadListBillByArea
};

export default connect(mapStateToProps, mapDispatchToProps)(BillsComponent)
