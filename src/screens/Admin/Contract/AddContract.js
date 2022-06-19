import React, { Component, useState } from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TextInput
} from 'react-native';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import { background_color, flex, font, font_weight, padding, shadow, text_size, width, height, text_color } from "../../../utils/styles/MainStyle";
import AppError from '../../../components/AppError';
import { Formik } from 'formik';
import AppInputInf from '../../../components/AppInputInf';
import Toast from "react-native-toast-message";
import AppDialogSelect from '../../../components/AppDialogSelect';
import AppButton from '../../../components/AppButton';
import axios from 'axios';
import { path } from '../../../constant/define';
import { ContractSchema } from '../../../utils/validation/ValidationContract';
import { AppDatePicker } from '../../../components/AppDatePicker';
import AppSelectSearch from "../../../components/AppSelectSearch";
import moment from 'moment';
import { connect } from 'react-redux';
import { doGetUserByBookTicket } from '../../../redux/actions/user';
import { doGetRoomByArea } from '../../../redux/actions/room';
import { doAddContract } from '../../../redux/actions/contract';
import { color_danger, color_primary } from '../../../utils/theme/Color';
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import { doGetListArea } from "../../../redux/actions/area";
import { doGetBookTicketByRoom } from '../../../redux/actions/room';

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class AddContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      termList: 0,
      termData: [],
      dataP: [],
      ref: React.createRef(),
      dataBookTicket: [],
      dataArea: [],
      dayIn: new Date(),
      duration: new Date()
    };
  }

  isFormValid = (isValid, touched) => {
    return isValid && Object.keys(touched).length !== 0;
  };

  getListArea() {
    this.props.doGetListArea({ userId: this.props.user.user.id }).then(data => {
      this.setState({
        dataArea: data.map(item => ({
          key: item.id,
          label: item.areaName,
        })),
      }, () => {
        // console.log('dataP: ', this.state.dataP);
      })
    })
  }

  getPhongData(option) {
    this.props.doGetRoomByArea({ areaId: option.key }).then(data => {
      this.setState({
        dataP: data.map(item => ({
          key: item.id,
          label: item.roomName,
        })),
      }, () => {
        // console.log('dataP: ', this.state.dataP);
      })
    })
  }
  getUserData(option) {
    this.props.doGetBookTicketByRoom({ roomId: option.key }).then(data => {
      this.setState({
        dataBookTicket: data.filter(item => item.status === 1).map(item => ({
          key: item.userId,
          label: "Mã: "+item.id+" - Tên: "+item.user.name,
          roomId: item.roomId,
          startBook: item.startBook,
          endBook: item.endBook
        })),
      })
    })
  }

  setStartAndEnd = (option) => {
    this.setState({
      dayIn: option.startBook,
      duration: option.endBook
    })
  }

  componentDidMount() {
    this.getListArea();
    // this.getPhongData();
    // this.getUserData();
  }
  componentWillUnmount() {
    this.props.route.params.refresh();
  }

  addContract = (values) => {
    this.props.doAddContract(values).then(data => {
      if (data) {
        this.setState({isLoading: true})
        Toast.show({
          type: 'success',
          text1: 'Hợp đồng',
          text2: 'Thêm thành công.',
          visibilityTime: 2000,
          autoHide: true
      });
      setTimeout(() => {
          this.props.navigation.goBack();
      }, 2000)
      } else {
        alert("Thêm hợp đồng không thành công! Vui lòng thử lại!");
      }
    })
  };



  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={[
            text_size.xs,
            font.serif,
            font_weight.bold,
            text_color.white,
            width.w_100,
            background_color.blue,
            {
              textAlign: 'center',
              paddingVertical: 15,
              lineHeight: 20,
              letterSpacing: 0,
            }
          ]}
        >
          Thêm hợp đồng
        </Text>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <Formik
            initialValues={{
              userId: "",
              roomId: "",
              duration: this.state.duration,
              dateOfPayment: new Date(),
              numberOfElectric: '',
              numberOfWater: '',
              dayIn: this.state.dayIn,
              status: 0,
              term: ''
            }}
            validationSchema={ContractSchema}
            onSubmit={values => {
              if(values.dayIn > values.duration){
                alert("Ngày vào không thể sau thời hạn! Xin vui lòng thử lại!")
              }else{
                this.addContract(values);
              }
              
            }}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => {
              return (
                <HideKeyboard>
                  <SafeAreaView
                    style={[styles.container, background_color.white, height.h_100]}
                    onPress={Keyboard.dismiss}>
                      <Toast ref={(ref) => {Toast.setRef(ref)}} />
                    <View
                      style={[width.w_100, styles.splitView]}>
                      <AppDialogSelect
                        lable={'Khu:'}
                        data={this.state.dataArea}
                        placeholder={'Vui lòng chọn khu...'}
                        value={values}
                        returnFilter={(key) => this.getPhongData(key)}
                      />
                    </View>

                    <View
                      style={[width.w_100, styles.splitView]}>
                      <AppDialogSelect
                        lable={'Phòng:'}
                        data={this.state.dataP}
                        placeholder={'Vui lòng chọn phòng...'}
                        value={values}
                        field={'roomId'}
                        returnFilter={(key) => this.getUserData(key)}
                      />
                      {errors.roomId && touched.roomId ? (
                        <AppError errors={errors.roomId} />
                      ) : null}
                    </View>

                    <View
                      style={[width.w_100, styles.splitView]}>
                      <AppDialogSelect
                        lable={'Phiếu đặt:'}
                        data={this.state.dataBookTicket}
                        placeholder={'Vui lòng chọn phiếu đặt phòng'}
                        value={values}
                        field={'userId'}
                        returnFilter={(option) => this.setStartAndEnd(option)}
                      />
                      {errors.userId && touched.userId ? (
                        <AppError errors={errors.userId} />
                      ) : null}
                    </View>

                    <View
                      style={[width.w_100, styles.splitView]}>
                      <AppDatePicker
                        label={'Ngày Vào:'}
                        value={values}
                        field={'dayIn'}
                        alreadydate={this.state.dayIn}
                        isDisabled={true}
                      />
                      {errors.dayIn ? (
                        <AppError errors={errors.dayIn} />
                      ) : null}
                    </View>

                    <View
                      style={[width.w_100, styles.splitView]}>
                      <AppDatePicker
                        label={'Thời Hạn:'}
                        value={values}
                        field={'duration'}
                        alreadydate={this.state.duration}
                        minimumDate={values.dayIn}
                        isDisabled={true}
                      />
                      {errors.duration ? (
                        <AppError errors={errors.duration} />
                      ) : null}
                    </View>
                    <View
                      style={[width.w_100, styles.splitView]}>
                      <AppDatePicker
                        label={'Ngày Thanh Toán:'}
                        value={values}
                        field={'dateOfPayment'}
                        alreadydate={new Date()}
                      />
                      {errors.dateOfPayment ? (
                        <AppError errors={errors.dateOfPayment} />
                      ) : null}
                    </View>
                    <View style={[flex.flex_row, width.w_100]}>
                      <View
                        style={[{ flex: 1 }, styles.splitView]}>
                        <AppInputInf
                          lable={'Chỉ Số Nước:'}
                          keyboardType={'numeric'}
                          secureTextEntry={false}
                          field={'numberOfWater'}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          values={values}
                        />
                        {errors.numberOfWater && touched.numberOfWater ? (
                          <AppError errors={errors.numberOfWater} />
                        ) : null}
                      </View>
                      <View
                        style={[{ flex: 1 }, styles.splitView]}>
                        <AppInputInf
                          lable={'Chỉ Số Điện:'}
                          keyboardType={'numeric'}
                          secureTextEntry={false}
                          field={'numberOfElectric'}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          values={values}
                        />
                        {errors.numberOfElectric && touched.numberOfElectric ? (
                          <AppError errors={errors.numberOfElectric} />
                        ) : null}
                      </View>
                    </View>
                    <View
                      style={[{ flex: 1 }, styles.splitView]}>
                      <AppInputInf
                        lable={'Điều khoản:'}
                        secureTextEntry={false}
                        field={'term'}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        values={values}
                        number={5}
                        multiline={true}
                        keyboardType="name-phone-pad"
                        returnKeyType='none'
                      />
                      {errors.term && touched.term ? (
                        <AppError errors={errors.term} />
                      ) : null}
                    </View>
                    <View
                      style={[
                        width.w_100,
                        flex.flex_row,
                        { paddingLeft: 15, paddingRight: 15, marginTop: 20 }
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
                          onPress={() => { this.props.navigation.goBack() }}
                          title="Hủy"
                        />
                      </View>
                      <View
                        style={{ flex: 1 }}
                      >
                        <AppButtonActionInf
                          size={13}
                          textSize={18}
                          bg={color_primary}
                          disabled={!this.isFormValid(isValid, touched)}
                          onPress={handleSubmit}
                          //onPress={() => alert(values.Ten_HD)}
                          title="Thêm"
                        />
                      </View>
                    </View>
                  </SafeAreaView>
                </HideKeyboard>
              );
            }}
          </Formik>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
  },
  splitView: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10
  }
})

const mapStateToProps = ({ userAddContract, user }) => {
  return { userAddContract, user };
};

const mapDispatchToProps = {
  doGetUserByBookTicket, doGetRoomByArea, doAddContract, doGetListArea, doGetBookTicketByRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContract)