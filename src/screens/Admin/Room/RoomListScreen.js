import React, {Component} from 'react';
import {
    FlatList,
    Text, TextInput, TouchableOpacity, View
} from 'react-native';
import AppFAB from "../../../components/AppFAB";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    flex,
    font,
    font_weight,
    height,
    position, shadow,
    text_color,
    text_size
} from "../../../utils/styles/MainStyle";
import {color_danger, color_primary, color_secondary, color_success} from "../../../utils/theme/Color";
import { width } from "../../../utils/styles/MainStyle";
import {Icon} from "@rneui/base";
import {
    doDeleteRoom,
    doGetListRoom
} from "../../../redux/actions/room";
import {connect} from "react-redux";
import moment from "moment";
import ModalSelector from "react-native-modal-selector";
import {doGetListTypeOfRoom} from "../../../redux/actions/typeOfRoom";

class RoomListScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            typeRoomData: [],
            roomDataShow: [],
            initValue: ''
        }
    }

    viewAddRoom(){
        this.props.navigation.navigate("AddRoom");
    }

    deleteTypeRoom(id) {
        this.props.doDeleteRoom({id: id}).then(data => {
            this.getRoom();
        })
    }

    componentDidMount() {
        this.removeWillFocusListener = this.props.navigation.addListener(
            'focus', () => {
                this.getRoom();
                this.getTypeOfRoom();
            }
        );
    }

    componentWillUnmount() {
        this.removeWillFocusListener();
    }

    getTypeOfRoom = () => {
        this.props.doGetListTypeOfRoom({userId: this.props.user.user.id}).then(data => {
            this.setState({
                typeRoomData: [
                    {
                        key: 0,
                        label: "Tất cả"
                    },
                    ...data.map(item => ({key: item.id, label: item.name}))
                ]
            })
        })
    }

    getRoom(){
        this.props.doGetListRoom({userId: this.props.user.user.id}).then(data => {
            this.setState({
                roomDataShow: data,
                initValue: 'Tất cả'
            })
        })
    }

    updateTypeRoom(room){
        this.props.navigation.navigate("UpdateRoom", {room: room});
    }
    filterRoom(obj) {
        this.setState({
            // isLoading: true,
            initValue: obj.label,
            roomDataShow: []
        })

        if(obj.key !== 0) {
            let tamp = [];
            this.props.room.roomList.map(item => {
                if(item.typeofroomId === obj.key){
                    tamp.push(item)
                }
            })

            this.setState({
                roomDataShow: tamp
            }, () => {
                // alert(this.state.dataTypeRoomBackup.length)
            })
        } else{
            this.setState({
                roomDataShow: this.props.room.roomList
            }, () => {
                // alert(this.state.dataTypeRoomBackup.length)
            })
        }

        // setTimeout(() => {
        //     this.setState({
        //         isLoading: false
        //     })
        // }, 1000)
    }


    _renderItem = ({item, index}) => {
        let time = new Date(item.updateAt);
        return(
            <View
                style={[
                    width.w_100,
                    {
                        marginTop: 10,
                        padding: 5,
                        borderRadius: 5
                    },
                    background_color.light,
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
                                borderRadius: 5,
                                marginRight: 10
                            }
                        ]}
                    >
                        <Icon
                            name= {"boxes"}
                            type='font-awesome-5'
                            size={18}
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
                            {item.roomName}
                        </Text>
                        <View
                            style={[
                                flex.flex_row,
                                {
                                    alignItems: "flex-end"
                                },
                                {marginTop: 2}
                            ]}
                        >
                            <Icon
                                name= {"chart-area"}
                                type='font-awesome-5'
                                size={16}
                                color={color_primary}
                            />
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    {marginLeft: 4, marginBottom: -1}
                                ]}
                            >
                                {moment(item.updatedAt).format('DD-MM-YYYY hh:ss')}
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
                        onPress={() => this.deleteTypeRoom(item.id)}
                    >
                        <Icon
                            name= {"trash-alt"}
                            type='font-awesome-5'
                            size={22}
                            color={color_danger}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.updateTypeRoom(item)}
                    >
                        <Icon
                            name= {"pencil-alt"}
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
                    {flex: 1, padding: 2, paddingLeft: 10, paddingRight: 10, paddingBottom: 15},
                    height.h_100,
                    position.relative,
                    background_color.white
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
                        onPress = { () => this.viewAddRoom() }
                    />
                </View>
                <View
                    style={{width: '50%'}}
                >
                    {
                        this.state.roomDataShow ?
                            <ModalSelector
                                touchableStyle={[
                                    width.w_100,
                                    background_color.white,
                                    shadow.shadow,
                                    { borderRadius: 7, padding: 3, paddingLeft: 6, paddingRight: 10, marginTop: 5 },
                                ]}
                                selectStyle={[
                                    { borderWidth: 0, textAlignVertical: 'right' }
                                ]}
                                selectedItemTextStyle={[
                                    text_color.primary,
                                    font_weight.bold
                                ]}
                                optionTextStyle={[
                                    text_size.sm,
                                    font.serif,
                                    text_color.black
                                ]}
                                cancelTextStyle={[
                                    text_size.sm,
                                    font.serif,
                                    text_color.danger,
                                    font_weight.bold
                                ]}
                                cancelText={"Hủy"}
                                childrenContainerStyle={[
                                    flex.flex_row,
                                    flex.align_items_center,
                                    flex.justify_content_between
                                ]}
                                touchableActiveOpacity={.8}
                                data={this.state.typeRoomData}
                                placeholder={"Loại phòng"}
                                onChange={(option) => { this.filterRoom(option) }}>

                                <TextInput
                                    autoCorrect={false}
                                    style={[text_size.sm, font.serif, font_weight.f_500, { color: 'black', width: '95%' }]}
                                    placeholder={"Loại phòng"}
                                    value={this.state.initValue}
                                />
                                <Icon
                                    name='caret-down'
                                    type='font-awesome-5'
                                    color={color_secondary}
                                    size={22} />
                            </ModalSelector>
                            : null
                    }
                </View>
                <FlatList showsVerticalScrollIndicator={false} data={this.state.roomDataShow} renderItem={this._renderItem} keyExtractor={(item, index) => index.toString()}/>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({user, room}) => {
    return {user, room};
};

const mapDispatchToProps = {
    doGetListRoom,
    doDeleteRoom,
    doGetListTypeOfRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomListScreen)
