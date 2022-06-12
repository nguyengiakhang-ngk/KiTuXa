import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { path } from "../../../constant/define";
import { flex, font, font_weight, height, position, text_color, text_size, width, background_color } from "../../../utils/styles/MainStyle";
import { color_danger, color_primary, color_success } from "../../../utils/theme/Color";
import { Icon } from "@rneui/base";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import AppButton from '../../../components/AppButton';
import { connect } from 'react-redux';

class ChooseNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
        }
    }


    render() {
        return (
            <SafeAreaView
                style={[
                    { flex: 1 },
                    height.h_100,
                    flex.justify_content_center
                ]}
            >
                <View style={[flex.justify_content_between, height.h35, width.w_100]}>
                    <View style={{marginBottom: 20}}>
                        <AppButton
                            title={'Thêm số điện'}
                            onPress={() => this.props.navigation.navigate("AddElectric")}
                        />
                    </View>
                    <AppButton
                        title={'Thêm số nước'}
                        onPress={() => this.props.navigation.navigate("AddWater")}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return { user };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseNumber)