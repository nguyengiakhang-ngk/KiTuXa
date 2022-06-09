import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { path } from "../../../constant/define";
import { flex, font, font_weight, height, position, text_color, text_size, width, background_color } from "../../../utils/styles/MainStyle";
import { color_danger, color_primary, color_success } from "../../../utils/theme/Color";
import { Icon } from "@rneui/base";
import AppFAB from "../../../components/AppFAB";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import moment from "moment";
import { connect } from "react-redux";
import { doLoadListContractByRoom } from "../../../redux/actions/contract";


class ContractScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
        }
    }

    viewContractDetail(id) {
        this.props.navigation.navigate("ContractDetail", {
            id: id
        });
    }

    onSelectUser = (user) => {
        this.setState({
            selectUser: user
        })
    }

    viewAddContract(userId) {
        this.props.navigation.navigate("AddContract",
            {
                userId:userId,
                //refresh: () => {this.refresh()}
            });
    }

    getContractData() {
        this.props.doLoadListContractByRoom({ roomId: 1 }).then(data => {
            this.setState({
                data: data
            })
        })
        console.log(this.state.data);
    }


    // deleteContract(ID_HD) {
    //     axios.delete(path + `/deleteContract/${ID_HD}`)
    //         .then((response)=>{
    //             if(response.data){
    //                 this.setState({
    //                     isLoading: true,
    //                     data: []
    //                 });
    //                 this.getContractData();
    //             }
    //         })
    //         .catch((error => {
    //             console.log(error);
    //         }));
    // }
    componentDidMount() {
        this.getContractData();

        this.focusEventListener = this.props.navigation.addListener(
            'didFocus',
            () => {
                this.getContractData();
            }
        )
    }

    // refresh(){
    //     this.getContractData();
    // }

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
                            name={"file-contract"}
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
                            Mã HĐ: {item.id}
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
                                color={new Date(item.ThoiHan).getTime() < new Date().getTime() ? color_danger : color_primary}
                            />
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    { marginLeft: 10, color: new Date(item.ThoiHan).getTime() < new Date().getTime() ? color_danger : 'black' }
                                ]}
                            >
                                Thời hạn: {moment(item.ThoiHan).format('DD-MM-YYYY')}
                            </Text>
                        </View>
                        <View
                            style={[
                                flex.flex_row,
                                { marginTop: 2 }
                            ]}
                        >
                            <Icon
                                name={item.TinhTrang == 0 ? "circle-notch" : "check-circle"}
                                type='font-awesome-5'
                                size={16}
                                color={item.TinhTrang == 0 ? color_danger : color_success}
                            />
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    { marginLeft: 5 }
                                ]}
                            >
                                {item.TinhTrang == 0 ? "Chưa được duyệt" : "Đã được duyệt"}
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
                        onPress={() => this.deleteContract(item.ID_HD)}
                    >
                        <Icon
                            name={"trash-alt"}
                            type='font-awesome-5'
                            size={item.TinhTrang == 0 ? 22 : 0}
                            color={item.TinhTrang == 0 ? color_danger : "transparent"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.viewContractDetail(item.id)}
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
                    Danh sách hợp đồng
                </Text>
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
                        bg={color_primary}
                        name='plus'
                        size={20}
                        color={'white'}
                        onPress={() => this.viewAddContract(1)}
                    />
                </View>
                <FlatList data={this.state.data} renderItem={this._renderItem} keyExtractor={(item, index) => index.toString()} contentContainerStyle={{ marginHorizontal: 10, paddingVertical: 10 }} />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({ listContractByRoom }) => {
    return { listContractByRoom };
};

const mapDispatchToProps = {
    doLoadListContractByRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractScreen)