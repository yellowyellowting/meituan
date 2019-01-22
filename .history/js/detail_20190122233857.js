
// 获取餐馆信息
(function() {
    var id = getQueryString("id");
    if (!id) {
        alert("餐馆ID不能为空");
        location.assign('./home.html');
        return;
    }
    getRequest("http://127.0.0.1:8081/getMerchant?id=" + id, function(json) {
        if () {
            
        }
    });
})();