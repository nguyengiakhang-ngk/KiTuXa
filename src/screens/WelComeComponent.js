import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
} from 'react-native';
import {Icon} from "react-native-elements";

export default class WelComeComponent extends Component{
    componentDidMount() {
        setTimeout(()=>{
            this.props.navigation.replace("Login");
        }, 2500);
    }

    render() {
        return (
            <SafeAreaView style={this.styles.container}>
                <Icon
                    raised
                    name='hotel'
                    type='font-awesome-5'
                    color={'#0e4582'}
                    size={60}/>
                <Text style={this.styles.text}>Ký túc xá</Text>
            </SafeAreaView>
        );
    }

    styles = StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: '#0e4582',
        },
        text:{
            fontWeight: "bold",
            color: "white",
            fontSize: 35,
            fontFamily: 'serif'
        }
    });
}