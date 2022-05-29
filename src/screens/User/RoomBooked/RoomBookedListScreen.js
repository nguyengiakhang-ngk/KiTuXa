import React, {Component} from 'react';
import {
    FlatList, Image,
    SafeAreaView, Text, View,
    Dimensions
} from 'react-native';
import {
    background_color,
    flex, font, height, shadow, text_color, text_size, width
} from "../../../utils/styles/MainStyle";
import {color_danger, color_primary} from "../../../utils/theme/Color";
import {Icon} from "@rneui/base";

export default class RoomBookedListScreen extends Component{
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    id: 1,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg",
                    createDate: '24/04/2020'
                },
                {
                    id: 2,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg",
                    createDate: '24/04/2020'
                },
                {
                    id: 3,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg",
                    createDate: '24/04/2020'
                },
                {
                    id: 4,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg",
                    createDate: '24/04/2020'
                },
                {
                    id: 5,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg",
                    createDate: '24/04/2020'
                },
                {
                    id: 1,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg",
                    createDate: '24/04/2020'
                },
                {
                    id: 2,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg",
                    createDate: '24/04/2020'
                },
                {
                    id: 3,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg",
                    createDate: '24/04/2020'
                },
                {
                    id: 4,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg",
                    createDate: '24/04/2020'
                },
                {
                    id: 5,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg",
                    createDate: '24/04/2020'
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
                        flex: 1,
                        padding: 10
                    },
                    flex.justify_content_center,
                    flex.align_items_center
                ]}
            >
                <FlatList showsVerticalScrollIndicator={false} data={this.state.data} renderItem={this._renderItem} keyExtractor={item => item.id.toString()} />
            </SafeAreaView>
        );
    }

    _renderItem = ({item, index}) => {
        return(
            <View
                style={[
                    flex.flex_row,
                    {
                        padding: 10
                    }
                ]}
            >
                <Image
                    style={[
                        width.w_100,
                        height.h_100
                    ]}
                    source={{uri: item.img}}
                />
                <View
                    style={[
                        {
                            marginLeft: 5
                        }
                    ]}
                >
                    <Text
                        style={[
                            text_size.lg,
                            text_color.primary,
                            font.serif,
                        ]}
                    >
                        { item.name }
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
                            {item.s} (m3)
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
                            {item.price} (vnđ)
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}
