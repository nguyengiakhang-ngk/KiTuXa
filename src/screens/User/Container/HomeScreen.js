import React, {Component} from 'react';
import {
    FlatList, Image,
    SafeAreaView, Text, View,
    Dimensions
} from 'react-native';
import {
    background_color,
    flex, shadow, text_color, text_size
} from "../../../utils/styles/MainStyle";
import {color_danger, color_primary} from "../../../utils/theme/Color";
import {Icon} from "react-native-elements";

export default class HomeScreen extends Component{
    constructor(props) {
        super(props);

        this.state = {
            dataTitle: [
                {
                    id: 1,
                    name: "Nổi bật",
                    icon: 'ad'
                },
                {
                    id: 2,
                    name: "Mới nhất",
                    icon: 'fire-alt'
                }
            ],
            data: [
                {
                    id: 1,
                    name: "Hội trường",
                    s: 15,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 2,
                    name: "Hội trường",
                    s: 15,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 3,
                    name: "Hội trường",
                    s: 15,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 4,
                    name: "Hội trường",
                    s: 15,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 5,
                    name: "Hội trường",
                    s: 15,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 1,
                    name: "Hội trường",
                    s: 15,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 2,
                    name: "Hội trường",
                    s: 15,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 3,
                    name: "Hội trường",
                    s: 15,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 4,
                    name: "Hội trường",
                    s: 15,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 5,
                    name: "Hội trường",
                    s: 15,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                }
            ],
            refreshing: true,
        }
    }

    routeScreen = (title) => {
        this.props.navigation.navigate(title);
    }

    render() {
        return (
            <SafeAreaView
                style={[
                    {
                        flex: 1
                    },
                    flex.justify_content_center,
                    flex.align_items_center
                ]}
            >
                <FlatList data={this.state.dataTitle} renderItem={this._renderItemTitle} keyExtractor={item => item.id.toString()} />
            </SafeAreaView>
        );
    }

    _renderItemTitle = ({item, index}) => {
        return(
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
                        {item. name}
                    </Text>
                </View>
                <FlatList numColumns={2} data={this.state.data} renderItem={this._renderItem} keyExtractor={item => item.id.toString()} />
            </View>
        )
    }

    _renderItem = ({item, index}) => {
        const windowWidth = Dimensions.get('window').width / 2 - 15;
        return (
            <View
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
                        {uri: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"}
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
                            marginBottom: 5,
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
                        {item.s} (m3)
                    </Text>
                </View>
            </View>
        );
    }
}
