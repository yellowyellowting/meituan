
var column = document.querySelector(".column .num");
var seatsWrapper = document.querySelector(".seats-wrapper");
var uls = document.querySelectorAll(".row ul");
var lis = document.querySelectorAll(".row ul li");
var selectedInfo = document.querySelector(".selected-info");



for (let i = 0; i < uls.length; i++) {
    var lis = uls[i].querySelectorAll("li");
    for (let j = 0; j < lis.length; j++) {
        lis[j].setAttribute("state", "0");
        lis[j].setAttribute('row-index', i + 1);
        lis[j].setAttribute('col-index', j + 1);
        var row = lis[j].getAttribute("row-index");
        var col = lis[j].getAttribute("col-index");
        lis[j].onclick = function () {
            var state = lis[j].getAttribute("state");
            if (state == 0) {
                lis[j].innerHTML = "";
                lis[j].innerHTML = `<img src="../images/selected.png" />`;
                lis[j].removeAttribute("state", "0");
                lis[j].setAttribute("state", "1");
                selectedInfo.innerHTML = "";
                selectedInfo.innerHTML = `
            <div class="seat-info">
            <span class="tip">座位：</span>
            <div class="seat-container">
            <div class="seat-num">
            <span class="x">${row}</span class="y">排<span>${col}</span>座
        </div>
            </div>
    
            <div class="clear"></div>
        </div>
        <div class="clear"></div>
    
        <div class="ticket-count">
            <span>票数 :</span>
            <span class="num">0</span>
        </div>
        <div>
            <span>总价 :</span>
            <span class="yuan">￥</span>
            <span class="price">0</span>
        </div>
            `;
                confirmBtn.style.cssText = "background-color:#f03d37";
                var seatContainer = document.querySelector(".seat-container");
                var div = document.createElement("div");
                var span = document.createElement("span");
                var addNode = ` <div class="seat-num">
    <span class="x">${row}</span class="y">排<span>${col}</span>座
</div>`;
                seatContainer.appendChild(addNode);
            } else if (state == 1) {
                lis[j].innerHTML = "";
                lis[j].innerHTML = `<img src="../images/option.png" />`;
                lis[j].removeAttribute("state", "1");
                lis[j].setAttribute("state", "0");
            } else {
                alert("该座位已选定!");
            }
        }
    }
}
// for (let i = 0; i < lis.length; i++) {
//     // 0:未选；1：已选；3：已售；4：情侣座
//     lis[i].setAttribute("state","0");
//     lis[i].onclick = function () {
//         var state =  lis[i].getAttribute("state");
//        if(state == 0) {
//         lis[i].innerHTML = "";
//         lis[i].innerHTML = `<img src="../images/selected.png" />`;
//         lis[i].removeAttribute("state","0");
//         lis[i].setAttribute("state","1");
//         selectedInfo.innerHTML = "";
//         selectedInfo.innerHTML = `
//         <div class="seat-info">
//         <span class="tip">座位：</span>
//         <div class="seat-container">
//             <div class="seat-num">
//                 <span class="x">0</span class="y">排<span>0</span>座
//             </div>
//         </div>

//         <div class="clear"></div>
//     </div>
//     <div class="clear"></div>

//     <div class="ticket-count">
//         <span>票数 :</span>
//         <span class="num">0</span>
//     </div>
//     <div>
//         <span>总价 :</span>
//         <span class="yuan">￥</span>
//         <span class="price">0</span>
//     </div>
//         `;

// confirmBtn.style.cssText="background-color:#f03d37";
//        } else if(state == 1) {
//         lis[i].innerHTML = "";
//         lis[i].innerHTML = `<img src="../images/option.png" />`;
//         lis[i].removeAttribute("state","1");
//         lis[i].setAttribute("state","0");
//        } else{
//         alert("该座位已选定!");
//        }  
//     }
// }



