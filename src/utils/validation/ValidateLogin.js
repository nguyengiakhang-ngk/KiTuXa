import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, 'Tên tài khoản quá ngắn!')
        .max(50, 'Tên tài khoản quá dài!')
        .required('Tên tài khoản rỗng!'),
    pass: Yup.string()
        .min(6, 'Mật khẩu quá ngắn!')
        .max(16, 'Mật khẩu quá ngắn dài!')
        .required('Mật khẩu rỗng!')
});
