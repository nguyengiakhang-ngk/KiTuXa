import React, {Component} from 'react';
import {
    Keyboard, ScrollView, Text, TouchableWithoutFeedback, View
} from 'react-native';
import {doAddArea, doGetListArea} from "../../../redux/actions/area";
import { connect } from "react-redux";
import {doGetListRoom} from "../../../redux/actions/room";
import {font, text_size, width} from "../../../utils/styles/MainStyle";
import ModalSelectMutiselect from "../../../components/ModalSelectMutiselect";

const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

class AddMaterialScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            rooms: []
        }
    }

    componentDidMount() {
        this.removeWillFocusListener = this.props.navigation.addListener(
            'focus', () => {
                this.getRoom();
            }
        );
    }

    componentWillUnmount() {
        this.removeWillFocusListener();
    }

    getRoom(){
        this.props.doGetListRoom({userId: this.props.user.user.id}).then(data => {
            this.setState({
                rooms: data.map(item => ({id: item.id, name: item.roomName, checked: false}))
            })
        })
    }

    render() {
        return (
            <ScrollView
                style={{ flex: 1}} contentContainerStyle={{ flexGrow: 1 }}
            >
                <View
                    style={[
                        width.w_100,
                        {paddingLeft: 15, paddingRight: 15, marginTop: 15}
                    ]}
                >
                    <ModalSelectMutiselect
                        data={this.state.rooms}
                        onChangeSelect={(value) => {
                            this.state.rooms[value].checked = !this.state.rooms[value].checked;
                            this.setState({
                                rooms: this.state.rooms
                            })
                        }}
                    />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = ({user}) => {
    return {user};
};

const mapDispatchToProps = {
    doAddArea,
    doGetListArea,
    doGetListRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMaterialScreen)

