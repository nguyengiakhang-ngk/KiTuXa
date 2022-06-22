import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import axios from "axios";
import { path } from "../../../constant/define";
import { background_color, flex, font, font_weight, text_color, text_size, width } from "../../../utils/styles/MainStyle";
import moment from "moment/moment";
import AppButton from "../../../components/AppButton";
import { connect } from "react-redux";
import { doLoadListContractById } from "../../../redux/actions/contract";
import { color_primary } from '../../../utils/theme/Color';
import { doGetUserById } from '../../../redux/actions/user';
import { doGetRoomById } from '../../../redux/actions/room';
import { doApproveContract } from '../../../redux/actions/contract';


class ContractDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            ID_TK: '',
            dataK: [],
            dataP: []
        }
    }


    getContractData() {
        this.props.doLoadListContractById({ id: this.props.route.params.id }).then(data => {
            this.setState({
                data: data
            }, async () => {
                await this.props.doGetUserById({ userId: data.userId }).then(async dataK => {
                    this.setState({
                        dataK: dataK
                    })
                    await this.props.doGetRoomById({ id: data.roomId }).then(dataP => {
                        this.setState({
                            dataP: dataP,
                            isLoading: false
                        })
                    })
                })
            })
        })
    }

    approveContract() {
        this.props.doApproveContract({ status: "1" }, { id: this.props.route.params.id }).then(data => {
            if (data) {
                alert("Duyệt thành công!");
                this.getContractData();
            } else {
                alert("Duyệt thất bại! Vui lòng thử lại!");
            }
        })
    }
    componentDidMount() {
        this.getContractData();
    }

    componentWillUnmount() {
        this.props.route.params?.refresh();
      }


    render() {
        return (
            <View style={[flex.align_items_center, background_color.white, { flex: 1 }]}>
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
                    Chi tiết hợp đồng
                </Text>
                {
                    this.state.isLoading ?
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={color_primary} />
                        </View>
                        :
                        <ScrollView
                            style={[background_color.white, width.w_100, { flex: 1 }]}
                            showsVerticalScrollIndicator={true}
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
                                    THÔNG TIN NGƯỜI THUÊ
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
                                        width.w_100,
                                        {
                                            paddingLeft: 20,
                                            paddingTop: 5,
                                            paddingBottom: 5
                                        }
                                    ]}>
                                        <Text style={[text_size.xs, font_weight.bold, { fontStyle: 'italic', paddingBottom: 5 }]}>Họ và tên: {this.state.dataK.name ? this.state.dataK.name : 'Nguyễn Văn A'}</Text>
                                        <Text style={[text_size.xs, { fontStyle: 'italic', paddingBottom: 5 }]}>Phòng: {this.state.dataP.roomName ? this.state.dataP.roomName : ' Phòng 0'}</Text>
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
                                    CHI TIẾT HỢP ĐỒNG
                                </Text>
                                <View style={[
                                    width.w_95, background_color.white,
                                    {
                                        borderRadius: 10,
                                        borderWidth: 2,
                                        borderColor: color_primary,
                                        elevation: 4,
                                        marginHorizontal: 5
                                    }
                                ]}
                                >
                                    <View style={[
                                        width.w_100,
                                        { paddingLeft: 20, paddingTop: 20, paddingRight: 20 }
                                    ]}>
                                        <View style={[flex.flex_row, { paddingBottom: 10, borderBottomWidth: 0.5 }]}>
                                            <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Mã HĐ:</Text>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data.id}</Text>
                                        </View>
                                        <View style={[flex.flex_row, { paddingVertical: 10, borderBottomWidth: 0.5 }]}>
                                            <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Ngày Vào:</Text>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{moment(this.state.data.dayIn).format('DD-MM-YYYY')}</Text>
                                        </View>
                                        <View style={[flex.flex_row, { paddingVertical: 10, borderBottomWidth: 0.5 }]}>
                                            <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Thời Hạn:</Text>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{moment(this.state.data.duration).format('DD-MM-YYYY')}</Text>
                                        </View>
                                        <View style={[flex.flex_row, { paddingVertical: 10, borderBottomWidth: 0.5 }]}>
                                            <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Ngày Thanh Toán:</Text>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{moment(this.state.data.dateOfPayment).format('DD-MM-YYYY')}</Text>
                                        </View>
                                        <View style={[flex.flex_row, { paddingVertical: 10, borderBottomWidth: 0.5 }]}>
                                            <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Chỉ Số Điện:</Text>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data.numberOfElectric}</Text>
                                        </View>
                                        <View style={[flex.flex_row, { paddingVertical: 10 }]}>
                                            <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Chỉ Số Nước:</Text>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data.numberOfWater}</Text>
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
                                    ĐIỀU KHOẢN
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
                                        <View style={[flex.flex_row, { paddingBottom: 20 }]}>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1 }]}>
                                                {this.state.data.term}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={[width.w_90, { paddingTop: 20 }]}>
                                    <AppButton
                                        onPress={() => { this.approveContract() }}
                                        disabled={() => {
                                            if (this.props.user.user.id === this.state.data.userId) {
                                                if (this.state.data.status === "1") {
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            } else {
                                                return true;
                                            }
                                        }}
                                        title={this.state.data.status === "0" ? "Duyệt hợp đồng" : "Đã được duyệt"}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                }

            </View>
        )
    }
}
const mapStateToProps = ({ listContractById, user }) => {
    return { listContractById, user };
};

const mapDispatchToProps = {
    doLoadListContractById, doGetUserById, doGetRoomById, doApproveContract
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractDetail)