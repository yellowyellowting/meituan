
// 获取餐馆信息
var detailsContainr = document.querySelector(".details");
var preferentialContainer = document.querySelectorAll(".preferential .preferential-contents .contents")[0];

(function() {
    var id = getQueryString("id");
    if (!id) {
        alert("餐馆ID不能为空");
        location.assign('./home.html');
        return;
    }

    function render(merchant) {
        // console.log(merchant);
      
        var details = `
        <div class="d-left">
            <div class="shop-info">
                <p class="name">${merchant.name}</p>

                <span class="flag">
                    <i class="iconfont icon-chakanshipinanquandangan-"></i>食品安全档案</span>
                <div class="clear"></div>
            </div>
            <div class="price-info">
                <div class="score">
                    <div class="star-cont">
                        <ul class="star-scor">
                            <li>
                                <i class="iconfont icon-Starlarge"></i>
                            </li>
                            <li> 
                                <i class="iconfont icon-Starlarge"></i>
                            </li>
                            <li> 
                                <i class="iconfont icon-Starlarge"></i>
                            </li>
                            <li> 
                                <i class="iconfont icon-Starlarge"></i>
                            </li>
                            <li> 
                                <i class="iconfont icon-Starlargegray"></i>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="price">
                    <span>4.5分</span>
                    <span>人均￥</span>
                    <span>${merchant.sell_price}</span>
                </div>
            </div>
            <div class="address">
                <p>地址：${merchant.detail_address}</p>
                <p>电话：028-63927655</p>
                <p>营业时间：周一至周日 10:30-22:00</p>
            </div>
            <div class="tags">
                <img src="../images/wifi.png" />
                <p>提供wifi</p>
            </div>
        </div>
        <div class="d-right">
            <div class="big-picture-container">
                <img class="big-picture" src="${merchant.logo}" />
            </div>
            <div>
                <img class="picture" src="${merchant.logo}" />
                <img class="picture" src="${merchant.logo}" />
                <img class="picture" src="${merchant.logo}" />
                <img class="picture" src="${merchant.logo}" />
            </div>
        </div>
   
        `;
        detailsContainr.innerHTML = details;
        for(let i = 0; i < 6; i++) {
            var preferentialContents = 
            `
            <div class="content">
            <img src="${merchant.logo}" />
            <div class="dishe-info">
                <p class="title">T${merchant.name}份</p>
                <img src="../images/tuangou.png" />
                <div class="clear"></div>
                <div class="count">
                    <span>已售</span>
                    <span>340</span>
                </div>
                <div class="price-info">
                    <span>￥</span>
                    <span class="price">${merchant.sell_price}</span>
                    <span class="store-price">${merchant.average_price}</span>
                </div>
                <a href="#" class="buy">立即抢购</a>
            </div>

            <div class="clear"></div>
            <div class="line"></div>
        </div>
            `;

        preferentialContainer.innerHTML += preferentialContents;
        }
        
    }

    getRequest("http://127.0.0.1:8081/getMerchant?id=" + id, function(json) {
        var result = JSON.parse(json);
        if (result.code == 200) {
            render(result.data);
        }
    });
})();





var logos = [
    {
        name:"黑胡椒传奇牛排",
        address:"http://p0.meituan.net/bbia/bbd374318de0525874a0dc6aa4b91c3f1655118.jpg@130w_130h_1e_1c"
    },
    {
        name:"烤五花肉",
        address:"http://p0.meituan.net/xianfu/6bf5028a79332669e6d8849feefe37a2488995.jpg@130w_130h_1e_1c"
    },
    {
        name:"铁板包浆豆腐",
        address:"http://p0.meituan.net/wmproduct/3a99678c3e12d32b654c8b70e91cfc2e2697007.jpg@130w_130h_1e_1c"
    },
    {
        name:"秘制烤大茄",
        address:"http://p1.meituan.net/xianfu/08894f3116b5b3023f738d5538f706cb57344.jpg@130w_130h_1e_1c"
    },
    {
        name:"烤鲫鱼",
        address:"http://qcloud.dpfile.com/pc/uD-WQKhCr4JggFQqGfp0EsAFpkJcFmis1szRm_Tvfs6gIbJD8GKLqwuaV3nbKTnAmXKqvF8xz-Pgbz9r8ffpSA.jpg"
    },
    {
        name:"小肠",
        address:"http://qcloud.dpfile.com/pc/Iop6eFgOr-FLUS4gzQMbf7U3WvU4h4HmqFyDE_--VQDpqgHCEFxBuLckrxTb3PPdmXKqvF8xz-Pgbz9r8ffpSA.jpg"
    },
];
var imgBox = document.querySelector(".img-box .img-lists");
for (let i = 0; i < logos.length; i++) {
    var imgBoxcontents = 
    `
    <li>
    <div class="pic">
        <img src="${logos[i].address}" />
        <div class="truncate">
            <p>${logos[i].name}</p>
        </div>
    </div>
</li>
    `
    imgBox.innerHTML += imgBoxcontents;
}

   

