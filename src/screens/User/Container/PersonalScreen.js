import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    FlatList,

} from 'react-native';
import { color_dark, color_primary, color_secondary } from "../../../utils/theme/Color";
import AsyncStorage from "@react-native-community/async-storage";
import { doGetUser, doLogin, initUser } from "../../../redux/actions/user";
import { connect } from "react-redux";
import { url } from "../../../constant/define";
class PersonalScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            listFunction: [],
            dataUser: {},
            userId: null
        };
    }

    getDataUser = async () => {
        let user = await AsyncStorage.getItem('@user');
        this.setState({
            dataUser: JSON.parse(user)
        })
    }
    refresh = async () => {
        await this.getDataUser();
    }

    async componentDidMount() {
        await this.getDataUser();

        try {
            let user = await AsyncStorage.getItem('@user');
            this.setState({
                userId: JSON.parse(user).id
            });
        } catch (e) {
            console.log(e);
        }

        let tamp = [
            {
                id: 1,
                name: 'Thông tin cá nhân',
                onPress: this.state.userId ? 'AccountInf' : 'Login',
                icon: require("../../../../assets/icons/information.png"),
                navigate: ''
            },
            {
                id: 2,
                name: 'Chuyển sang giao diện Admin',
                onPress: this.state.userId ? 'HomeScreen' : 'Login',
                icon: require("../../../../assets/icons/admin.png"),
                params: { params: this.props.user.user }
            },
            {
                id: 3,
                name: 'Phòng đã đặt',
                onPress: this.state.userId ? 'RoomBookedList' : 'Login',
                icon: require("../../../../assets/icons/booking.png")
            },
            {
                id: 4,
                name: 'Đã lưu',
                onPress: this.state.userId ? 'SavedRoom' : 'Login',
                icon: require("../../../../assets/icons/saved.png"),
            },
            {
                id: 5,
                name: 'Báo cáo sự cố',
                onPress: this.state.userId ? 'AddTrouble' : 'Login',
                icon: require("../../../../assets/icons/report.png"),
                params: { id: 1, refresh: () => this.refresh() }
            },
            {
                id: 6,
                name: this.state.userId ? 'Đăng xuất' : 'Đăng nhập',
                onPress: this.state.userId ? 'Welcome' : 'Login',
                icon: require("../../../../assets/icons/logout.png"),
            },
        ];

        this.setState({
            listFunction: tamp
        })
    }

    renderFunction = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.functionProfile} onPress={async () => {
                if (item.id !== 6) {
                    if (this.state.dataUser) {
                        this.props.navigation.navigate(item.onPress, item.params);
                    } else {
                        alert("Vui lòng đăng nhập để sử dụng!");
                    }
                } else {
                    if (item.onPress === 'Welcome') {
                        try {
                            this.props.initUser(null);
                            await AsyncStorage.setItem('@user', '');
                            return this.props.navigation.replace('Welcome');
                        } catch (exception) {
                            console.log(exception);
                            return false;
                        }
                    }else{
                        this.props.navigation.navigate("Login");
                    }
                }

    }
}>
                <Image style={{
                    width: 28,
                    height: 28,
                    marginLeft: 16
                }}
                    resizeMode={'stretch'}
                    source={item.icon}
                />
                <Text style={[styles.textNameFunction,
                    // item.id === 5 ? {color: 'red'} : ''
                    ]}>{item.name}</Text>
            </TouchableOpacity >
        )
    }

render() {
    return (
        <View style={styles.container}>
            <View style={styles.informationContainer}>
                <View style={styles.avtAndNameContainer}>
                    {
                        this.state.dataUser?.image ?
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
                                        uri: `${url}/${this.state.dataUser?.image}`
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
                    <View style={styles.detailContainer}>
                        <View style={styles.detailContainer}>
                            <Text style={styles.textName} numberOfLines={1}>{this.state.dataUser ? this.state.dataUser.name : 'Chưa đăng nhập'}</Text>
                            {
                                this.state.dataUser ?
                                    <View>
                                        <Text style={styles.textDetail}>{this.state.dataUser ? this.state.dataUser.gender === '0' ? "Nam" : "Nữ" : ''}</Text>
                                        <Text style={styles.textDetail}>{this.state.dataUser ? 'SĐT: '+this.state.dataUser.numberPhone : ''}</Text>
                                        <Text style={styles.textDetail}>{this.state.dataUser ? 'Địa chỉ: '+this.state.dataUser.address : ''}</Text>
                                    </View>
                                    : null
                            }
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.containerFunction}>
                <FlatList
                    data={this.state.listFunction}
                    renderItem={this.renderFunction}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                />
            </View>
        </View>
    );
}
}

const mapStateToProps = ({ user, state }) => {
    return { user, state };
};

const mapDispatchToProps = {
    doLogin, initUser, doGetUser
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalScreen)

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
    },
    informationContainer: {
        width: '100%',
        height: 130,
        backgroundColor: '#FFFFFF',
        elevation: 4,
        marginTop: 1
    },
    separateLine: {
        width: '100%',
        height: 0.5,
        marginVertical: 1,
        backgroundColor: '#ccc',
        opacity: 0.87
    },
    avtAndNameContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginLeft: 16,
        marginTop: 16
    },
    textName: {
        fontSize: 25,
        color: color_primary,
        fontFamily: 'serif',
        fontWeight: "bold",
        textAlignVertical: 'center',
        lineHeight: 30,
        letterSpacing: 0,
        overflow: 'hidden'
    },
    detailContainer: {
        marginLeft: 10,
        justifyContent: "center",
        height: 100,
    },
    textDetail: {
        fontSize: 16,
        color: color_dark,
        fontFamily: 'serif',
        textAlignVertical: 'center',
        lineHeight: 16,
        letterSpacing: 0,
    },
    containerFunction: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginBottom: 70,
        marginTop: 16,
    },
    functionProfile: {
        width: '100%',
        height: 60,
        backgroundColor: '#FFFFFF',
        elevation: 4,
        marginBottom: 5,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textNameFunction: {
        fontSize: 18,
        fontFamily: "serif",
        color: color_primary,
        textAlignVertical: 'center',
        letterSpacing: 0,
        marginLeft: 16
    }
})
