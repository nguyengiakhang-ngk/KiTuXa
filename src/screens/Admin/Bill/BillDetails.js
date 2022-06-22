import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import axios from "axios";
import { path } from "../../../constant/define";
import {
    background_color,
    border,
    flex,
    font,
    font_weight,
    text_color,
    text_size,
    width
} from "../../../utils/styles/MainStyle";
import { color_primary } from '../../../utils/theme/Color';
import moment from "moment/moment";
import { connect } from 'react-redux';
import { doLoadBillById } from '../../../redux/actions/bill';
import AppButton from '../../../components/AppButton';
class BillDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: {}
        }
    }

    getBillData() {
        this.props.doLoadBillById({ id: this.props.route.params.id }).then( async data => {
            await this.setState({
                data: data
            },() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }
    componentDidMount() {
        this.getBillData();
        //this.getUserData()
    }


    render() {
        return (
            <View style={[flex, flex.align_items_center, background_color.white, { flex: 1 }]}>
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
                            padding: 20
                        }
                    ]}
                >
                    Chi tiết hóa đơn
                </Text>
                {
                    this.state.isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={color_primary} />
                        </View>
                    :
                    <ScrollView
                    style={[background_color.white, width.w_100, { flex: 1 }]}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[flex, flex.align_items_center, background_color.white, { flex: 1, paddingBottom: 10 }]}>
                        <Text
                            style={[
                                text_size.xs,
                                font_weight.f_700,
                                width.w_100,
                                {
                                    textAlign: 'left',
                                    padding: 15,
                                    color: '#424242'
                                }
                            ]}
                        >
                            TÊN HÓA ĐƠN:
                        </Text>
                        <View style={[
                            width.w_95, background_color.white,
                            {
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: '#E0E0E0',
                                marginHorizontal: 10
                            }
                        ]}
                        >
                            <View style={[
                                text_size.sm, width.w_100,
                                {
                                    paddingLeft: 20,
                                    paddingTop: 5,
                                    paddingBottom: 5
                                }
                            ]}>
                                <Text style={[text_size.xs, font_weight.bold, { fontStyle: 'italic', paddingBottom: 5 }]}>
                                    Hóa đơn: {this.state.data.nameOfBill}</Text>
                                <Text style={[text_size.xs, font_weight.bold, { fontStyle: 'italic', paddingBottom: 5 }]}>
                                    Mã hợp đồng: {this.state.data.contractId}</Text>
                            </View>
                        </View>
                        <Text
                            style={[
                                text_size.xs,
                                font_weight.f_700,
                                width.w_100,
                                {
                                    textAlign: 'left',
                                    padding: 15,
                                    color: '#424242'
                                }
                            ]}
                        >
                            CHI TIẾT HÓA ĐƠN
                        </Text>
                        <View style={[
                            width.w_95, background_color.white,
                            {
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: '#E0E0E0'
                            }
                        ]}
                        >
                            <View style={[
                                text_size.sm, width.w_100,
                                { paddingLeft: 20, paddingTop: 20, paddingRight: 20 }
                            ]}>
                                <View style={[flex.flex_row, { paddingBottom: 10, borderBottomWidth: 0.5 }]}>
                                    <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Ngày Thu Tiền:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data !== {} ? (moment(this.state.data.dateOfPayment).format("DD-MM-YYYY")) : ''}</Text>
                                </View>
                                <View style={[flex.flex_row, { paddingVertical: 10, borderBottomWidth: 0.5 }]}>
                                    <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Giảm Giá:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data.discount}%</Text>
                                </View>
                                <View style={[flex.flex_row, { paddingVertical: 10, borderBottomWidth: 0.5 }]}>
                                    <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Phạt:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data.forfeit}</Text>
                                </View>
                                <View style={[flex.flex_row, { paddingVertical: 10, borderBottomWidth: 0.5 }]}>
                                    <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Tổng:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data.total}</Text>
                                </View>
                                <View style={[flex.flex_row, { paddingVertical: 10, borderBottomWidth: 0.5 }]}>
                                    <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Tình Trạng:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data !== {} ? (this.state.data.status === "0" ? "Chưa thanh toán" : "Đã thanh toán") : ''}</Text>
                                </View>
                                <View style={[flex.flex_row, { paddingVertical: 10 }]}>
                                    <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Ghi Chú:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data.note}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[width.w_90, {paddingTop: 20}]}>
                           <AppButton
                                onPress={() => {this.props.navigation.navigate('ReceiptComponent', {billId: this.state.data.id, status: this.state.data.status})}}
                                title={this.state.data.status == 0 ? "Thêm biên nhận" : "Xem biên nhận"}
                            />
                        </View>
                    </View>
                </ScrollView>
                }
            </View>
        )
    }
}

const mapStateToProps = state => {
    return { state };
};

const mapDispatchToProps = {
    doLoadBillById
};

export default connect(mapStateToProps, mapDispatchToProps)(BillDetails)