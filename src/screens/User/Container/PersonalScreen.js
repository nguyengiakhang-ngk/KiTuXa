import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    FlatList,

} from 'react-native';
import { color_primary } from "../../../utils/theme/Color";
import AsyncStorage from "@react-native-community/async-storage";
import {doLogin, initUser} from "../../../redux/actions/user";
import {connect} from "react-redux";
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
                onPress: 'information',
                icon: require("../../../../assets/icons/information.png"),
                navigate: ''
            },
            {
                id: 2,
                name: 'Chuyển sang giao diện Admin',
                onPress: 'HomeScreen',
                icon: require("../../../../assets/icons/admin.png"),
                params: this.props.user.user
            },
            {
                id: 3,
                name: 'Phòng đã đặt',
                onPress: 'RoomBookedList',
                icon: require("../../../../assets/icons/booking.png")
            },
            {
                id: 4,
                name: 'Đã lưu',
                onPress: 'SavedRoom',
                icon: require("../../../../assets/icons/saved.png"),
                navigate: 'SavedRoom'
            },
            {
                id: 5,
                name: this.state.userId ? 'Đăng xuất' : 'Đăng nhập',
                onPress: this.state.userId ? 'Welcome' : 'Login',
                icon: require("../../../../assets/icons/logout.png"),
                navigate: ''
            }
        ];

        this.setState({
            listFunction: tamp
        })
    }

    renderFunction = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.functionProfile} onPress={async () => {
                if (item.onPress === 'Welcome') {
                    try {
                        this.props.initUser(null);
                        await AsyncStorage.setItem('@user', '');
                        return this.props.navigation.replace('Welcome');
                    } catch (exception) {
                        console.log(exception);
                        return false;
                    }
                }else if(item.onPress === 'Login'){
                    this.props.navigation.replace('Login');
                }else{
                    this.props.navigation.navigate(item.onPress, {params: item.params});
                }

            }}>
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
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textTitle}>Cá nhân</Text>
                <View style={styles.informationContainer}>
                    <View style={styles.avtAndNameContainer}>
                        <Image
                            style={{
                                width: 100,
                                height: 100
                            }}
                            resizeMode={'stretch'}
                            source={require("../../../../assets/images/avt_dummy.png")}
                        />
                        <View style={styles.detailContainer}>
                            <Text style={styles.textName} numberOfLines={1}>{this.state.dataUser ? this.state.dataUser.name : 'Chưa đăng nhập'}</Text>
                            <View>
                                <Text style={styles.textDetail}>{this.state.dataUser ? this.state.dataUser.gender === '1' ? "Nam" : "Nữ" : ''}</Text>
                                <Text style={styles.textDetail}>{this.state.dataUser ? 'SĐT: '+this.state.dataUser.numberPhone : ''}</Text>
                                <Text style={styles.textDetail}>{this.state.dataUser ? 'Địa chỉ: '+this.state.dataUser.address : ''}</Text>
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
                    <Text style={[styles.textNameFunction, { alignSelf: 'center', marginBottom: 15 }]}>Thank you, ©2022</Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ user, state }) => {
    return {user,state};
};

const mapDispatchToProps = {
    doLogin, initUser
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
        color: 'black',
        textAlignVertical: 'center',
        lineHeight: 30,
        letterSpacing: 0,
        width: 200,
        overflow: 'hidden'
    },
    detailContainer: {
        width: 250,
        marginLeft: 16,
        justifyContent: 'space-around',
        height: 100,
    },
    textDetail: {
        fontSize: 14,
        color: 'black',
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
        fontSize: 16,
        color: color_primary,
        textAlignVertical: 'center',
        letterSpacing: 0,
        marginLeft: 16
    }
})
