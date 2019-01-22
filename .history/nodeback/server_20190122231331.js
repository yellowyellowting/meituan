var getDBcon = require("./getOB.js");
var express = require("express");
var app = express();

app.listen(8081, function () {
    console.log("服务器构建完成，访问地址为 http://127.0.0.1:8081");
});

//使用bodyParser模块，接收post参数
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ entend: false }));
app.use(bodyParser.json());

//设置跨域访问（设置在所有的请求前面即可）
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == 'OPTIONS')
        res.send(200); //让options尝试请求快速结束
    else
        next();
});

// 注册
app.post("/register", function (req, res) {
    var obj = req.body;
    if (!obj.mobile) {
        res.send({
            "code": 300,
            "message": "手机号不能为空"
        });
        return;
    }
    if (!obj.password) {
        res.send({
            "code": 500,
            "message": "密码不能为空"
        });
        return;
    }
    var connection = getDBcon();
    connection.query("SELECT * FROM userinfo WHERE mobile=?", obj.mobile, function (err, result) {
        if (err) {
            res.send(err);
            connection.end();
            return;
        }
        if (result.length > 0) {
            res.send({
                "code": 402,
                "message": "此号码已注册，请直接登录"
            });
        } else {
            connection.query(`INSERT INTO userinfo (mobile, password) VALUES ("${obj.mobile}","${obj.password}")`, function (err, result) {
                if (err) {
                    res.send(err);
                    connection.end();
                    return;
                }
                res.send({
                    "code": 200,
                    "message": "注册成功"
                });
                connection.end();
            })
        }
    });
});

// 登录
app.post("/login", function (req, res) {
    var obj = req.body;
    if (!obj.mobile) {
        res.send({
            "code": 300,
            "message": "手机号不能为空"
        });
        return;
    }
    if (!obj.password) {
        res.send({
            "code": 500,
            "message": "密码不能为空"
        });
        return;
    }
    var connection = getDBcon();
    connection.query("SELECT * FROM userinfo WHERE mobile=? and password=?", [obj.mobile, obj.password], function (err, result) {
        if (err) {
            res.send(err);
            connection.end();
            return;
        }
        if (result.length > 0) {
            res.send({
                "code": 200,
                "message": "登录成功",
                "data": result[0]
            });
        } else {
            res.send({
                "code": 400,
                "message": "密码或验证码输入不正确"
            });
        }
    });
});

// 有格调
app.get("/getQualities", function (req, res) {
    var connection = getDBcon();
    var categories = connection.query("SELECT * FROM category", function(err, categories) {
        var counter = 0;
        var data = [];
        categories.forEach(function(category) {
            connection.query("SELECT * FROM merchant WHERE category_id=?", category.id, function(err, merchants) {
                data.push({
                    "category": category.name,
                    "remendList": merchants
                });
                counter++;
                if (counter == categories.length) {
                    res.send({
                        "code": 200,
                        "message": "查询成功",
                        "data": data
                    });
                }
            });
        });
    });
});

