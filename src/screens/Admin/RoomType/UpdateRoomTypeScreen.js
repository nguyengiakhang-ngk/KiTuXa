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
import {path} from "../../../constant/define";
import {RoomTypeSchema} from "../../../utils/validation/ValidationRoomType";
import ImagePicker from 'react-native-image-crop-picker';
import {Icon} from "react-native-elements";
import {color_danger, color_primary, color_success, color_white} from "../../../utils/theme/Color";
import AppButtonActionInf from "../../../components/AppButtonActionInf";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
export default class UpdateRoomTypeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            roomType: {},
            data: [],
            imageList: [],
            dataFreeService: [],
            dataPaidService: [],
            dataFreeServiceSelection: [],
            dataPaidServiceSelection: [],
            dataImgRoom: [],
            isShowModalIconFree: false,
            isShowModalIconPaid: false,
        }
    }

    isFormValid = (isValid, touched) => {
        return isValid && Object.keys(touched).length !== 0;
    }

    componentDidMount() {
        this.getRoomTypeById();
        this.getFreeServiceByIdL();
        this.getPaidServiceByIdL();
        this.getImgRoomByIdL();
    }

    componentWillUnmount() {
        this.props.route.params.refresh();
    }

    getRoomTypeById(){
        axios.get(path + `/getRoomType/${this.props.route.params.id_loai}`)
            .then((response)=>{
                this.setState({
                    isLoading: false,
                    roomType: response.data
                });
            })
            .catch((error => {
                console.log(error);
            }));
    }

    getFreeServiceByIdL(){
        axios.get(path + `/getFreeServiceByIdL/${this.props.route.params.id_loai}`)
            .then((response)=>{
                this.setState({
                    dataFreeServiceSelection: response.data.map(item => ({key: item.id_mp, label: item.tendv, icon: item.icon, checked: false}))
                });
                this.getFreeService();
            })
            .catch((error => {
                console.log(error);
            }));
    }

    getImgRoomByIdL(){
        axios.get(path + `/getImgRoomByIdL/${this.props.route.params.id_loai}`)
            .then((response)=>{
                this.setState({
                    dataImgRoom: response.data.map(item => ({key: item.id_anh, uri: item.anh_phong}))
                })
            })
            .catch((error => {
                console.log(error);
            }));
    }

    getPaidServiceByIdL(){
        axios.get(path + `/getPaidServiceByIdL/${this.props.route.params.id_loai}`)
            .then((response)=>{
                this.setState({
                    dataPaidServiceSelection: response.data.map(item => ({key: item.id_cp, label: item.tendv, icon: item.icon, checked: false}))
                });
                this.getPaidService();
            })
            .catch((error => {
                console.log(error);
            }));
    }

    getFreeService(){
        axios.get(path + "/getFreeService")
            .then((response)=>{
                this.setState({
                    dataFreeService: response.data.map(item => ({key: item.id_mp, label: item.tendv, icon: item.icon, checked: false}))
                });
                this.state.dataFreeServiceSelection.map(item => {
                   this.state.dataFreeService.map(i => {
                       if(i.key === item.key){
                           i.checked = true;
                       }
                   });
                });
            })
            .catch((error => {
                console.log(error);
            }));
    }

    getPaidService(){
        axios.get(path + "/getPaidService")
            .then((response)=>{
                this.setState({
                    dataPaidService: response.data.map(item => ({key: item.id_cp, label: item.tendv, icon: item.icon, checked: false}))
                });
                this.state.dataPaidServiceSelection.map(item => {
                    this.state.dataPaidService.map(i => {
                        if(i.key === item.key){
                            i.checked = true;
                        }
                    });
                });
            })
            .catch((error => {
                console.log(error);
            }));
    }

    _renderItemIconSelection = () => {
        return this.state.dataFreeServiceSelection.map((item, index) => {
            return(
                <TouchableOpacity
                    style={[
                        {
                            paddingVertical: 10,
                            paddingHorizontal: 5,
                            borderRadius: 5,
                            margin: 5,
                            width: '30.5%'
                        },
                        background_color.light,
                        flex.align_items_center
                    ]}
                    onPress={ () => {
                        this.state.dataFreeService.map(i => {
                            if(i.key === item.key){
                                i.checked = false;
                            }
                        });
                        this.state.dataFreeServiceSelection.splice(index, 1);
                        this.setState({
                            dataFreeServiceSelection: this.state.dataFreeServiceSelection
                        });
                    }}
                    // onLongPress={ () => {alert(item.label)} }
                >
                    <Icon
                        name={item.icon}
                        type='font-awesome-5'
                        color={color_primary}
                        size={30}/>
                    <Text
                        numberOfLines={1}
                        style={[
                            text_size.sm,
                            font.serif,
                            {
                                textAlign: 'center'
                            }
                        ]}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            )
        })
    }

    _renderItemIcon = ({item, index}) => {
        return(
            <TouchableOpacity
                style={[
                    {
                        paddingVertical: 10,
                        borderRadius: 5,
                        margin: 5,
                        width: '30%'
                    },
                    item.checked ? background_color.light : '',
                    flex.align_items_center
                ]}
                onPress={ () => {
                    this.state.dataFreeService[index].checked = !this.state.dataFreeService[index].checked;
                    this.setState({
                        dataIcon: this.state.dataIcon
                    });
                }}
                onLongPress={ () => {alert(item.label)} }
            >
                <Icon
                    name={item.icon}
                    type='font-awesome-5'
                    color={color_primary}
                    size={30}/>
                <Text
                    numberOfLines={1}
                    style={[
                        text_size.sm,
                        font.serif,
                        {
                            textAlign: 'center'
                        }
                    ]}
                >
                    {item.label}
                </Text>
            </TouchableOpacity>
        )
    }

    _renderItemIconPaidSelection = () => {
        return this.state.dataPaidServiceSelection.map((item, index) => {
            return(
                <TouchableOpacity
                    style={[
                        {
                            paddingVertical: 10,
                            paddingHorizontal: 5,
                            borderRadius: 5,
                            margin: 5,
                            width: '30.5%'
                        },
                        background_color.light,
                        flex.align_items_center
                    ]}
                    onPress={ () => {
                        this.state.dataPaidService.map(i => {
                            if(i.key === item.key){
                                i.checked = false;
                            }
                        });
                        this.state.dataPaidServiceSelection.splice(index, 1);
                        this.setState({
                            dataPaidServiceSelection: this.state.dataPaidServiceSelection
                        });
                    }}
                    // onLongPress={ () => {alert(item.label)} }
                >
                    <Icon
                        name={item.icon}
                        type='font-awesome-5'
                        color={color_primary}
                        size={30}/>
                    <Text
                        numberOfLines={1}
                        style={[
                            text_size.sm,
                            font.serif,
                            {
                                textAlign: 'center'
                            }
                        ]}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            )
        })
    }

    _renderItemIconPaid = ({item, index}) => {
        return(
            <TouchableOpacity
                style={[
                    {
                        paddingVertical: 10,
                        borderRadius: 5,
                        margin: 5,
                        width: '30.5%'
                    },
                    item.checked ? background_color.light : '',
                    flex.align_items_center
                ]}
                onPress={ () => {
                    this.state.dataPaidService[index].checked = !this.state.dataPaidService[index].checked;
                    this.setState({
                        dataIcon: this.state.dataIcon
                    });
                }}
                onLongPress={ () => {alert(item.label)} }
            >
                <Icon
                    name={item.icon}
                    type='font-awesome-5'
                    color={color_primary}
                    size={30}/>
                <Text
                    style={[
                        text_size.sm,
                        font.serif,
                        {
                            textAlign: 'center'
                        }
                    ]}
                >
                    {item.label}
                </Text>
            </TouchableOpacity>
        )
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
    imageListView() {
        return this.state.dataImgRoom.map((image, index) => {
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
                            {{uri: `${path}/${image.uri}`}}
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

    addRoomType = (values) => {
        axios.post(path + "/addRoomType",{
            roomTypeName: values.roomTypeName,
            acreage: values.acreage,
            totalGuest: values.totalGuest,
            object: values.object,
            note: values.note,
            price: values.price.split(".").join("")
        })
            .then((response)=>{
                if(response.data){
                    this.mapImageRoomType(response.data);
                    this.mapFreeService(response.data);
                    this.mapPaidService(response.data);
                    this.props.navigation.goBack();
                }
            })
            .catch((error => {
                console.log(error);
            }));
    }

    mapFreeService = (id_loai) => {
        this.state.dataFreeService.map( (item, index) => {
            if (item.checked){
                this.addFreeServiceBill(item.key, id_loai);
            }
        });
    }

    addFreeServiceBill = (id_mp, id_loai) => {
        axios.post(path + `/addFreeServiceBill`, {
            id_mp: id_mp,
            id_loai: id_loai
        })
            .then((response)=>{

            })
            .catch((error => {
                console.log(error);
            }));
    }

    mapPaidService = (id_loai) => {
        this.state.dataPaidService.map( (item, index) => {
            if (item.checked){
                this.addPaidServiceBill(item.key, id_loai);
            }
        });
    }

    addPaidServiceBill = (id_cp, id_loai) => {
        axios.post(path + `/addPaidServiceBill`, {
            id_cp: id_cp,
            id_loai: id_loai
        })
            .then((response)=>{

            })
            .catch((error => {
                console.log(error);
            }));
    }

    mapImageRoomType = (id_loai) => {
        this.state.imageList.map( (item, index) => {
            this.uploadImageRoomType(item, index, id_loai);
        });
    }

    uploadImageRoomType = (item, index, id_loai) => {
        let dataImage = new FormData();
        dataImage.append("image", {
            uri: item.path,
            type: "image/jpeg",
            name: item.filename || `temp_image_${index}.jpg`
        });
        axios.put(path + `/photos/uploadImgRoom/${id_loai}`, dataImage)
            .then((response)=>{

            })
            .catch((error => {
                console.log(error);
            }));
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
                            {   roomTypeName: this.state.roomType.tenloai,
                                price: String(this.state.roomType.gia),
                                acreage: String(this.state.roomType.dientich),
                                totalGuest: String(this.state.roomType.soluongkhach),
                                object: this.state.roomType.doituong,
                                note: this.state.roomType.luuy,
                            }
                        }
                        validationSchema={RoomTypeSchema}
                        onSubmit={(values) => {
                            this.addRoomType(values)
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
                                            onPress={() => {this.setState({
                                                isShowModalIconFree: true
                                            })}}
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
                                                Dịch vụ miễn phí:
                                            </Text>
                                        </TouchableOpacity>
                                        <View
                                            style={[
                                                width.w_100,
                                                flex.flex_row,
                                                flex.flex_wrap
                                            ]}
                                        >
                                            {
                                                this._renderItemIconSelection()
                                            }
                                        </View>
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
                                            onPress={() => {this.setState({
                                                isShowModalIconPaid: true
                                            })}}
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
                                                Dịch vụ có phí:
                                            </Text>
                                        </TouchableOpacity>
                                        <View
                                            style={[
                                                width.w_100,
                                                flex.flex_row,
                                                flex.flex_wrap
                                            ]}
                                        >
                                            {
                                                this._renderItemIconPaidSelection()
                                            }
                                        </View>
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
                                                disabled = { !this.isFormValid(isValid, touched) }
                                                onPress = { handleSubmit }
                                                title="Cập nhật"
                                            />
                                        </View>
                                    </View>
                                </SafeAreaView>
                            </HideKeyboard>
                        )}
                    </Formik>
                </ScrollView>
                <Modal transparent visible={this.state.isShowModalIconFree}>
                    <View
                        style={[
                            {
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: 'rgba(0,0,0,0.5)',
                            }
                        ]}
                    >
                        <View
                            style={[
                                {
                                    width: '90%',
                                    backgroundColor: 'white',
                                    paddingVertical: 15,
                                    paddingHorizontal: 15,
                                    borderRadius: 5,
                                    height: 310
                                }
                            ]}
                        >
                            <View
                                style={[
                                    width.w_100,
                                    flex.align_items_center
                                ]}
                            >
                                <Text
                                    style={[
                                        text_size.xl,
                                        text_color.danger,
                                        font.serif
                                    ]}
                                >
                                    Chọn dịch vụ
                                </Text>
                                <Text
                                    style={[
                                        text_size.xs,
                                        font.serif
                                    ]}
                                >
                                    (Nhấn giữ để xem chi tiết)
                                </Text>
                            </View>
                            <FlatList style={{padding: 5}} numColumns={3} data={this.state.dataFreeService} renderItem={this._renderItemIcon} keyExtractor={(item, index) => index.toString()}/>
                            <View
                                style={[
                                    width.w_100,
                                    flex.align_items_center,
                                    {
                                        marginTop: 20
                                    }
                                ]}
                            >
                                {/*<View*/}
                                {/*    style={[*/}
                                {/*        {*/}
                                {/*            flex: 1,*/}
                                {/*            marginRight: 15*/}
                                {/*        }*/}
                                {/*    ]}*/}
                                {/*>*/}
                                {/*    <AppButtonActionInf*/}
                                {/*        size={10}*/}
                                {/*        textSize={16}*/}
                                {/*        bg={color_danger}*/}
                                {/*        onPress = { () => { this.setState({isShowModalIconFree: false}) } }*/}
                                {/*        title="Thoát"*/}
                                {/*    />*/}
                                {/*</View>*/}
                                <View
                                    style={[
                                        {
                                            width: '50%'
                                        }
                                    ]}
                                >
                                    <AppButtonActionInf
                                        size={10}
                                        textSize={16}
                                        bg={color_primary}
                                        onPress = { () => {
                                            this.state.dataFreeServiceSelection = [];
                                            this.state.dataFreeService.map((item) => {
                                                if (item.checked){
                                                    this.state.dataFreeServiceSelection.push(item);
                                                }
                                            });
                                            this.setState({
                                                dataFreeServiceSelection: this.state.dataFreeServiceSelection
                                            });
                                            this.setState({isShowModalIconFree: false});
                                        } }
                                        title="Xác nhận"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal transparent visible={this.state.isShowModalIconPaid}>
                    <View
                        style={[
                            {
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: 'rgba(0,0,0,0.5)',
                            }
                        ]}
                    >
                        <View
                            style={[
                                {
                                    width: '90%',
                                    backgroundColor: 'white',
                                    paddingVertical: 15,
                                    paddingHorizontal: 15,
                                    borderRadius: 5,
                                    height: 310,
                                }
                            ]}
                        >
                            <View
                                style={[
                                    width.w_100,
                                    flex.align_items_center
                                ]}
                            >
                                <Text
                                    style={[
                                        text_size.xl,
                                        text_color.danger,
                                        font.serif
                                    ]}
                                >
                                    Chọn dịch vụ
                                </Text>
                                <Text
                                    style={[
                                        text_size.xs,
                                        font.serif
                                    ]}
                                >
                                    (Nhấn giữ để xem chi tiết)
                                </Text>
                            </View>
                            <FlatList style={{padding: 5}} numColumns={3} data={this.state.dataPaidService} renderItem={this._renderItemIconPaid} keyExtractor={(item, index) => index.toString()}/>
                            <View
                                style={[
                                    width.w_100,
                                    flex.flex_row,
                                    flex.justify_content_center,
                                    {marginTop: 20}
                                ]}
                            >
                                {/*<View*/}
                                {/*    style={[*/}
                                {/*        {*/}
                                {/*            flex: 1,*/}
                                {/*            marginRight: 15*/}
                                {/*        }*/}
                                {/*    ]}*/}
                                {/*>*/}
                                {/*    <AppButtonActionInf*/}
                                {/*        size={10}*/}
                                {/*        textSize={16}*/}
                                {/*        bg={color_danger}*/}
                                {/*        onPress = { () => {*/}
                                {/*            this.state.dataPaidServiceSelection = [];*/}
                                {/*            this.state.dataPaidService.map((item) => {*/}
                                {/*                if (item.checked){*/}
                                {/*                    this.state.dataPaidServiceSelection.push(item);*/}
                                {/*                }*/}
                                {/*            });*/}
                                {/*            this.setState({*/}
                                {/*                dataPaidServiceSelection: this.state.dataPaidServiceSelection*/}
                                {/*            });*/}
                                {/*            this.setState({isShowModalIconPaid: false});*/}
                                {/*        } }*/}
                                {/*        title="Hủy"*/}
                                {/*    />*/}
                                {/*</View>*/}
                                <View
                                    style={[
                                        {
                                            width: '50%'
                                        }
                                    ]}
                                >
                                    <AppButtonActionInf
                                        size={10}
                                        textSize={16}
                                        bg={color_primary}
                                        onPress = { () => {
                                            this.state.dataPaidServiceSelection = [];
                                            this.state.dataPaidService.map((item) => {
                                                if (item.checked){
                                                    this.state.dataPaidServiceSelection.push(item);
                                                }
                                            });
                                            this.setState({
                                                dataPaidServiceSelection: this.state.dataPaidServiceSelection
                                            });
                                            this.setState({isShowModalIconPaid: false});
                                        } }
                                        title="Xác nhận"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}
