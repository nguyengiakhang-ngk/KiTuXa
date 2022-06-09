import React, {Component} from 'react';
import {
    FlatList, Image, Keyboard, Modal, ScrollView,
    Text, TouchableOpacity, TouchableWithoutFeedback, View
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
import {path, url} from "../../../../constant/define";
import { width } from "../../../../utils/styles/MainStyle";
import {Icon} from "@rneui/base";
import AppInputInf from "../../../../components/AppInputInf";
import AppError from "../../../../components/AppError";
import {Formik} from "formik";
import {PaidServiceSchema} from "../../../../utils/validation/ValidatePaidService";
import AppButtonActionInf from "../../../../components/AppButtonActionInf";
import ImagePicker from "react-native-image-crop-picker";
import {
    doAddPaidService,
    doDeletePaidService,
    doGetListPaidService,
    doUpdatePaidService
} from "../../../../redux/actions/paidService";
import {connect} from "react-redux";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

class PaidServiceListScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataPaidService: [],
            paidServiceUpdate: null,
            iconAdd: "servicestack",
            isShowModalAdd: false,
            imagePaidService: null
        }
    }

    componentDidMount() {
        this.removeWillFocusListener = this.props.navigation.addListener(
            'focus', () => {
                this.getPaidServiceData();
            }
        );
    }

    componentWillUnmount() {
        this.removeWillFocusListener();
    }

    isFormValid = (isValid, touched) => {
        return isValid && Object.keys(touched).length !== 0;
    }

    getPaidServiceData(){
        this.props.doGetListPaidService({userId: this.props.user.user.id}).then(data =>{
            console.log(JSON.stringify(data));
        });
    }


    deletePaidService(paidService) {
        this.props.doDeletePaidService({id: paidService.id, image: paidService.image}).then(data => {
            if(data) {
                this.getPaidServiceData();
            }
        })
    }

    addPaidService = (values) => {
        const date = new Date();
        const minutes = date.getMinutes();
        let data = new FormData();
        let paidService = {
            name: values.serviceName,
            unit: values.unit,
            userId: this.props.user.user.id
        }
        data.append("image", {
            paidService: paidService,
            uri: this.state.imagePaidService.path,
            type: "image/jpeg",
            name: this.state.imagePaidService.filename || `temp_image_${minutes}.jpg`
        });
        data.append("paidService", JSON.stringify(paidService));
        this.props.doAddPaidService(data).then(data => {
            if(data) {
                this.setState({
                    isShowModalAdd: false,
                    imagePaidService: null
                });
                this.getPaidServiceData();
            }
        })
    }

    updatePaidService = (values) => {
        const date = new Date();
        const minutes = date.getMinutes();
        let data = new FormData();
        let paidService = {
            name: values.serviceName,
            unit: values.unit,
            image: this.state.paidServiceUpdate.image
        }
        if(this.state.imagePaidService) {
            data.append("image", {
                uri: this.state.imagePaidService.path,
                type: "image/jpeg",
                name: this.state.imagePaidService.filename || `temp_image_${minutes}.jpg`
            });
        }
        data.append("paidService", JSON.stringify(paidService));
        this.props.doUpdatePaidService(data, {id: this.state.paidServiceUpdate.id}).then(data => {
            if(data) {
                this.setState({
                    isShowModalAdd: false,
                    imagePaidService: null,
                    paidServiceUpdate: null
                });
                this.getFreeServiceData();
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
                imagePaidService: {
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
                                    initialValues={{
                                        serviceName: this.state.paidServiceUpdate ? this.state.paidServiceUpdate.name : '',
                                        unit: this.state.paidServiceUpdate ? this.state.paidServiceUpdate.unit : ''
                                    }}
                                    validationSchema={PaidServiceSchema}
                                    onSubmit={values => {
                                        if(this.state.paidServiceUpdate) {
                                            this.updatePaidService(values);
                                        }else {
                                            this.addPaidService(values);
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
                                                    {margin: 15},
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
                                                            {
                                                                marginTop: 10
                                                            }
                                                        ]}
                                                    >
                                                        <AppInputInf
                                                            lable={"Đơn vị tính:"}
                                                            secureTextEntry={false}
                                                            field={"unit"}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            values={values}
                                                        />
                                                        {errors.unit && touched.unit ? (
                                                            <AppError errors={ errors.unit }/>
                                                        ) : null}
                                                    </View>
                                                    <View
                                                        style={[
                                                            width.w_100,
                                                            {
                                                                marginTop: 10
                                                            }
                                                        ]}
                                                    >
                                                        <AppInputInf
                                                            lable={"Giá dịch vụ:"}
                                                            secureTextEntry={false}
                                                            field={"unit"}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            values={values}
                                                        />
                                                        {/*{errors.unit && touched.unit ? (*/}
                                                        {/*    <AppError errors={ errors.unit }/>*/}
                                                        {/*) : null}*/}
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
                                                        (this.state.imagePaidService || this.state.paidServiceUpdate) ?
                                                            <View
                                                                style={[
                                                                    width.w_100
                                                                ]}
                                                            >
                                                                <Image
                                                                    style={[
                                                                        width.w_100,
                                                                        {height: 180}
                                                                    ]}
                                                                    source={
                                                                        {
                                                                            uri: this.state.imagePaidService ? this.state.imagePaidService.path : `${url}/${this.state.paidServiceUpdate.image}`
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
                                                                    imagePaidService: null,
                                                                    paidServiceUpdate: null
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
                                                            title={this.state.paidServiceUpdate ? 'Lưu' : 'Thêm'}
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
                <FlatList showsVerticalScrollIndicator={true} data={this.props.paidService.paidServiceList} renderItem={this._renderItemPaidService} keyExtractor={(item, index) => index.toString()}/>
            </SafeAreaView>
        );
    }

    _renderItemPaidService = ({item, index}) => {
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
                                Có phí ({item.unit})
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
                        onPress={() => this.deletePaidService(item)}
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
                                paidServiceUpdate: item,
                                isShowModalAdd: true
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

const mapStateToProps = ({user, paidService}) => {
    return {user, paidService};
};

const mapDispatchToProps = {
    doAddPaidService,
    doDeletePaidService,
    doGetListPaidService,
    doUpdatePaidService
};

export default connect(mapStateToProps, mapDispatchToProps)(PaidServiceListScreen)
