import React, { Component } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import axios from "axios";
import { url } from "../../../constant/define";
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
import { doGetReceiptById } from '../../../redux/actions/receipt'

class ReceiptDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: {}
        }
    }

    getReceiptData() {
        this.props.doGetReceiptById({ id: this.props.route.params.id }).then(data => {
            this.setState({ data: data })
        })
    }
    componentDidMount() {
        this.getReceiptData();
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
                            paddingVertical: 20,
                            lineHeight: 20,
                            letterSpacing: 0,
                        }
                    ]}
                >
                    Chi tiết biên nhận
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
                                        font_weight.bold,
                                        width.w_100,
                                        {
                                            textAlign: 'left',
                                            padding: 15,
                                            color: '#424242'
                                        }
                                    ]}
                                >
                                    MÃ BIÊN NHẬN: {this.state.data.id}
                                </Text>
                                <Text
                                    style={[
                                        text_size.xs,
                                        font_weight.bold,
                                        width.w_100,
                                        {
                                            textAlign: 'left',
                                            padding: 15,
                                            color: '#424242'
                                        }
                                    ]}
                                >
                                    CHI TIẾT BIÊN NHẬN
                                </Text>
                                <View style={[
                                    width.w_95, background_color.white,
                                    {
                                        borderRadius: 10,
                                        borderWidth: 2,
                                        borderColor: color_primary,
                                        elevation: 4
                                    }
                                ]}
                                >
                                    <View style={[
                                        text_size.sm, width.w_100,
                                        { paddingLeft: 20, paddingTop: 20, paddingRight: 20 }
                                    ]}>
                                        <View style={[flex.flex_row, { paddingBottom: 10, borderBottomWidth: 0.5 }]}>
                                            <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Thời Gian Thu Tiền:</Text>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{moment(this.state.data.dateOfPayment).format("DD-MM-YYYY")}</Text>
                                        </View>
                                        <View style={[flex.flex_row, { paddingVertical: 10, borderBottomWidth: 0.5 }]}>
                                            <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Phương Thức Thanh Toán:</Text>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data.paymentMethod == 0 ? "Tiền Mặt" : "Chuyển Khoản"}</Text>
                                        </View>
                                        <View style={[flex.flex_row, { paddingVertical: 10, borderBottomWidth: 0.5 }]}>
                                            <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Ghi Chú:</Text>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data.note}</Text>
                                        </View>
                                        <View style={[flex.flex_row, { paddingVertical: 10 }]}>
                                            <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Tình Trạng:</Text>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data.status == 0 ? "Chưa thanh toán" : "Đã thanh toán"}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text
                                    style={[
                                        text_size.xs,
                                        font_weight.bold,
                                        width.w_100,
                                        {
                                            textAlign: 'left',
                                            padding: 15,
                                            color: '#424242'
                                        }
                                    ]}
                                >
                                    ẢNH GIAO DỊCH
                                </Text>
                                <View style={[width.w_100, { paddingLeft: 20, paddingRight: 20 }]}>
                                    <Image
                                        source={{
                                            uri: `${url}/${this.state.data.image}`
                                        }}
                                        resizeMode={'stretch'}
                                        style={[
                                            width.w_100,
                                            {
                                                height: 400,
                                                borderRadius: 10,
                                                borderWidth: 2,
                                                borderColor: color_primary,
                                            }
                                        ]} />
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
    doGetReceiptById
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptDetails)