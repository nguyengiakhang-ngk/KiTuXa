import * as Yup from "yup";

export const FreeServiceSchema = Yup.object().shape({
    serviceName: Yup.string()
        .required('Tên dịch vụ rỗng!')
});
