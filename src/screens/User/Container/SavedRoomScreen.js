import React, { Component } from 'react';
import {
    FlatList, Image,
    SafeAreaView, Text, View,
    Dimensions, StyleSheet
} from 'react-native';
import {
    background_color,
    flex, shadow, text_color, text_size
} from "../../../utils/styles/MainStyle";
import { color_danger, color_primary } from "../../../utils/theme/Color";
import { Icon } from "@rneui/base";

export default class SavedRoomScreen extends Component {

    data = [
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
        }
    ]
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            listData: this.data
        };
    }

    renderSavedRoom = ({ item, index }) => {
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
                        { uri: "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg" }
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
            <View style={styles.container}>
                <Text style={styles.textTitle}>Phòng đã lưu</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={this.state.listData}
                    renderItem={this.renderSavedRoom}
                    keyExtractor={item => item.id.toString()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textTitle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 20,
        letterSpacing: 0,
        width: '100%',
        // height: 30,
        padding: 20,
        backgroundColor: color_primary
    }
})