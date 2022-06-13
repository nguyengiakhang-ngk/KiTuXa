import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {background_color, flex, shadow, text_color, text_size} from "../../../utils/styles/MainStyle";
import {color_danger, color_primary} from "../../../utils/theme/Color";
import {Icon} from "@rneui/base";
import {connect} from "react-redux";
import {doGetListTypeOfRoomNew} from "../../../redux/actions/typeOfRoom";
import {url} from "../../../constant/define";
import {cardExpiry} from "../../../utils/proccess/proccessApp";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import _ from 'lodash';
import {SliderBox} from "react-native-image-slider-box";
import BackHandler from "react-native/Libraries/Utilities/BackHandler";

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataTitle: [
                {
                    id: 1,
                    name: "Nổi bật",
                    icon: 'ad',
                    list: [

                    ]
                },
                {
                    id: 2,
                    name: "Mới nhất",
                    icon: 'fire-alt',
                    list: [

                    ]
                }
            ],
            refreshing: true,
            dataNewAll: [],
            dataAll: [],
            isDataNewAll: false,
            isDataAll: false,
            isLoading: true
        }
    }

    componentDidMount() {
        this.removeWillFocusListener = this.props.navigation.addListener(
            'focus', () => {
                this.getTypeRoomNew();
            }
        );
    }

    componentWillUnmount() {
        this.removeWillFocusListener();
    }

    backAction = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
        if(this.state.isDataAll || this.state.isDataNewAll){
            this.setState({
                isDataAll: false,
                isDataNewAll: false
            })
            return true;
        }

        BackHandler.exitApp();
        return true;
    }

    getTypeRoomNew = () => {
        this.setState({
            isDataAll: false,
            isDataNewAll: false,
            isLoading: true
        })
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 500)
        this.props.doGetListTypeOfRoomNew().then(data => {
            let arr = _.cloneDeep( data );
            arr.map(item => {
                item.count = 0;
                item.rooms.map(room => {
                    item.count = room.booktickets.length;
                })
            })

            for (let i = 0; i < arr.length; i++){
                for (let j = i+1; j < arr.length; j++){
                    if(arr[i].count < arr[j].count){
                        let tamp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = tamp;
                    }
                }
            }

            this.setState({
                dataAll: _.cloneDeep( arr ),
                dataNewAll: _.cloneDeep( data )
            })

            this.state.dataTitle[0].list = _.cloneDeep( arr ).splice(0, 10);
            this.state.dataTitle[1].list = _.cloneDeep( data ).splice(0, 10);
            this.setState({
                dataTitle: this.state.dataTitle
            });
        })
    }

    routeScreen = (title) => {
        this.props.navigation.navigate(title);
    }

    render() {
        return (
            <SafeAreaView
                style={[
                    {
                        flex: 1,
                        paddingBottom: 60
                    },
                    flex.justify_content_center
                ]}
            >
                {
                    !this.state.dataTitle[0].list || !this.state.dataTitle[1].list || this.state.isLoading ?
                        <ActivityIndicator size="large" color={color_primary} />
                        :
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            {
                                (!this.state.isDataNewAll && !this.state.isDataAll) ?
                                    <SliderBox
                                        autoplay
                                        images={
                                            [
                                                `${url}/uploads/slide1.jpg`,
                                                `${url}/uploads/slide2.jpg`,
                                                `${url}/uploads/slide3.jpg`
                                            ]
                                        }
                                    />
                                    : null
                            }
                            <FlatList showsVerticalScrollIndicator={false} data={this.state.dataTitle} renderItem={this._renderItemTitle} keyExtractor={item => item.id.toString()} />
                        </View>
                }
            </SafeAreaView>
        );
    }

    _renderItemTitle = ({ item, index }) => {
        return (
            <View>
                {
                    this.state.isDataAll && !this.state.isDataNewAll ?
                        (
                            item.id === 1 ?
                                <View
                                    style={
                                        {
                                            flex: 1,
                                            marginTop: 15
                                        }
                                    }
                                >
                                    <View
                                        style={[
                                            flex.flex_row,
                                            flex.align_items_center
                                        ]}
                                    >
                                        <Icon
                                            raised
                                            name={item.icon}
                                            type='font-awesome-5'
                                            color={color_danger}
                                            size={14}
                                        />
                                        <Text
                                            style={[
                                                text_color.primary,
                                                text_size.md,
                                                {
                                                    fontWeight: '600'
                                                }
                                            ]}
                                        >
                                            {item.name}
                                        </Text>
                                    </View>
                                    <FlatList style={{paddingBottom: 10}} showsVerticalScrollIndicator={false} numColumns={2} data={this.state.dataAll} renderItem={this._renderItem} keyExtractor={item => item.id.toString()} />
                                </View>
                                : null
                        )
                        :
                        (
                            !this.state.isDataAll && this.state.isDataNewAll ?
                                (
                                    item.id === 2 ?
                                        <View
                                            style={
                                                {
                                                    flex: 1,
                                                    marginTop: 15
                                                }
                                            }
                                        >
                                            <View
                                                style={[
                                                    flex.flex_row,
                                                    flex.align_items_center
                                                ]}
                                            >
                                                <Icon
                                                    raised
                                                    name={item.icon}
                                                    type='font-awesome-5'
                                                    color={color_danger}
                                                    size={14}
                                                />
                                                <Text
                                                    style={[
                                                        text_color.primary,
                                                        text_size.md,
                                                        {
                                                            fontWeight: '600'
                                                        }
                                                    ]}
                                                >
                                                    {item.name}
                                                </Text>
                                            </View>
                                            <FlatList style={{paddingBottom: 10}} showsVerticalScrollIndicator={false} numColumns={2} data={this.state.dataNewAll} renderItem={this._renderItem} keyExtractor={item => item.id.toString()} />
                                        </View>
                                        : null
                                )
                                :
                                <View
                                    style={
                                        {
                                            flex: 1,
                                            marginTop: 15
                                        }
                                    }
                                >
                                    <View
                                        style={[
                                            flex.flex_row,
                                            flex.align_items_center
                                        ]}
                                    >
                                        <Icon
                                            raised
                                            name={item.icon}
                                            type='font-awesome-5'
                                            color={color_danger}
                                            size={14}
                                        />
                                        <Text
                                            style={[
                                                text_color.primary,
                                                text_size.md,
                                                {
                                                    fontWeight: '600'
                                                }
                                            ]}
                                        >
                                            {item.name}
                                        </Text>
                                    </View>
                                    <FlatList style={{paddingBottom: 10}} showsVerticalScrollIndicator={false} numColumns={2} data={item.list} renderItem={this._renderItem} keyExtractor={item => item.id.toString()} />
                                    {
                                        item.list.length ?
                                            <View
                                                style={[
                                                    flex.align_items_center
                                                ]}
                                            >
                                                <View
                                                    style={[
                                                        {
                                                            width: '25%',
                                                            marginBottom: 10
                                                        }
                                                    ]}
                                                >
                                                    <AppButtonActionInf
                                                        bg={color_primary}
                                                        title={'Xem thêm'}
                                                        size={10}
                                                        onPress={() => {
                                                            BackHandler.addEventListener("hardwareBackPress", this.backAction);
                                                            item.id === 1 ?
                                                                this.setState({
                                                                    isDataAll: true
                                                                })
                                                                :
                                                                this.setState({
                                                                    isDataNewAll: true
                                                                })
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                            : null
                                    }
                                </View>

                        )
                }
            </View>
        )
    }

    _renderItem = ({ item, index }) => {
        const windowWidth = Dimensions.get('window').width / 2 - 15;
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('DetailRoom', {room: item})
                }}
                style={[
                    shadow.shadow,
                    background_color.white,
                    {
                        width: windowWidth,
                        borderTopLeftRadius: 30,
                        borderBottomRightRadius: 30,
                        overflow: 'hidden',
                        margin: 5
                    }
                ]}
            >
                <Image
                    style={[
                        {
                            width: '100%',
                            height: 150,
                        }
                    ]}
                    source={
                        { uri: item.imageofrooms?.length ? `${url}/${item?.imageofrooms[0].image}` : "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg" }
                    }
                    resizeMode={'stretch'}
                />
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
                    {item.name}
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
                        {cardExpiry(item.priceofrooms?.length ? item.priceofrooms[item.priceofrooms.length-1]?.price : 0)} (vnđ)
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = ({user, room}) => {
    return {user, room};
};

const mapDispatchToProps = {
    doGetListTypeOfRoomNew
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
