import React, {Component} from 'react';
import {
    FlatList, Keyboard, Modal, ScrollView,
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
import axios from "axios";
import {path} from "../../../../constant/define";
import { width } from "../../../../utils/styles/MainStyle";
import {Icon} from "@rneui/base";
import AppInputInf from "../../../../components/AppInputInf";
import AppError from "../../../../components/AppError";
import {AreaSchema} from "../../../../utils/validation/ValidationArea";
import {Formik} from "formik";
import {FreeServiceSchema} from "../../../../utils/validation/ValidateFreeService";
import AppButton from "../../../../components/AppButton";
import {PaidServiceSchema} from "../../../../utils/validation/ValidatePaidService";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default class PaidServiceListScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataPaidService: [],
            paidServiceUpdate: "",
            iconAdd: "servicestack",
            isShowModalAdd: false,
            isShowModalIcon: false,
            isShowModalUpdate: false,
            dataIcon: [
                {
                    name: 'wifi',
                    checked: false
                },
                {
                    name: 'fan',
                    checked: false
                },
                {
                    name: 'parking',
                    checked: false
                }
            ]
        }
    }

    componentDidMount() {
        this.getPaidServiceData();
    }

    isFormValid = (isValid, touched) => {
        return isValid && Object.keys(touched).length !== 0;
    }

    getPaidServiceData(){
        axios.get(path + "/getPaidService")
            .then((response)=>{
                this.setState({
                    isLoading: false,
                    dataPaidService: response.data
                })
            })
            .catch((error => {
                console.log(error);
            }));
    }

    _renderItemIcon = ({item, index}) => {
        return(
            <TouchableOpacity
                style={[
                    {
                        paddingVertical: 10,
                        borderRadius: 5,
                        margin: 5,
                        width: '17%'
                    },
                    item.checked ? background_color.light : ''

                ]}
                onPress={ () => {
                    this.state.dataIcon.map( (value, i) => {
                        value.checked = i === index;
                    });
                    this.setState({
                        dataIcon: this.state.dataIcon,
                        isShowModalIcon: false,
                        iconAdd: this.state.dataIcon[index].name
                    });
                }}
            >
                <Icon
                    name={item.name}
                    type='font-awesome-5'
                    color={color_primary}
                    size={30}/>
            </TouchableOpacity>
        )
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
                            name= {item.anh_dd}
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
                            {item.tendv}
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
                                Có phí ({item.donvitinh})
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
                        onPress={() => this.deletePaidService(item.id_cp)}
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
                            this.state.dataIcon.map( (value, i) => {
                                value.checked = value.name === item.anh_dd;
                            });
                            this.setState({
                                dataIcon: this.state.dataIcon,
                                isShowModalUpdate: true,
                                paidServiceUpdate: this.state.dataPaidService[index],
                                iconAdd: this.state.dataPaidService[index].anh_dd,
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

    deletePaidService(id_cp) {
        axios.delete(path + `/deletePaidService/${id_cp}`)
            .then((response)=>{
                if(response.data){
                    this.getPaidServiceData();
                }
            })
            .catch((error => {
                console.log(error);
            }));
    }

    addPaidService = (values) => {
        axios.post(path + "/addPaidService",{
            serviceName: values.serviceName,
            unit: values.unit,
            icon: this.state.iconAdd
        })
            .then((response)=>{
                if(response.data){
                    this.setState({
                        isShowModalAdd: false
                    });
                    this.getPaidServiceData();
                    this.resetDataIcon();
                }
            })
            .catch((error => {
                console.log(error);
            }));
    }

    resetDataIcon = () => {
        this.state.dataIcon.map(item => {
           item.checked = false;
        });
        this.setState({
            dataIcon: this.state.dataIcon,
            iconAdd: "servicestack"
        });
    }

    updatePaidService = (values) => {
        axios.put(path + `/updatePaidService/${this.state.paidServiceUpdate.id_cp}`,{
            serviceName: values.serviceName,
            unit: values.unit,
            icon: this.state.iconAdd
        })
            .then((response)=>{
                if(response.data){
                    this.setState({
                        isShowModalUpdate: false
                    });
                    this.getPaidServiceData();
                    this.resetDataIcon();
                }
            })
            .catch((error => {
                console.log(error);
            }));
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
                            <ScrollView
                                style={[
                                    {
                                        width: '90%',
                                        backgroundColor: 'white',
                                        borderRadius: 5,
                                        maxHeight: 380
                                    }
                                ]}
                            >
                                <Formik
                                    initialValues={{serviceName: "", unit: ""}}
                                    validationSchema={PaidServiceSchema}
                                    onSubmit={values => {
                                        this.addPaidService(values);
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
                                                    { flex: 1, height: 350, margin: 15},
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
                                                            flex.flex_row,
                                                            flex.align_items_center,
                                                            {
                                                                marginTop: 10
                                                            }
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                font.serif,
                                                                text_size.sm
                                                            ]}
                                                        >
                                                            Biểu tượng dịch vụ:
                                                        </Text>

                                                        <TouchableOpacity
                                                            style={[
                                                                {
                                                                    marginLeft: 10,
                                                                    paddingVertical: 5,
                                                                    paddingHorizontal: 10,
                                                                    borderRadius: 5
                                                                },
                                                                background_color.light,
                                                                flex.justify_content_center,
                                                                flex.align_items_center
                                                            ]}
                                                            onPress={ () => this.setState( {isShowModalIcon: true} ) }
                                                        >
                                                            <Icon
                                                                name={this.state.iconAdd}
                                                                type='font-awesome-5'
                                                                color={color_primary}
                                                                size={35}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View
                                                    style={[
                                                        width.w_100
                                                    ]}
                                                >
                                                    <AppButton
                                                        disabled = { !this.isFormValid(isValid, touched) }
                                                        onPress = { handleSubmit }
                                                        title="Thêm"
                                                    />
                                                </View>
                                            </SafeAreaView>
                                        </HideKeyboard>
                                    )}
                                </Formik>
                            </ScrollView>
                        </View>
                    </Modal>
                    <Modal transparent visible={this.state.isShowModalUpdate}>
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
                            <ScrollView
                                style={[
                                    {
                                        width: '90%',
                                        backgroundColor: 'white',
                                        borderRadius: 5,
                                        maxHeight: 380
                                    }
                                ]}
                            >
                                <Formik
                                    initialValues={{serviceName: this.state.paidServiceUpdate.tendv, unit: this.state.paidServiceUpdate.donvitinh}}
                                    validationSchema={PaidServiceSchema}
                                    onSubmit={values => {
                                        this.updatePaidService(values);
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
                                                    { flex: 1, height: 350, margin: 15},
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
                                                            flex.flex_row,
                                                            flex.align_items_center,
                                                            {
                                                                marginTop: 10
                                                            }
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                font.serif,
                                                                text_size.sm
                                                            ]}
                                                        >
                                                            Biểu tượng dịch vụ:
                                                        </Text>

                                                        <TouchableOpacity
                                                            style={[
                                                                {
                                                                    marginLeft: 10,
                                                                    paddingVertical: 5,
                                                                    paddingHorizontal: 10,
                                                                    borderRadius: 5
                                                                },
                                                                background_color.light,
                                                                flex.justify_content_center,
                                                                flex.align_items_center
                                                            ]}
                                                            onPress={ () => this.setState( {isShowModalIcon: true} ) }
                                                        >
                                                            <Icon
                                                                name={this.state.iconAdd}
                                                                type='font-awesome-5'
                                                                color={color_primary}
                                                                size={35}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View
                                                    style={[
                                                        width.w_100
                                                    ]}
                                                >
                                                    <AppButton
                                                        onPress = { handleSubmit }
                                                        title="Sửa"
                                                    />
                                                </View>
                                            </SafeAreaView>
                                        </HideKeyboard>
                                    )}
                                </Formik>
                            </ScrollView>
                        </View>
                    </Modal>
                    <Modal transparent visible={this.state.isShowModalIcon}>
                        <View
                            style={[
                                {
                                    flex: 1,
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
                                        paddingVertical: 15,
                                        paddingHorizontal: 15,
                                        borderRadius: 5,
                                        height: 380
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
                                        Chọn biểu tượng
                                    </Text>
                                </View>
                                <FlatList style={{padding: 5}} numColumns={5} data={this.state.dataIcon} renderItem={this._renderItemIcon} keyExtractor={(item, index) => index.toString()}/>
                            </View>
                        </View>
                    </Modal>
                </View>
                <FlatList data={this.state.dataPaidService} renderItem={this._renderItemPaidService} keyExtractor={(item, index) => index.toString()}/>
            </SafeAreaView>
        );
    }
}
