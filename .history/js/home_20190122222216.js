
// 轮播图
(function (carousel) {

    var carousels = carousel.querySelectorAll(".carousel");
    var indicators = carousel.querySelectorAll(".carousel-indicators > .item");
    var nextBtn = carousel.querySelector(".carousel-control.right");
    var prevBtn = carousel.querySelector(".carousel-control.left");

    // console.log(carousels);
    // console.log(indicators);
    // console.log(nextBtn);
    // console.log(prevBtn);

    var total = Math.min(carousels.length, indicators.length);
    var currPosition = 0;

    var interval;

    function switchCarousel(position) {
        currPosition = (position + total) % total;
        // console.log("position: " + position + ", currPosition: " + currPosition);
        for (var i = 0; i < total; i++) {
            if (i == currPosition) {
                carousels[i].setAttribute("active", true);
                indicators[i].setAttribute("active", true);
            } else {
                carousels[i].removeAttribute("active");
                indicators[i].removeAttribute("active");
            }
        }
    }

    function startCarousel() {
        interval = setInterval(function () {
            switchCarousel(currPosition + 1);
        }, 2000);
    }


    function stopCarousel() {
        clearInterval(interval);
    }

    carousel.onmouseover = function () {
        stopCarousel();
    }

    carousel.onmouseout = function () {
        startCarousel();
    }

    prevBtn.onclick = function () {
        switchCarousel(currPosition - 1);
    }
    nextBtn.onclick = function () {
        switchCarousel(currPosition + 1);
    }

    for (let i = 0; i < indicators.length; i++) {
        indicators[i].onclick = function () {
            switchCarousel(i);
        }
    }
    startCarousel();
})(document.querySelector(".banner-slider"));

// 选项卡切换
function selectCard(container) {

    var navItems = container.querySelectorAll(".nav-item");
    var selectedIcon = container.querySelectorAll(".selected-icon");
    var selectedItmes = container.querySelectorAll(".selected-itmes");


    console.log(container);
    // console.log(selectedIcon);
    // console.log(selectedItmes);

    var currNavItems = 0;
    for (let i = 0; i < navItems.length; i++) {
        console.log(111);
        navItems[i].onmouseover = function () {
            for (let j = 0; j < selectedItmes.length; j++) {
                if (i == j) {
                    selectedItmes[j].setAttribute("active", "true");
                    selectedIcon[j].setAttribute("active", "true");
                } else {
                    selectedItmes[j].removeAttribute("active");
                    selectedIcon[j].removeAttribute("active");
                }
            }
        }
    }
}



var navs = [
    {
        title: "美食",
        icon: "icon-food"
    },
    {
        title: "外卖",
        icon: "icon-meituan2"
    },
    {
        title: "酒店",
        icon: "icon-jiudian1"
    },
    {
        title: "榛果民宿",
        icon: "icon-minsux"
    },
    {
        title: "猫眼电影",
        icon: "icon-icon_-maoyan"
    },
    {
        title: "机票/火车票",
        icon: "icon-feiji"
    },
    {
        title: "休闲娱乐/KTV",
        icon: "icon-shenghuofuwu"
    },
    {
        title: "生活服务",
        icon: "icon-shenghuofuwu"
    },
    {
        title: "丽人/美发/医学美容",
        icon: "icon-meirong1"
    },
    {
        title: "结婚/婚纱摄影/婚宴",
        icon: "icon-jiehun"
    },
    {
        title: "亲子/儿童乐园/幼教",
        icon: "icon-qinzi"
    },
    {
        title: "家装/建材/家居",
        icon: "icon-jiazhuang"
    },
    {
        title: "学习培训/音乐培训",
        icon: "icon-xuexi"
    },
    {
        title: "医疗健康/宠物/爱车",
        icon: "icon-yiliaojiankang"
    },
    {
        title: "酒吧/密室逃脱",
        icon: "icon-jiuba"
    }
];

var navWrapper = document.querySelector(".category-nav-content-wrapper .list");

