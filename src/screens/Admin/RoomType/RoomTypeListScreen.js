import React, {Component} from 'react';
import {
    FlatList,
    Text, TouchableOpacity, View
} from 'react-native';
import AppFAB from "../../../components/AppFAB";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    flex,
    font,
    font_weight,
    height,
    position,
    text_color,
    text_size
} from "../../../utils/styles/MainStyle";
import {color_danger, color_primary, color_success} from "../../../utils/theme/Color";
import { width } from "../../../utils/styles/MainStyle";
import {Icon} from "@rneui/base";
import {
    doGetListTypeOfRoom,
    doDeleteTypeOfRoom
} from "../../../redux/actions/typeOfRoom";
import {
    doDeleteImageOfTypeRoom
} from "../../../redux/actions/imageTypeOfRoom";
import {connect} from "react-redux";

class RoomTypeListScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataTypeRoom: [],
        }
    }

    viewAddRoomType(){
        this.props.navigation.navigate("AddRoomType");
    }

    deleteTypeRoom(typeOfRoom) {
        this.props.doDeleteTypeOfRoom({id: typeOfRoom.id}).then(data => {
            if(data) {
                typeOfRoom.imageofrooms?.map( (item, index) => {
                    this.props.doDeleteImageOfTypeRoom({id: item.id, image: item.image}).then(data => {
                        if(data && index === (typeOfRoom.imageofrooms.length - 1) ) {
                            this.getTypeRoom();
                        }
                    })
                })
                this.getTypeRoom();
            }
        })
    }

    componentDidMount() {
        this.removeWillFocusListener = this.props.navigation.addListener(
            'focus', () => {
                this.getTypeRoom();
            }
        );
    }

    componentWillUnmount() {
        this.removeWillFocusListener();
    }

    getTypeRoom(){
        this.props.doGetListTypeOfRoom({userId: this.props.user.user.id}).then(data => {
            console.log(data);
        })
    }

    updateTypeRoom(typeOfRoom){
        this.props.navigation.navigate("UpdateRoomType", {typeOfRoom: typeOfRoom});
    }

    _renderItem = ({item, index}) => {
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
                            {item.name}
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
                                {item.stretch} (m2)
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
                        onPress={() => this.deleteTypeRoom(item)}
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
                        onPress = { () => this.viewAddRoomType() }
                    />
                </View>
                <FlatList showsVerticalScrollIndicator={false} data={this.props.typeOfRoom.typeOfRoomList} renderItem={this._renderItem} keyExtractor={(item, index) => index.toString()}/>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({user, typeOfRoom}) => {
    return {user, typeOfRoom};
};

const mapDispatchToProps = {
    doGetListTypeOfRoom,
    doDeleteTypeOfRoom,
    doDeleteImageOfTypeRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomTypeListScreen)
