/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    Image,
    SafeAreaView, ScrollView,
    Text, TouchableOpacity, View,
} from 'react-native';
import { Icon } from "@rneui/base";
import {
    background_color,
    flex, font_weight,
    text_color,
    text_size,
    width
} from "../../../utils/styles/MainStyle";
import AsyncStorage from '@react-native-community/async-storage';
import AppItemHome from "../../../components/AppItemHome";
import { color_primary, color_secondary } from "../../../utils/theme/Color";
import { connect } from "react-redux";
import { url } from '../../../constant/define';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }
    componentDidMount = async () => {
        try {
            let user = await AsyncStorage.getItem('@user');
            this.setState({
                user: JSON.parse(user)
            });
        } catch (e) {
            console.log(e);
        }
    }

    routeScreen = (title) => {
        this.props.navigation.navigate(title);
    }
    render() {
        return (
            <View
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
                            {
                                this.state.user?.image ?
                                    <Image
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 50,
                                            borderWidth: 1,
                                            borderColor: color_secondary
                                        }}
                                        resizeMode={'stretch'}
                                        source={
                                            {
                                                uri: `${url}/${this.state.user?.image}`
                                            }
                                        }
                                    />
                                    :
                                    <Image
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 50,
                                            borderWidth: 1,
                                            borderColor: color_secondary
                                        }}
                                        resizeMode={'stretch'}
                                        source={
                                            require('../../../assets/images/default_avatar.png')
                                        }
                                    />
                            }
                            <View>
                                <Text
                                    style=
                                    {[
                                        text_color.white,
                                        text_size.xl,
                                        font_weight.bold,
                                        { marginLeft: 10 }
                                    ]}
                                >
                                    {this.state?.user?.name}
                                </Text>
                                <Text
                                    style=
                                    {[
                                        text_color.white,
                                        text_size.xs,
                                        { marginLeft: 10 }
                                    ]}
                                >Ng?????i qu???n l??
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Notification')
                            }}
                        >
                            <Icon
                                name='bell'
                                type='font-awesome-5'
                                color='white'
                                size={30}
                            />
                        </TouchableOpacity>
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
                    <ScrollView
                        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                    >
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
                                label={'Khu'}
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
                                name='calendar-check'
                                size={30}
                                color={'white'}
                                colorText={'black'}
                                label={'Phi???u ?????t'}
                                onPress={() => this.props.navigation.navigate("ListBookTicket")}
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
                                label={'Lo???i ph??ng'}
                                onPress={() => this.routeScreen("RoomTypeList")}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
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
                                label={'Ph??ng'}
                                onPress={() => this.routeScreen("RoomList")}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
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
                                label={'H??a ????n'}
                                onPress={() => this.routeScreen("BillsComponent")}

                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
                                    paddingBottom: 5
                                }
                            ]}
                        >
                            <AppItemHome
                                bg={'purple'}
                                name='tint'
                                size={30}
                                color={'white'}
                                colorText={'black'}
                                label={'??i???n/n?????c'}
                                onPress={() => this.routeScreen("ChooseNumber")}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
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
                                label={'H???p ?????ng'}
                                onPress={() => this.routeScreen("ContractScreen")}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
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
                                label={'D???ch v???'}
                                onPress={() => this.routeScreen("TabService")}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
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
                                label={'S??? c???'}
                                onPress={() => this.routeScreen("TroubleScreen")}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
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
                                label={'Lo???i v???t ch???t'}
                                onPress={() => this.routeScreen("materialtype")}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
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
                                label={'V???t ch???t'}
                                onPress={() => this.routeScreen("material")}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
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
                                label={'H??a ????n v???t ch???t'}
                                onPress={() => this.routeScreen("billmaterial")}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
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
                                label={'Nh???p v???t ch???t'}
                                onPress={() => this.routeScreen("inputmaterial")}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
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
                                label={'Qu??t QR Code'}
                                onPress={() => this.routeScreen("qrcode")}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
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
                                label={'Th???ng k??'}
                                onPress={() => this.routeScreen("statisticalmaterial")}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
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
                                label={"Nh???p v???t ch???t v??o ph??ng"}
                                onPress={() => this.routeScreen("inputmaterialtoroom")}

                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
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
                                label={'S??? c??? v???t ch???t'}
                                onPress={() => this.routeScreen("troublemateial")}
                            />
                        </View>
                        <View
                            style={[
                                {
                                    width: '33.3%',
                                    paddingRight: 0.5,
                                    paddingLeft: 0.5,
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
                                label={'Xem v???t ch???t trong ph??ng'}
                                onPress={() => this.routeScreen("viewmaterialinroom")}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
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
