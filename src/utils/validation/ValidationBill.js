import * as Yup from "yup";

export const BillsSchema = Yup.object().shape({
    Ten_HD: Yup.string()
        .required('Vui lòng nhập tên hóa đơn!'),
    NgayThuTien: Yup.string()
        .required('Vui lòng nhập ngày thu tiền!'),
    GiamGia: Yup.string()
        .required('Vui lòng nhập số % giảm giá!'),
    Phat: Yup.string()
        .required('Vui lòng nhập tiền phạt!'),
    Tong: Yup.string()
        .required('Vui lòng nhập tổng số tiền!'),
    TinhTrang: Yup.string()
        .required('Chưa chọn tình trạng!'),
    GhiChu: Yup.string()
        .required('Vui lòng nhập ghi chú vào!')
});
