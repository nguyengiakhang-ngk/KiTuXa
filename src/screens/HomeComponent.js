import React, {Component} from 'react';
import {
    Image,
    SafeAreaView,
    Text, View,
} from 'react-native';
import {Icon} from "react-native-elements";
import {
    background_color,
    flex, font_weight,
    text_color,
    text_size,
    width
} from "../utils/styles/MainStyle";
import AppItemHome from "../components/AppItemHome";
import {color_primary} from "../utils/theme/Color";

export default class HomeComponent extends Component{
    routeScreen = (title) => {
        this.props.navigation.navigate(title);
    }
    render() {
        return (
            <SafeAreaView
                style={[
                    {
                        flex: 1,
                        backgroundColor: color_primary
                    },
                    flex.justify_content_center,
                    flex.align_items_center
                ]}
            >
                <View
                    style={[
                        width.w_100,
                        background_color.transparent,
                        flex.justify_content_center,
                        {
                            flex: 1,
                            paddingLeft: 10,
                            paddingRight: 10
                        }
                    ]}
                >
                    <View
                        style=
                            {[
                                flex.flex_row,
                                flex.align_items_center,
                                flex.justify_content_between
                            ]}
                    >
                        <View
                            style=
                                {[
                                    flex.flex_row,
                                    flex.align_items_center
                                ]}
                        >
                            <Image
                                source=
                                       {{
                                           uri:'https://znews-photo.zadn.vn/w660/Uploaded/mdf_vsxrlu/2021_01_22/meo_3_2.jpg'}}
                                style={{
                                    width: 76,
                                    height: 76,
                                    marginRight: 10,
                                    borderBottomLeftRadius: 38,
                                    borderBottomRightRadius: 38,
                                    borderTopRightRadius: 38,
                                    borderTopLeftRadius: 38,
                                    overflow: 'hidden',
                                }}
                            />
                            <View>
                                <Text
                                    style=
                                        {[
                                            text_color.white,
                                            text_size.sm,
                                            font_weight.bold
                                        ]}
                                >Nguyễn Khắc Nguyên
                                </Text>
                                <Text
                                    style=
                                        {[
                                            text_color.white,
                                            text_size.xs
                                        ]}
                                >Người quản lý
                                </Text>
                            </View>
                        </View>
                        <Icon
                            name='bell'
                            type='font-awesome-5'
                            color='white'
                            size={30}
                        />
                    </View>

                </View>
                <View
                    style={[
                        {flex: 3},
                        flex.flex_row,
                        flex.flex_wrap,
                        width.w_100,
                        background_color.white,
                        {borderTopStartRadius: 40},
                        {borderTopEndRadius: 40},
                        {paddingTop: 20,
                        paddingLeft: 5,
                        paddingRight: 5}
                    ]}
                >

                    {/*Icon menu*/}
                    <View
                        style={[
                            width.w_25,
                            {
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg = {'red'}
                            name = 'vihara'
                            size = {25}
                            color = {'white'}
                            colorText = {'black'}
                            label = {'Khu trọ'}
                            onPress = {() => this.routeScreen("AreaList") }
                        />
                    </View>
                    <View
                        style={[
                            width.w_25,
                            {
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg = {'red'}
                            name = 'user-graduate'
                            size = {25}
                            color = {'white'}
                            colorText = {'black'}
                            label = {'Sinh viên'}
                        />
                    </View>
                    <View
                        style={[
                            width.w_25,
                            {
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg = {'green'}
                            name = 'buromobelexperte'
                            size = {25}
                            color = {'white'}
                            colorText = {'black'}
                            label = {'Loại phòng'}
                        />
                    </View>
                    <View
                        style={[
                            width.w_25,
                            {
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg = {'blue'}
                            name = 'house-user'
                            size = {25}
                            color = {'white'}
                            colorText = {'black'}
                            label = {'Phòng'}
                        />
                    </View>
                    <View
                        style={[
                            width.w_25,
                            {
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg = {'orange'}
                            name = 'file-invoice-dollar'
                            size = {25}
                            color = {'white'}
                            colorText = {'black'}
                            label = {'Hóa đơn'}
                        />
                    </View>
                    <View
                        style={[
                            width.w_25,
                            {
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg = {'purple'}
                            name = 'tint'
                            size = {25}
                            color = {'white'}
                            colorText = {'black'}
                            label = {'Điện/nước'}
                        />
                    </View>
                    <View
                        style={[
                            width.w_25,
                            {
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg = {'gray'}
                            name = 'file-signature'
                            size = {25}
                            color = {'white'}
                            colorText = {'black'}
                            label = {'Hợp đồng'}
                        />
                    </View>
                    <View
                        style={[
                            width.w_25,
                            {
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg = {'crimson'}
                            name = 'servicestack'
                            size = {25}
                            color = {'white'}
                            colorText = {'black'}
                            label = {'Dịch vụ'}
                        />
                    </View>
                    <View
                        style={[
                            width.w_25,
                            {
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg = {'orangered'}
                            name = 'bug'
                            size = {25}
                            color = {'white'}
                            colorText = {'black'}
                            label = {'Sự cố'}
                        />
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}
