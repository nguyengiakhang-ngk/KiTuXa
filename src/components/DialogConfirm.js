import React from 'react';
import {Modal, View, Text} from 'react-native';
import {font,text_size, width, flex} from "../utils/styles/MainStyle";
import AppButtonActionInf from "./AppButtonActionInf";
import {color_danger, color_primary} from "../utils/theme/Color";

export default class DialogConfirm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal animationType={'fade'} isVisible={true} transparent={true}>
                <View
                    style={[
                        {
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    ]}
                >
                    <View
                        style={[
                            {
                                width: '90%',
                                backgroundColor: 'white',
                                borderRadius: 5,
                                padding: 15
                            }
                        ]}
                    >
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
                                {this.props.content}
                            </Text>
                        </View>
                        <View
                            style={[
                                width.w_100,
                                flex.flex_row,
                                {paddingLeft: 15, paddingRight: 15, marginTop: 20, justifyContent: "flex-end"}
                            ]}
                        >
                            <View
                                style={[
                                    {
                                        width: '30%',
                                        marginRight: 15
                                    }
                                ]}
                            >
                                <AppButtonActionInf
                                    size={6}
                                    textSize={14}
                                    bg={color_danger}
                                    onPress = { () => { this.props.cancel() } }
                                    title="Không"
                                />
                            </View>
                            <View
                                style={[
                                    {
                                        width: '30%'
                                    }
                                ]}
                            >
                                <AppButtonActionInf
                                    size={6}
                                    textSize={14}
                                    bg={color_primary}
                                    onPress = { () => { this.props.confirm() } }
                                    title="Có"
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}
