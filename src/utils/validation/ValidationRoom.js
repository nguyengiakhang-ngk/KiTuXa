import * as Yup from "yup";

export const RoomSchema = Yup.object().shape({
    typeOfRoomId : Yup.string()
        .required('Loại phòng rỗng!'),
    roomName: Yup.string()
        .required('Tên phòng rỗng!'),
    note: Yup.string()
        .required('Lưu ý rỗng!')
});