for (let i = 0; i < navs.length; i++) {
    var str =
        `
        <li class="nav-li">
            <i class="iconfont ${navs[i].icon}"></i>
            <span class="nav-text-wrapper">
                <a href="#">${navs[i].title}</a>
            </span>
            <i class="iconfont icon-arrow-right"></i>
            <div class="sub-nav">
                <div class="sub-nav-title">
                    <p>${navs[i].title}</p>
                    <div class="sub-nav-more">
                        <span>更多</span>
                        <i class="iconfont icon-icon-more"></i>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="sub-nav-content">
                    <span>${navs[i].title}</span>
                    <span>${navs[i].title}</span>
                    <span>${navs[i].title}</span>
                    <span>${navs[i].title}</span>
                    <span>${navs[i].title}</span>
                </div>
            </div>
        </li>
        `
    navWrapper.innerHTML += str;
}

// 有格调
(function (container) {
    var qualityTitles = container.querySelector('.quality-titles');
    var qualityContents = container.querySelector('.quality-contents');

    function renderTitleItem(title, position) {
        var html = `
            <li class="nav-item">${title}
                <div class="selected-icon" ${position == 0 ? 'active="true"' : ''}></div>
            </li>
        `;
        qualityTitles.innerHTML += html;
    }

    function renderContentItem(qualities, position) {
        var innerHtml = "";
        qualities.forEach(function (quality) {
            innerHtml += `
                <a href="./detail.html?id=${quality.id}">
                    <div class="quality-img">
                        <img src="${quality.logo}" />
                    </div>
                    <div class="poi-info">
                        <div class="title" title="${quality.name}">${quality.name}</div>
                        <div class="sub-title" title="${quality.subTitle}">${quality.promotion_info}</div>
                        <div class="price-info">
                            <div class="current-price-wrapper">
                                <span class="price-symbol numfont">¥</span>
                                <span class="current-price numfont">${quality.average_price}</span>
                                <span class="old-price">门市价¥${quality.sell_price}</span>
                                <span class="sold bottom-right-info">${quality.short_address}</span>
                            </div>
                        </div>
                    </div>
                </a>
            `;
        });
        qualityContents.innerHTML += `<div class="selected-itmes" ${position == 0 ? 'active="true"' : ''} >${innerHtml}</div>`;
    }

    function render(qualities) {
        if (qualities) {
            qualities.forEach(function (element, index) {
                renderTitleItem(element.category, index)
                renderContentItem(element.remendList, index);
            });
        }
        selectCard(container);
    }

    getRequest("http://127.0.0.1:8081/getQualities", function (json) {
        var result = JSON.parse(json);
        if (result.code == 200) {
            render(result.data);
        }
    });

})(document.querySelector('.quality-container'));


//很优惠渲染

(function (container) {
    var cheapTitles = container.querySelector('.cheap-titles');
    var cheapContents = container.querySelector('.cheap-cotents');

    function renderTitleItem(title, position) {
        var html = `
            <li class="nav-item">${title}
                <div class="selected-icon" ${position == 0 ? 'active="true"' : ''}></div>
            </li>
        `;
        cheapTitles.innerHTML += html;
    }

    function renderContentItem(qualities, position) {
        var innerHtml = "";
        qualities.forEach(function (cheap) {
            innerHtml += `
            <a href="#">
            <div class="cheap-img">
                <img src="${cheap.url}" />
            </div>
            <div class="poi-info">
                <div class="title" title="${cheap.title}">${cheap.title}</div>
                <div class="sub-title" title="${cheap.subTitle}">${cheap.subTitle}"</div>
                <div class="tags-wrapper">
                    <div class="tag">退</div>
                    <div class="tag">改签</div>
                </div>
                <div class="price-info">
                    <div class="current-price-wrapper">
                        <span class="price-symbol numfont">¥</span>
                        <span class="current-price numfont">${cheap.currentPrice}</span>
                        <span class="old-price">${cheap.oldPrice}</span>
                        <span class="sold bottom-right-info">${cheap.sold}</span>
                    </div>
                </div>
            </div>
        </a>
            `;
        });
        cheapContents.innerHTML += `<div class="selected-itmes" ${position == 0 ? 'active="true"' : ''} >${innerHtml}</div>`;
    }



    function render(cheaps) {
        if (cheaps) {
            cheaps.forEach(function (element, index) {
                renderTitleItem(element.category, index)
                renderContentItem(element.remendList, index);
            });
        }
        selectCard(container);
    }
    getRequest("http://127.0.0.1:8081/getCheaps", function (json) {
        var result = JSON.parse(json);
        if (result.code == 200) {
            render(result.data);
        }
    });

})(document.querySelector('.offer-container'));


