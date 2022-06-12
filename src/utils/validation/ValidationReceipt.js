import * as Yup from "yup";

export const ReceiptSchema = Yup.object().shape({
    amountOfMoney: Yup.string()
        .required('Vui lòng nhập số tiền!'),
    paymentMethod: Yup.string()
        .required('Vui lòng chọn phương thức thanh toán!'),
    note: Yup.string()
        .required('Vui lòng nhập ghi chú!')
});