(function () {
    var seatsColumn = document.querySelector('.seats .column .num');
    let seatWapper = document.querySelector('.seats-wrapper');
    var ticketContainer = document.querySelector('.ticket-container');
    var ticketCount = document.querySelector('.ticket-count');
    var priceTotal = document.querySelector('.price-total');
    var confirmBtn = document.querySelector(".confirm-btn");

    //  渲染座位表

    function renderSeats(seats) {
        let maxRowNum = 0;
        let maxColumnNum = 0;
        seats.forEach(function (seat) {
            maxRowNum = Math.max(maxRowNum, seat.row);
            maxColumnNum = Math.max(maxColumnNum, seat.column);
        });  //动态渲染，获取最大的排和列


        // 初始化一个二维数组,渲染一个有最大行和最大列的座位表，表内内容暂为null
        let seatSheet = [];
        for (let i = 0; i < maxRowNum; i++) {
            let rowArr = [];
            for (let j = 0; j < maxColumnNum; j++) {
                rowArr[j] = null;
            }
            seatSheet[i] = rowArr;
        }

        // console.log(seatSheet);


        seats.forEach(function (seat) {
            seatSheet[seat.row - 1][seat.column - 1] = seat;    //注意下标是从0开始，因此-1
        });
        // console.log(seatSheet);
        //status == 1 表示可选，status == 0 表示已选， status == 2 表示已售
        let seatSheetHtml = "";  //声明一个空变量
        for (let i = 0; i < maxRowNum; i++) {
            let columnHtmls = "";
            for (let j = 0; j < maxColumnNum; j++) {
                let seat = seatSheet[i][j]; // 后端数据库没有位置数据的便依然为Null，样式背景为空白，不显示位置，这样便可灵活渲染位置；
                if (seat) {
                    columnHtmls += `<span class="seat ${seat.status == 1 ? 'selectable' : 'sold'}" data-id="${seat.seatId}" data-name="${seat.name}" data-status="${seat.status}"></span>`;
                    //渲染id 方便后续右侧票据信息显示栏对应的删除，使用ID对应关系
                } else {
                    columnHtmls += `<span class="seat empty"></span>`; //empty样式设置背景为空
                }
            }
            seatSheetHtml += `<div class="row">${columnHtmls}</div>`;
        }
        seatWapper.innerHTML = seatSheetHtml;
    }

    /**
     * 选择座位
     */




    function selectSeat(id, name) {
        if (ticketContainer.children && ticketContainer.children.length >= 5) {
            alert('一次最多购买5张票');
            return false;
        } else {
            var ticketCardHtml = `<span class="ticket" data-id="${id}">${name}</span>`;
            ticketContainer.innerHTML += ticketCardHtml;
            confirmBtn.style.cssText = "background-color:#f03d37";
            calculattingFares();
            return true;  //返回一个true||flase 可作为后期判断的标志！学习
        }
    }

    /**
     * 取消座位
     */
    function unselectSeat(targetId) {
        if (ticketContainer.children) {
            for (let i = 0; i < ticketContainer.children.length; i++) {
                var ticketCard = ticketContainer.children[i];
                let id = ticketCard.getAttribute('data-id');
                if (id == targetId) {
                    ticketContainer.removeChild(ticketCard);
                    return true;
                }
            };
        }
        return false;
    }

    seatWapper.onclick = function (ev) {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.nodeName.toLowerCase() == 'span') {
            var status = target.getAttribute('data-status'); //判断位置状态是否可选
            if (status == 1) {
                var id = target.getAttribute('data-id');
                var name = target.getAttribute('data-name');
                if (target.classList.contains('selectable')) {
                    if (selectSeat(id, name)) {
                        target.classList.remove('selectable');
                        target.classList.add('selected');
                    }
                } else {
                    if (unselectSeat(id)) {
                        target.classList.remove('selected');
                        target.classList.add('selectable');
                    }
                }
            }
        }
    }
    //右侧选择删除
    ticketContainer.onclick = function (ev) {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.nodeName.toLowerCase() == 'span'
            && target.classList.contains('ticket')) {
            var id = target.getAttribute('data-id');
            unselectSeat(id);
        }
    }

    function calculattingFares() {
        if (ticketContainer.children) {
            var ticketCardNum = 0;
            var ticketPriceTotal = 0;
            for (let i = 0; i < ticketContainer.children.length; i++) {
                var ticketCardNum = ticketContainer.children.length;
                var ticketPriceStr = document.querySelector('.ticket-price .value').innerHTML;
                var ticketPrice = Number(ticketPriceStr);
                ticketPriceTotal += ticketPrice;
                // ticketCount.innerHTML = '';
                ticketCount.innerHTML = `
                <span>票数 :</span>
                <span class="num">${ticketCardNum}</span>
                `;
                priceTotal.innerHTML = '';
                priceTotal.innerHTML = `
                <span>总价 :</span>
                <span class="yuan">￥</span>
                <span class="price">${ticketPriceTotal}</span>
                `
            }
        };
    }
    // 后端请求数据
    getRequest("https://www.easy-mock.com/mock/5c49adc80ae62c756dd9af6b/test/seats", function (json) {
        var seats = JSON.parse(json);
        renderSeats(seats);
    });
    confirmBtn.onclick = function() {
        alert("预约购票成功：订单编号1111111111111");
        
        if (ticketContainer.children) {
            
            for (let i = 0; i < ticketContainer.children.length; i++) {
                var id = ticketContainer.children[i].getAttribute('data-id');
                function dologin(id) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("post", "http://127.0.0.1:8081/");
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//必须加这行代码
                    xhr.send("data-id=" + id);
                
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var result = JSON.parse(xhr.responseText);
                            console.info(result);
                            if (result.code == 200) {
                                alert("买票成功");
                            } else {
                                showErrorTip(result.message)
                            }
                        }
                    }
                }
            }
        };
        
    }
})();



