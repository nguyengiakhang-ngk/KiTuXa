import React, {Component} from 'react';
import {
    SafeAreaView,
    Text,
} from 'react-native';
import {Icon} from "react-native-elements";
import {background_color, flex, font, font_weight, text_color, text_size} from "../../../utils/styles/MainStyle";
import {color_primary} from "../../../utils/theme/Color";

export default class NotificationScreen extends Component{

    render() {
        return (
            <SafeAreaView
                style={[
                    {flex: 1},
                    flex.justify_content_center,
                    flex.align_items_center,
                    background_color.primary
                ]}
            >
                <Icon
                    raised
                    name='hotel'
                    type='font-awesome-5'
                    color={color_primary}
                    size={60}/>
                <Text
                    style={[
                        font_weight.bold,
                        text_color.white,
                        text_size.title,
                        font.serif
                    ]}
                >
                    Notify
                </Text>
            </SafeAreaView>
        );
    }
}
