import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
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

export default class BillDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: []
        }
    }

    getBillData(){
        axios.get(path + `/getBillByID/${this.props.route.params.ID_HDon}`)
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
        this.getBillData();
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
                    HÓA ĐƠN
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
                            TÊN HÓA ĐƠN:
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
                                {
                                    paddingLeft: 20,
                                    paddingTop: 5,
                                    paddingBottom: 5
                                }
                            ]}>
                                <Text style={[text_size.xs, font_weight.bold,{fontStyle: 'italic',paddingBottom: 5}]}>Hóa đơn: {this.state.data.Ten_HD}</Text>
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
                            CHI TIẾT HÓA ĐƠN
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
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Ngày Thu Tiền:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, {flex:1,textAlign: 'right'}] }>{moment(this.state.data.NgayThuTien).format("DD-MM-YYYY")}</Text>
                                </View>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Giảm Giá:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, {flex:1,textAlign: 'right'}] }>{this.state.data.GiamGia}</Text>
                                </View>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Phạt:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, {flex:1,textAlign: 'right'}] }>{this.state.data.Phat}</Text>
                                </View>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Tổng:</Text>
                                    <Text style={[text_size.xs,font_weight.bold, {flex:1,textAlign: 'right'}] }>{this.state.data.Tong}</Text>
                                </View>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Tình Trạng:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, {flex:1,textAlign: 'right'}] }>{this.state.data.TinhTrang == 0 ? "Chưa thanh toán" : "Đã thanh toán"}</Text>
                                </View>
                                <View style={[flex.flex_row,  {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Ghi Chú:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, {flex:1,textAlign: 'right'}] }>{this.state.data.GhiChu}</Text>
                                </View>
                            </View>
                        </View>
                        {/*<View style={[width.w_90, {paddingTop: 20}]}>*/}
                        {/*    <AppButton*/}
                        {/*        disabled={this.state.data.TinhTrang == 0 ? false : true }*/}
                        {/*        title={"Thêm biên nhận"}*/}
                        {/*    />*/}
                        {/*</View>*/}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
