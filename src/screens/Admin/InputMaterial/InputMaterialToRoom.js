/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';
import FormSelect from '../../../components/FormSelect';
import { materialAPI } from '../../../api/material.api';
import FormInput from '../../../components/FormInput';
import { color_primary } from '../../../utils/theme/Color';
import AppButtonActionInf from '../../../components/AppButtonActionInf';
import ItemInputMaterialToRoom from './ItemInputMaterialToRoom';
import { formatMoney } from '../../../helps/formatMoney';
import { font, font_weight, text_size } from '../../../utils/styles/MainStyle';
import { billMaterialAPI } from '../../../api/bill-material.api';
import { uploadAPI } from '../../../api/uploadAPI';
import RNQRGenerator from "rn-qr-generator";
import Header from '../../../components/Header';

const InputMaterialToRoom = ({ navigation }) => {
    const title = "Nhập vật chất vào phòng"
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState("");
    const [loading, setLoading] = useState(false);
    const [statuses, setStatuses] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [material, setMaterial] = useState("");
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        let tmp = 0;
        data.forEach(item => {
            tmp += (+item.price * +item.quantity);
        })
        setTotal(tmp);
    }, [data])
    const fetchRoom = async () => {
        try {
            const { data } = await materialAPI.getRoomAdmin();
            let tmp = [{ key: "", label: "--- Chọn phòng ---" }];
            data.forEach((item) => {
                tmp.push({
                    key: item?.id,
                    label: item.roomName,
                });
            });
            setRooms(tmp);
        } catch (error) {
            alert(error.message);
        }
    }
    const fetchMaterial = async () => {
        try {
            const { data } = await materialAPI.get();
            let tmp = [{ key: "", label: "--- Chọn vật chất ---" }];
            data.forEach((item) => {
                tmp.push({
                    key: item?.id,
                    label: item.name,
                });
            });
            setMaterials(tmp);
        } catch (error) {
            alert(error);
        }
    }
    const fetchStatus = async () => {
        try {
            const { data } = await materialAPI.getStatus();
            let tmp = [{ key: "", label: "--- Chọn tình trạng ---" }];
            data.slice(0, 2).forEach((item) => {
                tmp.push({
                    key: item?.id,
                    label: item.name,
                });
            });
            setStatuses(tmp);
        } catch (error) {
            alert(error.message);
        }
    }

    const checkValue = () => {
        if (room === "") {
            alert("Chọn phòng !");
            return false
        }
        if (material === "") {
            alert("Chọn vật chất !");
            return false
        }
        if (status === "") {
            alert("Chọn tình trạng vật chất !");
            return false;
        }
        if (quantity <= 0) {
            alert("Nhập số lượng lớn hơn 0 !");
            return false;
        }
        if (price <= 0) {
            alert("Nhập giá lớn hơn 0 !");
            return false;
        }
        const tmp = data.filter(item => item.material === material && item.status === status && item.room === room)
        if (tmp.length > 0) {
            alert("Đã có vật chất và tình trạng vật chất trong phòng này rồi !");
            return false;
        }
        return true
    }


    const handleAdd = async () => {
        if (checkValue() && await checkQuantity()) {
            setData([
                ...data,
                {
                    material,
                    status,
                    price: parseFloat(price),
                    quantity: parseInt(quantity),
                    room: room
                }
            ])
            setMaterial("")
            setStatus("")
            setPrice(0)
            setQuantity(0)
            setRoom("");
        }
    }

    const checkInfo = () => {
        if (phone === "") {
            alert("Vui lòng nhập số điện thoại !");
            return false
        }
        if (address === "") {
            alert("Vui lòng nhập địa chỉ !");
            return false
        }
        return true
    }

    const updateDetailMaterial = async (id, status, quantity, room) => {
        try {
            const { data } = await materialAPI.getDetailMaterialByStatus(id, status);
            await data.slice(0, quantity).forEach(item => {
                const detailMaterial = {
                    ...item,
                    owner: room,
                    idStatusMaterial: 3
                }
                materialAPI.updateDetailMaterial(detailMaterial)
            })
        } catch (error) {
            alert(error)
        }
    }

    const createDetailBill = async (idBill) => {
        try {
            data.forEach(async (item) => {
                const detailBill = {
                    idBill: idBill,
                    idRoom: item.room,
                    idMaterial: item.material,
                    idStatusMaterial: item.status,
                    quantity: +item.quantity,
                    price: +item.price,
                }
                await billMaterialAPI.createDetailBill(detailBill)
                await updateDetailMaterial(detailBill.idMaterial, detailBill.idStatusMaterial, detailBill.quantity, detailBill.idRoom);
            })
            alert("Thêm thành công!");
            navigation.navigate("billmaterial");
        } catch (error) {
            alert(error.message);
        }
    }

    const checkQuantity = async () => {
        try {
            const { data } = await materialAPI.getDetailMaterialByStatus(material, status)
            if (data.length === 0) {
                alert("Hiện tại chưa có vật chất này !");
                return false
            }
            if (+quantity > data.length) {
                alert(`Số lượng "${getVatchatByIdVatchat(material)} (${getTypeByValueType(status)})"  không đủ cung cấp, hiện tại chỉ còn ${data.length} !`)
                return false;
            }
        } catch (error) {
            alert(error.message)
            return false;
        }
        return true;
    }

    const submit = async () => {
        setLoading(true)
        try {
            if (checkInfo()) {
                const { data } = await billMaterialAPI.create({ total, address, name, phone, kind: "export" })
                if (data.id) {
                    await createDetailBill(data.id)
                } else {
                    alert("Tạo hóa đơn thất bại !");
                }
            }
            setLoading(false)
        } catch (error) {
            alert(error.message)
            setLoading(false)
        }
    }
    const removeData = (item) => {
        let tmp = data;
        tmp = tmp.filter(t => t !== item)
        setData(tmp)
    }
    useEffect(() => {
        fetchRoom();
        fetchMaterial();
        fetchStatus();
    }, [])
    const getVatchatByIdVatchat = (id) => {
        return materials.filter(item => item.key === id)[0]?.label
    }
    const getTypeByValueType = (status) => {
        return statuses.filter(item => item.key === status)[0]?.label
    }


    navigation.addListener("focus", () => {
        fetchStatus();
        fetchMaterial();
        fetchRoom();
        setData([]);
    });


    return (
        <SafeAreaView
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <Header>Nhập vật chất cho phòng</Header>
            <ScrollView
                style={{
                    padding: 10,
                    height: "100%",
                }}
            >
                <FormSelect
                    label="Phòng"
                    data={rooms}
                    onChange={(option) => setRoom(option.key)}
                    selectedKey={room}
                />
                <FormSelect
                    label="Vật chất"
                    data={materials}
                    onChange={(option) => setMaterial(option.key)}
                    selectedKey={material}
                />
                <FormSelect
                    label="Tình trạng"
                    data={statuses}
                    onChange={(option) => setStatus(option.key)}
                    selectedKey={status}
                />
                <FormInput
                    lable={"Số lượng"}
                    value={quantity}
                    onChangeText={(e) => {
                        if (!isNaN(e)) {
                            setQuantity(e);
                        } else {
                            setQuantity(quantity);
                        }
                    }}
                />
                <FormInput
                    lable={"Đơn giá"}
                    value={price}
                    onChangeText={(e) => {
                        if (!isNaN(e)) {
                            setPrice(e);
                        } else {
                            setPrice(price);
                        }
                    }}
                />
                <View style={{ marginTop: 10 }}>
                    <AppButtonActionInf
                        size={10}
                        textSize={16}
                        bg={color_primary}
                        onPress={handleAdd}
                        title="Thêm"
                    />
                </View>

                <View style={{ maxWidth: "100%" }}>
                    {data.map((item, i) => (
                        <ItemInputMaterialToRoom
                            key={i}
                            onDelete={removeData}
                            statuses={statuses}
                            materials={materials}
                            item={item}
                            rooms={rooms}
                        />
                    ))}
                </View>
                {data.length > 0 && (
                    <View>
                        <Text
                            style={[
                                { marginTop: 10 },
                                text_size.sm,
                                font_weight.f_500,
                                font.serif,
                            ]}
                        >
                            Tổng tiền: {formatMoney(total)} VNĐ{" "}
                        </Text>

                        <FormInput
                            placeholder={"Họ và tên"}
                            value={name}
                            onChangeText={(e) => { setName(e) }}
                        />
                        <FormInput
                            placeholder={"Số điện thọai"}
                            value={phone}
                            onChangeText={(e) => { setPhone(e) }}
                        />
                        <FormInput
                            placeholder={"Địa chỉ"}
                            value={address}
                            onChangeText={(e) => { setAddress(e) }}
                        />

                        <View style={{ marginTop: 10, marginBottom: 20 }}>
                            <AppButtonActionInf
                                size={10}
                                textSize={16}
                                bg={color_primary}
                                onPress={submit}
                                title="Tạo"
                            />
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default InputMaterialToRoom;
