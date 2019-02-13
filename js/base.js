// 全局设置host地址
let defaultHost = "http://127.0.0.1:8081/";
let debugHost = localStorage.getItem("host");
const host = debugHost ? debugHost : defaultHost; //声明一个host Ip地址拼接前端传来的请求接口，避免后面因为修改IP地址导致大篇幅修改

function getRequest(config, fn) {
    // XMLHttpRequest对象用于在后台与服务器交换数据
    var url = null;
    if (typeof config == "string") {
        if (/^http:\/\/.+/.test(config)) {
            url = config;
        } else {
            url = host + config;
        }
    } else if (typeof config == "object") {
        config = Object.assign({ host }, config);
        url = config.host + config.url;
    }

    if (!url) {
        console.log('config 参数只能是对象或者字符串');
        return;
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); //xmlhttp.open("GET","test1.txt",true);method：请求的类型；GET 或 POST;url：文件在服务器上的位置;async：true（异步）或 false（同步）
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
function postRequest(path, data, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", host + path, true);
    // 添加http头，发送信息至服务器时内容编码类型
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            fn.call(this, xhr.responseText);
        }
    };
    xhr.send(data);
}


// 详情页跳转，获取地址栏的ID
function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //获取id
    var r = window.location.search.substr(1).match(reg); //返回从？开始的url
    if (r != null) {
        return unescape(r[2]); //使用 unescape() 对其解码
    }
    return null; 
}

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

// header登录显示用户名
(function () {
    var userEntry = document.querySelector(".user-entry");

    var userInfo = getCookie("userInfo") ? JSON.parse(getCookie("userInfo")) : null;
    if (userInfo) {
        userEntry.innerHTML = `<a href="./homepage.html" class="growth-entry">mt${userInfo.mobile}</a>
        <a href="#" class="extra-entry">退出</a>`;
    } else {
        userEntry.innerHTML = `<a href="./login.html" class="growth-entry">立即登录</a>
        <a href="./register.html" class="extra-entry">注册</a>`;
    }
})();

 // header点击退出
var dropOut = document.querySelector(".extra-entry");
var userEntry = document.querySelector(".user-entry");

dropOut.onclick = function() {
    if(dropOut.innerText == "退出") {
        setCookie("userInfo", "", -1); 
        userEntry.innerHTML = `<a href="./login.html" class="growth-entry">立即登录</a>
        <a href="./register.html" class="extra-entry">注册</a>`;
        var userLogin = document.querySelector(".login-container");
        userLogin.innerHTML = ` <div class="head-img-row">
        <img src="../images/avatar.jpg" />
    </div>
    <p class="user-name" onclick="login()">Hi！你好</p>
    <a class="register" href="./register.html">注册</a>
    <a class="login" href="./login.html">立即登录</a>`;
    }else{
        location.assign("./register.html");
    }
    }

