import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import FormSelect from "../../../components/FormSelect";
import { materialAPI } from "../../../api/material.api";
import FormInput from "../../../components/FormInput";
import { color_primary } from "../../../utils/theme/Color";
import AppButtonActionInf from "../../../components/AppButtonActionInf";
import ItemInputMaterial from "./ItemInputMaterial";
import { formatMoney } from "../../../helps/formatMoney";
import { font, font_weight, text_size } from "../../../utils/styles/MainStyle";
import { billMaterialAPI } from "../../../api/bill-material.api";
import { uploadAPI } from "../../../api/uploadAPI";
import RNQRGenerator from 'rn-qr-generator';
const InputMaterial = ({ navigation }) => {
    const [statuses, setStatuses] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [material, setMaterial] = useState("");
    const [total, setTotal] = useState(0);

    const fetchMaterial = async () => {
        try {
            const { data } = await materialAPI.get();
            let tmp = [
                { key: "", label: "--- Chọn vật chất ---" }
            ];
            data.forEach(item => {
                tmp.push({
                    key: item?.id,
                    label: item.name
                })
            })
            setMaterials(tmp);
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        fetchMaterial();
        fetchStatus();
    }, [])

    useEffect(() => {
        let tmp = 0;
        data.forEach(item => {
            tmp += (+item.price * +item.quantity);
        })
        setTotal(tmp);
    }, [data])

    const fetchStatus = async () => {
        try {
            const { data } = await materialAPI.getStatus();
            let tmp = [
                { key: "", label: "--- Chọn tình trạng ---" }
            ];
            data.slice(0, 2).forEach(item => {
                tmp.push({
                    key: item?.id,
                    label: item.name
                })
            })
            setStatuses(tmp);
        } catch (error) {
            alert(error.message)
        }
    }

    navigation.addListener('focus', () => {
        fetchStatus()
        fetchMaterial();
        setData([]);
    });

    const checkValue = () => {
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
        const tmp = data.filter(item => item.material === material && item.status === status)
        if (tmp.length > 0) {
            alert("Đã có vật chất và tình trạng này rồi !");
            return false;
        }
        return true
    }

    const handleAdd = () => {
        if (checkValue()) {
            setData([
                ...data,
                {
                    material,
                    status,
                    price: parseFloat(price),
                    quantity: parseInt(quantity)
                }
            ])
            setMaterial("")
            setStatus("")
            setPrice(0)
            setQuantity(0)
        }
    }

    const removeData = (item) => {
        let tmp = data;
        tmp = tmp.filter(t => t !== item)
        setData(tmp)
    }

    const createDetailBill = async (idBill) => {
        try {
            await data.forEach(async (item) => {
                const detailBill = {
                    idBill: idBill,
                    idMaterial: item.material,
                    idStatusMaterial: item.status,
                    quantity: +item.quantity,
                    price: +item.price,
                }
                const arrTmp = new Array(+item.quantity).fill(0);

                await billMaterialAPI.createDetailBill(detailBill).then(async rs => {
                    let i = 0;
                    arrTmp.forEach(async (_) => {
                        i++;
                        let detailMaterial = {
                            id: `${Date.now()}-${item.material}-${item.status}-${item.quantity}-${item.price}-${i}`,
                            idMaterial: item.material,
                            idDetailBill: rs.data.id,
                            qr: ""
                        }
                        await RNQRGenerator.generate({
                            value: detailMaterial.id,
                            height: 300,
                            width: 300,
                        })
                            .then(async (response) => {
                                const { uri, width, height, base64 } = response;
                                const file = {
                                    uri: uri,
                                    type: "image/png",
                                    name: "tmp.png",
                                }
                                const { data } = await uploadAPI.uploadImage(file)
                                detailMaterial = { ...detailMaterial, qr: data.name }
                                materialAPI.addDetailMaterial(detailMaterial);
                            })
                            .catch(error => console.log('Cannot create QR code', error));
                    })

                }).catch(err => {
                    alert(err)
                });
            })
            alert("Tạo hóa đơn thành công !");
            navigation.navigate("billmaterial");
        } catch (error) {
            alert(error.message);
        }
    }

    const submit = async () => {
        try {

            const { data } = await billMaterialAPI.create({ total })
            if (data.id) {

                await createDetailBill(data.id)
            } else {
                alert("Tạo hóa đơn thất bại !");
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <View style={{
            padding: 10
        }}>
            <FormSelect label="Vật chất" data={materials} onChange={(option) => setMaterial(option.key)} selectedKey={material} />
            <FormSelect label="Tình trạng" data={statuses} onChange={option => setStatus(option.key)} selectedKey={status} />
            <FormInput lable={"Số lượng"} value={quantity} onChangeText={e => {
                if (!isNaN(e)) {
                    setQuantity(e)
                } else {
                    setQuantity(quantity)
                }
            }} />
            <FormInput lable={"Đơn giá"} value={price} onChangeText={e => {
                if (!isNaN((e))) {
                    setPrice(e)
                } else {
                    setPrice(price)
                }
            }} />
            <View style={{ marginTop: 10 }}>
                <AppButtonActionInf size={10} textSize={16} bg={color_primary} onPress={handleAdd} title="Thêm" />
            </View>

            <View>
                <FlatList data={data} renderItem={({ item }) => <ItemInputMaterial onDelete={removeData} statuses={statuses} materials={materials} item={item} />} keyExtractor={(item, index) => index.toString()} />
            </View>
            {data.length > 0 && (
                <View>
                    <Text style={[
                        { marginTop: 10 },
                        text_size.sm,
                        font_weight.f_500,
                        font.serif]}>Tổng tiền: {formatMoney(total)} VNĐ </Text>
                    <View style={{ marginTop: 10 }}>
                        <AppButtonActionInf size={10} textSize={16} bg={color_primary} onPress={submit} title="Tạo" />
                    </View>
                </View>
            )}
        </View>
    )

}

export default InputMaterial;