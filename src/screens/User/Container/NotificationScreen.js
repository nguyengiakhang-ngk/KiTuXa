import React, { Component } from 'react';
import {
    FlatList,
    Text,
    View,
    Image,
    TouchableOpacity, Modal, ActivityIndicator
} from 'react-native';
import {
    flex,
    font, font_weight, text_color,
    text_size,
    width
} from "../../../utils/styles/MainStyle";
import {
    color_secondary,
    color_light,
    color_dark,
    color_white,
    color_danger,
    color_primary, color_success
} from "../../../utils/theme/Color";
import {connect} from "react-redux";
import {doAddNotification, doGetNotification, doUpdateNotification} from "../../../redux/actions/notification";
import {url} from "../../../constant/define";
import moment from "moment";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import {checkedBookTicket} from "../../../redux/actions/bookticket";

class NotificationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            notifications: [],
            isCheckedBooked: false,
            ticket: null
        };
    }

    componentDidMount() {
        this.removeWillFocusListener = this.props.navigation.addListener(
            'focus', () => {
                this.getNotifications();
            }
        );

        this.removeWillBlurListener = this.props.navigation.addListener(
            'blur', () => {
                this.setState({
                    listAre: [],
                    isLoading: true
                })
            }
        );
    }

    componentWillUnmount() {
        this.removeWillFocusListener();
        this.removeWillBlurListener();
    }

    getNotifications = () => {
        this.props.doGetNotification({userId: this.props.user.user.id}).then(data => {
            this.setState({
                notifications: data
            })
        })

        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000)
    }

    updateNotification() {
        this.props.doUpdateNotification({id: this.state.ticket?.id}).then(data => {
            this.getNotifications();
        })
    }

    _renderItem = ({ item, index }) => {
        if(item?.notificationtypeId === 1){
            return (
                <TouchableOpacity
                    style={[
                        flex.align_items_center,
                        {
                            width: '100%',
                            paddingVertical: 10,
                            paddingHorizontal: 5,
                            marginBottom: 5,
                            borderBottomWidth: 1,
                            borderBottomColor: color_secondary,
                            backgroundColor: item.statusView ? color_white : color_light,
                            justifyContent: "center"
                        }
                    ]}
                    onPress={() => {
                        this.setState({
                            isCheckedBooked: true,
                            ticket: item
                        }, () => {
                            this.updateNotification();
                        })
                    }}
                >

                    <View style={[flex.flex_row]}>
                        <View
                            style={[
                                flex.flex_row,
                                width.w_100
                            ]}
                        >
                            {
                                item.user?.image ?
                                    <Image
                                        source={
                                            {
                                                uri: `${url}/${item.room.typeofroom.imageofrooms[0]?.image}`
                                            }
                                        }
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 40
                                        }}
                                        resizeMode={"stretch"}
                                    />
                                    :
                                    <Image
                                        source={
                                            require('../../../assets/images/default_avatar.png')
                                        }
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 40
                                        }}
                                        resizeMode={"stretch"}
                                    />
                            }
                            <View
                                style={[
                                    flex.justify_content_center
                                ]}
                            >
                                <View
                                    style={[
                                        flex.flex_row,
                                        {
                                            width: '90%'
                                        }
                                    ]}
                                >
                                    <Text style={[
                                        {
                                            marginLeft: 10
                                        },
                                        text_size.xs,
                                        font.serif
                                    ]}>
                                        Y??u c???u ?????t ph??ng
                                        <Text style={[
                                            {
                                                marginLeft: 10
                                            },
                                            text_size.xs,
                                            font.serif,
                                            text_color.primary,
                                            font_weight.bold
                                        ]}>
                                            {` ${item.room?.roomName} `}
                                        </Text>
                                        {`c???a b???n `}
                                        {
                                            item.bookticket?.status === 1 ?
                                                <Text style={[
                                                    text_size.xs,
                                                    font.serif,
                                                    {
                                                        color: color_success,
                                                        paddingLeft: 2
                                                    },
                                                    font_weight.bold
                                                ]}>
                                                    ???? ???????c duy???t
                                                </Text>
                                                :
                                                <Text style={[
                                                    text_size.xs,
                                                    font.serif,
                                                    {
                                                        color: color_danger,
                                                        paddingLeft: 2
                                                    },
                                                    font_weight.bold
                                                ]}>
                                                    ???? kh??ng ???????c duy???t
                                                </Text>
                                        }
                                    </Text>
                                </View>
                                <Text style={[
                                    {
                                        fontSize: 14,
                                        fontStyle: 'italic',
                                        marginTop: 5,
                                        marginHorizontal: 10,
                                        color: color_secondary,
                                        fontWeight: "bold"
                                    },
                                    font.serif
                                ]}>{moment(item.createdAt).format('DD-MM-YYYY hh:ss')}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    flex: 1,
                    padding: 5,
                    backgroundColor: 'white'
                }}>
                    {
                        this.state.isLoading ?
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center"
                                }}
                            >
                                <ActivityIndicator size="large" color={color_primary}/>
                            </View>
                            :
                            <View
                                style={{flex: 1}}
                            >
                                {
                                    this.state.roomDataShow?.length ?
                                        <FlatList
                                            data={this.state.notifications}
                                            renderItem={this._renderItem}
                                            keyExtractor={item => item.id}
                                            showsVerticalScrollIndicator={false}
                                            contentContainerStyle={{
                                                backgroundColor: 'white'
                                            }}
                                        />
                                        :
                                        <View
                                            style={{
                                                flex: 1,
                                                justifyContent: "center",
                                                alignItems: "center"
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
                                                Kh??ng c?? d??? li???u
                                            </Text>
                                        </View>
                                }
                            </View>
                    }
                </View>
                {
                    this.state.isCheckedBooked ?
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
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            overflow: "hidden"
                                        }
                                    ]}
                                >
                                    <View>
                                        <Image
                                            source={
                                                {
                                                    uri: `${url}/${this.state.ticket.room.typeofroom.imageofrooms[0]?.image}`
                                                }
                                            }
                                            style={{
                                                width: '100%',
                                                height: 250
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            padding: 10,
                                            flexDirection: "row"
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: '50%',
                                                paddingRight: 5
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>T??n ng?????i ?????t:</Text> {this.state.ticket.user?.name}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>S??T:</Text> {this.state.ticket.user?.numberPhone}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>?????a ch???:</Text> {this.state.ticket.user?.address}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>?????t c???c:</Text> {this.state.ticket.bookticket?.prepayment}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                width: '50%',
                                                paddingLeft: 5
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>Khu:</Text> {this.state.ticket.room.typeofroom.area?.areaName}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>Lo???i ph??ng:</Text> {this.state.ticket.room.typeofroom?.name}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>Ph??ng:</Text> {this.state.ticket.room?.roomName}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif,
                                                    text_color.danger
                                                ]}
                                            >
                                                <Text style={[font_weight.bold]}>Gi??:</Text> {this.state.ticket.room.typeofroom.priceofrooms[this.state.ticket.room.typeofroom.priceofrooms?.length-1]?.price}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[
                                        flex.flex_row,
                                        flex.justify_content_center,
                                        {
                                            padding: 10
                                        }
                                    ]}>
                                        <View
                                            style={[
                                                {
                                                    width: '30%',
                                                    paddingHorizontal: 5
                                                }
                                            ]}
                                        >
                                            <AppButtonActionInf
                                                size={10}
                                                textSize={16}
                                                bg={color_secondary}
                                                onPress={() => {
                                                    this.setState({
                                                        isCheckedBooked: false
                                                    })
                                                }}
                                                title="H???y"
                                            />
                                        </View>
                                        <View
                                            style={[
                                                {
                                                    width: this.state.ticket.bookticket?.status === 2 ? '70%' :'50%',
                                                    paddingHorizontal: 5
                                                }
                                            ]}
                                        >
                                            {
                                                this.state.ticket.bookticket?.status === 2 ?
                                                    <AppButtonActionInf
                                                        size={10}
                                                        textSize={16}
                                                        bg={color_danger}
                                                        title="???? kh??ng ???????c duy???t"
                                                    />
                                                    :
                                                    <AppButtonActionInf
                                                        size={10}
                                                        textSize={16}
                                                        bg={color_primary}
                                                        title="???? ???????c duy???t"
                                                    />
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        : null
                }
            </View>
        );
    }
}

const mapStateToProps = ({ user }) => {
    // alert(JSON.stringify(user));
    return { user };
};

const mapDispatchToProps = {
    doGetNotification,
    checkedBookTicket,
    doUpdateNotification,
    doAddNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
