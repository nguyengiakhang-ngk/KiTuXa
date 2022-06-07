import React, {Component} from 'react';
import {
    Keyboard, ScrollView, TouchableWithoutFeedback, View
} from 'react-native';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {
    background_color,
    flex,
    height,
    width
} from "../../../utils/styles/MainStyle";
import AppError from "../../../components/AppError";
import {Formik} from "formik";
import {AreaSchema} from "../../../utils/validation/ValidationArea";
import AppInputInf from "../../../components/AppInputInf";
import {doGetListArea, doUpdateArea} from "../../../redux/actions/area";
import {connect} from "react-redux";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import {color_danger, color_primary} from "../../../utils/theme/Color";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
class UpdateAreaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            area: this.props.route.params.area,
            ss: ""
        }
    }

    isFormValid = (isValid) => {
        return isValid;
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    updateArea = (values) => {
        let area = {
            areaName: values.areaName,
            address: values.address,
            totalRoom: values.totalRoom,
            time: values.time,
            content: values.content,
            description: values.description
        }
        this.props.doUpdateArea(area, {id: this.state.area.id}).then(data => {
            if(data) {
                // this.props.doGetListArea({userId: this.props.user.user.id}).then(data => {
                //     if(data.length){
                        this.props.navigation.goBack();
                //     }
                // });
            }
        })
    }
    render() {
        return (
            <ScrollView
                style={{ flex: 1}} contentContainerStyle={{ flexGrow: 1 }}
            >
                <Formik
                    enableReinitialize
                    initialValues={
                        {
                            areaName: this.state.area.areaName,
                            address: this.state.area.address,
                            totalRoom: String(this.state.area.totalRoom),
                            time: this.state.area.time,
                            content: this.state.area.content,
                            description: this.state.area.description
                        }
                    }
                    validationSchema={AreaSchema}
                    onSubmit={ values => {
                            this.updateArea(values);
                        }
                    }
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
                                        lable={"Tên khu:"}
                                        secureTextEntry={false}
                                        field={"areaName"}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                    />
                                    {errors.areaName && touched.areaName ? (
                                        <AppError errors={ errors.areaName }/>
                                    ) : null}
                                </View>
                                <View
                                    style={[
                                        width.w_100,
                                        {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                    ]}
                                >
                                    <AppInputInf
                                        lable={"Địa chỉ:"}
                                        secureTextEntry={false}
                                        field={"address"}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                    />
                                    {errors.address && touched.address ? (
                                        <AppError errors={ errors.address }/>
                                    ) : null}
                                </View>
                                <View
                                    style={[
                                        {paddingLeft: 15, paddingRight: 10, marginTop: 10, flex: 1}
                                    ]}
                                >
                                    <AppInputInf
                                        lable={"Số phòng:"}
                                        secureTextEntry={false}
                                        keyboardType={'numeric'}
                                        field={"totalRoom"}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                    />
                                    {errors.totalRoom && touched.totalRoom ? (
                                        <AppError errors={ errors.totalRoom }/>
                                    ) : null}
                                </View>
                                <View
                                    style={[
                                        width.w_100,
                                        {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                    ]}
                                >
                                    <AppInputInf
                                        lable={"Giờ đóng-mở cửa:"}
                                        secureTextEntry={false}
                                        field={"time"}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                    />
                                    {errors.time && touched.time ? (
                                        <AppError errors={ errors.time }/>
                                    ) : null}
                                </View>
                                <View
                                    style={[
                                        width.w_100,
                                        {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                    ]}
                                >
                                    <AppInputInf
                                        lable={"Nội dung:"}
                                        secureTextEntry={false}
                                        field={"content"}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        multiline={true}
                                        number={4}
                                    />
                                    {errors.content && touched.content ? (
                                        <AppError errors={ errors.content }/>
                                    ) : null}
                                </View>
                                <View
                                    style={[
                                        width.w_100,
                                        {paddingLeft: 15, paddingRight: 15, marginTop: 10}
                                    ]}
                                >
                                    <AppInputInf
                                        lable={"Mô tả:"}
                                        secureTextEntry={false}
                                        field={"description"}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        multiline={true}
                                        number={4}
                                    />
                                    {errors.description && touched.description ? (
                                        <AppError errors={ errors.description }/>
                                    ) : null}
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
        );
    }
}

const mapStateToProps = ({area, user}) => {
    return {area, user};
};

const mapDispatchToProps = {
    doUpdateArea,
    doGetListArea
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAreaScreen)

