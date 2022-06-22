import React, { Component } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import axios from "axios";
import { url } from "../../../constant/define";
import {
    background_color,
    border,
    flex,
    font,
    font_weight,
    text_color,
    text_size,
    width
} from "../../../utils/styles/MainStyle";
import { color_primary } from '../../../utils/theme/Color';
import moment from "moment/moment";
import { connect } from 'react-redux';
import { doGetTroubleById } from '../../../redux/actions/trouble'

class TroubleDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: {}
        }
    }

    getTroubleData = async() => {
        await this.props.doGetTroubleById({ id: this.props.route.params.id }).then(data => {
            this.setState({ data: data })
        })
        this.setState({ isLoading: false })
    }
    componentDidMount() {
        this.getTroubleData();
        //this.getUserData()
    }


    render() {
        return (
            <View style={[flex, flex.align_items_center, background_color.white, { flex: 1 }]}>
                <Text
                    style={[
                        text_size.xs,
                        font.serif,
                        font_weight.bold,
                        text_color.white,
                        width.w_100,
                        background_color.blue,
                        {
                            textAlign: 'center',
                            paddingVertical: 20,
                            lineHeight: 20,
                            letterSpacing: 0,
                        }
                    ]}
                >
                    Chi tiết sự cố
                </Text>
                {
                    this.state.isLoading ?
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={color_primary} />
                        </View>
                        :
                        <ScrollView
                            style={[background_color.white, width.w_100, { flex: 1 }]}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={[flex, flex.align_items_center, background_color.white, { flex: 1, paddingBottom: 10 }]}>
                                <Text
                                    style={[
                                        text_size.xs,
                                        font_weight.bold,
                                        width.w_100,
                                        {
                                            textAlign: 'left',
                                            padding: 15,
                                            color: '#424242'
                                        }
                                    ]}
                                >
                                    TÊN SỰ CỐ: {this.state.data.name}
                                </Text>
                                <Text
                                    style={[
                                        text_size.xs,
                                        font_weight.bold,
                                        width.w_100,
                                        {
                                            textAlign: 'left',
                                            padding: 15,
                                            color: '#424242'
                                        }
                                    ]}
                                >
                                    CHI TIẾT SỰ CỐ
                                </Text>
                                <View style={[
                                    width.w_95, background_color.white,
                                    {
                                        borderRadius: 10,
                                        borderWidth: 2,
                                        borderColor: color_primary,
                                        elevation: 4
                                    }
                                ]}
                                >
                                    <View style={[
                                        text_size.sm, width.w_100,
                                        { paddingLeft: 20, paddingTop: 20, paddingRight: 20 }
                                    ]}>
                                        <View style={[flex.flex_row, { paddingBottom: 10, borderBottomWidth: 0.5 }]}>
                                            <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Thời Gian Bị:</Text>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{moment(this.state.data.dateOfTrouble).format("DD-MM-YYYY")}</Text>
                                        </View>
                                        <View style={[flex.flex_row, { paddingVertical: 10, borderBottomWidth: 0.5 }]}>
                                            <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Mức Độ:</Text>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data.level == 0 ? ("Thấp") : (this.state.data.level == 1 ? "Trung bình" : "Cao")}</Text>
                                        </View>
                                        <View style={[flex.flex_row, { paddingVertical: 10, borderBottomWidth: 0.5 }]}>
                                            <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Ghi Chú:</Text>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data.describe}</Text>
                                        </View>
                                        {
                                            this.state.data.status !== "0" ?
                                                <View style={[flex.flex_row, { paddingVertical: 10, borderBottomWidth: 0.5 }]}>
                                                    <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Ngày giải quyết:</Text>
                                                    <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{moment(this.state.data.dateOfSolve).format("DD-MM-YYYY")}</Text>
                                                </View>
                                                :
                                                <View />
                                        }
                                        <View style={[flex.flex_row, { paddingVertical: 10 }]}>
                                            <Text style={[text_size.xs, { fontStyle: 'italic', color: '#424242' }]}>Tình Trạng:</Text>
                                            <Text style={[text_size.xs, font_weight.bold, { flex: 1, textAlign: 'right' }]}>{this.state.data.status == "0" ? "Chưa giải quyết" : "Đã giải quyết"}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text
                                    style={[
                                        text_size.xs,
                                        font_weight.bold,
                                        width.w_100,
                                        {
                                            textAlign: 'left',
                                            padding: 15,
                                            color: '#424242'
                                        }
                                    ]}
                                >
                                    ẢNH SỰ CỐ
                                </Text>
                                <View style={[width.w_100, { paddingLeft: 20, paddingRight: 20 }]}>
                                    <Image
                                        source={{
                                            uri: `${url}/${this.state.data.image}`
                                        }}
                                        resizeMode={'stretch'}
                                        style={[
                                            width.w_100,
                                            {
                                                height: 400,
                                                borderRadius: 10,
                                                borderWidth: 2,
                                                borderColor: color_primary,
                                            }
                                        ]} />
                                </View>
                            </View>
                        </ScrollView>
                }
            </View>
        )
    }
}
const mapStateToProps = state => {
    return { state };
};

const mapDispatchToProps = {
    doGetTroubleById
};

export default connect(mapStateToProps, mapDispatchToProps)(TroubleDetails)