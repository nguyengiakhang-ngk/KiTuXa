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
                <Text>
                    Notify
                </Text>
            </SafeAreaView>
        );
    }
}
