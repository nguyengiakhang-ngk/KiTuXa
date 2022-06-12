import React, { Component } from 'react';
import {
    Image,
    SafeAreaView,
    Text, View,
} from 'react-native';
import { Icon } from "@rneui/base";
import {
    background_color,
    flex, font_weight,
    text_color,
    text_size,
    width
} from "../../../utils/styles/MainStyle";
import AppItemHome from "../../../components/AppItemHome";
import { color_primary } from "../../../utils/theme/Color";
import { connect } from "react-redux";

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.route.params.params
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
                            flex.justify_content_between,
                            flex.flex_wrap
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
                                source={require("../../../../assets/images/avt_dummy.png")}
                                style={{
                                    width: 80,
                                    height: 80,
                                    marginRight: 10,
                                    borderBottomLeftRadius: 40,
                                    borderBottomRightRadius: 40,
                                    borderTopRightRadius: 40,
                                    borderTopLeftRadius: 40,
                                    overflow: 'hidden',
                                }}
                            />
                            <View>
                                <Text
                                    style=
                                    {[
                                        text_color.white,
                                        text_size.xl,
                                        font_weight.bold
                                    ]}
                                >
                                    {this.state.user.name}
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
                        { flex: 3 },
                        flex.flex_row,
                        flex.flex_wrap,
                        flex.justify_content_between,
                        width.w_100,
                        background_color.white,
                        { borderTopStartRadius: 40 },
                        { borderTopEndRadius: 40 },
                        {
                            paddingTop: 10,
                            paddingLeft: 5,
                            paddingRight: 5
                        }
                    ]}
                >

                    {/*Icon menu*/}
                    <View
                        style={[
                            {
                                width: '33.333333%',
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg={'red'}
                            name='vihara'
                            size={30}
                            color={'white'}
                            colorText={'black'}
                            label={'Khu trọ'}
                            onPress={() => this.routeScreen("AreaList")}
                        />
                    </View>
                    <View
                        style={[
                            {
                                width: '33.3%',
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg={'red'}
                            name='user-graduate'
                            size={30}
                            color={'white'}
                            colorText={'black'}
                            label={'Sinh viên'}
                        />
                    </View>
                    <View
                        style={[
                            {
                                width: '33.3%',
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg={'green'}
                            name='boxes'
                            size={30}
                            color={'white'}
                            colorText={'black'}
                            label={'Loại phòng'}
                            onPress={() => this.routeScreen("RoomTypeList")}
                        />
                    </View>
                    <View
                        style={[
                            {
                                width: '33.3%',
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg={color_primary}
                            name='house-user'
                            size={30}
                            color={'white'}
                            colorText={'black'}
                            label={'Phòng'}
                        />
                    </View>
                    <View
                        style={[
                            {
                                width: '33.3%',
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg={'orange'}
                            name='file-invoice-dollar'
                            size={30}
                            color={'white'}
                            colorText={'black'}
                            label={'Hóa đơn'}
                            onPress={() => this.routeScreen("BillsComponent")}

                        />
                    </View>
                    {/* <View
                        style={[
                            {
                                width: '33.3%',
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
                            label = {'Biên nhận'}
                            onPress = {() => this.routeScreen("ReceiptComponent") }
                        />
                    </View> */}
                    <View
                        style={[
                            {
                                width: '33.3%',
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
                            size = {30}
                            color = {'white'}
                            colorText = {'black'}
                            label = {'Điện/nước'}
                            onPress={() => this.routeScreen("ChooseNumber")}
                        />
                    </View>
                    <View
                        style={[
                            {
                                width: '33.3%',
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg={'gray'}
                            name='file-signature'
                            size={30}
                            color={'white'}
                            colorText={'black'}
                            label={'Hợp đồng'}
                            onPress={() => this.routeScreen("ContractScreen")}
                        />
                    </View>
                    <View
                        style={[
                            {
                                width: '33.3%',
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg={'crimson'}
                            name='servicestack'
                            size={30}
                            color={'white'}
                            colorText={'black'}
                            label={'Dịch vụ'}
                            onPress={() => this.routeScreen("TabService")}
                        />
                    </View>
                    <View
                        style={[
                            {
                                width: '33.3%',
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg={'orangered'}
                            name='bug'
                            size={30}
                            color={'white'}
                            colorText={'black'}
                            label={'Sự cố'}
                            onPress = {() => this.routeScreen("TroubleScreen") }
                        />
                    </View>
                    <View
                        style={[
                            {
                                width: '33.3%',
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg={'red'}
                            name='artstation'
                            size={30}
                            color={'white'}
                            colorText={'black'}
                            label={'Loại vật chất'}
                            onPress={() => this.routeScreen("materialtype")}
                        />
                    </View>
                    <View
                        style={[
                            {
                                width: '33.3%',
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg={color_primary}
                            name='laravel'
                            size={30}
                            color={'white'}
                            colorText={'black'}
                            label={'Vật chất'}
                            onPress={() => this.routeScreen("material")}
                        />
                    </View>
                    <View
                        style={[
                            {
                                width: '33.3%',
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg={'gray'}
                            name='audible'
                            size={30}
                            color={'white'}
                            colorText={'black'}
                            label={'Hóa đơn vật chất'}
                            onPress={() => this.routeScreen("billmaterial")}
                        />
                    </View>
                    <View
                        style={[
                            {
                                width: '33.3%',
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg={'purple'}
                            name='gg'
                            size={30}
                            color={'white'}
                            colorText={'black'}
                            label={'Nhập vật chất'}
                            onPress={() => this.routeScreen("inputmaterial")}
                        />
                    </View>
                    <View
                        style={[
                            {
                                width: '33.3%',
                                paddingRight: 0.5,
                                paddingLeft: 0.5,
                                paddingTop: 10,
                                paddingBottom: 5
                            }
                        ]}
                    >
                        <AppItemHome
                            bg={'red'}
                            name='bug'
                            size={30}
                            color={'white'}
                            colorText={'black'}
                            label={'Quét QR Code'}
                            onPress={() => this.routeScreen("qrcode")}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({ user }) => {
    // alert(JSON.stringify(user));
    return { user };
};

const mapDispatchToProps = {
    // doAddArea
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
