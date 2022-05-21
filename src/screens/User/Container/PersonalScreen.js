import React, { Component } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { color_primary } from "../../../utils/theme/Color";

export default class PersonalScreen extends Component {

    listFunction =
        [
            {
                id: 1,
                name: 'Thông tin cá nhân',
                onPress: 'information',
                icon: require("../../../../assets/icons/information.png"),
            },
            {
                id: 2,
                name: 'Phòng đã đặt',
                onPress: 'roombook',
                icon: require("../../../../assets/icons/booking.png")
            },
            {
                id: 3,
                name: 'Đã lưu',
                onPress: 'love',
                icon: require("../../../../assets/icons/saved.png")
            },
            {
                id: 4,
                name: 'Đăng xuất',
                onPress: 'logout',
                icon: require("../../../../assets/icons/logout.png")
            }
        ]

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }



    renderFunction = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.functionProfile} onPress={() => { alert('click: ' + item.name) }}>
                <Image style={{
                    width: 28,
                    height: 28,
                    marginLeft: 16
                }}
                    resizeMode={'stretch'}
                    source={item.icon}
                />
                <Text style={[styles.textNameFunction, item.id == 4 ? {color: 'red'} : '']}>{item.name}</Text>
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
                            <Text style={styles.textName} numberOfLines={1}>Michale Lee</Text>
                            <View>
                                <Text style={styles.textDetail}>Email: leekhacnguyen@gmail.com</Text>
                                <Text style={styles.textDetail}>Phone number: 0969775114</Text>
                                <Text style={styles.textDetail}>Address: Can Tho, VN</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.containerFunction}>
                    <FlatList
                        data={this.listFunction}
                        renderItem={this.renderFunction}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                    />
                    <Text style={[styles.textNameFunction, {alignSelf: 'center', marginBottom: 15}]}>Thank you, ©2022</Text>
                </View>
            </View>
        );
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
