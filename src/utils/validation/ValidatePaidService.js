import * as Yup from "yup";

export const PaidServiceSchema = Yup.object().shape({
    serviceName: Yup.string()
        .required('Tên dịch vụ rỗng!'),
    unit: Yup.string()
        .required('Đơn vị tính rỗng!')
});