// 很优惠
app.get("/getCheaps", function (req, res) {
    res.send({
        "code": 200,
        "message": "查询成功",
        "data": [
            {
                "category": "全部",
                "remendList": [
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p1.meituan.net/deal/201208/22/1_0822151022.jpg@426w_240h_1e_1c",
                        "currentPrice": 26.9,
                        "oldPrice": "门市价¥70",
                        "sold": "已售9795"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p1.meituan.net/deal/201208/22/1_0822151022.jpg@426w_240h_1e_1c",
                        "currentPrice": 26.9,
                        "oldPrice": "门市价¥70",
                        "sold": "已售9795"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p1.meituan.net/deal/201208/22/1_0822151022.jpg@426w_240h_1e_1c",
                        "currentPrice": 26.9,
                        "oldPrice": "门市价¥70",
                        "sold": "已售9795"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p1.meituan.net/deal/201208/22/1_0822151022.jpg@426w_240h_1e_1c",
                        "currentPrice": 26.9,
                        "oldPrice": "门市价¥70",
                        "sold": "已售9795"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p1.meituan.net/deal/201208/22/1_0822151022.jpg@426w_240h_1e_1c",
                        "currentPrice": 26.9,
                        "oldPrice": "门市价¥70",
                        "sold": "已售9795"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p1.meituan.net/deal/201208/22/1_0822151022.jpg@426w_240h_1e_1c",
                        "currentPrice": 125,
                        "oldPrice": "门市价¥50",
                        "sold": "大业路"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "'上影国际影城(城中汇店)'自助午餐",
                        "url": "http://p1.meituan.net/deal/201208/22/1_0822151022.jpg@426w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥188",
                        "sold": "盐市口"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p1.meituan.net/deal/201208/22/1_0822151022.jpg@426w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥18",
                        "sold": "盐市口"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p1.meituan.net/deal/201208/22/1_0822151022.jpg@426w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥106",
                        "sold": "宽窄巷子"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p1.meituan.net/deal/201208/22/1_0822151022.jpg@426w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥2038",
                        "sold": "宽窄巷子"
                    }
                ]
            },
            {
                "category": "美食",
                "remendList": [
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p0.meituan.net/merchantpic/9492b2a8b17c5dadbdf7b16078a2bbe0109901.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥442",
                        "sold": "温江大学城"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p0.meituan.net/merchantpic/9492b2a8b17c5dadbdf7b16078a2bbe0109901.jpg@428w_240h_1e_1c",
                        "currentPrice": 125,
                        "oldPrice": "门市价¥50",
                        "sold": "大业路"
                    },
                    {
                        "title": "成都茂业JW万豪酒店·万豪中餐厅",
                        "subTitle": "'」港式点心任点任食'自助午餐",
                        "url": "http://p0.meituan.net/merchantpic/9492b2a8b17c5dadbdf7b16078a2bbe0109901.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥188",
                        "sold": "盐市口"
                    },
                    {
                        "title": "鹿野茶事（盐市口店）",
                        "subTitle": "小鹿初抹1份",
                        "url": "http://p0.meituan.net/merchantpic/9492b2a8b17c5dadbdf7b16078a2bbe0109901.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥18",
                        "sold": "盐市口"
                    },
                    {
                        "title": "班花麻辣烫（奎星楼总店）",
                        "subTitle": "开学2人餐，提供免费WiFi",
                        "url": "http://p0.meituan.net/merchantpic/9492b2a8b17c5dadbdf7b16078a2bbe0109901.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥106",
                        "sold": "宽窄巷子"
                    },
                    {
                        "title": "班花麻辣烫（奎星楼总店）",
                        "subTitle": "开学2人餐，提供免费WiFi",
                        "url": "http://p0.meituan.net/merchantpic/9492b2a8b17c5dadbdf7b16078a2bbe0109901.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥106",
                        "sold": "宽窄巷子"
                    },
                    {
                        "title": "班花麻辣烫（奎星楼总店）",
                        "subTitle": "开学2人餐，提供免费WiFi",
                        "url": "http://p0.meituan.net/merchantpic/9492b2a8b17c5dadbdf7b16078a2bbe0109901.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥106",
                        "sold": "宽窄巷子"
                    },
                    {
                        "title": "班花麻辣烫（奎星楼总店）",
                        "subTitle": "开学2人餐，提供免费WiFi",
                        "url": "http://p0.meituan.net/merchantpic/9492b2a8b17c5dadbdf7b16078a2bbe0109901.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥106",
                        "sold": "宽窄巷子"
                    },
                    {
                        "title": "班花麻辣烫（奎星楼总店）",
                        "subTitle": "开学2人餐，提供免费WiFi",
                        "url": "http://p0.meituan.net/merchantpic/9492b2a8b17c5dadbdf7b16078a2bbe0109901.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥106",
                        "sold": "宽窄巷子"
                    },
                    {
                        "title": "天菱阁酒楼（通惠门路店）",
                        "subTitle": "缤纷美味12人餐",
                        "url": "http://p0.meituan.net/merchantpic/9492b2a8b17c5dadbdf7b16078a2bbe0109901.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥2038",
                        "sold": "宽窄巷子"
                    }
                ]
            },
            {
                "category": "休闲",
                "remendList": [
                    {
                        "title": "重庆地龙老火锅",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p0.meituan.net/wedding/91876ea27334715f461667d4db1aa07c201282.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥442",
                        "sold": "温江大学城"
                    },
                    {
                        "title": "重庆地龙老火锅",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p0.meituan.net/wedding/91876ea27334715f461667d4db1aa07c201282.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥442",
                        "sold": "温江大学城"
                    },
                    {
                        "title": "重庆地龙老火锅",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p0.meituan.net/wedding/91876ea27334715f461667d4db1aa07c201282.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥442",
                        "sold": "温江大学城"
                    },
                    {
                        "title": "重庆地龙老火锅",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p0.meituan.net/wedding/91876ea27334715f461667d4db1aa07c201282.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥442",
                        "sold": "温江大学城"
                    },
                    {
                        "title": "重庆地龙老火锅",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p0.meituan.net/wedding/91876ea27334715f461667d4db1aa07c201282.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥442",
                        "sold": "温江大学城"
                    },
                    {
                        "title": "港益海鲜茶餐厅",
                        "subTitle": "下午茶套餐A，建议单人使用",
                        "url": "http://p0.meituan.net/wedding/91876ea27334715f461667d4db1aa07c201282.jpg@428w_240h_1e_1c",
                        "currentPrice": 125,
                        "oldPrice": "门市价¥50",
                        "sold": "大业路"
                    },
                    {
                        "title": "成都茂业JW万豪酒店·万豪中餐厅",
                        "subTitle": "'」港式点心任点任食'自助午餐",
                        "url": "http://p0.meituan.net/wedding/91876ea27334715f461667d4db1aa07c201282.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥188",
                        "sold": "盐市口"
                    },
                    {
                        "title": "鹿野茶事（盐市口店）",
                        "subTitle": "小鹿初抹1份",
                        "url": "http://p0.meituan.net/wedding/91876ea27334715f461667d4db1aa07c201282.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥18",
                        "sold": "盐市口"
                    },
                    {
                        "title": "班花麻辣烫（奎星楼总店）",
                        "subTitle": "开学2人餐，提供免费WiFi",
                        "url": "http://p0.meituan.net/wedding/91876ea27334715f461667d4db1aa07c201282.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥106",
                        "sold": "宽窄巷子"
                    },
                    {
                        "title": "天菱阁酒楼（通惠门路店）",
                        "subTitle": "缤纷美味12人餐",
                        "url": "http://p0.meituan.net/wedding/91876ea27334715f461667d4db1aa07c201282.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥2038",
                        "sold": "宽窄巷子"
                    }
                ]
            }]
    });
});

