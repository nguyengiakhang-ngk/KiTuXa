import React, {Component} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList, Image,
    SafeAreaView,
    Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import {
    background_color,
    flex,
    font,
    font_weight,
    shadow,
    text_color,
    text_size,
    width
} from "../../../utils/styles/MainStyle";
import {Icon, SearchBar, Button} from '@rneui/base';
import {color_danger, color_light, color_primary, color_secondary} from "../../../utils/theme/Color";
import {initUser} from "../../../redux/actions/user";
import {connect} from "react-redux";
import {doGetListTypeOfRoomSearch, doGetListTypeOfRoomSearchAddress} from "../../../redux/actions/typeOfRoom";
import {cardExpiry} from "../../../utils/proccess/proccessApp";
import {url} from "../../../constant/define";
import AppDialogSelect from "../../../components/AppDialogSelect";
import ModalSelector from "react-native-modal-selector";
import AsyncStorage from "@react-native-community/async-storage";

class SearchScreen extends Component{
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            isSearch: false,
            history: [],
            historyAddress: [],
            data: [],
            typeSearchList: [
                {
                    key: 1,
                    label: 'TK theo loại phòng'
                },
                {
                    key: 2,
                    label: 'TK theo địa chỉ'
                }
            ],
            initValue: 'TK theo loại phòng',
            typeSearch: 1
        }
    }

    async componentDidMount() {
        const historyTamp = await AsyncStorage.getItem('@history');
        const historyAddressTamp = await AsyncStorage.getItem('@historyAddress');
        this.setState({
            history: JSON.parse(historyTamp) ? JSON.parse(historyTamp) : [],
            historyAddress:  JSON.parse(historyAddressTamp) ? JSON.parse(historyAddressTamp) : []
        })
    }

    updateSearch = (value) => {
        this.setState({
            search: value,
            isSearch: false
        })
    }

    doSearch = () => {
        if(this.state.typeSearch === 1){
            if(this.state.history.length === 22){
                this.state.history.splice(21, 1)
            }
            this.state.history.unshift(this.state.search);

            this.props.doGetListTypeOfRoomSearch({key: this.state.search}).then(data => {
                this.setState({
                    data: data,
                    isSearch: true,
                    history: this.state.history
                }, async () => {
                    await AsyncStorage.setItem('@history', JSON.stringify(this.state.history));
                })
            })
        }else {
            if(this.state.historyAddress.length === 22){
                this.state.historyAddress.splice(21, 1)
            }
            this.state.historyAddress.unshift(this.state.search);

            this.props.doGetListTypeOfRoomSearchAddress({key: this.state.search}).then(data => {
                this.setState({
                    data: data,
                    isSearch: true,
                    historyAddress: this.state.historyAddress
                }, async () => {
                    await AsyncStorage.setItem('@historyAddress', JSON.stringify(this.state.historyAddress));
                })
            })
        }
    }

    deleteHistory = (index) => {
        if(this.state.typeSearch === 1){
            this.state.history.splice(index, 1);
            this.setState({
                history: this.state.history
            }, async () => {
                await AsyncStorage.setItem('@history', JSON.stringify(this.state.history));
            })
        }else{
            this.state.historyAddress.splice(index, 1);
            this.setState({
                historyAddress: this.state.historyAddress
            }, async () => {
                await AsyncStorage.setItem('@historyAddress', JSON.stringify(this.state.historyAddress));
            })
        }
    }

    _renderItemHis = ({item, index}) => {
        const windowWidth = Dimensions.get('window').width - 20;
        return(
            <TouchableOpacity
                key={index}
                style={[
                    {
                        width: windowWidth,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 5,
                        padding: 10,
                        borderRadius: 7
                    },
                    background_color.light
                ]}
                onPress={() => {
                    this.setState({
                        search: item
                    })
                }}
            >
                <View
                    style={
                        {
                            flexDirection: "row",
                            alignItems: "center",
                        }
                    }
                >
                    <Icon
                        name='history'
                        type='font-awesome-5'
                        color={'gray'}
                        size={20}
                    />
                    <Text
                        style={[
                            text_size.sm,
                            text_color.black,
                            font.serif,
                            {
                                textAlign: "left",
                                marginLeft: 10,
                                width: '87%'
                            }
                        ]}
                        numberOfLines={1}
                    >
                        {item}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => this.deleteHistory(index)}
                >
                    <Icon
                        name='times-circle'
                        type='font-awesome-5'
                        color={color_danger}
                        size={18}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    _renderItem = ({item, index}) => {
        const windowWidth = Dimensions.get('window').width / 2 - 15;
        return (
            <View
                style={[
                    shadow.shadow,
                    background_color.white,
                    {
                        width: windowWidth,
                        borderTopLeftRadius: 30,
                        borderBottomRightRadius: 30,
                        overflow: 'hidden',
                        margin: 5
                    }
                ]}
            >
                <Image
                    style={[
                        {
                            width: '100%',
                            height: 150,
                        }
                    ]}
                    source={
                        { uri: item.imageofrooms?.length ? `${url}/${item?.imageofrooms[0].image}` : "https://thegioimancua.vn/wp-content/uploads/2017/03/rem-san-khau-hoi-truong-sk01.jpg" }
                    }
                    resizeMode={'stretch'}
                />
                <Text
                    numberOfLines={1}
                    style={[
                        text_size.md,
                        text_color.primary,
                        {
                            marginLeft: 10,
                            fontWeight: '600'
                        }
                    ]}
                >
                    {item.name}
                </Text>
                <View
                    style={[
                        flex.flex_row,
                        flex.align_items_center,
                        {
                            marginLeft: 4,
                            marginTop: -3
                        }
                    ]}
                >
                    <Icon
                        raised
                        name='chart-area'
                        type='font-awesome-5'
                        color={color_primary}
                        size={10}
                    />
                    <Text
                        numberOfLines={1}
                        style={[
                            text_size.xs,
                            text_color.black
                        ]}
                    >
                        {item.stretch} (m3)
                    </Text>
                </View>
                <View
                    style={[
                        flex.flex_row,
                        flex.align_items_center,
                        {
                            marginLeft: 4,
                            marginBottom: 5,
                            marginTop: -6
                        }
                    ]}
                >
                    <Icon
                        raised
                        name='money-bill'
                        type='font-awesome-5'
                        color={color_primary}
                        size={10}
                    />
                    <Text
                        numberOfLines={1}
                        style={[
                            text_size.xs,
                            text_color.black
                        ]}
                    >
                        {cardExpiry(item.priceofrooms?.length ? item.priceofrooms[item.priceofrooms.length-1]?.price : 0)} (vnđ)
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView
                style={[
                    {
                        flex: 1,
                        paddingBottom: 60
                    }
                ]}
            >
                <View
                    style={
                        {
                            width: '60%',
                            paddingHorizontal: 10
                        }
                    }
                >
                    <ModalSelector
                        touchableStyle={[
                            width.w_100,
                            background_color.white,
                            shadow.shadow,
                            { borderRadius: 7, paddingLeft: 6, paddingRight: 10, marginTop: 5 },
                        ]}
                        selectStyle={[
                            { borderWidth: 0, textAlignVertical: 'right' }
                        ]}
                        selectedItemTextStyle={[
                            text_color.primary,
                            font_weight.bold
                        ]}
                        optionTextStyle={[
                            text_size.sm,
                            font.serif,
                            text_color.black
                        ]}
                        cancelTextStyle={[
                            text_size.sm,
                            font.serif,
                            text_color.danger,
                            font_weight.bold
                        ]}
                        cancelText={"Hủy"}
                        childrenContainerStyle={[
                            flex.flex_row,
                            flex.align_items_center,
                            flex.justify_content_between
                        ]}
                        touchableActiveOpacity={.8}
                        data={this.state.typeSearchList}
                        placeholder={"Tìm kiếm"}
                        onChange={(option) => {
                            this.setState({
                                typeSearch: option.key,
                                initValue: option.label,
                                search: '',
                                isSearch: false
                            })
                        }}>

                        <TextInput
                            style={[text_size.sm, font.serif, font_weight.f_500, { color: 'black', width: '95%' }]}
                            placeholder={"Tìm kiếm"}
                            value={this.state.initValue}
                        />
                        <Icon
                            name='caret-down'
                            type='font-awesome-5'
                            color={color_secondary}
                            size={22} />
                    </ModalSelector>
                </View>
                <View
                    style={
                        {
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            width: '100%',
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }
                    }
                >
                    <SearchBar
                        containerStyle={
                            {
                                width: '85%',
                                backgroundColor: 'transparent',
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 0
                            }
                        }
                        inputContainerStyle={[
                            {
                                borderRadius: 10,
                                height: 50
                            },
                            background_color.light
                        ]}
                        placeholder="Tìm kiếm..."
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                    />
                    <Button
                        icon={
                            <Icon
                                name="search"
                                size={30}
                                color="white"
                            />
                        }
                        buttonStyle={
                            {
                                backgroundColor: color_primary,
                                height: 50,
                                width: 50,
                                borderRadius: 7,
                                marginLeft: 5
                            }
                        }
                        onPress={() => {
                            this.doSearch();
                        }}
                    />
                </View>
                {
                    this.state.isSearch ?
                        <View>
                            {
                                this.state.data.length ?
                                    <FlatList key={1} style={{borderTopWidth: 1, borderTopColor: '#eeee'}}
                                              showsVerticalScrollIndicator={false}
                                              numColumns={2}
                                              data={this.state.data}
                                              renderItem={this._renderItem}
                                              keyExtractor={item => item.id.toString()} />
                                    :
                                    <View
                                        style={{height: '50%', justifyContent: "center", alignItems:  "center"}}
                                    >
                                        <Text
                                            style={[
                                                text_size.xl,
                                                text_color.danger,
                                                font.serif
                                            ]}
                                        >
                                            Không có kết quả...
                                        </Text>
                                    </View>
                            }
                        </View>
                        :
                        <View
                            style={[
                                flex.align_items_center
                            ]}
                        >
                            <FlatList key={2} style={{borderTopWidth: 1, borderTopColor: '#eeee'}}
                                      showsVerticalScrollIndicator={false}
                                      numColumns={1}
                                      data={(this.state.typeSearch === 1) ? this.state.history : this.state.historyAddress}
                                      renderItem={this._renderItemHis}
                                      keyExtractor={item => item.toString()} />
                        </View>
                }
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({user}) => {
    return {user};
};

const mapDispatchToProps = {
    doGetListTypeOfRoomSearch,
    doGetListTypeOfRoomSearchAddress
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
