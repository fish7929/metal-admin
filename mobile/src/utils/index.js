/**
 * 根据user信息判断具体跳转到哪个页面
 */

export function getRedirectTo(type, header) {
    let path = "";
    if (type === 'dashen') {
        path = "/dashen";
    } else {
        path = "/laoban";
    }
    if (!header) {
        path += "info";
    }
    return path;
}