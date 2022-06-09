import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import axios from "axios";
import {path} from "../../../constant/define";
import {background_color, flex, font, font_weight, text_color, text_size, width} from "../../../utils/styles/MainStyle";
import moment from "moment/moment";
import AppButton from "../../../components/AppButton";
import { connect } from "react-redux";
import {doLoadListContractById} from "../../../redux/actions/contract";

class ContractDetail extends Component{
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

    viewDieuKhoan(){
        this.props.navigation.navigate("ContractTerms", {
            ID_HD: this.props.route.params.ID_HD
        });
    }

    getContractData(){
        this.props.doLoadListContractById({id: this.props.route.params.id}).then(data => {
            this.setState({
                data: data
            })
        })
        console.log(this.state.data);
        // axios.get(path + `/getContractByID/${this.props.route.params.ID_HD}`)
        //     .then((response)=>{
        //         this.setState({
        //             isLoading: false,
        //             data: response.data,
        //         });
        //         this.getUserData();
        //         this.getPhong(this.state.data.ID_Phong);
        //     })
        //     .catch((error => {
        //         console.log(error);
        //     }));
    }

    getPhong(ID_Phong){
        axios.get(path + `/getPhongByID/${ID_Phong}`)
            .then((response)=>{
                this.setState({
                    isLoading: false,
                    dataP: response.data,
                });
            })
            .catch((error => {
                console.log(error);
            }));
    }

    getUserData(){
        axios.get(path + `/getUserByID/${this.state.data.ID_TK}`)
            .then((response)=>{
                // alert(JSON.stringify(response));
                this.setState({
                    isLoading: false,
                    dataK: response.data
                })
            })
            .catch((error => {
                console.log(error);
            }));
    }
    componentDidMount() {
        this.getContractData();
        //this.getUserData()
    }


    render(){
        return(
            <View style={[flex.align_items_center, background_color.white, {flex:1}]}>
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
                            paddingVertical: 15
                        }
                    ]}
                >
                    Hợp đồng
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
                            THÔNG TIN NGƯỜI THUÊ
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
                                width.w_100,
                                {
                                    paddingLeft: 20,
                                    paddingTop: 5,
                                    paddingBottom: 5
                                }
                            ]}>
                                <Text style={[text_size.xs, font_weight.bold,{fontStyle: 'italic',paddingBottom: 5}]}>{this.state.dataK.hoten} Nguyễn Văn A</Text>
                                <Text style={[text_size.xs, {fontStyle: 'italic', paddingBottom: 5}]}>{this.state.dataP.TenPhong} Phòng 1</Text>
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
                            CHI TIẾT HỢP ĐỒNG
                        </Text>
                        <View style={[
                            width.w_95, background_color.white,
                            {
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: '#E0E0E0',
                                marginHorizontal: 5
                            }
                        ]}
                        >
                            <View style={[
                                width.w_100,
                                {paddingLeft: 20, paddingTop: 20, paddingRight: 20, elevation: 4}
                            ]}>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Mã HĐ:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, {flex:1,textAlign: 'right'}] }>{this.state.data.id}</Text>
                                </View>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Ngày Vào:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, {flex:1,textAlign: 'right'}] }>{moment(this.state.data.dayIn).format('DD-MM-YYYY')}</Text>
                                </View>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Thời Hạn:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, {flex:1,textAlign: 'right'}] }>{moment(this.state.data.duration).format('DD-MM-YYYY')}</Text>
                                </View>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Ngày Thanh Toán:</Text>
                                    <Text style={[text_size.xs,font_weight.bold, {flex:1,textAlign: 'right'}] }>{moment(this.state.data.dateOfPayment).format('DD-MM-YYYY')}</Text>
                                </View>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Chỉ Số Điện:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, {flex:1,textAlign: 'right'}] }>{this.state.data.numberOfElectric}</Text>
                                </View>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>Chỉ Số Nước:</Text>
                                    <Text style={[text_size.xs, font_weight.bold, {flex:1,textAlign: 'right'}] }>{this.state.data.numberOfWater}</Text>
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
                            ĐIỀU KHOẢN
                        </Text>
                        <View style={[
                            width.w_90, background_color.white,
                            {
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: '#E0E0E0',
                            }
                        ]}
                        >
                            <View style={[
                                text_size.sm,width.w_100,
                                {paddingLeft: 20, paddingTop: 20, paddingRight: 20}
                            ]}>
                                <View style={[flex.flex_row, {paddingBottom: 20}]}>
                                    <Text style={[text_size.xs, {fontStyle: 'italic', color: '#424242'}]}>
                                        Điều A:
                                    </Text>
                                    <Text style={[text_size.xs,font_weight.bold, {flex:1,textAlign: 'right'}] }>
                                        ABCDE
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = ({listContractById}) => {
    return {listContractById};
};

const mapDispatchToProps = {
    doLoadListContractById
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractDetail)