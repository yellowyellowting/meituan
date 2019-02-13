// 注册页面
// 手机号验证
var tell = document.getElementsByName("tell")[0];
var tip = document.getElementsByClassName("tip")[0];
var tellRemend = document.getElementsByClassName("tellRemend")[0];

function checkMobile() {
    var tellValues = tell.value;
    var reg = /1[0-9]{10}/g;
    if (tellValues == "") {
        tell.classList.add("err");
        tip.innerText = "请输入您的手机号";
        tellRemend.setAttribute("active", "true");
        return false;
    } else {
        if (reg.test(tellValues)) {
            tell.classList.add("right");
            tip.innerText = "";
            return true;
        } else {
            tell.classList.add("err");
            tellRemend.setAttribute("active", "true");
            tip.innerText = "号码无效，请重新注册";
            return false;
        }
    }
}

tell.onfocus = function () {
    tell.classList.remove("err");
    tip.innerText = "";
    tellRemend.removeAttribute("active", "true");
}

tell.onblur = checkMobile;

// 密码验证
var password = document.getElementsByName("password")[0];
var passwordTip = document.getElementsByClassName("passwordTip")[0];
var passwordRemend = document.getElementsByClassName("passwordRemend")[0];

function checkPassword() {
    var passwordValues = password.value;
    var reg = /[~\dA-z]{9,}/g;
    if (passwordValues == "") {
        password.classList.add("err");
        passwordRemend.setAttribute("active", "true");
        passwordTip.innerText = "请输入您的密码";
        return false;
    } else {
        if (reg.test(passwordValues)) {
            password.classList.add("right");
            return true;
        } else {
            password.classList.add("err");
            passwordRemend.setAttribute("active", "true");
            passwordTip.innerText = "请输入包含数字、字母和~的正确的密码";
            return false;
        }
    }
}

password.onblur = checkPassword;

password.onfocus = function () {
    password.classList.remove("err");
    passwordRemend.removeAttribute("active", "true");
    passwordTip.innerText = "";
}

// 再次确认密码
var repassword = document.getElementsByName("repassword")[0];
var repasswordTip = document.getElementsByClassName("repasswordTip")[0];
var repasswordRemend = document.getElementsByClassName("repasswordRemend")[0];

function checkRepassword() {
    var passwordValues = password.value;
    var repasswordValues = repassword.value;

    if (repasswordValues == "") {
        repassword.classList.add("err");
        repasswordRemend.setAttribute("active", "true");
        repasswordTip.innerText = "请确认您的密码";
        return false;
    } else {
        if (repasswordValues == passwordValues) {
            repassword.classList.add("right");
            return true;
        } else {
            repassword.classList.add("err");
            repasswordRemend.setAttribute("active", "true");
            repasswordTip.innerText = "两次输入密码不一致，请重新输入";
            return false;
        }
    }
}

repassword.onblur = checkRepassword;

repassword.onfocus = function () {
    repassword.classList.remove("err");
    repasswordRemend.removeAttribute("active", "true");
    repasswordTip.innerText = "";
}

var verifycode = document.getElementsByName("verifycode")[0];
var verifycodeTip = document.getElementsByClassName("verifycodeTip")[0];
var codeRemend = document.getElementsByClassName("codeRemend")[0];

function checkVerifyCode() {
    var verifycodeValues = verifycode.value;
    var reg = /\d{4}/g;
    if (verifycodeValues == "") {
        verifycode.classList.add("err");
        codeRemend.setAttribute("active", "true");
        verifycodeTip.innerText = "请输入短信动态码";
        return false;
    } else {
        if (reg.test(verifycodeValues)) {
            verifycode.classList.add("right");
            return true;
        } else {
            verifycode.classList.add("err");
            codeRemend.setAttribute("active", "true");
            verifycodeTip.innerText = "短信动态码不正确，请重新输入";
            return false;
        }
    }
}

verifycode.onblur = checkVerifyCode;

verifycode.onfocus = function () {
    verifycode.classList.remove("err");
    codeRemend.removeAttribute("active", "true");
    verifycodeTip.innerText = "";
}

function wantToRegister() {
    var correct = true;
    if (!checkMobile()) {
        correct = false;
    }
    if (!checkVerifyCode()) {
        correct = false;
    }
    if (!checkPassword()) {
        correct = false;
    }
    if (!checkRepassword()) {
        correct = false;
    }
    if (correct) {
        doRegister(tell.value, password.value);
    }
}

// AJAX数据传参
function doRegister(mobile, password) {
    postRequest("register", "mobile=" + mobile + "&password=" + password, function(json) {
        var result = JSON.parse(json);
        console.info(result);
        alert(result.message);
        if (result.code == 200) {
            location.assign("./login.html");//location跳转实现
        }
    });
}

var regiterBtn = document.querySelector(".agreeRgiste");

regiterBtn.onclick = wantToRegister;

// 回车键登录事件
var myBody = document.querySelector("body");//事件委托
myBody.onkeydown = function () {
    if (event.keyCode == 13) {
        wantToRegister();
    } //回车键的键值为13
}

