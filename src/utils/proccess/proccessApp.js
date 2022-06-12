export const cardExpiry = (val) => {
    val = Number(val);
    val = String(val);
    if (val.length > 3) {
        let res = "";
        let s = val.length;
        while (s > 3) {
            if (s === val.length) {
                res = val.substring(s - 3, s);
            } else {
                res = val.substring(s - 3, s) + "." + res;
            }
            s = s - 3;
        }
        return val.substring(0, s) ? val.substring(0, s) + "." + res : res;
    }
    return (val !== '0') ? val : "";
}
