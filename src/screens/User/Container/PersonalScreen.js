import React, {Component} from 'react';
import {
    SafeAreaView,
    Text,
} from 'react-native';
import {background_color, flex} from "../../../utils/styles/MainStyle";

export default class PersonalScreen extends Component{

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
                    Personal
                </Text>
            </SafeAreaView>
        );
    }
}
