
var mysql = require('mysql'); //导入mysql模块
// 创建连接对象
var defaultDBObj={
    host: '127.0.0.1', //数据库地址
    user: 'root', //数据库用户名
    password: '123456', //数据库密码
    database: 'meituan' //数据库名
}

function getDBcon(DBobj=defaultDBObj ){
    var connection = mysql.createConnection(DBobj);
    connection.connect(); //启动链接
    return connection;
}

module.exports=getDBcon;