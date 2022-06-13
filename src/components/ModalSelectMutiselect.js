import React from 'react';
import {Modal, View, Text, TextInput, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {color_danger, color_dark, color_primary, color_secondary, color_success} from "../utils/theme/Color";
import {
    background_color,
    border, flex,
    font,
    font_weight,
    margin,
    padding,
    text_color,
    text_size, width
} from "../utils/styles/MainStyle";
import {CheckBox, Icon} from "@rneui/base";
import AppButtonActionInf from "./AppButtonActionInf";

export default class ModalSelectMutiselect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        }
    }

    renderSelected = (item, index) => {
        if(item.checked){
            return(
                <View
                    style={{
                        marginTop: 10,
                        width: '30%',
                        marginRight: '3%'
                    }}
                >
                    {
                        item.checked ?
                            <View
                                key={item.id}
                                style={{
                                    flexDirection: "row",
                                    borderWidth: 2,
                                    borderColor: color_primary,
                                    borderRadius: 20,
                                    paddingHorizontal: 5,
                                    paddingVertical: 5,
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Text
                                    numberOfLines={1}
                                    style={[
                                        text_size.sm,
                                        font.serif,
                                        {
                                            color: color_dark,
                                            width: '80%',
                                        }
                                    ]}
                                >
                                    {item.name}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.onChangeSelect(index);
                                    }}
                                >
                                    <Icon
                                        name='times-circle'
                                        type='font-awesome-5'
                                        size={18}
                                        color={color_danger}
                                    />
                                </TouchableOpacity>
                            </View>
                            : null
                    }
                </View>
            )
        }
    }

    onChange = () => {

    }

    _renderItemSelect = ({item, index}) => {
        return(
            <TouchableOpacity
                key={index}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: color_secondary,
                    paddingVertical: 5
                }}
                onPress={() => {
                    this.props.onChangeSelect(index);
                }}
            >
                <CheckBox
                    containerStyle={[
                        background_color.transparent,
                        margin.ml_0,
                        border.w_0,
                        padding.p_0
                    ]}
                    textStyle={[
                        font.serif,
                        text_size.sm,
                        { marginStart: 2}
                    ]}
                    title={item.name}
                    checked={item.checked}
                    onPress={() => {
                        this.props.onChangeSelect(index);
                    }}
                    uncheckedColor={color_primary}
                    checkedColor={color_primary}
                />
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <ScrollView
                contentContainerStyle={{
                    width: '100%',
                    marginTop: 5
                }}
            >
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        width: '100%',
                        padding: 10,
                        borderRadius: 7,
                        borderWidth: 1,
                        borderColor: color_secondary,
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                    onPress={() => {
                        this.setState({
                            isVisible: true
                        })
                    }}
                >
                    <Text
                        style={[
                            text_size.sm,
                            font.serif,
                            {
                                color: color_secondary
                            }
                        ]}
                    >
                        Chọn dịch vụ
                    </Text>
                    <Icon
                        name='caret-down'
                        type='font-awesome-5'
                        size={18}
                        color={color_dark}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap"
                    }}
                >
                    {
                        this.props.data.map((item, index) => {
                            return(
                                this.renderSelected(item, index)
                            )
                        })
                    }
                </View>
                {
                    this.state.isVisible ?
                        <Modal animationType={'fade'} isVisible={true} transparent={true}>
                            <View
                                style={[
                                    {
                                        flex: 1,
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }
                                ]}
                            >
                                <View
                                    style={[
                                        {
                                            width: '90%',
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            padding: 15
                                        }
                                    ]}
                                >
                                    <FlatList showsVerticalScrollIndicator={false} data={this.props.data} renderItem={this._renderItemSelect} keyExtractor={(item, index) => item.id.toString()}/>
                                    <View
                                        style={[
                                            width.w_100,
                                            flex.align_items_center,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 20}
                                        ]}
                                    >
                                        <View
                                            style={[
                                                {
                                                    width: '40%'
                                                }
                                            ]}
                                        >
                                            <AppButtonActionInf
                                                size={10}
                                                textSize={16}
                                                bg={color_primary}
                                                onPress = { () => {
                                                    this.setState({
                                                        isVisible: false
                                                    })
                                                }}
                                                title="Xác nhận"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        : <View/>
                }
            </ScrollView>
        )
    }
}
