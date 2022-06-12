import React, {Component} from 'react';
import {
    FlatList, Image,
    SafeAreaView, Text, View,
    Dimensions, TouchableOpacity
} from 'react-native';
import {
   flex, font, font_weight, text_color, text_size, width
} from "../../../utils/styles/MainStyle";
import {color_danger, color_dark, color_primary, color_secondary} from "../../../utils/theme/Color";
import {Icon} from "@rneui/base";
import {doGetUser, doUpdateUser} from "../../../redux/actions/user";
import {connect} from "react-redux";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";
import {url} from "../../../constant/define";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import ImagePicker from "react-native-image-crop-picker";
import ModalInputText from "../../../components/ModalInputText";
import ModalInputChangePass from "../../../components/ModalInputChangePass";
import AsyncStorage from "@react-native-community/async-storage";

class AccountInfScreen extends Component{
    constructor(props) {
        super(props);

        this.state = {
            genders: [
                {
                    label: 'Nam',
                    value: '0'
                },
                {
                    label: 'Nữ',
                    value: '1'
                },
            ],
            user: null,
            imageUser: null,
            refreshing: true,
            isChangePass: false,
            modal: {
                type: null,
                initValue: null,
                isVisible: false,
                label: '',
                typeKeyboard: null
            }
        }
    }

    onChangeValue = (value) => {
        switch (this.state.modal.type) {
            case 'name': {
                this.state.user.name = value;
                this.setState({
                    user: this.state.user
                });
                break;
            }
            case 'identity': {
                this.state.user.identityNumber = value;
                this.setState({
                    user: this.state.user
                });
                break;
            }
            case 'address': {
                this.state.user.address = value;
                this.setState({
                    user: this.state.user
                });
                break;
            }
            case 'yearOfBirth': {
                this.state.user.yearOfBirth = value;
                this.setState({
                    user: this.state.user
                });
                break;
            }
            default:
                break
        }

        this.setState({
            modal: {
                type: null,
                initValue: null,
                isVisible: false,
                label: null,
                typeKeyboard: null
            }
        })
    }

    componentDidMount() {
        this.setState({
            user: this.props.user.user
        })
    }

    chooseImage(){
        ImagePicker.openPicker({
            multiple: false,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            compressImageQuality: 0.8,
            mediaType: "any",
            includeBase64: true,
        }).then(res => {
            console.log('Res: ', res);
            this.setState({
                imageUser: {
                    filename: res.filename,
                    path: res.path,
                    data: res.data
                }
            });
        }).catch(error => console.log('Error: ', error.message));
    }

    changeValueRadioButton = (ob) => {
        this.state.user.gender = ob.value;
        this.setState({
            user: this.state.user
        })
    }

    _onChangePass = (pass) => {
        this.state.user.gender = pass;
        this.setState({
            user: this.state.user,
            isChangePass: false
        })
    }

    updateUser = () => {
        const date = new Date();
        const minutes = date.getMinutes();
        let data = new FormData();
        let user = {
            password: this.state.user?.password,
            name: this.state.user?.name,
            identityNumber: this.state.user?.identityNumber,
            gender: this.state.user?.gender,
            address: this.state.user?.address,
            yearOfBirth: this.state.user?.yearOfBirth,
            image: this.state.user?.image
        }
        if(this.state.imageUser) {
            data.append("image", {
                uri: this.state.imageUser.path,
                type: "image/jpeg",
                name: this.state.imageUser.filename || `temp_image_${minutes}.jpg`
            });
        }
        data.append("user", JSON.stringify(user));
        this.props.doUpdateUser(data, {id: this.state.user?.id}).then(async data => {
            if(data) {
                await AsyncStorage.setItem('@user', JSON.stringify(data));
                this.props.navigation.replace('Welcome');
            }
        })
    }

    getUser = () => {
        this.props.doGetUser({userId: this.state.user?.id}).then(async data => {
            await AsyncStorage.setItem('@user', JSON.stringify(data));
        })
    }

