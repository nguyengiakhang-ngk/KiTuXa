import React, {Component} from 'react';
import {
    FlatList,
    Image,
    Keyboard, Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    flex, font,
    height, position, text_color, text_size,
    width
} from "../../../utils/styles/MainStyle";
import AppError from "../../../components/AppError";
import {Formik} from "formik";
import AppInputInf from "../../../components/AppInputInf";
import axios from "axios";
import {url} from "../../../constant/define";
import {RoomTypeSchema} from "../../../utils/validation/ValidationRoomType";
import ImagePicker from 'react-native-image-crop-picker';
import {Icon} from "@rneui/base";
import {color_danger, color_primary, color_success, color_white} from "../../../utils/theme/Color";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import {doGetListArea} from "../../../redux/actions/area";
import {doUpdateTypeOfRoom} from "../../../redux/actions/typeOfRoom"
import {doAddPriceTypeOfRoom} from "../../../redux/actions/priceTypeOfRoom";
import {doAddImageOfTypeRoom, doDeleteImageOfTypeRoom} from "../../../redux/actions/imageTypeOfRoom";
import {connect} from "react-redux";
import AppDialogSelect from "../../../components/AppDialogSelect";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class UpdateRoomTypeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            typeOfRoom: this.props.route.params.typeOfRoom,
            areaData: [],
            data: [],
            imageList: [],
            initValue: ""
        }
    }

    isFormValid = (isValid) => {
        return isValid;
    }

    componentDidMount() {
        this.getAreaList();
    }

    componentWillUnmount() {

    }

    getAreaList = () => {
        this.props.doGetListArea({userId: this.props.user.user.id}).then(data => {
            this.setState({
                areaData: data.map(item => ({key: item.id, label: item.areaName}))
            }, () => {
                data.map(item => {
                    if (item.id === this.state.typeOfRoom.areaId){
                        this.setState({
                            initValue: item.areaName
                        })
                    }
                });
            });
        })
    }

    chooseImage(){
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            compressImageQuality: 0.8,
            maxFiles: 6,
            mediaType: "any",
            includeBase64: true,
        }).then(res => {
            console.log('Res: ', res);
            res.map(image => {
                this.state.imageList.push({
                    filename: image.filename,
                    path: image.path,
                    data: image.data
                });
                this.setState({
                    imageList: this.state.imageList
                });
            });
        })
            .catch(error => console.log('Error: ', error.message));
    }

    removeImage(index){
        this.state.imageList.splice(index, 1);
        this.setState({
           imageList: this.state.imageList
        });
    }

    deleteImageTypeRoom(image, index){
        this.props.doDeleteImageOfTypeRoom({id: image.id, image: image.image}).then(data => {
            if(data) {
                this.state.typeOfRoom.imageofrooms?.splice(index, 1);
                this.setState({
                    typeOfRoom: this.state.typeOfRoom
                })
            }
        })
    }

    imageListView() {
        return this.state.imageList.map((image, index) => {
            return(
                <View
                    style={[
                        {
                            width: '49%',
                            marginBottom: 7,
                        }
                    ]}
                >
                    <Image
                        source=
                            {{uri: image.path}}
                        style={{
                            width: '100%',
                            height: 150,
                            borderTopRightRadius: 5,
                            borderTopLeftRadius: 5,
                            overflow: 'hidden',
                        }}
                    />
                    <TouchableOpacity
                        style={[
                            flex.flex_row,
                            flex.justify_content_center,
                            flex.align_items_center,
                            width.w_100,
                            {
                                backgroundColor: color_danger,
                                marginTop: -0.1,
                                paddingTop: 2,
                                paddingBottom: 2,
                                borderBottomRightRadius: 5,
                                borderBottomLeftRadius: 5
                            }
                        ]}
                        onPress={() => this.removeImage(index)}
                    >
                        <Icon
                            name='times-circle'
                            type='font-awesome-5'
                            size={18}
                            color={color_white}
                        />
                        <Text
                            style={[
                                text_color.white,
                                font.serif,
                                text_size.xs,
                                {
                                    marginLeft: 3
                                }
                            ]}
                        >
                            Xóa
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    renderImageList() {
        return this.state.typeOfRoom?.imageofrooms.map((image, index) => {
            return(
                <View
                    keys={index}
                    style={[
                        {
                            width: '49%',
                            marginBottom: 7,
                        }
                    ]}
                >
                    <Image
                        source=
                            {{uri: `${url}/${image.image}`}}
                        style={{
                            width: '100%',
                            height: 150,
                            borderTopRightRadius: 5,
                            borderTopLeftRadius: 5,
                            overflow: 'hidden',
                        }}
                    />
                    <TouchableOpacity
                        style={[
                            flex.flex_row,
                            flex.justify_content_center,
                            flex.align_items_center,
                            width.w_100,
                            {
                                backgroundColor: color_danger,
                                marginTop: -0.1,
                                paddingTop: 2,
                                paddingBottom: 2,
                                borderBottomRightRadius: 5,
                                borderBottomLeftRadius: 5
                            }
                        ]}
                        onPress={() => {
                            this.deleteImageTypeRoom(image, index)
                        }}
                    >
                        <Icon
                            name='times-circle'
                            type='font-awesome-5'
                            size={18}
                            color={color_white}
                        />
                        <Text
                            style={[
                                text_color.white,
                                font.serif,
                                text_size.xs,
                                {
                                    marginLeft: 3
                                }
                            ]}
                        >
                            Xóa
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    updateRoomType = (values) => {
        let typeOfRoom = {
            name: values.roomTypeName,
            stretch: values.acreage,
            numberOfCustomer: values.totalGuest,
            typeOfCustomer: values.object,
            note: values.note,
            areaId: values.areaId
        }
        this.props.doUpdateTypeOfRoom(typeOfRoom, {id: this.state.typeOfRoom.id}).then(data => {
            // alert(data);
            if(data) {
                let price = values.price.split(".").join("");
                if(price !== this.state.typeOfRoom.priceofrooms[0].price) {
                    this.props.doAddPriceTypeOfRoom({price: price, typeOfRoomId: this.state.typeOfRoom.id}).then(data => {
                        // alert(data);
                    })
                }
                if(this.state.imageList.length > 0) {
                    this.mapImageRoomType(this.state.typeOfRoom.id);
                }else{
                    this.props.navigation.goBack();
                }
            }
        })
    }

    mapImageRoomType = (typeOfRoomId) => {
        this.state.imageList.map( (item, index) => {
            this.uploadImageRoomType(item, index, typeOfRoomId);
        });
    }

    uploadImageRoomType = (item, index, typeOfRoomId) => {
        const date = new Date();
        let dataImage = new FormData();
        dataImage.append("image", {
            uri: item.path,
            type: "image/jpeg",
            name: item.filename || `temp_image_${date.getMilliseconds()}.jpg`
        });
        dataImage.append("imageOfTypeRoom", JSON.stringify({typeOfRoomId: typeOfRoomId}));
        this.props.doAddImageOfTypeRoom(dataImage).then(data => {
            if( data && index === (this.state.imageList.length - 1) ){
                this.props.navigation.goBack();
            }
        })
    }



    render() {
        return (
            <SafeAreaView
                style={[
                    {flex: 1},
                    height.h_100,
                    position.relative,
                    background_color.white
                ]}
            >
                <ScrollView
                    style={{ flex: 1}} contentContainerStyle={{ flexGrow: 1 }}
                >
                    <Formik
                        enableReinitialize
                        initialValues={
                            {
                                roomTypeName: this.state.typeOfRoom.name,
                                price: String(this.state.typeOfRoom.priceofrooms[0].price),
                                acreage: String(this.state.typeOfRoom.stretch),
                                totalGuest: String(this.state.typeOfRoom.numberOfCustomer),
                                object: this.state.typeOfRoom.typeOfCustomer,
                                note: this.state.typeOfRoom.note,
                                areaId: this.state.typeOfRoom.areaId
                            }
                        }
                        validationSchema={RoomTypeSchema}
                        onSubmit={(values) => {
                            this.updateRoomType(values)
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
                                        { flex: 1, paddingBottom: 15 },
                                        background_color.white,
                                        height.h_100
                                    ]}
                                    onPress={Keyboard.dismiss}
                                >
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                        ]}
                                    >
                                        <AppDialogSelect
                                            lable={"Khu:"}
                                            data={this.state.areaData}
                                            field={"areaId"}
                                            value={values}
                                            placeholder={"Vui lòng chọn"}
                                            initValue={ this.state.initValue }
                                        />
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                        ]}
                                    >
                                        <AppInputInf
                                            lable={"Tên loại phòng:"}
                                            secureTextEntry={false}
                                            field={"roomTypeName"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                        />
                                        {errors.roomTypeName && touched.roomTypeName ? (
                                            <AppError errors={ errors.roomTypeName }/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                        ]}
                                    >
                                        <AppInputInf
                                            lable={"Giá loại phòng:"}
                                            secureTextEntry={false}
                                            keyboardType={'numeric'}
                                            field={"price"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            formatNum = { true }
                                        />
                                        {errors.price && touched.price ? (
                                            <AppError errors={ errors.price }/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            flex.flex_row,
                                            width.w_100,
                                        ]}
                                    >
                                        <View
                                            style={[
                                                {paddingLeft: 15, paddingRight: 10, marginTop: 10, flex: 1}
                                            ]}
                                        >
                                            <AppInputInf
                                                lable={"Diện tích (m2):"}
                                                secureTextEntry={false}
                                                keyboardType={'numeric'}
                                                field={"acreage"}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                            />
                                            {errors.acreage && touched.acreage ? (
                                                <AppError errors={ errors.acreage }/>
                                            ) : null}
                                        </View>
                                        <View
                                            style={[
                                                {paddingLeft: 10, paddingRight: 15, marginTop: 10, flex: 1}
                                            ]}
                                        >
                                            <AppInputInf
                                                lable={"Số lượng khách:"}
                                                keyboardType={'numeric'}
                                                secureTextEntry={false}
                                                field={"totalGuest"}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                            />
                                            {errors.totalGuest && touched.totalGuest ? (
                                                <AppError errors={ errors.totalGuest }/>
                                            ) : null}
                                        </View>
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                        ]}
                                    >
                                        <AppInputInf
                                            lable={"Đối tượng:"}
                                            secureTextEntry={false}
                                            field={"object"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                        />
                                        {errors.object && touched.object ? (
                                            <AppError errors={ errors.object }/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                        ]}
                                    >
                                        <AppInputInf
                                            lable={"Lưu ý:"}
                                            secureTextEntry={false}
                                            field={"note"}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            multiline={true}
                                            number={4}
                                        />
                                        {errors.note && touched.note ? (
                                            <AppError errors={ errors.note }/>
                                        ) : null}
                                    </View>
                                    <View
                                        style={[
                                            width.w_100,
                                            {paddingLeft: 15, paddingRight: 15, marginTop: 10}
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
                                                Thêm ảnh loại phòng:
                                            </Text>
                                        </TouchableOpacity>
                                        <View
                                            style={[
                                                width.w_100,
                                                flex.flex_row,
                                                flex.flex_wrap,
                                                flex.justify_content_between,
                                                {
                                                    marginTop: 5
                                                }
                                            ]}
                                        >

                                            {this.renderImageList()}
                                            {this.imageListView()}
                                        </View>
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
                                                disabled = { !this.isFormValid(isValid) }
                                                onPress = { handleSubmit }
                                                title="Lưu"
                                            />
                                        </View>
                                    </View>
                                </SafeAreaView>
                            </HideKeyboard>
                        )}
                    </Formik>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({user, freeService}) => {
    return {user, freeService};
};

const mapDispatchToProps = {
    doGetListArea,
    doUpdateTypeOfRoom,
    doDeleteImageOfTypeRoom,
    doAddPriceTypeOfRoom,
    doAddImageOfTypeRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRoomTypeScreen)

