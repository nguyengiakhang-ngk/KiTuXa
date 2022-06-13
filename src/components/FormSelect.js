import React from "react";
import { Text, View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { font, text_size } from "../utils/styles/MainStyle";

const FormSelect = ({ label = "", onChange, data, initValue, selectedKey }) => {
    return (
        <View>
            <Text style={[
                text_size.sm,
                font.serif
            ]}>{label}</Text>
            <ModalSelector
                selectedKey={selectedKey}
                data={data}
                initValue={`---Select ${label}---`}
                onChange={onChange} />
        </View>
    )
}

export default FormSelect;