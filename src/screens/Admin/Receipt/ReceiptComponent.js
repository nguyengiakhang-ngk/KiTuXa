import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View, ActivityIndicator, Alert} from "react-native";
import axios from "axios";
import {path} from "../../../constant/define";
import {flex, font, font_weight, height, position, text_color, text_size, width, background_color} from "../../../utils/styles/MainStyle";
import {color_danger, color_primary, color_success, color_secondary} from "../../../utils/theme/Color";
import {Icon} from "@rneui/base";
import AppFAB from "../../../components/AppFAB";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import moment from "moment/moment";
import { connect } from 'react-redux';
import { doGetReceiptByBill, doDeleteReceipt } from '../../../redux/actions/receipt'
import DialogConfirm from '../../../components/DialogConfirm';
import Toast from "react-native-toast-message";
import { orderBy } from 'lodash';

class ReceiptComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            isConfirm: false,
            receiptDelete: '',
        }
    }
    viewReceiptDetails(id){
        this.props.navigation.navigate("ReceiptDetails", {
            id: id
        });
    }

    viewAddReceipt(){
        if(this.props.route.params.status === 0){
            this.props.navigation.navigate("AddReceipt",
            {
                billId: this.props.route.params.billId,
                refresh: () => {this.refresh()}
            });
        }else{
            Alert.alert("Thông báo", "Hóa đơn này đã được thanh toán!")
        }
    }
    deleteReceipt(receipt) {
        this.props.doDeleteReceipt({id: receipt.id, image: receipt.image}).then(data => {
            
            this.setState({
                billDelete: '',
                isConfirm: false,
                receiptDelete: ''
            })
            this.refresh()
            Toast.show({
                type: 'success',
                text1: 'Biên nhận',
                text2: 'Xóa thành công.',
                visibilityTime: 2000,
                autoHide: true
            });
        })
    }

    updateReceipt(id){
        this.props.navigation.navigate("UpdateReceipt", {
            id: id,
            refresh: () => {this.refresh()}
        });
    }

    getReceiptsData(){
        this.props.doGetReceiptByBill({billId: this.props.route.params.billId}).then(data => {
            this.setState({
                data: data
            }, () => {console.log(data)})
        })
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000)
        
    }

    componentDidMount() {
        this.getReceiptsData();
    }

    refresh(){
        this.setState({isLoading: true})
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
                                marginRight: 10,
                                justifyContent:'center'
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
                    <View style={{width: 200}}>
                        <Text
                            style={[
                                text_size.sm,
                                font.serif,
                                font_weight.bold,
                                text_color.primary
                            ]}
                            numberOfLines={1}
                        >
                            Mã biên nhận: {item.id}
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
                                Ngày thu: {moment(item.dateOfPayment).format('DD-MM-YYYY')}
                            </Text>
                        </View>
                        <View
                            style={[
                                flex.flex_row,
                                {marginTop: 2}
                            ]}
                        >
                            <Icon
                                name= {item.status === '0' ? "circle-notch" : "check-circle"}
                                type='font-awesome-5'
                                size={16}
                                color={item.status === '0' ? color_danger : color_success}
                            />
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    {marginLeft: 5}
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
                            {marginRight: 10}
                        ]}
                        onPress={() => item.status === '0' ? this.setState({ isConfirm: true, receiptDelete: item }) : ""}
                    >
                        <Icon
                            name= {"trash-alt"}
                            type='font-awesome-5'
                            size={item.status === '0' ? 22 : 0}
                            color={item.status === '0' ? color_danger : "transparent"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            {marginRight: 10}
                        ]}
                        onPress={() => this.updateReceipt(item.id)}
                    >
                        <Icon
                            name= {"pencil-alt"}
                            type='font-awesome-5'
                            size={item.status === '0' ? 22 : 0}
                            color={item.status === '0' ? color_success : "transparent"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.viewReceiptDetails(item.id)}
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


    render(){
        return(
            <SafeAreaView
                style={[
                    {flex: 1},
                    height.h_100,
                    position.relative
                ]}
            >
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
                                this.deleteReceipt(this.state.receiptDelete);
                            }}
                        />
                        : null
                }
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
                        onPress = { () => this.viewAddReceipt() }
                    />
                </View>
                <Toast ref={(ref) => {Toast.setRef(ref)}} />
                {
                    this.state.isLoading
                    ?
                    <View style={{flex: 1, justifyContent: 'center'}}>
                            <ActivityIndicator size="large" color={color_primary} />
                        </View>
                    :
                    (
                        this.state.data.length > 0
                        ?
                        <FlatList contentContainerStyle={{paddingHorizontal: 10}} data={orderBy(this.state.data, ['id'],['desc'])} renderItem={this._renderItem} keyExtractor={(item, index) => index.toString()}/>
                        :
                        this._renderEmpty()
                    )
                }
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({ listReceiptByContract }) => {
    return { listReceiptByContract };
};

const mapDispatchToProps = {
    doGetReceiptByBill, doDeleteReceipt
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptComponent)