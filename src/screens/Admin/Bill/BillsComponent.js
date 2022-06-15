import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { flex, font, font_weight, height, position, text_color, text_size, width, background_color } from "../../../utils/styles/MainStyle";
import { color_danger, color_primary, color_success } from "../../../utils/theme/Color";
import { Icon } from "@rneui/base";
import AppFAB from "../../../components/AppFAB";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import moment from "moment/moment";
import { connect } from "react-redux";
import { doLoadListBillByContract, doDeleteBill } from "../../../redux/actions/bill";
import AppDialogSelect from "../../../components/AppDialogSelect";
import { doGetListArea } from "../../../redux/actions/area";
import { doGetRoomByArea } from '../../../redux/actions/room';
import { doLoadListContractByRoom } from "../../../redux/actions/contract";

class BillsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            dataArea: [],
            dataRoom: [],
            dataContract: [],
            filterArea: [],
            filterRoom: [],
            filterContract: []
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
        // alert(JSON.stringify(option))
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

    getContractData(option) {
        this.props.doLoadListContractByRoom({ roomId: option.key }).then(data => {
            this.setState({
                dataContract: data.map(item => ({
                    key: item.id,
                    label: "Mã HĐ: "+item.id,
                  }))
            }, () => {
                console.log(this.state.dataContract)
            })
        })
    }

    getBillsData(option) {
        this.props.doLoadListBillByContract({ contractId: option.key }).then(data => {
            this.setState({
                data: data
            })
        })
        console.log(this.state.data);
    }

    deleteBill(id) {
        this.props.doDeleteBill({ id: id }).then(data => {
            if (data) {
                alert("Xóa hóa đơn thành công!");
                this.refresh();
            } else {
                alert("Xóa hóa đơn thất bại! Vui lòng thử lại!");
            }
        })
        console.log(this.state.data);
    }

    componentDidMount() {
        this.getListArea();
    }

    refresh() {
        this.getListArea();
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
                                justifyContent:'center'
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
                                text_color.primary
                            ]}
                        >
                            Hóa đơn: {item.nameOfBill}
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
                                name={item.status === 0 ? "circle-notch" : "check-circle"}
                                type='font-awesome-5'
                                size={16}
                                color={item.status === 0 ? color_danger : color_success}
                            />
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    { marginLeft: 5 }
                                ]}
                            >
                                {item.status === 0 ? "Chưa thanh toán" : "Đã thanh toán"}
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
                        onPress={() => item.status === 0 ? this.deleteBill(item.id) : ""}
                    >
                        <Icon
                            name={"trash-alt"}
                            type='font-awesome-5'
                            size={item.status === 0 ? 22 : 0}
                            color={item.status === 0 ? color_danger : "transparent"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            { marginRight: 10 }
                        ]}
                        onPress={() => this.updateBill(item.contractId)}
                    >
                        <Icon
                            name={"pencil-alt"}
                            type='font-awesome-5'
                            size={item.status === 0 ? 22 : 0}
                            color={item.status === 0 ? color_success : "transparent"}
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
                    Danh sách hóa đơn
                </Text>
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
                    flex.flex_row, flex.justify_content_between
                ]}>
                    <View
                        style={{
                            paddingLeft: 15,
                            paddingRight: 15,
                            marginTop: 10,
                            width: '33%'
                        }}>
                        <AppDialogSelect
                            lable={'Khu:'}
                            data={this.state.dataArea}
                            value={this.state.filterArea}
                            returnFilter={(key) => this.getPhongData(key)}
                        />
                    </View>
                    <View
                        style={{
                            paddingLeft: 15,
                            paddingRight: 15,
                            marginTop: 10,
                            width: '33%'
                        }}>
                        <AppDialogSelect
                            lable={'Phòng:'}
                            data={this.state.dataRoom}
                            value={this.state.filterRoom}
                            returnFilter={(key) => this.getContractData(key)}
                        />
                    </View>
                    <View
                        style={{
                            paddingLeft: 15,
                            paddingRight: 15,
                            marginTop: 10,
                            width: '33%'
                        }}>
                        <AppDialogSelect
                            lable={'Hợp đồng:'}
                            data={this.state.dataContract}
                            value={this.state.filterContract}
                            returnFilter={(key) => this.getBillsData(key)}
                        />
                    </View>
                </View>
                <FlatList data={this.state.data} renderItem={this._renderItem} keyExtractor={(item, index) => index.toString()} contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }} />
            </SafeAreaView>
        )
    }
}
const mapStateToProps = ({ listBillByContract, user }) => {
    return { listBillByContract, user };
};

const mapDispatchToProps = {
    doLoadListBillByContract, doDeleteBill, doGetListArea, doGetRoomByArea, doLoadListContractByRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(BillsComponent)
