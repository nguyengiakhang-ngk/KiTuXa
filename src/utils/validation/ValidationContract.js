import * as Yup from "yup";

export const ContractSchema = Yup.object().shape({
    roomId: Yup.string()
        .required('Chưa chọn phòng!'),
    duration: Yup.string()
        .required('Vui lòng nhập thời hạn!'),
    dateOfPayment: Yup.string()
        .required('Vui lòng nhập ngày thanh toán!'),
    numberOfElectric: Yup.string()
        .required('Vui lòng nhập chỉ số điện!'),
    numberOfWater: Yup.string()
        .required('Vui lòng nhập chỉ số nước!'),
    dayIn: Yup.string()
        .required('Vui lòng nhập ngày vào!')
});