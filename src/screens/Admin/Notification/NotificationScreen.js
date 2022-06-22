import React, { Component } from 'react';
import {
    FlatList,
    Text,
    View,
    Image,
    TouchableOpacity, Modal
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
    color_primary
} from "../../../utils/theme/Color";
import {connect} from "react-redux";
import {doAddNotification, doGetNotification, doUpdateNotification} from "../../../redux/actions/notification";
import {url} from "../../../constant/define";
import moment from "moment";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import {checkedBookTicket} from "../../../redux/actions/bookticket";
import Toast from "react-native-toast-message";

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
                notifications: data,
                isCheckedBooked: false
            })
        })
    }

    updateNotification() {
        this.props.doUpdateNotification({id: this.state.ticket?.id}).then(data => {
            this.getNotifications();
        })
    }

    checkedBook = async (status) => {
        if (status === 1) {
            let checkDate = true;
            let startDate = new Date(this.state.ticket.bookticket?.startBook);
            let endDate = new Date(this.state.ticket.bookticket?.endBook);
            this.state.notifications.map(item => {
                if (item.bookticket?.status === 1) {
                    let timeCheckS = new Date(item.bookticket?.startBook);
                    let timeCheckE = new Date(item.bookticket?.endBook);
                    if (
                        startDate.getTime() >= timeCheckS.getTime() && startDate.getTime() <= timeCheckE.getTime() ||
                        endDate.getTime() >= timeCheckS.getTime() && endDate.getTime() <= timeCheckE.getTime() ||
                        startDate.getTime() < timeCheckS.getTime() && endDate.getTime() > timeCheckE.getTime()
                    ) {
                        checkDate = false;
                    }
                }
            })
            if(checkDate) {
                this.props.checkedBookTicket({status: status}, {id: this.state.ticket.bookticket?.id}).then(data => {
                    this.props.doAddNotification({
                        status: 0,
                        statusView: 0,
                        RoomId: this.state.ticket.room?.id,
                        UserId: this.state.ticket.bookticket.user?.id,
                        notificationTypeId: 1,
                        bookticketId: this.state.ticket.bookticket?.id
                    })
                    this.updateNotification();
                })
            } else{
                this.setState({
                    isCheckedBooked: false
                })
                Toast.show({
                    type: 'error',
                    text1: 'Duyệt phòng',
                    text2: 'Phòng đã được duyệt trong khoảng thời gian này.',
                    visibilityTime: 4000,
                    autoHide: true
                });
            }
        } else{
            this.props.checkedBookTicket({status: status}, {id: this.state.ticket.bookticket?.id}).then(data => {
                this.props.doAddNotification({
                    status: 0,
                    statusView: 0,
                    RoomId: this.state.ticket.room?.id,
                    UserId: this.state.ticket.bookticket.user?.id,
                    notificationTypeId: 1,
                    bookticketId: this.state.ticket.bookticket?.id
                })
                this.updateNotification();
            })
        }
    }

    _renderItem = ({ item, index }) => {
        if(item?.notificationtypeId === 2){
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
                                item.bookticket.user?.image ?
                                    <Image
                                        source={
                                            {
                                                uri: `${url}/${item.bookticket.user?.image}`
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
                                        font.serif,
                                        font_weight.bold,
                                        text_color.primary
                                    ]}>
                                        {`${item.bookticket.user?.name} `}
                                        <Text style={[
                                            text_size.xs,
                                            font.serif,
                                            {
                                                color: color_dark,
                                                paddingLeft: 2
                                            }
                                        ]}>
                                            đã đặt phòng
                                        </Text>
                                        <Text style={[
                                            {
                                                marginLeft: 10
                                            },
                                            text_size.xs,
                                            font.serif,
                                            font_weight.bold,
                                            text_color.primary
                                        ]}>
                                            {` ${item.room?.roomName}`}
                                        </Text>
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
                    <FlatList
                        data={this.state.notifications}
                        renderItem={this._renderItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            backgroundColor: 'white'
                        }}
                    />
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
                                                <Text style={[text_color.primary]}>Tên người đặt:</Text> {this.state.ticket.bookticket.user?.name}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>SĐT:</Text> {this.state.ticket.bookticket.user?.numberPhone}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>Địa chỉ:</Text> {this.state.ticket.bookticket.user?.address}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>Đặt cọc:</Text> {this.state.ticket.bookticket?.prepayment}
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
                                                <Text style={[text_color.primary]}>Loại phòng:</Text> {this.state.ticket.room.typeofroom?.name}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif
                                                ]}
                                            >
                                                <Text style={[text_color.primary]}>Phòng:</Text> {this.state.ticket.room?.roomName}
                                            </Text>
                                            <Text
                                                style={[
                                                    text_size.xs,
                                                    font.serif,
                                                    text_color.danger
                                                ]}
                                            >
                                                <Text style={[font_weight.bold]}>Giá:</Text> {this.state.ticket.room.typeofroom.priceofrooms[this.state.ticket.room.typeofroom.priceofrooms?.length-1]?.price}
                                            </Text>
                                        </View>
                                    </View>
                                    {
                                        this.state.ticket?.status ?
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
                                                        title="Hủy"
                                                    />
                                                </View>
                                                <View
                                                    style={[
                                                        {
                                                            width: this.state.ticket.bookticket?.status === 2 ? '50%' :'40%',
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
                                                                title="Đã không duyệt"
                                                            />
                                                            :
                                                            <AppButtonActionInf
                                                                size={10}
                                                                textSize={16}
                                                                bg={color_primary}
                                                                title="Đã duyệt"
                                                            />
                                                    }
                                                </View>
                                            </View>
                                            :
                                            <View style={[
                                                flex.flex_row,
                                                flex.justify_content_between,
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
                                                        title="Hủy"
                                                    />
                                                </View>
                                                <View
                                                    style={[
                                                        {
                                                            width: '40%',
                                                            paddingHorizontal: 5
                                                        }
                                                    ]}
                                                >
                                                    <AppButtonActionInf
                                                        size={10}
                                                        textSize={16}
                                                        bg={color_danger}
                                                        title="Không duyệt"
                                                        onPress={() => {
                                                            this.checkedBook(2)
                                                        }}
                                                    />
                                                </View>
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
                                                        bg={color_primary}
                                                        title="Duyệt"
                                                        onPress={() => {
                                                            this.checkedBook(1)
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        }
                                </View>
                            </View>
                        </Modal>
                        : null
                }
                <Toast ref={(ref) => {Toast.setRef(ref)}} />
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
