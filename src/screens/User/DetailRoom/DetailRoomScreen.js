import React, {Component} from 'react';
import {
    Modal,
    ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import {connect} from "react-redux";
import { SliderBox } from "react-native-image-slider-box";
import {
    flex,
    font,
    font_weight,
    text_color,
    text_size,
} from "../../../utils/styles/MainStyle";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import {color_danger, color_dark, color_primary} from "../../../utils/theme/Color";
import { Image } from "react-native";
import {Icon} from "@rneui/base";
import {doGetAreaById} from "../../../redux/actions/area";
import GetLocation from 'react-native-get-location';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from "@react-native-community/async-storage";
import {doAddSaveRoom, doDeleteSaveRoom, doGetSaveRoom} from "../../../redux/actions/saveRoom";

class DetailRoomScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            room: this.props.route.params.room,
            area: {},
            images: [
                "http://192.168.1.11:3001/uploads/typeOfRoom/48dc8016935adfc9ff95502692dcc433.jpg",
                "http://192.168.1.11:3001/uploads/typeOfRoom/48dc8016935adfc9ff95502692dcc433.jpg",
                "http://192.168.1.11:3001/uploads/typeOfRoom/48dc8016935adfc9ff95502692dcc433.jpg",
                "http://192.168.1.11:3001/uploads/typeOfRoom/48dc8016935adfc9ff95502692dcc433.jpg"
            ],
            isViewImage: false,
            viewImageIndex: 0,
            location: {},
            isMap: false,
            user: null,
            ticket: null
        }
    }

    async componentDidMount() {
        let user = await AsyncStorage.getItem('@user');
        if(user){
            this.setState({
                user: JSON.parse(user)
            }, () =>{
                this.props.doGetSaveRoom({userId: this.state.user.id, typeOfRoomId: this.state.room.id}).then(data => {
                    this.setState({
                        ticket: data
                    })
                })
            })
        }
        this.props.doGetAreaById({areaId: this.state.room.areaId}).then(data => {
            if (data) {
                this.setState({
                    area: data
                })
            }
        })
    }

    saveTicket = () => {
        if(this.state.user) {
            if(this.state.ticket){
                this.props.doDeleteSaveRoom({id: this.state.ticket.id}).then(data => {
                    this.setState({
                        ticket: null
                    })
                })
            }else{
                this.props.doAddSaveRoom({userId: this.state.user.id, typeOfRoomId: this.state.room.id}).then(data => {
                    this.setState({
                        ticket: data
                    })
                })
            }
        } else{
            alert("Vui lòng đăng nhập để sử dụng!")
        }
    }

    render()
        {
            return (
                <View
                    style={[
                        {
                            flex: 1
                        }
                    ]}
                >
                    <SliderBox
                        onCurrentImagePressed={(index) => {
                            this.setState({
                                isViewImage: true,
                                viewImageIndex: index
                            })
                        }}
                        images={this.state.images}
                    />
                    <ScrollView
                        contentContainerStyle={{flex: 1}}
                    >
                        <View style={{flex: 1, height: '100%'}}>
                            <View
                                style={[
                                    flex.flex_row,
                                    flex.align_items_center,
                                    {
                                        paddingHorizontal: 10,
                                        marginTop: 5
                                    }
                                ]}
                            >
                                <Icon
                                    name='signature'
                                    type='font-awesome-5'
                                    color={color_danger}
                                    size={30}
                                />
                                <Text
                                    style={[
                                        text_size.xl,
                                        text_color.primary,
                                        font.serif,
                                        font_weight.bold,
                                        {
                                            marginLeft: 10
                                        }
                                    ]}
                                >
                                    {this.state.room?.name}
                                </Text>
                            </View>
                            <View
                                style={[
                                    flex.flex_row,
                                    {
                                        paddingHorizontal: 10
                                    }
                                ]}
                            >
                                <View
                                    style={[
                                        {
                                            width: '50%'
                                        }
                                    ]}
                                >
                                    <View
                                        style={[
                                            flex.flex_row,
                                            flex.align_items_center,
                                            {
                                                marginTop: 5
                                            }
                                        ]}
                                    >
                                        <Icon
                                            name='chart-area'
                                            type='font-awesome-5'
                                            color={color_primary}
                                            size={18}
                                        />
                                        <Text
                                            style={[
                                                text_size.sm,
                                                font.serif,
                                                {
                                                    marginLeft: 10,
                                                    color: color_dark
                                                }
                                            ]}
                                        >
                                            {this.state.room?.stretch} (m2)
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            flex.flex_row,
                                            flex.align_items_center,
                                            {
                                                marginTop: 5
                                            }
                                        ]}
                                    >
                                        <Icon
                                            name='users'
                                            type='font-awesome-5'
                                            color={color_primary}
                                            size={18}
                                        />
                                        <Text
                                            style={[
                                                text_size.sm,
                                                font.serif,
                                                {
                                                    marginLeft: 10,
                                                    color: color_dark
                                                }
                                            ]}
                                        >
                                            {this.state.room?.numberOfCustomer} khách/phòng
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            flex.flex_row,
                                            flex.align_items_center,
                                            {
                                                marginTop: 5
                                            }
                                        ]}
                                    >
                                        <Icon
                                            name='user-alt'
                                            type='font-awesome-5'
                                            color={color_primary}
                                            size={18}
                                        />
                                        <Text
                                            style={[
                                                text_size.sm,
                                                font.serif,
                                                {
                                                    marginLeft: 10,
                                                    color: color_dark
                                                }
                                            ]}
                                        >
                                            Đối tượng: {this.state.room?.typeOfCustomer}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={[
                                        {
                                            width: '50%',
                                            flexDirection: "row",
                                            justifyContent: "flex-end",
                                            alignItems: "center"
                                        }
                                    ]}
                                >
                                    <View
                                        style={{width: '60%'}}
                                    >
                                        <AppButtonActionInf
                                            size={10}
                                            textSize={16}
                                            bg={color_primary}
                                            title="Đặt"
                                        />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.saveTicket()
                                        }}
                                        style={{
                                            marginLeft: 15
                                        }}
                                    >
                                        <Icon
                                            name={this.state.ticket ? 'bookmark' : 'bookmark-border'}
                                            type='material'
                                            color={color_primary}
                                            size={40}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View
                                style={[
                                    {
                                        paddingHorizontal: 10,
                                        marginTop: 5
                                    }
                                ]}
                            >
                                <View
                                    style={[
                                        flex.flex_row,
                                        {
                                            marginTop: 5
                                        }
                                    ]}
                                >
                                    <Icon
                                        style={{marginTop: 2}}
                                        name='note'
                                        type='material'
                                        color={color_primary}
                                        size={20}
                                    />
                                    <Text
                                        style={[
                                            text_size.sm,
                                            font.serif,
                                            {
                                                marginLeft: 8,
                                                color: color_dark
                                            }
                                        ]}
                                    >
                                        {this.state.room?.note}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        flex.flex_row,
                                        {
                                            marginTop: 5
                                        },
                                        flex.align_items_center
                                    ]}
                                >
                                    <Icon
                                        name='chart-area'
                                        type='font-awesome-5'
                                        color={color_primary}
                                        size={18}
                                    />
                                    <Text
                                        style={[
                                            text_size.sm,
                                            font.serif,
                                            {
                                                marginLeft: 8,
                                                color: color_dark
                                            }
                                        ]}
                                    >
                                        Khu: {this.state.area?.areaName}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={[
                                        flex.flex_row,
                                        {
                                            marginTop: 5
                                        },
                                        flex.align_items_center
                                    ]}
                                    onPress={() => {
                                        this.setState({
                                            isMap: true
                                        })
                                    }}
                                >
                                    <Icon
                                        name='my-location'
                                        type='material'
                                        color={color_primary}
                                        size={18}
                                    />
                                    <Text
                                        style={[
                                            text_size.sm,
                                            font.serif,
                                            {
                                                marginLeft: 8,
                                                color: color_dark
                                            }
                                        ]}
                                    >
                                        {this.state.area?.address}
                                    </Text>
                                </TouchableOpacity>
                                <View
                                    style={[
                                        flex.flex_row,
                                        {
                                            marginTop: 5
                                        }
                                    ]}
                                >
                                    <Icon
                                        style={{marginTop: 2}}
                                        name='description'
                                        type='material'
                                        color={color_primary}
                                        size={20}
                                    />
                                    <Text
                                        style={[
                                            text_size.sm,
                                            font.serif,
                                            {
                                                marginLeft: 8,
                                                color: color_dark
                                            }
                                        ]}
                                    >
                                        Mô tả khu: {this.state.area?.description}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    {
                        this.state.isViewImage ?
                            <Modal animationType={'fade'} isVisible={true} transparent={true}>
                                <View
                                    style={[
                                        {
                                            flex: 1,
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }
                                    ]}
                                >
                                    <View
                                        style={[
                                            {
                                                width: '90%',
                                                height: '90%',
                                                backgroundColor: 'black',
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }
                                        ]}
                                    >
                                        <Image
                                            resizeMode={"stretch"}
                                            style={[
                                                {
                                                    height: '100%',
                                                    width: '100%'
                                                }
                                            ]}
                                            source={
                                                {
                                                    uri: this.state.images[this.state.viewImageIndex]
                                                }
                                            }
                                        />
                                        <TouchableOpacity
                                            style={[
                                                {
                                                    position: "absolute",
                                                    top: 5,
                                                    right: 5
                                                }
                                            ]}
                                            onPress={() => {
                                                this.setState({
                                                    isViewImage: false
                                                })
                                            }}
                                        >
                                            <Icon
                                                name='times-circle'
                                                type='font-awesome-5'
                                                color='white'
                                                size={30}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                            : null
                    }
                    {
                        this.state.isMap ?
                            <Modal animationType={'fade'} isVisible={true} transparent={true}>
                                <View
                                    style={[
                                        {
                                            flex: 1,
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }
                                    ]}
                                >
                                    <View
                                        style={[
                                            {
                                                width: '90%',
                                                height: '90%',
                                                backgroundColor: 'black',
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }
                                        ]}
                                    >
                                        <MapView
                                            style={{
                                                width: '100%',
                                                height: '100%'
                                            }}
                                            initialRegion={{
                                                latitude: this.state.area?.lat,
                                                longitude: this.state.area?.lng,
                                                latitudeDelta: 0.0005,
                                                longitudeDelta: 0.0005
                                            }}
                                        >
                                            <Marker coordinate={{
                                                latitude: this.state.area?.lat,
                                                longitude: this.state.area?.lng
                                            }}>

                                            </Marker>
                                        </MapView>
                                        <TouchableOpacity
                                            style={[
                                                {
                                                    position: "absolute",
                                                    top: 5,
                                                    right: 5
                                                }
                                            ]}
                                            onPress={() => {
                                                this.setState({
                                                    isMap: false
                                                })
                                            }}
                                        >
                                            <Icon
                                                name='times-circle'
                                                type='font-awesome-5'
                                                color={color_primary}
                                                size={30}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                            : null
                    }
                </View>
            );
        }
}

const mapStateToProps = ({user}) => {
    return {user};
};

const mapDispatchToProps = {
    doGetAreaById,
    doGetSaveRoom,
    doAddSaveRoom,
    doDeleteSaveRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailRoomScreen)
