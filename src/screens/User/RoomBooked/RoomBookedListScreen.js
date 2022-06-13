import React, { Component } from 'react';
import {
    FlatList, Image,
    SafeAreaView, Text, View,
    Dimensions,
    TouchableOpacity, StyleSheet
} from 'react-native';
import {
    background_color,
    flex, font, height, shadow, text_color, text_size, width
} from "../../../utils/styles/MainStyle";
import { color_danger, color_primary } from "../../../utils/theme/Color";
import { Icon } from "@rneui/base";
import { url } from '../../../constant/define';
import { connect } from "react-redux";
import { doGetRoomByBookTicket } from "../../../redux/actions/room";
import { doGetPriceOfRoom } from "../../../redux/actions/typeOfRoom";
import { doLoadListContractByRoom } from '../../../redux/actions/contract';

class RoomBookedListScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            refreshing: true,
            listPrice: []
        }
    }

    refresh(){
        this.getRoomByBookTicket();
    }

    getRoomByBookTicket() {
        this.props.doGetRoomByBookTicket({ userId: this.props.user.user.id }).then(data => {
            data.map(item => {
                this.props.doGetPriceOfRoom({ typeOfRoomId: item.id }).then(dataPrice => {
                    let ls = this.state.listPrice;
                    ls.push({
                        price: dataPrice[0].price
                    })
                    this.setState({
                        listPrice: ls
                    })
                })
            })
            this.setState({ data: data })
        })
    }

    getContractData(id) {
        this.props.doLoadListContractByRoom({ roomId: id }).then(data => {
            let check = data.filter(item => {
                return item.userId === this.props.user.user.id
            })
            console.log(check[0], " ;hellolo ===> ", check[0].duration <= new Date())
            if(check.length > 0){
                this.setState({
                    dataContract: check
                },() => {
                    this.props.navigation.navigate("ContractDetail", {
                        id: this.state.dataContract[0].id,
                        refresh: () => { this.refresh() }
                    });
                })
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
                    <TouchableOpacity style={[
                        {
                            position: 'absolute',
                            left: 5,
                            zIndex: 1
                        }
                    ]}
                        onPress={() => this.props.navigation.goBack(null)}>
                        <Icon
                            raised
                            name='angle-left'
                            type='font-awesome-5'
                            color={color_primary}
                            size={16}
                        />
                    </TouchableOpacity>
                    <Text style={styles.textTitle}>Phòng đã đặt</Text>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={this._renderItem}
                    contentContainerStyle={{ justifyContent: 'center', width: '100%' }}
                    keyExtractor={item => item.id.toString()} />
            </View>
        );
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {
                this.getContractData(item.id)
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
                            height: 100,
                        }
                    ]}
                    source={
                        { uri: `${url}/${item.image}` }
                    }
                    resizeMode={'stretch'}
                />
                <View>
                    <Text
                        numberOfLines={1}
                        style={[
                            text_size.md,
                            text_color.primary,
                            {
                                marginLeft: 10,
                                fontWeight: '600'
                            }
                        ]}
                    >
                        {item.roomName}
                    </Text>
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
                            {item.stretch} (m3)
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
                            {this.state.listPrice[index]?.price} (vnđ)
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textTitle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 20,
        letterSpacing: 0,
        width: '100%'
    }
})

const mapStateToProps = ({ user, state }) => {
    return { user, state };
};

const mapDispatchToProps = {
    doGetRoomByBookTicket, doGetPriceOfRoom, doLoadListContractByRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomBookedListScreen)
