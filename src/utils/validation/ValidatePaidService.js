import * as Yup from "yup";

export const PaidServiceSchema = Yup.object().shape({
    serviceName: Yup.string()
        .required('Tên dịch vụ rỗng!'),
    unit: Yup.string()
        .required('Đơn vị tính rỗng!'),
    price: Yup.string()
        .required('Giá dịch vụ rỗng!')
        .test(
            'Is positive?',
            'Giá dịch vụ rỗng!',
            (value) => value > 0
        ),
});
