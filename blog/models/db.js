
var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

// 创建一个数据库链接实例并导出 设置数据库名， 数据库地址和数据库端口
module.exports = new Db(settings.db, new Server(settings.host, settings.port), { safe: true })
