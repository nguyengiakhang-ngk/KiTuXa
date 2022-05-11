import React, {Component} from 'react';
import {View, Platform, Text, Pressable} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {background_color, font, font_weight, padding, shadow, text_size, width} from "../utils/styles/MainStyle";
import moment from "moment";

export class AppDatePicker extends Component{
    constructor(props) {
        super(props);
        this.state = {
            //new Date(1598051730000)
            date: this.props.alreadydate,
            mode: 'date',
            show: false,
            isF: true
        }
    }

    setDate = (date) => {
        this.setState({date: date, isF: false});
    }
    setMode = (type) => {
        this.setState({mode: `${type}`});
    }
    setShow = (bool) => {
        this.setState({show: bool});
    }
    onChange = (event, selectedDate) => {
        let currentDate = selectedDate || this.state.date;
        // setShow(Platform.OS === 'ios');
        this.setDate(currentDate);
        this.setShow(false);
        this.props.value[this.props.field] = selectedDate;
    }

    showMode = (currentMode) => {
        //alert(this.props.alreadydate);
        this.setShow(true);
        this.setMode(currentMode);
    };

    showDatepicker = () => {
        this.showMode('date');
    };

    render(){
        return (
            <View>
                <View>
                    <Text
                        style={[
                            text_size.sm,
                            font.serif
                        ]}
                    >{this.props.label}</Text>
                    <Pressable onPress={this.showDatepicker}>
                        <Text style={[
                            text_size.sm,
                            font_weight.f_500,
                            font.serif,
                            padding.p_0,
                            width.w_100,
                            background_color.white,
                            shadow.shadow,
                            {borderRadius: 7, padding: 12, paddingLeft: 10, paddingRight: 10, marginTop: 5, textAlignVertical: 'top',},
                        ]}>{this.state.isF ? moment(this.props.alreadydate).format('DD-MM-YYYY') : moment(this.state.date).format('DD-MM-YYYY')}</Text>
                    </Pressable>
                    {this.state.show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={this.props.alreadydate}
                            mode={this.state.mode}
                            display="default"
                            onChange={this.onChange}
                        />
                    )}

                </View>
            </View>
        );
    }
};