// 猫眼电影渲染
// 轮播函数
function Slider(slider) {
    var sliderContent = slider.querySelector(".slider-content");
    var leftScrollBtn = slider.querySelector(".slider-control.left");
    var rightScrollBtn = slider.querySelector(".slider-control.right");
    var sliderItems = slider.querySelectorAll(".slider-item-film");
    var itemsWidth = sliderItems[0].clientWidth * sliderItems.length;
    console.log(itemsWidth);

    // var sliderDist = sliderContent.clientWidth;
    // var maxScrollDist = sliderContent.children[0].clientWidth;

    var currLeft = 0;

    leftScrollBtn.onclick = function () {
        // if (sliderContent.scrollLeft - sliderDist > 0) {
        //     sliderContent.scrollLeft -= sliderDist;
        // }

        if ((itemsWidth - currLeft - slider.clientWidth) > 0)
            console.log(itemsWidth - currLeft - slider.clientWidth);
        currLeft += slider.clientWidth;
        sliderContent.style.left = currLeft + "px";
        // console.log(sliderContent.style.left);
    }
    rightScrollBtn.onclick = function () {
        // if (sliderContent.scrollLeft + sliderDist <= maxScrollDist) {
        //     sliderContent.scrollLeft += sliderDist;
        // }
        if ((itemsWidth - currLeft - slider.clientWidth) > 0)
            console.log(itemsWidth - currLeft - slider.clientWidth);
        currLeft -= slider.clientWidth;
        sliderContent.style.left = currLeft + "px";
        // console.log(sliderContent.style.left);
    }
}
// 数据渲染
(function (container) {
    var flimTitles = container.querySelector('.film-titles');
    var flimContents = container.querySelector('.film-contents');

    function renderTitleItem(title, position) {
        var html = `
            <li class="nav-item">${title}
                <div class="selected-icon" ${position == 0 ? 'active="true"' : ''}></div>
            </li>
        `;
        flimTitles.innerHTML += html;
    }

    function renderContentItem(flims, position) {
        var innerHtml = "";
        flims.forEach(function (film) {
            innerHtml += `
            <div class="slider-item-film">
            <a href="#">
            <img class="film-img" src="${film.url}" />
                                                <img class="imax3d" src="${film.subUrl}" />
                                                <div class="film-info">
                                                    <p class="film-score">
                                                        观众评 <span>9.1</span>
                                                    </p>
                                                    <p class="film-name">${film.title}</p>
                                                    <span class="buy-ticket">购票</span>
                                                </div>
                                            </a>
                                        </div>
            `;
        });
        flimContents.innerHTML += `
        <div class="slider selected-itmes" ${position == 0 ? 'active="true"' : ''}>
            <div class="slider-content"> ${innerHtml}</div>
            <div class="slider-control left">
                <i class="iconfont icon-icon-left"></i>
            </div>
            <div class="slider-control right">
                <i class="iconfont icon-icon-right"></i>
            </div>
        </div>
   `;
    }

    function render(flims) {
        if (flims) {
            flims.forEach(function (element, index) {
                renderTitleItem(element.category, index)
                renderContentItem(element.remendList, index);
            });
        }
        selectCard(container);
    }
    getRequest("http://127.0.0.1:8081/getFilms", function (json) {
        var result = JSON.parse(json);
        if (result.code == 200) {
            render(result.data);
        }
        var slider = document.querySelectorAll(".slider");
        for (let i = 0; i < slider.length; i++) {
            Slider(slider[i]);
        }
    });

})(document.querySelector('.maoyan-container'));


