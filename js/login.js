// 登录页面
var validateInfo = document.getElementsByClassName("validate-info")[0];
var account = document.getElementsByName("account")[0];
var password = document.getElementsByName("password")[0];
var validateTip = document.getElementsByClassName("validateTip")[0];
var remend = document.getElementsByClassName("remend")[0];
var btn = document.getElementsByClassName("btn")[0];
var oCheck = document.getElementsByClassName("check")[0];


function showErrorTip(message) {
    validateInfo.setAttribute("active", "true");
    validateTip.innerText = message;
}

function checkCount() {
    if (account.value != "") {
        if (password.value == "") {
            validateInfo.setAttribute("active", "true");
            validateTip.innerText = "请输入密码";
            password.classList.add("err");
            return false;
        } else {
            validateInfo.removeAttribute("active", "true");
            validateTip.innerText = "";
            password.classList.remove("err");
            account.classList.remove("err");
            return true;
        }
    } else {
        if (password.value == "") {
            validateInfo.setAttribute("active", "true");
            validateTip.innerText = "请输入账号和密码";
            password.classList.add("err");
            account.classList.add("err");
            return false;
        } else {
            validateInfo.setAttribute("active", "true");
            validateTip.innerText = "请输入账户";
            account.classList.add("err");
            return false;
        }
    }
}

function wantToLogin() {
    if (checkCount()) {
        dologin(account.value, password.value);
    }
}

// AJAX数据传参
function dologin(mobile, password) {
    postRequest("login", "mobile=" + mobile + "&password=" + password, function(json) {
        var result = JSON.parse(json);
        console.info(result);
        if (result.code == 200) {
            setCookie("userInfo", JSON.stringify(result.data));//成功便设置cookie
            alert("登录成功");
            // location.assign("./home.html");
            history.back();
        } else {
            showErrorTip(result.message)
        }
    });
}


btn.onclick = wantToLogin;

// 回车键登录事件
var myBody = document.querySelector("body");//事件委托
myBody.onkeydown = function () {
    //回车键的键值为13
    if (event.keyCode == 13) {
        wantToLogin();
    } 
}