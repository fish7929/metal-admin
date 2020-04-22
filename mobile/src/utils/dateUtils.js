function addZero(num) {
    if (num > 9) {
        return num;
    } else {
        return "0" + num;
    }
}
export function formateDate(time) {
    if (!time) return '';
    let date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();
    return year + "-" + (addZero(month)) + "-" + (addZero(day))
        + ' ' + (addZero(hours)) + ":" + (addZero(minutes)) + ":" + (addZero(second));
}