// 猫眼电影
app.get("/getFilms", function (req, res) {
    res.send({
        "code": 200,
        "message": "查询成功",
        "data": [
            {
                "category": "正在热映",
                "remendList": [
                    {
                        "title": "大黄蜂",
                        "url": "http://p1.meituan.net/movie/426f1f3f1b145f763b75a60c7c39c44a535093.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,

                    },
                    {
                        "title": "大黄蜂",
                        "url": "http://p0.meituan.net/movie/c042fa48d4c53545a9b8a404dde760a13846552.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "大黄蜂",
                        "url": "http://p1.meituan.net/movie/70147090b78af5ab17c04c60889d42fe729655.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "大黄蜂",
                        "url": "http://p0.meituan.net/movie/6a21e35ad7106c60967954b165c09b92915222.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "大黄蜂",
                        "url": "http://p0.meituan.net/movie/fa1ed3d0df3aa7e7107e1077ed686f087257146.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "大黄蜂",
                        "url": "http://p1.meituan.net/movie/90fe8067e17b49379d312e46703d1c116750157.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "大黄蜂",
                        "url": "http://p1.meituan.net/movie/093d9f90022cc283189288535d4cdc353508848.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "大黄蜂",
                        "url": "http://p0.meituan.net/movie/ec30a55b1b20e7b8621bfb7682b530f9568248.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "大黄蜂",
                        "url": "http://p0.meituan.net/movie/ef7389637312b976068823d476863e10117810.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "大黄蜂",
                        "url": "http://p0.meituan.net/movie/4977daebfc404e90a2bdaf17911a88cc2332544.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    }
                ]
            },
            {
                "category": "即将上映",
                "remendList": [
                    {
                        "title": "麻辣班花",
                        "url": "http://p1.meituan.net/movie/bd1d36946e7653da76e9e7d0c34d5fbe292918.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "麻辣班花",
                        "url": "http://p1.meituan.net/movie/bd1d36946e7653da76e9e7d0c34d5fbe292918.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "麻辣班花",
                        "url": "http://p0.meituan.net/movie/fa1ed3d0df3aa7e7107e1077ed686f087257146.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "麻辣班花",
                        "url": "http://p1.meituan.net/movie/fe5657acdb969f41335ea6efdc8005a32361470.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "麻辣班花",
                        "url": "http://p1.meituan.net/movie/125f566cd9f0bad5a3f71e462d778e5c1030834.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "麻辣班花",
                        "url": "http://p1.meituan.net/movie/125f566cd9f0bad5a3f71e462d778e5c1030834.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "麻辣班花",
                        "url": "http://p1.meituan.net/movie/2f1c7af0aa32fb64b378f4c59e3dfcc3464610.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "麻辣班花",
                        "url": "http://p0.meituan.net/movie/881e1bd9d927b10517be4c27a20b08a3262711.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "麻辣班花",
                        "url": "http://p1.meituan.net/movie/eddda80298c8d14c8883b6eed54f8cb6458404.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    },
                    {
                        "title": "麻辣班花",
                        "url": "http://p1.meituan.net/movie/4a7b8c6660775dc854853f09fd9e4a521025070.jpg@428w_594h_1e_1c",
                        "subUrl": "http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax3d.png",
                        "score": 9.1,
                    }
                ]
            }]
    });
});

// 推荐名宿
app.get("/getMinsu", function (req, res) {
    res.send({
        "code": 200,
        "message": "查询成功",
        "data": [
            {
                "category": "重庆",
                "remendList": [
                    {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗",
                        "subTitle": "离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "url": "https://img.meituan.net/phoenix/b06bdf38c35a00a50771e3af1dfa287a1153138.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f5348010678ded7b31b604765fb22823100684.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "莫妮卡小屋·云轻-2号房间】落地窗",
                        "subTitle": "临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "url": "https://img.meituan.net/phoenix/e2fd9af787a01e4d048982fe29708a86927803.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/fb473b347a334b2a6cf0899788e29fe8547392.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p0.meituan.net/iphoenix/c1b7cf0c075f6b7fd10d3b04ba4d18c11414388.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/c23e5f1bfabc06156dec496c400b020622663.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/38e085d92ffe767750a521fc7805917a930671.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f5348010678ded7b31b604765fb22823100684.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/dfb3c83ebfcda26633e40ab08082e881380507.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/8ae1f230768684a4548eba3eeeed896418314.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p0.meituan.net/iphoenix/7226e59040036ef71e327f6bc303a5641994202.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/8f017d18ae6e9d8c7ba3a0e214197548212986.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    },
                ]
            }, {
                "category": "乐山",
                "remendList": [
                    {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗",
                        "subTitle": "离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "url": "http://p0.meituan.net/phoenix/1b19febeae7f276b2984ae845fb1074a783798.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/720ddaa7866bfeef3652a04b2c332e53327937.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "subTitle": "临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "url": "http://p1.meituan.net/phoenix/6eac46e644fa6f07831bd288d0741078875790.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/0cbbbe2c72ecbd6d7dfc1c156d9731a1760034.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/ff396b0ddf4e9144395dccf234f818b4346696.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f98b41633e29cd323c6140b399b428aa9359.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p1.meituan.net/phoenix/062a1c43b9d451698fa1718d007fcc20154680.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f718a9bd8a455475ee59e18550a2cf2f183278.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/5c6e6a0c24a3c48c1be358c73fabc0af414666.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/8ae1f230768684a4548eba3eeeed896418314.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/581e8721f03236716106e3d5c0a13e4a566741.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/6481bb1730bbba7e131a616b1e771c7910568.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    },
                ]
            }, {
                "category": "绵阳",
                "remendList": [
                    {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "url": "https://img.meituan.net/phoenix/7e9594e1ec8029828ef339d0be50e4f8418095.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f0a095ff63d4ba9205782740c61143b327159.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "subTitle": "临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "url": "https://img.meituan.net/phoenix/10d891306a7bf5b51d4be875c135ae4a751242.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f3c270446f694ae6f2569bf2f987edfd19603.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p1.meituan.net/phoenix/b37e26baaa8e31a47b04065298f1968a274611.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/989b4b9a25d9ebe75451720734f45b6c218828.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p1.meituan.net/iphoenix/d609846255a71786fe05a18eeaabefe31947232.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/921ad2e8fc3ca25123e2a6d99184117432203.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/0f05e8f1f807579c31f0cd13a12d78f5392856.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/bb3842229adef9319578b0075fd6a43110976.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/iphoenix/168cfbb2f900627bdaa6b7adeb2b318640166.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/2e50541f078440cfe5d95d1244c4826110430.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    },
                ]
            }, {
                "category": "凉山彝族自治州",
                "remendList": [
                    {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "url": "https://img.meituan.net/iphoenix/60c560716f0595745b1f20999acd0fa0458371.png@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/phoenix/768d9d7954e064bf9a915054ae02113b383693.jpg@740w_416h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "subTitle": "临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "url": "http://p0.meituan.net/iphoenix/5f5482d31cdb35ab47552ac28f191d7f2395384.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/4f3fa73facfa2a9c4a16d89eae52837c617412.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p0.meituan.net/iphoenix/5f5482d31cdb35ab47552ac28f191d7f2395384.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/003a66c8249c6230b000bd78b9c5633c48432.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/b8a0151f8a93bd91a7405ddd498e3ad1812757.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/287baa5f35be0da486bb55be0642ef2469157.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p1.meituan.net/iphoenix/708e16c60145f177c5ef28010121f7f81397527.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/003a66c8249c6230b000bd78b9c5633c48432.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/73f6c1ed307773fe0bbe1bc3a9282bf1126982.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/69f384edfb9c229406943a6edf8fdf2348536.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    },
                ]
            }, {
                "category": "遵义",
                "remendList": [
                    {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "url": "http://p0.meituan.net/phoenix/36e69633d8b71ebce618f484c0e82bc2781493.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/c4843446e2d357966d4ba332455b095c810086.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "subTitle": "临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "url": "http://p1.meituan.net/phoenix/169a6ca544eebb26b460de42e35fd46c1262047.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/0d6d714772e0deb5f8e70d2c5cfc79f6144019.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p0.meituan.net/phoenix/6092592273209223b6c1871b0c08a4f3836498.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/642a968e44a95741912340a7e8795f1c245646.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p0.meituan.net/iphoenix/23f46da90babb91fbc3c4d749b052cba5738880.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/0d6d714772e0deb5f8e70d2c5cfc79f6144019.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p0.meituan.net/iphoenix/4d795cc89a81fbfedb46a2e65774374f5367651.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/0d6d714772e0deb5f8e70d2c5cfc79f6144019.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p1.meituan.net/phoenix/52dfbbba47f77568532f3d4de0b6f4951310792.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/0d6d714772e0deb5f8e70d2c5cfc79f6144019.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    },
                ]
            }, {
                "category": "内江",
                "remendList": [
                    {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "url": "https://img.meituan.net/phoenix/6717d9a1972e96fbd658e41b3cbd0275381558.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f5348010678ded7b31b604765fb22823100684.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "subTitle": "临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "url": "http://p0.meituan.net/phoenix/31c828e4ddddca3ca749f3952178714a1503749.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/fb473b347a334b2a6cf0899788e29fe8547392.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/1dfed91ad8699b2fef2f2d760c94570f426852.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/c23e5f1bfabc06156dec496c400b020622663.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p0.meituan.net/phoenix/d8d04992f720a0ea6ddb3a5e2c768dfd846158.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f5348010678ded7b31b604765fb22823100684.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/9687bc2152f61f21db444fc1d5aa72c0603678.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/8ae1f230768684a4548eba3eeeed896418314.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/d1d89790064906d4a65302e485fbdd64435627.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/8f017d18ae6e9d8c7ba3a0e214197548212986.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    },
                ]
            }, {
                "category": "雅安",
                "remendList": [
                    {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "url": "https://img.meituan.net/phoenix/d1d89790064906d4a65302e485fbdd64435627.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f5348010678ded7b31b604765fb22823100684.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "subTitle": "临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "url": "http://p0.meituan.net/phoenix/aef75ee01b117412b3199f587fdddc12664751.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/fb473b347a334b2a6cf0899788e29fe8547392.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/iphoenix/c94630f546b1e8e30d4e0d9778dd3698591349.png@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/c23e5f1bfabc06156dec496c400b020622663.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/iphoenix/c94630f546b1e8e30d4e0d9778dd3698591349.png@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f5348010678ded7b31b604765fb22823100684.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/iphoenix/c94630f546b1e8e30d4e0d9778dd3698591349.png@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/8ae1f230768684a4548eba3eeeed896418314.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p0.meituan.net/iphoenix/3733cccca974eb8c825fb8381120ffb92619782.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/8f017d18ae6e9d8c7ba3a0e214197548212986.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    },
                ]
            }, {
                "category": "南充",
                "remendList": [
                    {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "url": "https://img.meituan.net/phoenix/fa059e2b328b272fa1851943a8abc5831581278.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f5348010678ded7b31b604765fb22823100684.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "subTitle": "临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "url": "https://img.meituan.net/phoenix/eb33ccddb611d6cb354e4119ea0e1328175929.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/fb473b347a334b2a6cf0899788e29fe8547392.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/2f9bc05a17b045ee9838835d76aa1aa8318442.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/c23e5f1bfabc06156dec496c400b020622663.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/2f9bc05a17b045ee9838835d76aa1aa8318442.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f5348010678ded7b31b604765fb22823100684.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/92841af0b2d3f4ac4879da119556a7831875965.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/8ae1f230768684a4548eba3eeeed896418314.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/2c6142d9d2a479ee1a3f5c8f8d5a2921473200.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/8f017d18ae6e9d8c7ba3a0e214197548212986.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    },
                ]
            }, {
                "category": "自贡",
                "remendList": [
                    {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "url": "https://img.meituan.net/phoenix/4edf99229745077b0fbb2136ac8b641d1492970.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f5348010678ded7b31b604765fb22823100684.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "subTitle": "临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "url": "http://p1.meituan.net/phoenix/60330834c56b09372d3b8376b9279835796456.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/fb473b347a334b2a6cf0899788e29fe8547392.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/8743b22c1d6cd30e8b089d53a137de2d4299785.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/c23e5f1bfabc06156dec496c400b020622663.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/10f798dbc08dfe5985b21fc33f834bba297124.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f5348010678ded7b31b604765fb22823100684.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/c2c7db9e2ff5c2553d8fce7846c172d3206530.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/8ae1f230768684a4548eba3eeeed896418314.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/3ca4e82a5408afc56d1122c107971e7d3612242.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/8f017d18ae6e9d8c7ba3a0e214197548212986.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    },
                ]
            }, {
                "category": "宜宾",
                "remendList": [
                    {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "url": "https://img.meituan.net/phoenix/512a4ff4c7c54e79255d096548ced06c355270.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f5348010678ded7b31b604765fb22823100684.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "subTitle": "临近解放碑全江景公寓，宿旅朝天门码头江景房",
                        "url": "https://img.meituan.net/phoenix/71efacddbce9ec2d7e81181e1b09903d138210.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/fb473b347a334b2a6cf0899788e29fe8547392.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/e41c9b435802339416147c58b0ab8096117572.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/c23e5f1bfabc06156dec496c400b020622663.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "http://p1.meituan.net/phoenix/11aec72db2504de69f5fe615a539c58e1112604.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/f5348010678ded7b31b604765fb22823100684.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/fa45b2b613fe6867967244ce9615def9771203.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/8ae1f230768684a4548eba3eeeed896418314.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    }, {
                        "title": "【莫妮卡小屋·云轻-2号房间】落地窗,离解放碑200米,距地铁站入口50米,楼下超市,可看长江夜景",
                        "subTitle": "升级豪华8人餐，有赠品",
                        "url": "https://img.meituan.net/phoenix/3b1df85af8d3d577829b3720a262e863338306.jpg@740w_416h_1e_1c",
                        "subUrl": "https://img.meituan.net/avatar/8f017d18ae6e9d8c7ba3a0e214197548212986.jpg@200w_200h_1e_1c",
                        "currentPrice": 129
                    },
                ]
            }]
    });
});

// 猜你喜欢
app.get("/getRecomends", function (req, res) {
    res.send({
        "code": 200,
        "message": "查询成功",
        "data": [
            {
                "category": "为你甄选最合适的",
                "remendList": [
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p0.meituan.net/deal/d1372eede7815ce19f24e56cb2796a89374018.jpg@428w_240h_1e_1c",
                        "currentPrice": 26.9,
                        "oldPrice": "门市价¥70",
                        "sold": "已售9795"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p1.meituan.net/mogu/cbbd292727e2f2968e5feeb9029284f858793.jpg@428w_240h_1e_1c",
                        "currentPrice": 26.9,
                        "oldPrice": "门市价¥70",
                        "sold": "已售9795"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p0.meituan.net/msmerchant/82aeed6744bb08a65a039729183678ee137611.jpg@428w_240h_1e_1c",
                        "currentPrice": 26.9,
                        "oldPrice": "门市价¥70",
                        "sold": "已售9795"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p1.meituan.net/wedding/bce5ed7c948a2c52fed943a91e415501318324.jpg@428w_240h_1e_1c",
                        "currentPrice": 26.9,
                        "oldPrice": "门市价¥70",
                        "sold": "已售9795"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p0.meituan.net/merchantpic/9492b2a8b17c5dadbdf7b16078a2bbe0109901.jpg@428w_240h_1e_1c",
                        "currentPrice": 26.9,
                        "oldPrice": "门市价¥70",
                        "sold": "已售9795"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p0.meituan.net/wedding/609e09a7432bd5576cb01cbb2a5727bf227844.jpg@428w_240h_1e_1c",
                        "currentPrice": 125,
                        "oldPrice": "门市价¥50",
                        "sold": "大业路"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "'上影国际影城(城中汇店)'自助午餐",
                        "url": "http://p1.meituan.net/mogu/949d4fd7763012e5284d9ae85dd752d6375759.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥188",
                        "sold": "盐市口"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p0.meituan.net/wedding/91876ea27334715f461667d4db1aa07c201282.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥18",
                        "sold": "盐市口"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p0.meituan.net/wedding/1e0ed0f714aeef161ac4728f5854adbc567624.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥106",
                        "sold": "宽窄巷子"
                    },
                    {
                        "title": "上影国际影城(城中汇店)",
                        "subTitle": "上影国际影城(城中汇店)",
                        "url": "http://p0.meituan.net/msmerchant/e62d1e62edea8e0f66c6750fb5a01ec7122093.jpg@428w_240h_1e_1c",
                        "currentPrice": 123,
                        "oldPrice": "门市价¥2038",
                        "sold": "宽窄巷子"
                    }

                ]
            }]
    });
});

// 有格调
app.get("/getMerchant", function (req, res) {
    var merchantId = req.query.id;
    if (!merchantId) {
        res.send({
            "code": 300,
            "message": "参观ID不能为空"
        });
        return;
    }

    var connection = getDBcon();
    var categories = connection.query("SELECT * FROM category", function(err, categories) {
        var counter = 0;
        var data = [];
        categories.forEach(function(category) {
            connection.query("SELECT * FROM merchant WHERE category_id=?", category.id, function(err, merchants) {
                data.push({
                    "category": category.name,
                    "remendList": merchants
                });
                counter++;
                if (counter == categories.length) {
                    res.send({
                        "code": 200,
                        "message": "查询成功",
                        "data": data
                    });
                }
            });
        });
    });
});