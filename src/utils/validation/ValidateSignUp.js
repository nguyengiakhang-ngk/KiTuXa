import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .required('Họ và tên rỗng!'),
    yearOfBirth: Yup.string()
        .min(4, 'Năm sinh không đúng!')
        .max(4, 'Năm sinh không đúng!')
        .required('Năm sinh rỗng!'),
    gender: Yup.string()
        .required('Chưa chọn giới tính!'),
    address: Yup.string()
        .required('Địa chỉ rỗng!'),
    identityNumber: Yup.string()
        .min(9, 'Số CMNN/CCCD không hợp lệ!')
        .max(12, 'Số CMNN/CCCD không hợp lệ!')
        .required('Số CMNN/CCCD rỗng!'),
    numberPhone: Yup.string()
        .min(10, 'Số điện thoại không hợp lệ!')
        .max(10, 'Số điện thoại không hợp lệ!')
        .required('Số điện thoại rỗng!'),
    password: Yup.string()
        .min(6, 'Mật khẩu quá ngắn!')
        .max(16, 'Mật khẩu quá dài!')
        .required('Mật khẩu rỗng!'),
    rePass: Yup.string()
        .min(6, 'Mật khẩu quá ngắn!')
        .max(16, 'Mật khẩu quá dài!')
        .required('Mật khẩu rỗng!')
});
