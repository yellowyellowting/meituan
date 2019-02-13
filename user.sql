/*
 Navicat Premium Data Transfer

 Source Server         : meituan_takeaway
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost
 Source Database       : user

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : utf-8

 Date: 02/12/2019 11:22:03 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;;

-- ----------------------------
--  Records of `category`
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES ('1', '全部'), ('2', '约会聚餐'), ('3', '丽人SPA'), ('4', '电影演出'), ('5', '品质出游');
COMMIT;

-- ----------------------------
--  Table structure for `filminfo`
-- ----------------------------
DROP TABLE IF EXISTS `filminfo`;
CREATE TABLE `filminfo` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `type` varchar(100) NOT NULL,
  `duration` int(20) NOT NULL,
  `cinema` varchar(20) NOT NULL,
  `version` tinyint(1) NOT NULL DEFAULT '0' COMMENT '电影版本；0=2D，1=3D，2=IMAX',
  `session` varchar(20) NOT NULL,
  `price` double(20,0) NOT NULL,
  `thumb_url` varchar(255) NOT NULL,
  `release_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '上映状态；0=未上映，1=已上映',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;;

-- ----------------------------
--  Records of `filminfo`
-- ----------------------------
BEGIN;
INSERT INTO `filminfo` VALUES ('1', '流浪地球', '科幻，剧情，冒险', '128', '太平洋影城', '2', '今天 2月11 16:45', '44', 'https://p1.meituan.net/movie/616cd50a33550a9225ac781e52d14ae54967551.jpg@428w_594h_1e_1c', '1'), ('2', '疯狂的外星人', '剧情，喜剧，科幻', '116', '保加利亚影院', '1', '今天 2月11  18:05', '39', 'https://p0.meituan.net/movie/6a21e35ad7106c60967954b165c09b92915222.jpg@428w_594h_1e_1c', '1'), ('3', '飞驰人生', '喜剧', '125', '保加利亚影院', '1', '今天 2月11 17: 55', '39', 'https://p0.meituan.net/movie/894fb3b5d73f48148a79b7d8ad234f5010214941.jpg@464w_644h_1e_1c', '1'), ('4', '原始时代', '喜剧，动画，冒险', '116', '太平洋影城', '1', '今天2月11 20:05', '40', 'https://p1.meituan.net/movie/0ca4644c25ff01b7779a06e1ce4f1b011824360.jpg@464w_644h_1e_1c', '1'), ('5', '新喜剧之王', '剧情，喜剧', '91', '星美国际影城', '1', '今天2月11 21:45', '41', 'https://p0.meituan.net/movie/ec30a55b1b20e7b8621bfb7682b530f9568248.jpg@464w_644h_1e_1c', '1'), ('6', '一吻定情', '喜剧，爱情', '122', '万达影城', '1', '2月14 18:00', '45', '//p0.meituan.net/movie/caa49433185fd62b4384e3ad195ec1541309089.jpg@428w_594h_1e_1c', '1'), ('7', '阿丽塔：战斗天使', '爱情，动作，冒险', '135', '万达影城', '0', '2月14 00:00', '46', 'https://p0.meituan.net/movie/fc4dd6cd0c6f7db566a128cc05c475355664427.jpg@115w_158h_1e_1c', '1'), ('8', '神探蒲松龄', '喜剧，爱情，奇幻，动作', '120', '承光影城', '0', '2月13 0:00', '39', 'https://p0.meituan.net/movie/4ea3026406362a49c1409a69a0876c1a8591938.jpg@464w_644h_1e_1c', '1'), ('9', '今夜在浪漫剧场', '爱情，奇幻', '108', '保利国际影城', '0', '2月14 00:00', '40', 'https://p1.meituan.net/movie/7a8aa7728da9c72656a2ed6a11b7a4cf408313.jpg@115w_158h_1e_1c', '1'), ('10', '廉政风云', '悬疑，犯罪', '114', '天智创客影城', '0', '今天2月11 22:40', '33', 'https://p0.meituan.net/movie/fa4112a6da5a7cc6b6eefec6d989863c401228.jpg@115w_158h_1e_1c', '1'), ('11', '蓝色生死恋', '爱情', '104', '九州国际影院', '0', '2月14 09:45', '28', 'https://p0.meituan.net/movie/3b84cf0550475ca29d649caec5f5fca94098960.jpg@428w_594h_1e_1c', '0'), ('12', '五十米之恋', '爱情', '92', '时代豪庭影院', '1', '2月14日19:30', '28', 'https://p0.meituan.net/movie/93109d101e4ad66255b7473cb6acacc8797456.jpg@115w_158h_1e_1c', '0'), ('13', '北斗风云', '战争', '97', '太平洋影城', '0', '2月20', '28', 'https://p0.meituan.net/movie/e3024bf38da8ed2a9250e301a7a0532186538.jpg@464w_644h_1e_1c', '0'), ('14', '阿丽塔：战斗天使', '爱情，动作，冒险', '135', '万达影城', '0', '2月14日', '46', 'https://p0.meituan.net/movie/fc4dd6cd0c6f7db566a128cc05c475355664427.jpg@464w_644h_1e_1c', '0'), ('15', '朝花夕誓', '动画，奇幻', '115', '万达影城', '0', '2月22日', '38', 'https://p0.meituan.net/movie/82fcca2016ecee06f95dcb4979b328b6341744.jpg@464w_644h_1e_1c', '0'), ('16', '古井凶灵', '爱情，惊悚，悬疑', '88', '太平洋影城', '0', '2月22日', '28', 'https://p0.meituan.net/movie/4ecec64ff6bb6c2e7d1b1f86ce0f76fb315046.jpg@464w_644h_1e_1c', '0'), ('17', '驯龙高手', '喜剧，动画，奇幻，冒险', '104', '万达影城', '0', '3月1日', '40', 'https://p0.meituan.net/movie/9ef02a501fee7f62d49d2096b52175d32155331.jpg@464w_644h_1e_1c', '0'), ('18', '绿皮书', '剧情，喜剧，奇幻', '130', '太平洋影城', '0', '3月1日', '35', 'https://p1.meituan.net/movie/c9b280de01549fcb71913edec05880585769972.jpg@464w_644h_1e_1c', '0'), ('19', '一吻定情', '爱情，喜剧', '122', '太平洋影城', '0', '2月14 19:35', '35', 'https://p0.meituan.net/movie/caa49433185fd62b4384e3ad195ec1541309089.jpg@428w_594h_1e_1c', '0'), ('20', '今夜在浪漫剧场', '爱情，奇幻', '108', '万达影城', '0', '2月14 00:00 ', '38', 'https://p1.meituan.net/movie/7a8aa7728da9c72656a2ed6a11b7a4cf408313.jpg@464w_644h_1e_1c', '0');
COMMIT;

-- ----------------------------
--  Table structure for `merchant`
-- ----------------------------
DROP TABLE IF EXISTS `merchant`;
CREATE TABLE `merchant` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `logo` varchar(200) NOT NULL,
  `short_address` varchar(100) NOT NULL,
  `detail_address` varchar(200) NOT NULL,
  `promotion_info` varchar(400) DEFAULT NULL,
  `average_price` double NOT NULL,
  `sell_price` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8;;

-- ----------------------------
--  Records of `merchant`
-- ----------------------------
BEGIN;
INSERT INTO `merchant` VALUES ('98', '1', '石棉叶凤烧烤', 'http://p1.meituan.net/msmerchant/b18e93b30249a42a9cd62eb81d647556632062.jpg@736w_416h_1e_1c', '石羊场', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '升级豪华8人餐，有赠品', '218', '278'), ('99', '1', '24客蛋糕', 'http://p0.meituan.net/bbia/6be753464bd40bb2be212efd643d35ce169584.jpg@736w_416h_1e_1c', '大业路', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '慕斯杯9只装1个，约1磅，方形', '125', '130'), ('100', '1', '成都茂业JW万豪酒店·万豪中餐厅', 'http://p1.meituan.net/msmerchant/649b5151dfb649445cf6cbf23f12b86d425844.jpg@736w_416h_1e_1c', '盐市口', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '港式点心任点任食自助午餐', '123', '130'), ('101', '1', '鹿野茶事（盐市口店）', 'http://p1.meituan.net/msmerchant/d8340294130550e98fdf81d7d0cda4421994119.jpg@736w_416h_1e_1c', '盐市口', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '小鹿初抹1份', '123', '130'), ('102', '1', '班花麻辣烫（奎星楼总店）', 'http://p0.meituan.net/mogu/df19f742159630aeae1190b662d5230a404734.jpg@736w_416h_1e_1c', '宽窄巷子', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '开学2人餐，提供免费WiFi', '123', '130'), ('103', '1', '天菱阁酒楼（通惠门路店）', 'http://p0.meituan.net/mogu/df19f742159630aeae1190b662d5230a404734.jpg@736w_416h_1e_1c', '宽窄巷子', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '缤纷美味12人餐', '123', '130'), ('104', '2', '豪客来牛排（青龙街餐厅-1601）', 'http://p1.meituan.net/msmerchant/3e66b8a6506c694c98b5c7886bb771d137692.jpg@736w_416h_1e_1c', '温江大学城', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '升级豪华8人餐，有赠品', '123', '130'), ('105', '2', '胖老汉清真餐饮', 'http://p1.meituan.net/msmerchant/9703b0b01fd265a8bf3bf7bbcbfc3b5a47239.jpg@736w_416h_1e_1c', '大业路', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '下午茶套餐A，建议单人使用', '125', '130'), ('106', '2', '天府丽都喜来登·荟星庭西餐厅', 'http://p0.meituan.net/mogu/df19f742159630aeae1190b662d5230a404734.jpg@736w_416h_1e_1c', '盐市口', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '港式点心任点任食自助午餐', '123', '130'), ('107', '2', '凉山印象西昌火盆烧烤', 'http://p0.meituan.net/msmerchant/0803d4b0185c9db22c35c28a68d5b78050806.jpg@736w_416h_1e_1c', '盐市口', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '小鹿初抹1份', '123', '130'), ('108', '2', '爱达乐蛋糕（青龙广场店）', 'http://p0.meituan.net/msmerchant/ce3f3d267afc3e8589512325c1c788ee533238.png@736w_416h_1e_1c', '宽窄巷子', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '开学2人餐，提供免费WiFi', '123', '130'), ('109', '2', '天府丽都喜来登·天宝阁中餐厅', 'http://p0.meituan.net/mogu/39563a3962a650865dc3e67c8d1853bc163695.jpg@736w_416h_1e_1c', '宽窄巷子', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '缤纷美味12人餐', '123', '130'), ('110', '3', '番鬼刺青（天府广场店）', 'http://p1.meituan.net/wedding/0228bee88098d089bb26431201eadffc448046.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|736w_416h_1e_1c', '温江大学城', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '升级豪华8人餐，有赠品', '123', '130'), ('111', '3', '烟枪Tattoo（天府店）', 'http://p1.meituan.net/wedding/0c304a179f346370868c051c10b7da11167886.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|736w_416h_1e_1c', '大业路', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '下午茶套餐A，建议单人使用', '125', '130'), ('112', '3', '窈窕蜀女美甲美睫减肥', 'http://p0.meituan.net/mogu/a351937c3b5544dd925420917675faab47167.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|736w_416h_1e_1c', '盐市口', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '港式点心任点任食自助午餐', '123', '130'), ('113', '3', '丝芙芮专业美睫美甲', 'http://p1.meituan.net/wedding/ee8d146387b9d82c42801d9031613ad4404936.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|736w_416h_1e_1c', '盐市口', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '小鹿初抹1份', '123', '130'), ('114', '3', '蓉城妹子按摩spa', 'http://p0.meituan.net/merchantpic/2d61a5d88e72c7266b3bc64bd067dee6187704.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|736w_416h_1e_1c', '宽窄巷子', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '开学2人餐，提供免费WiFi', '123', '130'), ('115', '3', 'MOMOKO蜜桃日式美甲美睫化妆工作室', 'http://p0.meituan.net/wedding/18b3230b4af553406d5db6fb8145aaae36048.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|736w_416h_1e_1c', '宽窄巷子', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '缤纷美味12人餐', '123', '130'), ('116', '4', '太平洋影城(春熙店)', 'http://p0.meituan.net/deal/201212/29/133712_6240123.jpg@736w_416h_1e_1c', '温江大学城', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '升级豪华8人餐，有赠品', '123', '130'), ('117', '4', '博纳国际影城(成都盐市口店)', 'http://p1.meituan.net/deal/201208/22/1_0822151022.jpg@736w_416h_1e_1c', '大业路', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '下午茶套餐A，建议单人使用', '125', '130'), ('118', '4', '太平洋影城(王府井店)', 'http://p1.meituan.net/deal/201301/09/181442_6493474.jpg@736w_416h_1e_1c', '盐市口', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '港式点心任点任食自助午餐', '123', '130'), ('119', '4', '百丽宫影城(恒大广场店)', 'http://p0.meituan.net/deal/b5d58645020c9f08a2640805fecce27d263150.jpg@736w_416h_1e_1c', '盐市口', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '小鹿初抹1份', '123', '130'), ('120', '4', '卢米埃影城(来福士店)', 'http://p1.meituan.net/deal/201211/14/_1114152725.jpg@736w_416h_1e_1c', '宽窄巷子', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '开学2人餐，提供免费WiFi', '123', '130'), ('121', '4', '太平洋影城(新城市店)', 'http:////p0.meituan.net/mogu/45527d4c066cd346b2a3ff69ed443a981218572.png@736w_416h_1e_1c', '宽窄巷子', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '缤纷美味12人餐', '123', '130'), ('122', '5', '金开国际酒店公寓', 'http://p0.meituan.net/tdchotel/e8387a389f68e88099c70c458768f7cf4314969.jpg@736w_416h_1e_1c', '温江大学城', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '升级豪华8人餐，有赠品', '123', '130'), ('123', '5', '希岸Deluxe酒店', 'http://p1.meituan.net/tdchotel/5201562d0236117944c9de607fb4d0137802206.jpg@736w_416h_1e_1c', '大业路', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '下午茶套餐A，建议单人使用', '125', '130'), ('124', '5', '成都城市名人酒店', 'http://p1.meituan.net/tdchotel/87a20352f26d94525d5a8a8614141108211306.jpg@736w_416h_1e_1c', '盐市口', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '港式点心任点任食自助午餐', '123', '130'), ('125', '5', '成都友豪罗曼大酒店', 'http://p1.meituan.net/tdchotel/1df9bd882fc80aa5ab7b25a435250ec930367.jpg@736w_416h_1e_1c', '盐市口', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '小鹿初抹1份', '123', '130'), ('126', '5', '成都茂业JW万豪酒店', 'http://p0.meituan.net/tdchotel/c7fd773528352efa390314999232b2c5359258.jpg@736w_416h_1e_1c', '宽窄巷子', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '开学2人餐，提供免费WiFi', '123', '130'), ('127', '5', 'TOWO上品酒店', 'http://p0.meituan.net/tdchotel/c71d0a06fead244391dedb93fc00a489582189.png@736w_416h_1e_1c', '宽窄巷子', '青羊区人民中路一段15号天府丽都喜来登饭店2层（近成都体育馆）', '缤纷美味12人餐', '123', '130');
COMMIT;

-- ----------------------------
--  Table structure for `userinfo`
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
--  Records of `userinfo`
-- ----------------------------
BEGIN;
INSERT INTO `userinfo` VALUES ('23', '18200490947', 'abc123456'), ('24', '15860745639', '123456789.');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
