import * as Yup from "yup";

export const BillsSchema = Yup.object().shape({
    nameOfBill: Yup.string()
        .required('Vui lòng nhập tên hóa đơn!'),
    dateOfPayment: Yup.string()
        .required('Vui lòng nhập ngày thu tiền!'),
    discount: Yup.string()
        .required('Vui lòng nhập số % giảm giá!'),
    forfeit: Yup.string()
        .required('Vui lòng nhập tiền phạt!'),
    total: Yup.string()
        .required('Vui lòng nhập tổng số tiền!'),
    status: Yup.string()
        .required('Chưa chọn tình trạng!'),
    note: Yup.string()
        .required('Vui lòng nhập ghi chú vào!')
});
