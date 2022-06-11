import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
    background_color,
    font,
    height,
    position,
    text_size,
} from "../../../utils/styles/MainStyle";
const QRCode = ({ navigation }) => {
    const [id, setId] = useState("");
    const onView = () => {
        if (id !== "") {
            navigation.navigate("", { id });
        } else {
            alert("Không nhận diện được mã qr !");
        }
    }
    return (
        <QRCodeScanner
            onRead={({ data }) => { setId(data) }}
            flashMode={RNCamera.Constants.FlashMode.off}
            bottomContent={
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                }}>
                    <TouchableOpacity style={[
                        background_color.primary,
                        {
                            padding: 10,
                            paddingLeft: 20,
                            paddingRight: 20,
                            borderRadius: 5,
                        },
                    ]}
                        onPress={onView}
                    >
                        <Text style={[
                            text_size.xs,
                            font.serif,
                            {
                                color: "#FFFFFF"
                            }
                        ]}>Xem Chi tiết</Text>
                    </TouchableOpacity>
                </View>
            }
        />
    )
}

export default QRCode;