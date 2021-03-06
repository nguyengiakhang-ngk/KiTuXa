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
  TextInput,
  ActivityIndicator
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
import { doGetRoomByArea, doGetRoomByType } from '../../../redux/actions/room';
import { doAddContract } from '../../../redux/actions/contract';
import { color_danger, color_primary } from '../../../utils/theme/Color';
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import { doGetListArea } from "../../../redux/actions/area";
import { doGetBookTicketByRoom } from '../../../redux/actions/room';
import { doGetTypeOfRoomByArea } from '../../../redux/actions/typeOfRoom';
const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class AddContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      termList: 0,
      termData: [],
      dataP: [],
      ref: React.createRef(),
      dataBookTicket: [],
      dataArea: [],
      dayIn: new Date(),
      duration: new Date(),
      typeOfRoom: [],
      typeOfRoomSelect: { 'type': '' }
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

  getTypeRoom(option) {
    this.props.doGetTypeOfRoomByArea({ areaId: option.key }).then(data => {
      this.setState({
        typeOfRoom: data.map(item => ({
          key: item.id,
          label: item.name,
        }))
      })
    });
  }

  getPhongData(option) {
    this.props.doGetRoomByType({ typeOfRoomId: option.key }).then(data => {
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
          label: "M??: " + item.id + " - T??n: " + item.user.name,
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
        this.setState({ isLoading: true })
        Toast.show({
          type: 'success',
          text1: 'H???p ?????ng',
          text2: 'Th??m th??nh c??ng.',
          visibilityTime: 2000,
          autoHide: true
        });
        setTimeout(() => {
          this.props.navigation.goBack();
        }, 2000)
      } else {
        alert("Th??m h???p ?????ng kh??ng th??nh c??ng! Vui l??ng th??? l???i!");
      }
    })
  };



  render() {
    return (
      <ScrollView
        style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        {
          this.state.isLoading ?
            <ActivityIndicator size="large" color={color_primary} />
            :
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
                if (values.dayIn > values.duration) {
                  alert("Ng??y v??o kh??ng th??? sau th???i h???n! Xin vui l??ng th??? l???i!")
                } else {
                  this.addContract(values);
                }

              }}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => {
                return (
                  <HideKeyboard>
                    <SafeAreaView
                      style={[styles.container, background_color.white, height.h_100]}
                      onPress={Keyboard.dismiss}>
                      <Toast ref={(ref) => { Toast.setRef(ref) }} />
                      <View
                        style={[width.w_100, styles.splitView]}>
                        <AppDialogSelect
                          lable={'Khu:'}
                          data={this.state.dataArea}
                          placeholder={'Vui l??ng ch???n khu...'}
                          value={values}
                          returnFilter={(key) => this.getTypeRoom(key)}
                        />
                      </View>
                      <View
                        style={[width.w_100, {
                          paddingLeft: 15,
                          paddingRight: 15,
                          marginTop: 10
                        }]}>
                        <AppDialogSelect
                          lable={'Lo???i Ph??ng:'}
                          data={this.state.typeOfRoom}
                          placeholder={'Vui l??ng ch???n lo???i ph??ng...'}
                          value={this.state.typeOfRoomSelect}
                          field={'type'}
                          returnFilter={(option) => this.getPhongData(option)}
                        />
                      </View>
                      <View
                        style={[width.w_100, styles.splitView]}>
                        <AppDialogSelect
                          lable={'Ph??ng:'}
                          data={this.state.dataP}
                          placeholder={'Vui l??ng ch???n ph??ng...'}
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
                          lable={'Phi???u ?????t:'}
                          data={this.state.dataBookTicket}
                          placeholder={'Vui l??ng ch???n phi???u ?????t ph??ng'}
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
                          label={'Ng??y V??o:'}
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
                          label={'Th???i H???n:'}
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
                          label={'Ng??y Thanh To??n:'}
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
                            lable={'Ch??? S??? N?????c:'}
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
                            lable={'Ch??? S??? ??i???n:'}
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
                          lable={'??i???u kho???n:'}
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
                            title="H???y"
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
                            title="Th??m"
                          />
                        </View>
                      </View>
                    </SafeAreaView>
                  </HideKeyboard>
                );
              }}
            </Formik>
        }
      </ScrollView>
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
  doGetUserByBookTicket,
  doGetRoomByArea, doAddContract, doGetListArea,
  doGetBookTicketByRoom,
  doGetRoomByType, doGetTypeOfRoomByArea
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContract)