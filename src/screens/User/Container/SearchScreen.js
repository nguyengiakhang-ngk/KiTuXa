import React, {Component} from 'react';
import {
    FlatList,
    SafeAreaView,
    Text,
} from 'react-native';
import {background_color, flex} from "../../../utils/styles/MainStyle";

export default class SearchScreen extends Component{

    render() {
        return (
            <SafeAreaView
                style={[
                    {
                        flex: 1,
                        paddingBottom: 60
                    },
                    flex.justify_content_center,
                    flex.align_items_center
                ]}
            >
                
            </SafeAreaView>
        );
    }
}
