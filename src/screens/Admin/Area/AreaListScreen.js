import React, {Component} from 'react';
import {
    FlatList,
    Text, TouchableOpacity, View
} from 'react-native';
import AppFAB from "../../../components/AppFAB";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    flex,
    font,
    font_weight,
    height,
    position,
    text_color,
    text_size
} from "../../../utils/styles/MainStyle";
import {color_danger, color_primary, color_success} from "../../../utils/theme/Color";
import { width } from "../../../utils/styles/MainStyle";
import {Icon} from "@rneui/base";
import { connect } from "react-redux";
import {doGetListArea, doDeleteArea} from "../../../redux/actions/area";

class AreaListScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            listAre: this.props.area.areaList,
        }
    }

    viewAddArea(){
        this.props.navigation.navigate("AddArea");
    }

    deleteArea(id) {
        this.props.doDeleteArea({id: id}).then(data => {
            this.getAreaData();
        })
    }

    componentDidMount() {
        this.removeWillFocusListener = this.props.navigation.addListener(
            'focus', () => {
                this.getAreaData();
            }
        );

        this.removeWillBlurListener = this.props.navigation.addListener(
            'blur', () => {
                this.setState({
                    listAre: []
                })
            }
        );
    }

    componentWillUnmount() {
        this.removeWillFocusListener();
        this.removeWillBlurListener();
    }

    getAreaData(){
        this.props.doGetListArea({userId: this.props.user.user.id}).then(data => {
            this.setState({
                listAre: data
            })
        })
    }

    updateArea(area) {
        this.props.navigation.navigate("UpdateArea", {area: area});
    }

    _renderItem = ({item, index}) => {
        return(
            <View
                key={index}
                style={[
                    width.w_100,
                    {
                        marginTop: 10,
                        padding: 5,
                        borderRadius: 5
                    },
                    background_color.light,
                    flex.flex_row,
                    flex.justify_content_between,
                    flex.align_items_center
                ]}
            >
                <View
                    style={[
                        flex.flex_row
                    ]}
                >
                    <View
                        style={[
                            {
                                backgroundColor: color_primary,
                                padding: 15,
                                borderRadius: 5,
                                marginRight: 10
                            }
                        ]}
                    >
                        <Icon
                            name= {"vihara"}
                            type='font-awesome-5'
                            size={18}
                            color={'white'}
                        />
                    </View>
                    <View>
                        <Text
                            style={[
                                text_size.sm,
                                font.serif,
                                font_weight.bold,
                                text_color.primary
                            ]}
                        >
                            {item.areaName}
                        </Text>
                        <View
                            style={[
                                flex.flex_row,
                                {marginTop: 2}
                            ]}
                        >
                            <Icon
                                name= {"map-marker-alt"}
                                type='font-awesome-5'
                                size={16}
                                color={color_primary}
                            />
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    {marginLeft: 4}
                                ]}
                            >
                                {item.address}
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={[
                        flex.flex_row
                    ]}
                >
                    <TouchableOpacity
                        style={[
                            {marginRight: 10}
                        ]}
                        onPress={() => this.deleteArea(item.id)}
                    >
                        <Icon
                            name= {"trash-alt"}
                            type='font-awesome-5'
                            size={22}
                            color={color_danger}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.updateArea(item)}
                    >
                        <Icon
                            name= {"pencil-alt"}
                            type='font-awesome-5'
                            size={22}
                            color={color_success}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    render() {
        return (
            <SafeAreaView
                style={[
                    {flex: 1, padding: 2, paddingLeft: 10, paddingRight: 10},
                    height.h_100,
                    position.relative,
                    background_color.white
                ]}
            >
                <View
                    style={[
                        position.absolute,
                        {
                            bottom: 25,
                            right: 25,
                            zIndex: 9999
                        }
                    ]}
                >
                    <AppFAB
                        bg = {color_primary}
                        name = 'plus'
                        size = {20}
                        color = {'white'}
                        onPress = { () => this.viewAddArea() }
                    />
                </View>
                <FlatList showsVerticalScrollIndicator={false} data={this.state.listAre} renderItem={this._renderItem} keyExtractor={(item, index) => index.toString()}/>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({area, user}) => {
    return {area, user};
};

const mapDispatchToProps = {
    doGetListArea,
    doDeleteArea
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaListScreen)
