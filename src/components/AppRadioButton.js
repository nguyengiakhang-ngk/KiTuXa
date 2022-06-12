import React, {Component} from "react";
import {color_dark, color_primary} from "../utils/theme/Color";
import {Text, View} from "react-native";
import {text_size, font} from "../utils/styles/MainStyle";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";


class AppRadioButton extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            indexGenderValue: this.props.data.findIndex(x => x.value === String(this.props.defaultValue))
        }
    }

    render() {
        return (
            <View>
                <Text
                    style={[
                        text_size.sm,
                        font.serif
                    ]}
                >
                    { this.props.label }
                </Text>
                <View
                    style={
                        {
                            marginTop: 4
                        }
                    }
                >
                    <RadioForm
                        animation={true}
                        formHorizontal={this.props.formHorizontal}
                    >
                        {
                            this.state.data.map((obj, i) => (
                                <RadioButton labelHorizontal={true} key={i} >
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={this.state.indexGenderValue === i}
                                        onPress={() => { this.changeValueRadioButton(obj, i) }}
                                        borderWidth={1}
                                        buttonInnerColor={color_primary}
                                        buttonOuterColor={this.state.indexGenderValue === i ? color_primary : color_dark}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        buttonStyle={{}}
                                        buttonWrapStyle={{marginLeft: 0}}
                                    />
                                    <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={() => { this.changeValueRadioButton(obj, i) }}
                                        labelStyle={[
                                            text_size.sm,
                                            font.serif,
                                            {
                                                marginTop: 2
                                            }
                                        ]}
                                        labelWrapStyle={{}}
                                    />
                                </RadioButton>
                            ))
                        }
                    </RadioForm>
                </View>
            </View>
        )
    }

    changeValueRadioButton = (obj, i) => {
        this.props.values[this.props.field] = obj.value;
        this.setState({
            indexGenderValue: i
        });
    }
}
export default AppRadioButton;
