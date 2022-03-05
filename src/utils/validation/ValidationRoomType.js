import * as Yup from "yup";

export const RoomTypeSchema = Yup.object().shape({
    roomTypeName: Yup.string()
        .required('Tên loại phòng rỗng!'),
    price:  Yup.string()
        .required('Giá loại phòng rỗng!')
        .test(
            'Is positive?',
            'Giá loại phòng rỗng!',
            (value) => value > 0
        ),
    acreage: Yup.string()
        .required('Diện tích rỗng!')
        .test(
            'Is positive?',
            'Không hợp lệ!',
            (value) => value > 0
        ),
    totalGuest: Yup.string()
        .required('Số khách rỗng!')
        .test(
            'Is positive?',
            'Không hợp lệ!',
            (value) => value > 0
        ),
    object: Yup.string()
        .required('Đối tượng rỗng!'),
    note: Yup.string()
        .required('Lưu ý rỗng!')
});
