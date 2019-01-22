//创建cookie
function setCookie(name, value, expires) {
    expires = expires || (7 * 24 * 3600 * 1000);
    var d = new Date();
    d.setTime(d.getTime() + expires)
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
}

// 获取cookie
function getCookie(_name) {
    var cookie = document.cookie;
    var arr = cookie.split(";");
    for (var i = 0; i < arr.length; i++) {
        var newArr = arr[i].split("=");
        if (newArr[0] == _name) {
            return newArr[1];
        }
    }
}

function getRequest(url, fn) {
    // XMLHttpRequest对象用于在后台与服务器交换数据   
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        // readyState == 4说明请求已完成
        if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
            // 从服务器获得数据 
            fn.call(this, xhr.responseText);
        }
    };
    xhr.send();
}

// datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
function postRequest(url, data, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    // 添加http头，发送信息至服务器时内容编码类型
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            fn.call(this, xhr.responseText);
        }
    };
    xhr.send(data);
}


function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) {
        return unescape(r[2]); 
        
    return null; 
}