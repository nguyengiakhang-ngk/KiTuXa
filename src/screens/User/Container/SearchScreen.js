import React, {Component} from 'react';
import {
    Dimensions,
    FlatList, Image,
    SafeAreaView,
    Text, TouchableOpacity, View,
} from 'react-native';
import {background_color, flex, font, shadow, text_color, text_size, width} from "../../../utils/styles/MainStyle";
import {Icon, SearchBar, Button} from '@rneui/base';
import {color_danger, color_light, color_primary} from "../../../utils/theme/Color";

export default class SearchScreen extends Component{
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            isSearch: false,
            history: [
                'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
                'hhh',
                'h'
            ],
            data: [
                {
                    id: 1,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 2,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 3,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 4,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 5,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 1,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 2,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 3,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 4,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                },
                {
                    id: 5,
                    name: "Hội trường",
                    s: 15,
                    price: 15000,
                    img: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg"
                }
            ],
        }
    }

    updateSearch = (value) => {
        this.setState({
            search: value,
            isSearch: false
        })
    }

    _renderItemHis = ({item, index}) => {
        const windowWidth = Dimensions.get('window').width - 20;
        return(
            <TouchableOpacity
                style={[
                    {
                        width: windowWidth,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 5,
                        padding: 10,
                        borderRadius: 7
                    },
                    background_color.light
                ]}
            >
                <View
                    style={
                        {
                            flexDirection: "row",
                            alignItems: "center",
                        }
                    }
                >
                    <Icon
                        name='history'
                        type='font-awesome-5'
                        color={'gray'}
                        size={20}
                    />
                    <Text
                        style={[
                            text_size.sm,
                            text_color.black,
                            font.serif,
                            {
                                textAlign: "left",
                                marginLeft: 10,
                                width: '87%'
                            }
                        ]}
                        numberOfLines={1}
                    >
                        {item}
                    </Text>
                </View>
                <TouchableOpacity>
                    <Icon
                        name='times-circle'
                        type='font-awesome-5'
                        color={color_danger}
                        size={18}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
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
        );
    }

    render() {
        return (
            <SafeAreaView
                style={[
                    {
                        flex: 1,
                        paddingBottom: 60
                    },
                    flex.align_items_center
                ]}
            >
                <View
                    style={
                        {
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            width: '100%',
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }
                    }
                >
                    <SearchBar
                        containerStyle={
                            {
                                width: '85%',
                                backgroundColor: 'transparent',
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 0
                            }
                        }
                        inputContainerStyle={[
                            {
                                borderRadius: 10,
                                height: 50
                            },
                            background_color.light
                        ]}
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                    />
                    <Button
                        icon={
                            <Icon
                                name="search"
                                size={30}
                                color="white"
                            />
                        }
                        buttonStyle={
                            {
                                backgroundColor: color_primary,
                                height: 50,
                                width: 50,
                                borderRadius: 7,
                                marginLeft: 5
                            }
                        }
                        onPress={() => {
                            this.setState({
                                isSearch: !this.state.isSearch
                            })
                        }}
                    />
                </View>
                {
                    this.state.isSearch ?
                        <FlatList key={1} style={{borderTopWidth: 1, borderTopColor: '#eeee'}}
                                  showsVerticalScrollIndicator={false}
                                  numColumns={2}
                                  data={this.state.data}
                                  renderItem={this._renderItem}
                                  keyExtractor={item => item.id.toString()} />
                        :
                        <FlatList key={2} style={{borderTopWidth: 1, borderTopColor: '#eeee'}}
                                  showsVerticalScrollIndicator={false}
                                  numColumns={1}
                                  data={this.state.history}
                                  renderItem={this._renderItemHis}
                                  keyExtractor={item => item.toString()} />
                }
            </SafeAreaView>
        );
    }
}