    render() {
        return (
            <SafeAreaView
                style={[
                    {
                        flex: 1,
                        padding: 10
                    }
                ]}
            >
                <View
                    style={[
                        width.w_100,
                        flex.align_items_center
                    ]}
                >
                    <View>
                        {
                            this.state.user?.image || this.state.imageUser ?
                                <Image
                                    resizeMode={"stretch"}
                                    style={[
                                        {
                                            width: 140,
                                            height: 140,
                                            borderRadius: 75,
                                            borderWidth: 1,
                                            borderColor: color_secondary
                                        }
                                    ]}
                                    source={
                                        {
                                            uri: this.state.imageUser ? this.state.imageUser.path : `${url}/${this.state.user.image}`
                                        }
                                    }
                                />
                                :
                                <Image
                                    resizeMode={"stretch"}
                                    style={[
                                        {
                                            width: 140,
                                            height: 140,
                                            borderRadius: 75,
                                            borderWidth: 1,
                                            borderColor: color_secondary
                                        }
                                    ]}
                                    source={
                                        require('../../../assets/images/default_avatar.png')
                                    }
                                />
                        }
                        <TouchableOpacity
                            style={{
                                position: "absolute",
                                width: 28,
                                height: 28,
                                bottom: 20,
                                right: 20,
                                borderRadius: 14,
                                backgroundColor: color_primary,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            onPress={() => this.chooseImage()}
                        >
                            <Icon
                                name= {"image"}
                                type='font-awesome-5'
                                size={15}
                                color={'white'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[
                            flex.flex_row,
                            flex.align_items_center
                        ]}
                    >
                        <Text
                            style={[
                                text_size.xl,
                                text_color.primary,
                                font_weight.bold,
                                font.serif,
                                {
                                    paddingLeft: 35
                                }
                            ]}
                        >
                            {this.state.user?.name}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    modal: {
                                        type: 'name',
                                        initValue: this.state.user?.name,
                                        isVisible: true,
                                        label: "Họ, tên:",
                                        typeKeyboard: "default"
                                    }
                                })
                            }}
                        >
                            <Icon
                                name= {"edit"}
                                type='font-awesome-5'
                                size={16}
                                color={'gray'}
                                style={{
                                    marginLeft: 10
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[
                            width.w_100,
                            {
                                marginTop: 20
                            }
                        ]}
                    >
                        <TouchableOpacity
                            style={[
                                width.w_100,
                                flex.flex_row,
                                flex.justify_content_between,
                                {
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'gray',
                                    paddingVertical: 10
                                }
                            ]}
                            disabled={true}
                        >
                            <View
                                style={[
                                    flex.flex_row,
                                    flex.align_items_center
                                ]}
                            >
                                <Icon
                                    name= {"phone-alt"}
                                    type='font-awesome-5'
                                    size={18}
                                    color={color_dark}
                                />
                                <Text
                                    style={[
                                        text_size.sm,
                                        font.serif,
                                        {
                                            marginLeft: 5,
                                            color: color_dark
                                        }
                                    ]}
                                >
                                    Số điện thoại
                                </Text>
                            </View>
                            <Text
                                style={[
                                    text_size.sm,
                                    font.serif,
                                    {
                                        marginLeft: 5,
                                        color: color_primary
                                    }
                                ]}
                            >
                                {this.state.user?.numberPhone}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                width.w_100,
                                flex.flex_row,
                                flex.justify_content_between,
                                {
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'gray',
                                    paddingVertical: 15
                                }
                            ]}
                            onPress={() => {
                                this.setState({
                                    modal: {
                                        type: 'identity',
                                        initValue: this.state.user?.identityNumber,
                                        isVisible: true,
                                        label: "CMNN/CCCD:",
                                        typeKeyboard: "numeric"
                                    }
                                })
                            }}
                        >
                            <View
                                style={[
                                    flex.flex_row,
                                    flex.align_items_center
                                ]}
                            >
                                <Icon
                                    name= {"id-card"}
                                    type='font-awesome-5'
                                    size={18}
                                    color={color_dark}
                                />
                                <Text
                                    style={[
                                        text_size.sm,
                                        font.serif,
                                        {
                                            marginLeft: 5,
                                            color: color_dark
                                        }
                                    ]}
                                >
                                    CMND/CCCD
                                </Text>
                            </View>
                            <Text
                                style={[
                                    text_size.sm,
                                    font.serif,
                                    {
                                        marginLeft: 5,
                                        color: color_primary
                                    }
                                ]}
                            >
                                {this.state.user?.identityNumber ? this.state.user?.identityNumber : "Chưa cập nhật"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                width.w_100,
                                flex.flex_row,
                                flex.justify_content_between,
                                {
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'gray',
                                    paddingVertical: 15
                                }
                            ]}
                            disabled={true}
                        >
                            <View
                                style={[
                                    flex.flex_row,
                                    flex.align_items_center
                                ]}
                            >
                                <Icon
                                    name= {"venus-mars"}
                                    type='font-awesome-5'
                                    size={18}
                                    color={color_dark}
                                />
                                <Text
                                    style={[
                                        text_size.sm,
                                        font.serif,
                                        {
                                            marginLeft: 5,
                                            color: color_dark
                                        }
                                    ]}
                                >
                                    Giới tính
                                </Text>
                            </View>
                            <View
                                style={[
                                    flex.flex_row
                                ]}
                            >
                                <RadioForm
                                    animation={true}
                                    formHorizontal={true}
                                >
                                    {
                                        this.state.genders.map((obj, i) => (
                                            <RadioButton labelHorizontal={true} key={i} style={{marginLeft: 5}}>
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    isSelected={parseInt(this.state.user?.gender) === i}
                                                    onPress={() => { this.changeValueRadioButton(obj) }}
                                                    borderWidth={1}
                                                    buttonInnerColor={color_primary}
                                                    buttonOuterColor={parseInt(this.state.user?.gender) ? color_primary : color_dark}
                                                    buttonSize={10}
                                                    buttonOuterSize={20}
                                                    buttonStyle={{}}
                                                    buttonWrapStyle={{marginLeft: 0}}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal={true}
                                                    onPress={() => { this.changeValueRadioButton(obj) }}
                                                    labelStyle={[
                                                        text_size.sm,
                                                        font.serif,
                                                    ]}
                                                    labelWrapStyle={{}}
                                                />
                                            </RadioButton>
                                        ))
                                    }
                                </RadioForm>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                width.w_100,
                                flex.flex_row,
                                flex.justify_content_between,
                                {
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'gray',
                                    paddingVertical: 15
                                }
                            ]}
                            onPress={() => {
                                this.setState({
                                    modal: {
                                        type: 'address',
                                        initValue: this.state.user?.address,
                                        isVisible: true,
                                        label: "Địa chỉ:",
                                        typeKeyboard: "default"
                                    }
                                })
                            }}
                        >
                            <View
                                style={[
                                    flex.flex_row,
                                    flex.align_items_center
                                ]}
                            >
                                <Icon
                                    name= {"map-marker-alt"}
                                    type='font-awesome-5'
                                    size={18}
                                    color={color_dark}
                                />
                                <Text
                                    style={[
                                        text_size.sm,
                                        font.serif,
                                        {
                                            marginLeft: 5,
                                            color: color_dark
                                        }
                                    ]}
                                >
                                    Địa chỉ
                                </Text>
                            </View>
                            <Text
                                style={[
                                    text_size.sm,
                                    font.serif,
                                    {
                                        marginLeft: 5,
                                        color: color_primary
                                    }
                                ]}
                            >
                                {this.state.user?.address ? this.state.user?.address : "Chưa cập nhật"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                width.w_100,
                                flex.flex_row,
                                flex.justify_content_between,
                                {
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'gray',
                                    paddingVertical: 15
                                }
                            ]}
                            onPress={() => {
                                this.setState({
                                    modal: {
                                        type: 'yearOfBirth',
                                        initValue: this.state.user?.yearOfBirth,
                                        isVisible: true,
                                        label: "Năm sinh:",
                                        typeKeyboard: "numeric"
                                    }
                                })
                            }}
                        >
                            <View
                                style={[
                                    flex.flex_row,
                                    flex.align_items_center
                                ]}
                            >
                                <Icon
                                    name= {"calendar-alt"}
                                    type='font-awesome-5'
                                    size={18}
                                    color={color_dark}
                                />
                                <Text
                                    style={[
                                        text_size.sm,
                                        font.serif,
                                        {
                                            marginLeft: 5,
                                            color: color_dark
                                        }
                                    ]}
                                >
                                    Năm sinh
                                </Text>
                            </View>
                            <Text
                                style={[
                                    text_size.sm,
                                    font.serif,
                                    {
                                        marginLeft: 5,
                                        color: color_primary
                                    }
                                ]}
                            >
                                {this.state.user?.yearOfBirth ? this.state.user?.yearOfBirth : "Chưa cập nhật"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                width.w_100,
                                flex.flex_row,
                                flex.justify_content_between,
                                {
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'gray',
                                    paddingVertical: 15
                                }
                            ]}
                            onPress={() => {
                                this.setState({
                                    isChangePass: true
                                })
                            }}
                        >
                            <View
                                style={[
                                    flex.flex_row,
                                    flex.align_items_center
                                ]}
                            >
                                <Icon
                                    name= {"lock"}
                                    type='font-awesome-5'
                                    size={18}
                                    color={color_dark}
                                />
                                <Text
                                    style={[
                                        text_size.sm,
                                        font.serif,
                                        {
                                            marginLeft: 5,
                                            color: color_dark
                                        }
                                    ]}
                                >
                                    Mật khẩu
                                </Text>
                            </View>
                            <Text
                                style={[
                                    text_size.sm,
                                    font.serif,
                                    {
                                        marginLeft: 5,
                                        color: color_primary
                                    }
                                ]}
                            >
                                **********
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={[
                        width.w_100,
                        flex.flex_row,
                        {paddingLeft: 15, paddingRight: 15, marginTop: 30}
                    ]}
                >
                    <View
                        style={[
                            {
                                flex: 1,
                                marginRight: 15
                            }
                        ]}
                    >
                        <AppButtonActionInf
                            size={13}
                            textSize={18}
                            bg={color_danger}
                            onPress = { () => { this.props.navigation.goBack() } }
                            title="Hủy"
                        />
                    </View>
                    <View
                        style={[
                            {
                                flex: 1
                            }
                        ]}
                    >
                        <AppButtonActionInf
                            size={13}
                            textSize={18}
                            bg={color_primary}
                            onPress={() => {
                                 this.updateUser()
                            }}
                            title="Lưu"
                        />
                    </View>
                </View>
                {
                    this.state.modal.isVisible ?
                        <ModalInputText
                            cancel={() => {
                                this.setState({
                                    modal: {
                                        type: null,
                                        initValue: null,
                                        isVisible: false,
                                        label: '',
                                        typeKeyboard: null
                                    }
                                })
                            }}
                            keyboardType={this.state.modal.typeKeyboard}
                            label={this.state.modal.label}
                            onChangeValue={(value) => {this.onChangeValue(value)}}
                            initValue={this.state.modal.initValue}
                            isVisible={this.state.modal.isVisible} />
                        : null
                }
                {
                    this.state.isChangePass ?
                        <ModalInputChangePass
                            cancel={() => {
                                this.setState({
                                    isChangePass: false
                                })
                            }}
                            onChangePass={(pass) => this._onChangePass(pass)}
                            passCurrent={this.state.user?.password}
                            isVisible={this.state.isChangePass} />
                        : null
                }
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({user}) => {
    return {user};
};

const mapDispatchToProps = {
    doUpdateUser,
    doGetUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfScreen)
