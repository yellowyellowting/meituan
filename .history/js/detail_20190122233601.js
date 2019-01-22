
// 获取餐馆信息
(function() {

    getQueryString("id");


    getRequest("http://127.0.0.1:8081/getMerchant?id=104", function(json) {
        console.log(json);
    });
})();