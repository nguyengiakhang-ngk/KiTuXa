import * as Yup from "yup";

export const ContractSchema = Yup.object().shape({
    roomId: Yup.string()
        .required('Chưa chọn phòng!'),
    ThoiHan: Yup.string()
        .required('Vui lòng nhập thời hạn!'),
    NgayThanhToan: Yup.string()
        .required('Vui lòng nhập ngày thanh toán!'),
    ChiSoDien: Yup.string()
        .required('Vui lòng nhập chỉ số điện!'),
    ChiSoNuoc: Yup.string()
        .required('Vui lòng nhập chỉ số nước!'),
    Ngay_vao: Yup.string()
        .required('Vui lòng nhập ngày vào!')
});