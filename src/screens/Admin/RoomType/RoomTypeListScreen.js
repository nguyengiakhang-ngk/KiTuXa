import React, {Component} from 'react';
import {
    ActivityIndicator,
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
    doGetListTypeOfRoom,
    doDeleteTypeOfRoom
} from "../../../redux/actions/typeOfRoom";
import {
    doDeleteImageOfTypeRoom
} from "../../../redux/actions/imageTypeOfRoom";
import {connect} from "react-redux";
import DialogConfirm from "../../../components/DialogConfirm";
import Toast from "react-native-toast-message";
import AppDialogSelect from "../../../components/AppDialogSelect";
import {doGetListArea} from "../../../redux/actions/area";
import ModalSelector from "react-native-modal-selector";

class RoomTypeListScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataTypeRoom: [],
            isConfirm: false,
            typeOfRoom: null,
            ref: React.createRef(),
            dataArea: null,
            dataTypeRoomBackup: [],
            initValue: ''
        }
    }

    viewAddRoomType(){
        this.props.navigation.navigate("AddRoomType");
    }

    deleteTypeRoom() {
        this.setState({
            isLoading: true
        })
        this.props.doDeleteTypeOfRoom({id: this.state.typeOfRoom.id}).then(data => {
            if(data) {
                this.state.typeOfRoom.imageofrooms?.map( (item, index) => {
                    this.props.doDeleteImageOfTypeRoom({id: item.id, image: item.image}).then(data => {
                        if(data && index === (this.state.typeOfRoom.imageofrooms.length - 1) ) {
                            this.getTypeRoom();
                        }
                    })
                })
                this.setState({
                    typeOfRoom: null,
                    isConfirm: false
                })
                this.getTypeRoom();
                Toast.show({
                    type: 'success',
                    text1: 'Loại phòng',
                    text2: 'Xóa thành công.',
                    visibilityTime: 2000,
                    autoHide: true
                });
            }
        })
    }

    componentDidMount() {
        this.removeWillFocusListener = this.props.navigation.addListener(
            'focus', () => {
                this.getTypeRoom();
                this.getListArea();
            }
        );

        this.removeWillBlurListener = this.props.navigation.addListener(
            'blur', () => {
                this.setState({
                    dataTypeRoom: [],
                    isLoading: true
                })
            }
        );
    }

    componentWillUnmount() {
        this.removeWillFocusListener();
        this.removeWillBlurListener();
    }

    getListArea() {
        this.props.doGetListArea({ userId: this.props.user.user.id }).then(data => {
            this.setState({
                dataArea: [
                    {
                        key: 0,
                        label: "Tất cả",
                    },
                    ...data.map(item => ({
                        key: item.id,
                        label: item.areaName,
                    }))
                ]
            }, () => {
                // alert(JSON.stringify(this.state.dataArea));
            })
        })
    }

    getTypeRoom(){
        this.props.doGetListTypeOfRoom({userId: this.props.user.user.id}).then(data => {
            this.setState({
                dataTypeRoomBackup: data,
                initValue: 'Tất cả'
            })
        });
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 2000)
    }

    updateTypeRoom(typeOfRoom){
        this.props.navigation.navigate("UpdateRoomType", {typeOfRoom: typeOfRoom});
    }

    filterTypeRoom(obj) {
        this.setState({
            isLoading: true,
            initValue: obj.label,
            dataTypeRoomBackup: []
        })

        if(obj.key !== 0) {
            let tamp = [];
            this.props.typeOfRoom.typeOfRoomList.map(item => {
                if(item.areaId === obj.key){
                    tamp.push(item)
                }
            })

            this.setState({
                dataTypeRoomBackup: tamp
            }, () => {
                // alert(this.state.dataTypeRoomBackup.length)
            })
        } else{
            this.setState({
                dataTypeRoomBackup: this.props.typeOfRoom.typeOfRoomList
            }, () => {
                // alert(this.state.dataTypeRoomBackup.length)
            })
        }

        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000)
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
                        onPress={() => {
                            this.setState({
                                typeOfRoom: item,
                                isConfirm: true
                            })
                        }}
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
                    {flex: 1, paddingLeft: 10, paddingRight: 10, paddingBottom: 15},
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
                <Toast ref={(ref) => {Toast.setRef(ref)}} />
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
                            style={{
                                paddingTop: 10
                            }}>
                            <View
                                style={{width: '50%'}}
                            >
                                {
                                    this.state.dataArea ?
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
                                            data={this.state.dataArea}
                                            placeholder={"Khu"}
                                            onChange={(option) => { this.filterTypeRoom(option) }}>

                                            <TextInput
                                                autoCorrect={false}
                                                style={[text_size.sm, font.serif, font_weight.f_500, { color: 'black', width: '95%' }]}
                                                placeholder={"Khu"}
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
                            <FlatList style={{marginBottom: 50, marginTop: 5}} showsVerticalScrollIndicator={false} data={this.state.dataTypeRoomBackup} renderItem={this._renderItem} keyExtractor={(item, index) => index.toString()}/>
                        </View>
                }
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
                                this.deleteTypeRoom();
                            }}
                        />
                        : null
                }
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
    doDeleteImageOfTypeRoom,
    doGetListArea
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomTypeListScreen)
