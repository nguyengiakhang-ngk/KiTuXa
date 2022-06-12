import * as Yup from "yup";

export const TroubleSchema = Yup.object().shape({
    name: Yup.string()
        .required('Vui lòng nhập tên sự cố!')
});
