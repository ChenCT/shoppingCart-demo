/*
Navicat MySQL Data Transfer

Source Server         : Test
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : shoppingcart

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-03-10 14:34:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `addressinfo` varchar(400) DEFAULT NULL,
  `isdefault` varchar(11) DEFAULT NULL,
  `user_phone` varchar(20) DEFAULT NULL,
  `addressarea` varchar(400) DEFAULT NULL,
  `receiver` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('1', '1', 'family', '1', '15012342345', '江苏省无锡市滨湖区', 'ct');
INSERT INTO `address` VALUES ('2', '1', 'family', '0', '15012342345', '江苏省无锡市江阴市', 'ctttt');
INSERT INTO `address` VALUES ('3', '1', 'family', '0', '15065456789', '浙江省', 'zfy');
INSERT INTO `address` VALUES ('4', '1', 'family', '0', '150654523459', '陕西省', 'fdsdcs');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `productId` int(11) NOT NULL,
  `productName` char(30) DEFAULT NULL,
  `productPrice` decimal(10,2) DEFAULT NULL,
  `productImg` text,
  PRIMARY KEY (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1001', '小米Mix', '2499.00', '1.jpg');
INSERT INTO `goods` VALUES ('1002', '音响', '799.00', '2.jpg');
INSERT INTO `goods` VALUES ('1003', '耳机', '1899.00', '3.jpg');
INSERT INTO `goods` VALUES ('1004', '迷你音响', '699.00', '4.jpg');
INSERT INTO `goods` VALUES ('1005', '充电宝', '80.00', '5.jpg');
INSERT INTO `goods` VALUES ('1006', '插座', '30.00', '6.jpg');
INSERT INTO `goods` VALUES ('1007', '耳机', '50.00', '7.jpg');
INSERT INTO `goods` VALUES ('1008', '充电宝', '50.00', '8.jpg');
INSERT INTO `goods` VALUES ('1015', '数据线', '20.00', '15.jpg');

-- ----------------------------
-- Table structure for goods_cart
-- ----------------------------
DROP TABLE IF EXISTS `goods_cart`;
CREATE TABLE `goods_cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_num` int(11) NOT NULL,
  `product_name` char(30) NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `product_img` char(50) NOT NULL,
  `checked` char(10) NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `goods_cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `goods` (`productId`),
  CONSTRAINT `goods_cart_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_cart
-- ----------------------------
INSERT INTO `goods_cart` VALUES ('8', '1', '1007', '1', '耳机', '50.00', '7.jpg', '1');
INSERT INTO `goods_cart` VALUES ('9', '1', '1008', '1', '充电宝', '50.00', '8.jpg', '1');

-- ----------------------------
-- Table structure for order_detail
-- ----------------------------
DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE `order_detail` (
  `detail_id` int(30) NOT NULL AUTO_INCREMENT,
  `order_id` char(30) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_num` int(11) NOT NULL,
  `product_name` char(30) NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `product_img` char(50) NOT NULL,
  PRIMARY KEY (`detail_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_info` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_detail
-- ----------------------------
INSERT INTO `order_detail` VALUES ('3', '4201712131951419', '1006', '2', '插座', '30.00', '6.jpg');
INSERT INTO `order_detail` VALUES ('4', '4201712131951419', '1007', '1', '耳机', '50.00', '7.jpg');
INSERT INTO `order_detail` VALUES ('5', '5201712141008579', '1004', '1', '迷你音响', '699.00', '4.jpg');
INSERT INTO `order_detail` VALUES ('6', '5201712141008579', '1008', '1', '充电宝', '50.00', '8.jpg');
INSERT INTO `order_detail` VALUES ('7', '8201712141011591', '1015', '1', '数据线', '20.00', '15.jpg');
INSERT INTO `order_detail` VALUES ('8', '8201712141011591', '1003', '1', '耳机', '1899.00', '3.jpg');
INSERT INTO `order_detail` VALUES ('9', '5201712141019287', '1015', '1', '数据线', '20.00', '15.jpg');
INSERT INTO `order_detail` VALUES ('10', '5201712141019287', '1002', '1', '音响', '799.00', '2.jpg');
INSERT INTO `order_detail` VALUES ('11', '5201712142025290', '1003', '1', '耳机', '1899.00', '3.jpg');

-- ----------------------------
-- Table structure for order_info
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info` (
  `order_id` char(30) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdate` varchar(30) DEFAULT NULL,
  `order_total` int(11) DEFAULT NULL,
  `address` varchar(400) DEFAULT NULL,
  `order_status` int(11) DEFAULT NULL,
  `receiver` varchar(200) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_info
-- ----------------------------
INSERT INTO `order_info` VALUES ('4201712131951419', '1', '2017-12-13 19:51:41', '105', '浙江省', '1', 'zfy', '15065456789');
INSERT INTO `order_info` VALUES ('5201712141008579', '1', '2017-12-14 10:08:57', '744', '江苏省无锡市江阴市', '1', 'ctttt', '15012342345');
INSERT INTO `order_info` VALUES ('5201712141019287', '1', '2017-12-14 10:19:28', '814', '浙江省', '1', 'zfy', '15065456789');
INSERT INTO `order_info` VALUES ('5201712142025290', '1', '2017-12-14 20:25:29', '1894', '浙江省', '1', 'zfy', '15065456789');
INSERT INTO `order_info` VALUES ('8201712141011591', '1', '2017-12-14 10:11:59', '1914', '江苏省无锡市江阴市', '1', 'ctttt', '15012342345');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `login_password` varchar(100) NOT NULL,
  `pay_password` varchar(100) DEFAULT NULL,
  `user_number` varchar(40) NOT NULL,
  `user_photo` varchar(200) DEFAULT NULL,
  `verification_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'ct', 'chenting', '123456', '15015001500', null, null);
