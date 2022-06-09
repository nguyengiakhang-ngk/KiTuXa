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
import AppDialogSelect from '../../../components/AppDialogSelect';
import AppButton from '../../../components/AppButton';
import axios from 'axios';
import { path } from '../../../constant/define';
import { ContractSchema } from '../../../utils/validation/ValidationContract';
import { AppDatePicker } from '../../../components/AppDatePicker';
import AppSelectSearch from "../../../components/AppSelectSearch";
import moment from 'moment';
import { color_primary } from '../../../utils/theme/Color';
import { connect } from 'react-redux';
import { doGetUserByBookTicket } from '../../../redux/actions/user';

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
      selectUser: '',
      dataP: [],
      dataK: []
    };
  }

  isFormValid = (isValid, touched) => {
    return isValid && Object.keys(touched).length !== 0;
  };

  getPhongData() {
    axios
      .get(path + `/getPhong/${this.props.route.params.ID_TK}`)
      .then(response => {
        // alert(JSON.stringify(response));
        this.setState({
          isLoading: false,
          dataP: response.data.map(item => ({
            key: item.roomId,
            label: item.name,
          })),
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  getUserData() {
    this.props.doGetUserByBookTicket({ roomId: 1 }).then(data => {
      this.setState({
        data: data
      })
    })
    console.log('chd',this.state.data);
  }
  componentDidMount() {
    this.getPhongData();
    this.getUserData();
  }
  componentWillUnmount() {
    //this.props.route.params.refresh();
  }

  addContract = (values, termData) => {
    let now = new Date();

    axios
      .get(path + `/checkContract/${values.Phong}/${values.TaiKhoan}`)
      .then(response => {
        // alert(JSON.stringify(response)); response.data.ThoiHan.getTime() >= now.getTime()
        if (new Date(response.data.ThoiHan).getTime() >= now.getTime()) {
          alert(
            'Hợp đồng của khách hàng này vẫn còn thời hạn ! Vui lòng thử lại !',
          );
        } else {
          axios
            .post(path + '/addContract', {
              TaiKhoan: values.TaiKhoan,
              Phong: values.Phong,
              ThoiHan: moment(values.ThoiHan).format('YYYY-MM-DD'),
              NgayThanhToan: moment(values.NgayThanhToan).format('YYYY-MM-DD'),
              ChiSoDien: values.ChiSoDien,
              ChiSoNuoc: values.ChiSoNuoc,
              Ngay_vao: moment(values.Ngay_vao).format('YYYY-MM-DD'),
              TinhTrang: 0,
            })
            .then(response => {
              if (response.data) {

                for (let i = 0; i < termData.length; i++) {
                  axios.post(path + '/addTerm'
                    // ,{
                    //   nameOfTerm: 'Điều khoản ' + i,
                    //   content: termData[i],
                    //   contractId: 1
                    // }
                  )
                }
                this.props.navigation.goBack();
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  addTerm = () => {
    this.state.termData.push('');
    this.setState({
      termData: this.state.termData
    })
  };

  changeTextTerm = () => {

  }
  _renderTerm = (item, index, handleChange, handleBlur, values) => {
    console.log(this.state.termData)
    return (
      <View
        key={index}
        style={[{ flex: 1 }, styles.splitView]}>
        {/* <AppInputInf
          lable={'Điều khoản ' + (index + 1) + ':'}
          secureTextEntry={false}
          field={this.state.termData[index]}
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values}
        /> */}
        <View>
          <View style={[
            width.w_100,
            flex.justify_content_center,
          ]}>
            <Text
              style={[
                text_size.sm,
                font.serif
              ]}
            >
              {'Điều khoản ' + (index + 1) + ':'}
            </Text>
            <TextInput
              secureTextEntry={false}
              style={[
                text_size.sm,
                font_weight.f_500,
                font.serif,
                padding.p_0,
                width.w_100,
                background_color.white,
                shadow.shadow,
                { borderRadius: 7, padding: 12, paddingLeft: 10, paddingRight: 10, marginTop: 5, textAlignVertical: 'top', },
              ]}
              onChangeText={(newValue) => {
                this.state.termData[index] = newValue;
                this.setState({ termData: this.state.termData });
              }}
            // value={}
            />
          </View>
        </View>
      </View>
    );
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
              userId: '',
              roomId: '',
              duration: new Date(),
              dateOfPayment: new Date(),
              numberOfElectric: '',
              numberOfWater: '',
              dayIn: new Date(),
              status: 0,
            }}
            validationSchema={ContractSchema}
            onSubmit={values => {
              this.addContract(values, this.state.termData);
              // this.state.termData
              //alert(this.state.date);
            }}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => {
              return (
                <HideKeyboard>
                  <SafeAreaView
                    style={[styles.container, background_color.white, height.h_100]}
                    onPress={Keyboard.dismiss}>
                    <View
                      style={[width.w_100, styles.splitView]}>
                      <AppDialogSelect
                        lable={'Khách thuê:'}
                        data={this.state.dataK}
                        placeholder={'Vui lòng chọn khách...'}
                        value={values}
                        field={'TaiKhoan'}
                      />
                      {/* <AppSelectSearch
                        label={'Khách hàng:'}
                        data={this.state.users}
                        value={this.state.selectUser}
                        onSelect={(user) => this.onSelectUser(user)}
                        displayKey={"name"}
                        contentStyle={{ height: '85%' }}
                        itemStyle={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: 'black' }}
                        placeholder={'Tìm kiếm tên người dùng...'}
                        selectText={'Vui lòng chọn khách hàng...                   '}
                        selectButtonTextStyle={[text_size.sm, { opacity: .5, numberOfLines: 1 }]}
                      /> */}
                      {errors.TaiKhoan && touched.TaiKhoan ? (
                        <AppError errors={errors.TaiKhoan} />
                      ) : null}
                    </View>
                    <View
                      style={[width.w_100, styles.splitView]}>
                      <AppDialogSelect
                        lable={'Phòng:'}
                        data={this.state.dataP}
                        placeholder={'Vui lòng chọn phòng...'}
                        value={values}
                        field={'Phong'}
                      />
                      {errors.Phong && touched.Phong ? (
                        <AppError errors={errors.Phong} />
                      ) : null}
                    </View>

                    <View
                      style={[width.w_100, styles.splitView]}>
                      <AppDatePicker
                        label={'Ngày Vào:'}
                        value={values}
                        field={'Ngay_vao'}
                        alreadydate={new Date()}
                      />
                      {errors.Ngay_vao && touched.Ngay_vao ? (
                        <AppError errors={errors.Ngay_vao} />
                      ) : null}
                    </View>

                    <View
                      style={[width.w_100, styles.splitView]}>
                      <AppDatePicker
                        label={'Thời Hạn:'}
                        value={values}
                        field={'ThoiHan'}
                        alreadydate={new Date()}
                      />
                      {errors.ThoiHan && touched.ThoiHan ? (
                        <AppError errors={errors.ThoiHan} />
                      ) : null}
                    </View>
                    <View
                      style={[width.w_100, styles.splitView]}>
                      <AppDatePicker
                        label={'Ngày Thanh Toán:'}
                        value={values}
                        field={'NgayThanhToan'}
                        alreadydate={new Date()}
                      />
                      {errors.NgayThanhToan && touched.NgayThanhToan ? (
                        <AppError errors={errors.NgayThanhToan} />
                      ) : null}
                    </View>
                    <View style={[flex.flex_row, width.w_100]}>
                      <View
                        style={[{ flex: 1 }, styles.splitView]}>
                        <AppInputInf
                          lable={'Chỉ Số Nước:'}
                          keyboardType={'numeric'}
                          secureTextEntry={false}
                          field={'ChiSoNuoc'}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          values={values}
                        />
                        {errors.ChiSoNuoc && touched.ChiSoNuoc ? (
                          <AppError errors={errors.ChiSoNuoc} />
                        ) : null}
                      </View>
                      <View
                        style={[{ flex: 1 }, styles.splitView]}>
                        <AppInputInf
                          lable={'Chỉ Số Điện:'}
                          keyboardType={'numeric'}
                          secureTextEntry={false}
                          field={'ChiSoDien'}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          values={values}
                        />
                        {errors.ChiSoDien && touched.ChiSoDien ? (
                          <AppError errors={errors.ChiSoDien} />
                        ) : null}
                      </View>
                    </View>
                    <View>
                      {
                        this.state.termData.map((item, index) => {
                          return this._renderTerm(item, index, handleChange, handleBlur, values);
                        })
                      }
                    </View>
                    <Pressable
                      onPress={() => {
                        this.addTerm();
                      }}>
                      <View
                        style={styles.splitView}>
                        <Text style={[text_size.md, { color: '#0094cc' }]}>
                          + Thêm Điều Khoản
                        </Text>
                      </View>
                    </Pressable>
                    <View
                      style={[width.w_100, { paddingLeft: 15, paddingRight: 15, marginTop: 30 }]}>
                      <AppButton
                        disabled={!this.isFormValid(isValid, touched)}
                        onPress={handleSubmit}
                        // onPress={() => console.log(this.state.termData)}
                        title="Thêm"
                      />
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

const mapStateToProps = ({user}) => {
  return { user };
};

const mapDispatchToProps = {
  doGetUserByBookTicket
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContract)
