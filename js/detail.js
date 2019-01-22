
// 获取餐馆信息
(function() {
    var id = getQueryString("id");
    if (!id) {
        alert("餐馆ID不能为空");
        location.assign('./home.html');
        return;
    }

    function render(merchant) {
        console.log(merchant);
    }

    getRequest("http://127.0.0.1:8081/getMerchant?id=" + id, function(json) {
        var result = JSON.parse(json);
        if (result.code == 200) {
            render(result.data);
        }
    });
})();