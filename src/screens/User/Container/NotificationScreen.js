import React, { Component } from 'react';
import {
    FlatList,
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Icon } from "@rneui/base";
import { background_color, flex, font, font_weight, text_color, text_size, width } from "../../../utils/styles/MainStyle";
import { color_primary, color_success, color_danger } from "../../../utils/theme/Color";

export default class NotificationScreen extends Component {

    dataTest = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            room: "318",
            prepayment: "0",
            status: "Reject",
            note: "Đặt phòng 318",
            date: "12:14 12/05/2022"
        },
        {
            id: 2,
            name: "Nguyễn Văn A",
            room: "317",
            prepayment: "0",
            status: "Waiting Approve",
            note: "Đặt phòng 317",
            date: "17:04 30/04/2022"
        },
        {
            id: 3,
            name: "Nguyễn Văn A",
            room: "316",
            prepayment: "0",
            status: "Approved",
            note: "Đặt phòng 316",
            date: "18:04 25/04/2022"
        },
    ]

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{backgroundColor: '#FFFFFF', marginHorizontal: 5}}>
                <TouchableOpacity
                    style={[flex.align_items_center, styles.ItemNoti]}
                    onPress={() => alert('move to: ' + index)}
                >

                    <View style={[flex.flex_row]}>
                        <View>
                            {console.log(item.name)}
                            <Text style={styles.textNotiName}
                                numberOfLines={2}>

                                Phiếu đặt phòng {item.room} của bạn vừa được
                                xác nhận với trạng thái
                                <Text
                                    style={
                                        item.status === "Waiting Approve" ?
                                            { color: '#6c757d' }
                                            :
                                            (item.status === "Approved" ?
                                                { color: '#28a745' }
                                                :
                                                { color: 'red' })
                                    }

                                > {item.status}</Text></Text>
                            <Text style={{ 
                                fontSize: 12, 
                                fontStyle: 'italic',
                                marginTop: 5,
                                marginHorizontal: 15
                             }}>"{item.date}"</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textTitle}>Thông báo</Text>
                <View style={{
                    flex: 1
                }}>
                    <FlatList
                        data={this.dataTest}
                        renderItem={this._renderItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            backgroundColor: "#ececec"
                        }}
                    />
                </View>
            </View>
        );
    }
}



const widthSc = Dimensions.get("screen").width
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textTitle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 20,
        letterSpacing: 0,
        width: widthSc,
        // height: 30,
        paddingVertical: 20,
        backgroundColor: color_primary
    },
    containerListNoti: {
        backgroundColor: '#ccc',
        paddingTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    ItemNoti: {
        width: '100%',
        paddingVertical: 15,
        elevation: 2,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    textNotiName: {
        fontSize: 14,
        color: 'black',
        lineHeight: 20,
        letterSpacing: 0,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        textAlign: 'left',
        marginHorizontal: 8
    }
})
