import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import axios from "axios";
import {path} from "../../../constant/define";
import {flex, font, font_weight, height, position, text_color, text_size, width} from "../../../utils/styles/MainStyle";
import {color_danger, color_primary, color_success} from "../../../utils/theme/Color";
import {Icon} from "@rneui/base";
import AppFAB from "../../../components/AppFAB";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import moment from "moment/moment";

export default class ReceiptComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
        }
    }
    viewReceiptDetails(ID_BN){
        this.props.navigation.navigate("ReceiptDetails", {
            ID_BN: ID_BN
        });
    }

    viewAddReceipt(ID_HD){
        this.props.navigation.navigate("AddReceipt",
            {
                ID_HD: ID_HD,
                refresh: () => {this.refresh()}
            });
    }
    deleteReceipt(ID_BN) {
        axios.delete(path + `/deleteReceipt/${ID_BN}`)
            .then((response)=>{
                if(response.data){
                    this.setState({
                        isLoading: true,
                        data: []
                    });
                    this.getReceiptsData();
                }
            })
            .catch((error => {
                console.log(error);
            }));
    }

    updateReceipt(ID_BN){
        this.props.navigation.navigate("UpdateReceipt", {
            ID_BN: ID_BN,
            refresh: () => {this.refresh()}
        });
    }

    getReceiptsData(){
        let ID_HD = 1;
        axios.get(path + `/getReceipts/${ID_HD}`)
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
        this.getReceiptsData();
    }

    refresh(){
        this.getReceiptsData();
    }


    _renderItem = ({item, index}) => {

        return(
            <View
                style={[
                    width.w_100,
                    {borderBottomWidth: 1, marginTop: 10,  paddingBottom: 10},
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
                            name= {"file-invoice-dollar"}
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
                            Mã biên nhận: {item.ID_BN}
                        </Text>
                        <View
                            style={[
                                flex.flex_row,
                                {marginTop: 2}
                            ]}
                        >
                            <Icon
                                name= {"calendar-day"}
                                type='font-awesome-5'
                                size={16}
                                color={color_primary}
                            />
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    {marginLeft: 10}
                                ]}
                            >
                                Ngày thu tiền: {moment(item.ThoiGian_ThuTien).format('DD-MM-YYYY')}
                            </Text>
                        </View>
                        <View
                            style={[
                                flex.flex_row,
                                {marginTop: 2}
                            ]}
                        >
                            <Icon
                                name= {item.Tinh_Trang == 0 ? "circle-notch" : "check-circle"}
                                type='font-awesome-5'
                                size={16}
                                color={item.Tinh_Trang == 0 ? color_danger : color_success}
                            />
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    {marginLeft: 5}
                                ]}
                            >
                                {item.Tinh_Trang == 0 ? "Chưa thanh toán" : "Đã thanh toán"}
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
                            {marginRight: 10}
                        ]}
                        onPress={() => item.Tinh_Trang == 0 ? this.deleteReceipt(item.ID_BN) : ""}
                    >
                        <Icon
                            name= {"trash-alt"}
                            type='font-awesome-5'
                            size={item.Tinh_Trang == 0 ? 22 : 0}
                            color={item.Tinh_Trang == 0 ? color_danger : "transparent"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            {marginRight: 10}
                        ]}
                        onPress={() => this.updateReceipt(item.ID_BN)}
                    >
                        <Icon
                            name= {"pencil-alt"}
                            type='font-awesome-5'
                            size={item.Tinh_Trang == 0 ? 22 : 0}
                            color={item.Tinh_Trang == 0 ? color_success : "transparent"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.viewReceiptDetails(item.ID_BN)}
                    >
                        <Icon
                            name= {"eye"}
                            type='font-awesome-5'
                            size={22}
                            color={color_success}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    render(){
        return(
            <SafeAreaView
                style={[
                    {flex: 1, padding: 5, paddingLeft: 10, paddingRight: 10},
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
                        bg = {color_primary}
                        name = 'plus'
                        size = {20}
                        color = {'white'}
                        onPress = { () => this.viewAddReceipt(1) }
                    />
                </View>
                <FlatList data={this.state.data} renderItem={this._renderItem} keyExtractor={(item, index) => index.toString()}/>
            </SafeAreaView>
        )
    }
}