// 民宿数据渲染
(function (container) {
    var minsuTitles = container.querySelector('.minsu-titles');
    var minsuContents = container.querySelector('.minsu-contents');

    function renderTitleItem(title, position) {
        var html = `
            <li class="nav-item">${title}
                <div class="selected-icon" ${position == 0 ? 'active="true"' : ''}></div>
            </li>
        `;
        minsuTitles.innerHTML += html;
    }

    function renderContentItem(minsus, position) {
        var innerHtml = "";
        minsus.forEach(function (minsu) {
            innerHtml += `
            <a href="#">
            <div class="quality-img minsu-img">
                <img src="${minsu.url}" />
            </div>
            <div class="poi-info">
                <div class="title" title="${minsu.title}">${minsu.title}</div>
                <div class="sub-title" title="${minsu.subTitle}">${minsu.subTitle}</div>
                <div class="price-info">
                <div class="current-price-wrapper">
                    <span class="price-symbol numfont">¥</span>
                    <span class="current-price numfont">${minsu.currentPrice}</span>
                    <span class="old-price"></span>
                    <span class="sold bottom-right-info"></span>
                </div>
                </div>
            </div>
        </a>
            `;
        });
        minsuContents.innerHTML +=
            `<div class="selected-itmes quality-contents" ${position == 0 ? 'active="true"' : ''} >${innerHtml}</div>`;
    }

    function render(minsus) {
        if (minsus) {
            minsus.forEach(function (element, index) {
                renderTitleItem(element.category, index)
                renderContentItem(element.remendList, index);
            });
        }
        selectCard(container);
    }
    getRequest("http://127.0.0.1:8081/getMinsu", function (json) {
        var result = JSON.parse(json);
        if (result.code == 200) {
            render(result.data);
        }
    });
})(document.querySelector('.zhenguo-container'));

// 猜你喜欢
(function (container) {
    var likeTitles = container.querySelector('.like-titles');
    var likeContents = container.querySelector('.like-contents');

    function renderTitleItem(title, position) {
        var html = `
            <li class="nav-item">${title}
                <div class="selected-icon" ${position == 0 ? 'active="true"' : ''}></div>
            </li>
        `;
        likeTitles.innerHTML += html;
    }

    function renderContentItem(qualities, position) {
        var innerHtml = "";
        qualities.forEach(function (likes) {
            innerHtml += `
            <a href="#">
                    <div class="quality-img">
                        <img src="${likes.url}" />
                    </div>
                    <div class="poi-info">
                        <div class="title" title="${likes.title}">${likes.title}</div>
                        <div class="sub-title" title="${likes.subTitle}">${likes.subTitle}</div>
                        <div class="price-info">
                            <div class="current-price-wrapper">
                                <span class="price-symbol numfont">¥</span>
                                <span class="current-price numfont">${likes.currentPrice}</span>
                                <span class="old-price">${likes.oldPrice}</span>
                                <span class="sold bottom-right-info">${likes.sold}</span>
                            </div>
                        </div>
                    </div>
                </a>
            `;
        });
        likeContents.innerHTML += `<div class="cheap-cotents selected-itmes" ${position == 0 ? 'active="true"' : ''} >${innerHtml}</div>`;
    }



    function render(likes) {
        if (likes) {
            likes.forEach(function (element, index) {
                renderTitleItem(element.category, index)
                renderContentItem(element.remendList, index);
            });
        }
        selectCard(container);
    }
    getRequest("http://127.0.0.1:8081/getRecomends", function (json) {
        var result = JSON.parse(json);
        if (result.code == 200) {
            render(result.data);
        }
    });

})(document.querySelector('.like-container'));





(function () {
    var userEntry = document.querySelector(".user-entry");
    var userInfo = getCookie("userInfo") ? JSON.parse(getCookie("userInfo")) : null;
    if (userInfo) {
        userEntry.innerHTML = `<a href="#" class="growth-entry">${userInfo.mobile}</a>
        <a href="#" class="extra-entry">退出</a>`;
    } else {
        userEntry.innerHTML = `<a href="./login.html" class="growth-entry">立即登录</a>
        <a href="./register.html" class="extra-entry">注册</a>`;
    }
})();



var headerSearchInput = document.querySelector(".header-search-input");
var headerSearchSuggest = document.querySelector(".header-search-suggest");
headerSearchInput.onfocus = function () {
    headerSearchSuggest.setAttribute("active", "true");
}

headerSearchInput.onblur = function () {
    headerSearchSuggest.removeAttribute("active", "true");
}


var offerContainer = document.querySelectorAll(".offer-container")[0];
var maoyanContainer = document.querySelectorAll(".maoyan-container")[0];
var minsuContainer = document.querySelectorAll(".zhenguo-container")[0];
selectCard(offerContainer);
selectCard(maoyanContainer);
selectCard(minsuContainer);


var login = document.querySelector(".growth-entry");
login.onclick = function () {
    location.assign("./login.html");
}
var registery = document.querySelector(".extra-entry");
registery.onclick = function () {
    location.assign("./register.html");
}
