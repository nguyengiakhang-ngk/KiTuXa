import React, {Component} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import axios from "axios";
import {path} from "../../../constant/define";
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
import moment from "moment/moment";

export default class ReceiptDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: []
        }
    }

    getReceiptData(){
        axios.get(path + `/getReceiptByID/${this.props.route.params.ID_BN}`)
            .then((response)=>{
                this.setState({
                    isLoading: false,
                    data: response.data
                });
            })
            .catch((error => {
                console.log(error);
            }));
    }
    componentDidMount() {
        this.getReceiptData();
        //this.getUserData()
    }


    render(){
        return(
            <View style={[flex, flex.align_items_center, background_color.white, {flex:1}]}>
                <Text
                    style={[
                        text_size.normal,
                        font.serif,
                        font_weight.bold,
                        text_color.white,
                        width.w_100,
                        background_color.blue,
                        {textAlign: 'center',
                            padding: 5}
                    ]}
                >
                    BIÊN NHẬN
                </Text>
                <ScrollView
                    style={[background_color.white, width.w_100, {flex:1}]}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[flex, flex.align_items_center, background_color.white, {flex:1, paddingBottom: 10}]}>
                        <Text
                            style={[
                                text_size.xs,
                                font_weight.f_700,
                                width.w_100,
                                {textAlign: 'left',
                                    padding: 15,
                                    color: '#424242'}
                            ]}
                        >
                            MÃ BIÊN NHẬN: {this.state.data.ID_BN}
                        </Text>
                        <Text
                            style={[
                                text_size.xs,
                                font_weight.f_700,
                                width.w_100,
                                {textAlign: 'left',
                                    padding: 15,
                                    color: '#424242'}
                            ]}
                        >
                            CHI TIẾT BIÊN NHẬN
                        </Text>
                        <View style={[
                            width.w_90, background_color.white,
                            {
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: '#E0E0E0'
                            }
                        ]}
                        >
                            <View style={[
                                text_size.sm,width.w_100,
                                {paddingLeft: 20, paddingTop: 20, paddingRight: 20}
                            ]}>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Thời Gian Thu Tiền:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, {flex:1,textAlign: 'right'}] }>{moment(this.state.data.ThoiGian_ThuTien).format("DD-MM-YYYY")}</Text>
                                </View>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Phương Thức Thanh Toán:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, {flex:1,textAlign: 'right'}] }>{this.state.data.PT_ThanhToan == 0 ? "Tiền Mặt" : "Chuyển Khoản"}</Text>
                                </View>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Ghi Chú:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, {flex:1,textAlign: 'right'}] }>{this.state.data.Ghi_Chu}</Text>
                                </View>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Tình Trạng:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, {flex:1,textAlign: 'right'}] }>{this.state.data.Tinh_Trang == 0 ? "Chưa thanh toán" : "Đã thanh toán"}</Text>
                                </View>
                            </View>
                        </View>
                        <Text
                            style={[
                                text_size.xs,
                                font_weight.f_700,
                                width.w_100,
                                {textAlign: 'left',
                                    padding: 15,
                                    color: '#424242'}
                            ]}
                        >
                            ẢNH GIAO DỊCH
                        </Text>
                        <View style={[width.w_100,{paddingLeft: 20, paddingRight: 20}]}>
                            <Image
                                source={{
                                    uri: `${path}/${this.state.data.Anh_GD}`
                                }}
                                style={[
                                    width.w_100,
                                    {
                                        height: 250,
                                        borderRadius: 10,
                                        borderWidth: 2,
                                        borderColor: '#E0E0E0'
                                    }
                                ]}/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}