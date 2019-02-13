
(function() {
    var id = getQueryString("id");
    if (!id) {
        alert("电影ID不能为空");
        location.assign('./home.html');
        return;
    }

    var filmInfoContainer = document.querySelector('.film-info-container');

    function render(film) {
        var html = `
            <div class="img-container">
                <img src="${film.thumb_url}" />
            </div>
            <div class="film-info">
                <p class="name">${film.name}</p>
                <div class="type">
                    <span>类型 :</span>
                    <span class="value">${film.type}</span>
                </div>
                <div class="time">
                    <span>时长 :</span>
                    <span class="value">${film.duration}</span>
                    <span>分钟</span>
                </div>
            </div>
            <div class="clear"></div>
            <div class="sold-info">
                <div class="info cinema">
                    <span>影院 :</span>
                    <span class="value">${film.cinema}</span>
                </div>
                <div class="info movie-hall">
                    <span>影厅 :</span>
                    <span class="value">3号厅（SONY 4K）</span>
                </div>
                <div class="info version">
                    <span>版本 :</span>
                    <span class="value">${film.version == 0 ? '国语2D': (film.version == 1 ? '3D' : 'IMAX')}</span>
                </div>
                <div class="info session">
                    <span>场次 :</span>
                    <span class="value">${film.session}</span>
                </div>
                <div class="info ticket-price">
                    <span>票价 :</span>
                    ￥<span class="value">${film.price}</span>/张
                </div>
            </div>
        `;
        filmInfoContainer.innerHTML = html;  
    }

    getRequest("getFilm?id=" + id, function(json) {
        var result = JSON.parse(json);
        if (result.code == 200) {
            render(result.data);
        }
    });
})();

(function () {
    var seatsColumn = document.querySelector('.seats .column .num');
    let seatWapper = document.querySelector('.seats-wrapper');
    var ticketContainer = document.querySelector('.ticket-container');
    var ticketCount = document.querySelector('.ticket-count');
    var priceTotal = document.querySelector('.price-total');
    var confirmBtn = document.querySelector(".confirm-btn");

    let selectedSeats = []; //声明一个数组存储已被选择的座位

    /**
     * 渲染座位表 
     */ 
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

        seats.forEach(function (seat) {
            seatSheet[seat.row - 1][seat.column - 1] = seat;    //注意下标是从0开始，因此-1
        });
        
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
     * 更新座位
     */
    function updateSeat() {
        var seats = seatWapper.querySelectorAll('.seat');
        for (let i = 0; i < seats.length; i++) {
            let seat = seats[i];
            let id = seat.getAttribute('data-id');
            if (selectedSeatIndex(id) >= 0) {
                seat.classList.remove('selectable');
                seat.classList.add('selected');
            } else {
                seat.classList.remove('selected');
                seat.classList.add('selectable');
            }
        }
    }

    /**
     * 更新票
     */
    function updateTicket() {
        ticketContainer.innerHTML = "";

        if (selectedSeats.length > 0) {
            for (let i = 0; i < selectedSeats.length; i++) {
                let seat = selectedSeats[i];
                ticketContainer.innerHTML += `<span class="ticket" data-id="${seat.id}">${seat.name}</span>`;
            }
        }
    }

    /**
     * 更新总票价
     */
    function updateTotalFares() {
        var ticketPriceStr = document.querySelector('.ticket-price .value').innerHTML;
        var ticketPrice = Number(ticketPriceStr);

        ticketCount.innerHTML = `
            <span>票数 :</span>
            <span class="num">${selectedSeats.length}</span>
        `;
        priceTotal.innerHTML = `
            <span>总价 :</span>
            <span class="yuan">￥</span>
            <span class="price">${ticketPrice * selectedSeats.length}</span>
        `;
    }

    /**
     * 更新提交按钮的可用性
     */
    function updateConfirmBtnEnable() {
        if (selectedSeats.length > 0) {
            confirmBtn.disabled = false;
            confirmBtn.style.cssText = "background-color:#f03d37";
        } else {
            confirmBtn.disabled = true;
            confirmBtn.style.cssText = "background-color:#dedede";
        }
    }

    /**
     * 座位是否已选择
     */
    function selectedSeatIndex(targetId) {
        if (selectedSeats.length > 0) {
            for (let i = 0; i < selectedSeats.length; i++) {
                if (selectedSeats[i].id == targetId) {
                    return i;
                }
            }
        }
        return -1;
    }

    /**
     * 选择座位
     */
    function selectSeat(id, name) {
        let index = selectedSeatIndex(id);
        if (index < 0) {
            if (selectedSeats.length >= 5) {
                alert('一次最多购买5张票');
                return;
            }
            selectedSeats.push({
                id: id,
                name: name
            });
            updateSeat();
            updateTicket();
            updateTotalFares();
            updateConfirmBtnEnable();
        }
    }

    /**
     * 取消选择座位
     */
    function cancelSeat(id) {
        let index = selectedSeatIndex(id);
        if (index >= 0) {
            selectedSeats.splice(index, 1);
            updateSeat();
            updateTicket();
            updateTotalFares();
            updateConfirmBtnEnable();
        }
    }

    // 点击座位选座
    seatWapper.onclick = function (ev) {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.nodeName.toLowerCase() == 'span') {
            var status = target.getAttribute('data-status'); //判断位置状态是否可选
            if (status == 1) {
                var id = target.getAttribute('data-id');
                var name = target.getAttribute('data-name');
                if (selectedSeatIndex(id) < 0) {
                    selectSeat(id, name);
                } else {
                    cancelSeat(id);
                }
            }
        }
    }

    // 点击删除票
    ticketContainer.onclick = function (ev) {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.nodeName.toLowerCase() == 'span'
            && target.classList.contains('ticket')) {
            var id = target.getAttribute('data-id');
            cancelSeat(id);
        }  
    }

    // 点击确认提交按钮
    confirmBtn.onclick = function() {
        if (selectedSeats.length > 0) {
            alert("预约购票成功：订单编号1111111111111");
        }
    }

    // 后端请求数据
    getRequest({url: "mock/5c49adc80ae62c756dd9af6b/test/seats", host: "https://www.easy-mock.com/"}, function (json) {
        var seats = JSON.parse(json);
        renderSeats(seats);
    });
})();



