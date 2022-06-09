import * as Yup from "yup";

export const ReceiptSchema = Yup.object().shape({
    SoTien: Yup.string()
        .required('Vui lòng nhập số tiền!'),
    PT_ThanhToan: Yup.string()
        .required('Vui lòng chọn phương thức thanh toán!'),
    Ghi_Chu: Yup.string()
        .required('Vui lòng nhập ghi chú!')
});
