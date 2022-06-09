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
import { doLoadListBillByContract } from "../../../redux/actions/bill";

class BillsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
        }
    }




    getBillsData() {
        this.props.doLoadListBillByContract({ contractId: 1 }).then(data => {
            this.setState({
                data: data
            })
        })
        console.log(this.state.data);
    }

    componentDidMount() {
        this.getBillsData();
    }

    refresh() {
        this.getBillsData();
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
                                marginRight: 10
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
                                {item.status == 0 ? "Chưa thanh toán" : "Đã thanh toán"}
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
                        onPress={() => item.status == 0 ? this.deleteBill(item.id) : ""}
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
                        onPress={() => this.updateBill(item.contractId)}
                    >
                        <Icon
                            name={"pencil-alt"}
                            type='font-awesome-5'
                            size={item.TinhTrang == 0 ? 22 : 0}
                            color={item.TinhTrang == 0 ? color_success : "transparent"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.viewBillDetails(item.contractId)}
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
                        onPress={() => this.viewAddBill(1)}
                    />
                </View>
                <FlatList data={this.state.data} renderItem={this._renderItem} keyExtractor={(item, index) => index.toString()} contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 5}}/>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = ({ listBillByContract }) => {
    return { listBillByContract };
};

const mapDispatchToProps = {
    doLoadListBillByContract
};

export default connect(mapStateToProps, mapDispatchToProps)(BillsComponent)
