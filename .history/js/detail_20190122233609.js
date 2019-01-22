
// 获取餐馆信息
(function() {

    var id = getQueryString("id");
    if (!id) {

    }


    getRequest("http://127.0.0.1:8081/getMerchant?id=104", function(json) {
        console.log(json);
    });
})();