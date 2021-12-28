import * as Yup from "yup";

export const AreaSchema = Yup.object().shape({
    areaName: Yup.string()
        .required('Tên khu trọ rỗng!'),
    address: Yup.string()
        .required('Địa chỉ rỗng!'),
    totalRoom: Yup.string()
        .required('Số phòng rỗng!'),
    status: Yup.string()
        .required('Tình trạng rỗng!'),
    time: Yup.string()
        .required('Giờ đóng-mở cửa rỗng!'),
    content: Yup.string()
        .required('Nội dung rỗng!'),
    description: Yup.string()
        .required('Mô tả rỗng!'),
});
