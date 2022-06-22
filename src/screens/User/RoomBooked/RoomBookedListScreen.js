import React, { Component } from 'react';
import {
    FlatList, Image,
    SafeAreaView, Text, View,
    Dimensions,
    TouchableOpacity, StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import {
    background_color,
    flex, font, height, shadow, text_color, text_size, width
} from "../../../utils/styles/MainStyle";
import { color_danger, color_primary, color_success } from "../../../utils/theme/Color";
import { Icon } from "@rneui/base";
import { url } from '../../../constant/define';
import { connect } from "react-redux";
import { doGetRoomByBookTicket } from "../../../redux/actions/room";
import { doGetPriceOfRoom } from "../../../redux/actions/typeOfRoom";
import { doLoadListContractByRoom } from '../../../redux/actions/contract';
import moment from 'moment';

class RoomBookedListScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: [],
            refreshing: true,
            listPrice: []
        }
    }

    refresh() {
        this.setState({ isLoading: true })
        this.getRoomByBookTicket();
    }

    getRoomByBookTicket = async () => {
        await this.props.doGetRoomByBookTicket({ userId: this.props.user.user.id }).then(data => {
            if (data) {
                this.setState({ data: data })
            }
        })
        this.setState({ isLoading: false })
    }

    getContractData(id) {
        this.props.doLoadListContractByRoom({ roomId: id }).then(data => {
            let check = data.filter(item => {
                return item.userId === this.props.user.user.id
            })
            if (check.length > 0) {
                this.setState({
                    dataContract: check
                }, () => {
                    this.props.navigation.navigate("ContractDetail", {
                        id: this.state.dataContract[0].id,
                        refresh: () => { this.refresh() }
                    });
                })
            } else {
                Alert.alert("Thông báo", "Chưa có hợp đồng!");
            }
            // console.log(">>data>>",data, ">>check>>>", check);
        })
    }

    componentDidMount() {
        this.getRoomByBookTicket();
    }

    routeScreen = (title) => {
        this.props.navigation.navigate(title);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[
                    flex.flex_row,
                    flex.align_items_center,
                    {
                        width: '100%',
                        paddingVertical: 20,
                        backgroundColor: color_primary,
                    }
                ]}>
                    <Text style={styles.textTitle}>Phòng đã đặt</Text>
                </View>
                {
                    this.state.isLoading ?
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={color_primary} />
                        </View>
                        :
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.data}
                            renderItem={this._renderItem}
                            contentContainerStyle={{ justifyContent: 'center', width: '100%' }}
                            keyExtractor={item => item.id.toString()} />
                }
            </View>
        );
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {
                item.status === 1 ? this.getContractData(item.roomId) : (item.status === 0 ? Alert.alert("Thông báo", "Vui lòng chờ duyệt!") : Alert.alert("Thông báo", "Phiếu đặt này đã không được duyệt! Vui lòng đặt lại!"))
            }}
                style={[
                    shadow.shadow,
                    background_color.white,
                    {
                        width: '95%',
                        marginVertical: 5,
                        flexDirection: 'row',
                        alignSelf: 'center',
                        elevation: 4,
                        padding: 1
                    }
                ]}
            >
                <Image
                    style={[
                        {
                            width: 100,
                            height: 130,
                            alignSelf: 'center'
                        }
                    ]}
                    source={
                        { uri: `${url}/${item.room.typeofroom.imageofrooms[0].image}` }
                    }
                    resizeMode={'stretch'}
                />
                <View>
                    <View style={[flex.flex_row, flex.align_items_center, { marginLeft: 10 }]}>
                        <Text
                            numberOfLines={1}
                            style={[
                                text_size.md,
                                text_color.primary,
                                {
                                    fontWeight: '600'
                                }
                            ]}
                        >
                            {item.room.roomName}
                        </Text>
                        {
                            item.status === 0
                                ?
                                <Icon
                                    raised
                                    name='clock'
                                    type='font-awesome-5'
                                    color={color_primary}
                                    size={10}
                                />
                                :
                                (
                                    item.status === 1
                                        ?
                                        <Icon
                                            raised
                                            name='check'
                                            type='font-awesome-5'
                                            color={color_success}
                                            size={10}
                                        />
                                        :
                                        <Icon
                                            raised
                                            name='ban'
                                            type='font-awesome-5'
                                            color={color_danger}
                                            size={10}
                                        />
                                )
                        }
                    </View>
                    <View
                        style={[
                            flex.flex_row,
                            flex.align_items_center,
                            {
                                marginLeft: 4,
                                marginTop: -3
                            }
                        ]}
                    >
                        <Icon
                            raised
                            name='chart-area'
                            type='font-awesome-5'
                            color={color_primary}
                            size={10}
                        />
                        <Text
                            numberOfLines={1}
                            style={[
                                text_size.xs,
                                text_color.black
                            ]}
                        >
                            {item.room.typeofroom.stretch} (m3)
                        </Text>
                    </View>
                    <View
                        style={[
                            flex.flex_row,
                            flex.align_items_center,
                            {
                                marginLeft: 4,
                                marginBottom: 5,
                                marginTop: -6
                            }
                        ]}
                    >
                        <Icon
                            raised
                            name='money-bill'
                            type='font-awesome-5'
                            color={color_primary}
                            size={10}
                        />
                        <Text
                            numberOfLines={1}
                            style={[
                                text_size.xs,
                                text_color.black
                            ]}
                        >
                            {item.room.typeofroom.priceofrooms[item.room.typeofroom.priceofrooms.length - 1].price} (vnđ)
                        </Text>
                    </View>
                    <View
                        style={[
                            flex.flex_row,
                            flex.align_items_center,
                            {
                                marginLeft: 4,
                                marginBottom: 5,
                                marginTop: -6
                            }
                        ]}
                    >
                        <Icon
                            raised
                            name='calendar-alt'
                            type='font-awesome-5'
                            color={color_primary}
                            size={10}
                        />
                        <Text
                            numberOfLines={1}
                            style={[
                                text_size.xs,
                                text_color.black
                            ]}
                        >
                            {moment(item.startBook).format("DD-MM-YYYY")} - {moment(item.endBook).format("DD-MM-YYYY")}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textTitle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 20,
        letterSpacing: 0,
        width: '100%',
    }
})

const mapStateToProps = ({ user, state }) => {
    return { user, state };
};

const mapDispatchToProps = {
    doGetRoomByBookTicket, doGetPriceOfRoom, doLoadListContractByRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomBookedListScreen)
