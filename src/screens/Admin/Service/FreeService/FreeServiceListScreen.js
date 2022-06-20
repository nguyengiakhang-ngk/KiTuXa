import React, {Component} from 'react';
import {
    FlatList, Keyboard, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View, Image, ActivityIndicator
} from 'react-native';
import AppFAB from "../../../../components/AppFAB";
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
} from "../../../../utils/styles/MainStyle";
import {color_danger, color_primary, color_success} from "../../../../utils/theme/Color";
import { url } from "../../../../constant/define";
import { width } from "../../../../utils/styles/MainStyle";
import {Icon} from "@rneui/base";
import AppInputInf from "../../../../components/AppInputInf";
import AppError from "../../../../components/AppError";
import {Formik} from "formik";
import {FreeServiceSchema} from "../../../../utils/validation/ValidateFreeService";
import AppButtonActionInf from "../../../../components/AppButtonActionInf";
import ImagePicker from "react-native-image-crop-picker";
import {connect} from "react-redux";
import {doGetListFreeService, doAddFreeService, doUpdateFreeService, doDeleteFreeService} from "../../../../redux/actions/freeService";
import DialogConfirm from "../../../../components/DialogConfirm";
import Toast from "react-native-toast-message";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

class FreeServiceListScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataFreeService: [],
            freeSerViceUpdate: null,
            iconAdd: "servicestack",
            isShowModalAdd: false,
            imageFreeService: null,
            isConfirm: false,
            freeService: null
        }
    }

    componentDidMount() {
        this.removeWillFocusListener = this.props.navigation.addListener(
            'focus', () => {
                this.getFreeServiceData();
            }
        );
    }

    getFreeServiceData(){
        this.props.doGetListFreeService({userId: this.props.user.user.id}).then(data =>{
            console.log(JSON.stringify(data));
            setTimeout(() => {
                this.setState({
                    isLoading: false
                })
            }, 2000)
        });
    }

    componentWillUnmount() {
        this.removeWillFocusListener();
    }

    deleteFreeService() {
        this.setState({
            isLoading: true,
            isConfirm: false
        })
        this.props.doDeleteFreeService({id: this.state.freeService.id, image: this.state.freeService.image}).then(data => {
            if(data) {
                this.getFreeServiceData();
                Toast.show({
                    type: 'success',
                    text1: 'Dịch vụ miễn phí',
                    text2: 'Xóa thành công.',
                    visibilityTime: 2000,
                    autoHide: true
                });
            }
        })
    }

    addFreeService = (values) => {
        this.setState({
            isLoading: true,
            isShowModalAdd: false
        })
        const date = new Date();
        const minutes = date.getMinutes();
        let data = new FormData();
        let freeService = {
            name: values.serviceName,
            userId: this.props.user.user.id
        }
        data.append("image", {
            uri: this.state.imageFreeService.path,
            type: "image/jpeg",
            name: this.state.imageFreeService.filename || `temp_image_${minutes}.jpg`
        });
        data.append("freeService", JSON.stringify(freeService));
        this.props.doAddFreeService(data).then(data => {
            if(data) {
                this.setState({
                    imageFreeService: null
                });
                this.getFreeServiceData();
                Toast.show({
                    type: 'success',
                    text1: 'Dịch vụ miễn phí',
                    text2: 'Thêm thành công.',
                    visibilityTime: 2000,
                    autoHide: true
                });
            }
        })
    }

    updateFreeService = (values) => {
        this.setState({
            isLoading: true,
            isShowModalAdd: false
        })
        const date = new Date();
        const minutes = date.getMinutes();
        let data = new FormData();
        let freeService = {
            name: values.serviceName,
            image: this.state.freeSerViceUpdate.image
        }
        if(this.state.imageFreeService) {
            data.append("image", {
                uri: this.state.imageFreeService.path,
                type: "image/jpeg",
                name: this.state.imageFreeService.filename || `temp_image_${minutes}.jpg`
            });
        }
        data.append("freeService", JSON.stringify(freeService));
        this.props.doUpdateFreeService(data, {id: this.state.freeSerViceUpdate.id}).then(data => {
            if(data) {
                this.setState({
                    isShowModalAdd: false,
                    imageFreeService: null,
                    freeSerViceUpdate: null
                });
                this.getFreeServiceData();
                Toast.show({
                    type: 'success',
                    text1: 'Dịch vụ miễn phí',
                    text2: 'Cập nhật thành công.',
                    visibilityTime: 2000,
                    autoHide: true
                });
            }
        });
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
                imageFreeService: {
                    filename: res.filename,
                    path: res.path,
                    data: res.data
                }
            });
        }).catch(error => console.log('Error: ', error.message));
    }

    render() {
        return (
            <SafeAreaView
                style={[
                    {flex: 1, padding: 2, paddingLeft: 5, paddingRight: 5, marginTop: 43},
                    height.h_100,
                    position.relative,
                    background_color.white,
                    flex.justify_content_center
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
                        onPress = { () => this.setState({ isShowModalAdd: true } ) }
                    />
                    <Modal transparent visible={this.state.isShowModalAdd}>
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
                                        borderRadius: 5
                                    }
                                ]}
                            >
                                <Formik
                                    initialValues={{serviceName: this.state.freeSerViceUpdate ? this.state.freeSerViceUpdate.name : ''}}
                                    validationSchema={FreeServiceSchema}
                                    onSubmit={values => {
                                        if(this.state.freeSerViceUpdate) {
                                            this.updateFreeService(values);
                                        }else {
                                            this.addFreeService(values);
                                        }
                                    }}
                                >
                                    {({
                                          handleChange,
                                          handleBlur,
                                          handleSubmit, values,
                                          errors,
                                          touched ,
                                          isValid
                                    }) => (
                                        <HideKeyboard>
                                            <SafeAreaView
                                                style={[
                                                    { margin: 15},
                                                    background_color.white,
                                                    flex.justify_content_between
                                                ]}
                                                onPress={Keyboard.dismiss}
                                            >
                                                <View
                                                    style={[
                                                        width.w_100
                                                    ]}
                                                >
                                                    <View
                                                        style={[
                                                            width.w_100
                                                        ]}
                                                    >
                                                        <AppInputInf
                                                            lable={"Tên dịch vụ:"}
                                                            secureTextEntry={false}
                                                            field={"serviceName"}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            values={values}
                                                        />
                                                        {errors.serviceName && touched.serviceName ? (
                                                            <AppError errors={ errors.serviceName }/>
                                                        ) : null}
                                                    </View>
                                                    <View
                                                        style={[
                                                            width.w_100,
                                                            flex.flex_row,
                                                            flex.align_items_center,
                                                            {
                                                                marginTop: 10
                                                            }
                                                        ]}
                                                    >
                                                        <TouchableOpacity
                                                            style={[
                                                                width.w_100,
                                                                flex.flex_row,
                                                                flex.align_items_center,
                                                            ]}
                                                            onPress={() => this.chooseImage()}
                                                        >
                                                            <Icon
                                                                name='plus-circle'
                                                                type='font-awesome-5'
                                                                size={20}
                                                                color={color_success}
                                                            />
                                                            <Text
                                                                style={[
                                                                    text_size.sm,
                                                                    font.serif,
                                                                    {
                                                                        marginLeft: 3
                                                                    }
                                                                ]}
                                                            >
                                                                Ảnh dịch vụ:
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    {
                                                        (this.state.imageFreeService || this.state.freeSerViceUpdate) ?
                                                            <View
                                                                style={[
                                                                    width.w_100
                                                                ]}
                                                            >
                                                                <Image
                                                                    style={[
                                                                        width.w_100,
                                                                        {height: 340}
                                                                    ]}
                                                                    source={
                                                                        {
                                                                            uri: this.state.imageFreeService ? this.state.imageFreeService.path : `${url}/${this.state.freeSerViceUpdate.image}`
                                                                        }
                                                                    }
                                                                />
                                                            </View>
                                                            : null
                                                    }
                                                </View>
                                                <View
                                                    style={[
                                                        width.w_100,
                                                        flex.flex_row,
                                                        {paddingLeft: 15, paddingRight: 15, marginTop: 20}
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
                                                            size={10}
                                                            textSize={18}
                                                            bg={color_danger}
                                                            onPress = { () => {
                                                                this.setState({
                                                                    isShowModalAdd: false,
                                                                    imageFreeService: null,
                                                                    freeSerViceUpdate: null
                                                                })
                                                            } }
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
                                                            size={10}
                                                            textSize={18}
                                                            bg={color_primary}
                                                            disabled = { !values.serviceName }
                                                            onPress = { handleSubmit }
                                                            title={this.state.freeSerViceUpdate ? 'Lưu' : 'Thêm'}
                                                        />
                                                    </View>
                                                </View>
                                            </SafeAreaView>
                                        </HideKeyboard>
                                    )}
                                </Formik>
                            </View>
                        </View>
                    </Modal>
                </View>
                <Toast ref={(ref) => {Toast.setRef(ref)}} />
                {
                    this.state.isLoading ?
                        <ActivityIndicator size="large" color={color_primary}/>
                        :
                        <FlatList showsVerticalScrollIndicator={false} data={this.props.freeService.freeServiceList} renderItem={this._renderItemFreeService} keyExtractor={(item, index) => index.toString()}/>
                }
                {
                    this.state.isConfirm ?
                        <DialogConfirm
                            content={"Bạn có chắc chắn muốn xóa?"}
                            cancel={() => {
                                this.setState({
                                    isConfirm: false
                                })
                            }}
                            confirm={() => {
                                this.deleteFreeService();
                            }}
                        />
                        : null
                }
            </SafeAreaView>
        );
    }

    _renderItemFreeService = ({item, index}) => {
        return(
            <View
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
                                borderRadius: 5,
                                width: 50,
                                marginRight: 10
                            },
                            flex.justify_content_center
                        ]}
                    >
                        <Icon
                            name= {'servicestack'}
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
                            {item.name}
                        </Text>
                        <View
                            style={[
                                flex.flex_row,
                                flex.align_items_center,
                                {marginTop: 2}
                            ]}
                        >
                            <Icon
                                name= {"circle"}
                                type='font-awesome-5'
                                size={10}
                                color={color_success}
                            />
                            <Text
                                style={[
                                    text_size.xs,
                                    font.serif,
                                    {marginLeft: 4}
                                ]}
                            >
                                Miễn phí
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
                        onPress={() => {
                            this.setState({
                                freeService: item,
                                isConfirm: true
                            })
                        }}
                    >
                        <Icon
                            name= {"trash-alt"}
                            type='font-awesome-5'
                            size={22}
                            color={color_danger}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                isShowModalAdd: true,
                                freeSerViceUpdate: item
                            });
                        }}
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
}

const mapStateToProps = ({user, freeService}) => {
    return {user, freeService};
};

const mapDispatchToProps = {
    doAddFreeService,
    doGetListFreeService,
    doUpdateFreeService,
    doDeleteFreeService
};

export default connect(mapStateToProps, mapDispatchToProps)(FreeServiceListScreen)
