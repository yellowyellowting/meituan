// 


// 侧边栏导航动态渲染


// 轮播图渲染
// var bannerSlider = document.querySelectorAll(".carousel-wrap")[0];
// var carouselIndicators = document.querySelectorAll(".carousel-indicators")[0];
// var url =[
//     "http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg",
//     "http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg",
//     "http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg",
//     "http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg",
//     "https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png"
// ]

// for (let i = 0; i < url.length; i++) {
//     var urlStr =
//         `
//         <div class="carousel">
//         <a href="javascript:void(0)">
//             <img src="${url[i]}" />
//         </a>
//         </div>
//         `
//     var indicatorsStr = 
//     `
//      <li class="item"></li>
//     `
//         bannerSlider.innerHTML += urlStr;
//         carouselIndicators.innerHTML += indicatorsStr;
// }

// // 有格调
// var qulityObj = [
//     [
//         {
//             title:"重庆地龙老火锅",
//             subTitle:"升级豪华8人餐，有赠品",
//             url:"http://p0.meituan.net/deal/327f344a4e18062d2fde6e9030c2ec9a655569.jpg@736w_416h_1e_1c",
//             currentPrice:123,
//             oldPrice:"门市价¥442",
//             sold:"温江大学城"
//         },
//         {
//             title:"港益海鲜茶餐厅",
//             subTitle:"下午茶套餐A，建议单人使用",
//             url:"http://p0.meituan.net/msmerchant/e15b0e829039812c8aaf14e16c37f5f342019.jpg@736w_416h_1e_1c",
//             currentPrice:125,
//             oldPrice:"门市价¥50",
//             sold:"大业路"
//         },
//         {
//             title:"成都茂业JW万豪酒店·万豪中餐厅",
//             subTitle:"'」港式点心任点任食'自助午餐",
//             url:"http://p0.meituan.net/mogu/e082e4db3269c446257aeb3d2e50375e183195.jpg@736w_416h_1e_1c",
//             currentPrice:123,
//             oldPrice:"门市价¥188",
//             sold:"盐市口"
//         },
//         {
//             title:"鹿野茶事（盐市口店）",
//             subTitle:"小鹿初抹1份",
//             url:"http://p0.meituan.net/msmerchant/7d970fb182bd2d4b2e56e2b363596a96309530.png@736w_416h_1e_1c",
//             currentPrice:123,
//             oldPrice:"门市价¥18",
//             sold:"盐市口"
//         },
//         {
//             title:"班花麻辣烫（奎星楼总店）",
//             subTitle:"开学2人餐，提供免费WiFi",
//             url:"http://p1.meituan.net/msmerchant/db1ed6ee0f57cc1537a9e9691cc00b3a105376.jpg@736w_416h_1e_1c",
//             currentPrice:123,
//             oldPrice:"门市价¥106",
//             sold:"宽窄巷子"
//         },
//         {
//             title:"天菱阁酒楼（通惠门路店）",
//             subTitle:"缤纷美味12人餐",
//             url:"http://p1.meituan.net/deal/__47874014__8480546.jpg@736w_416h_1e_1c",
//             currentPrice:123,
//             oldPrice:"门市价¥2038",
//             sold:"宽窄巷子"
//         },
//     ]
// ]

