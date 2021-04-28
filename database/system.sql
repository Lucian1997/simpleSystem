/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50730
Source Host           : localhost:3306
Source Database       : system

Target Server Type    : MYSQL
Target Server Version : 50730
File Encoding         : 65001

Date: 2021-04-28 14:18:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `pubtime` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', '123', '123', '1619578112909', '<h1>12312</h1>');

-- ----------------------------
-- Table structure for `auth`
-- ----------------------------
DROP TABLE IF EXISTS `auth`;
CREATE TABLE `auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `auth_name` varchar(255) NOT NULL,
  `auth_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of auth
-- ----------------------------
INSERT INTO `auth` VALUES ('1', '用户管理', '/admin/user');
INSERT INTO `auth` VALUES ('2', '权限管理', '/admin/auth');
INSERT INTO `auth` VALUES ('3', '角色管理', '/admin/role');
INSERT INTO `auth` VALUES ('4', '新闻管理', '/admin/news');
INSERT INTO `auth` VALUES ('5', '医生管理', '/admin/doctor');
INSERT INTO `auth` VALUES ('6', '患者管理', '/admin/patient');

-- ----------------------------
-- Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menuname` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', '用户管理', '用户管理', '0');
INSERT INTO `menu` VALUES ('2', '用户列表', '用户列表', '1');
INSERT INTO `menu` VALUES ('3', '角色管理', '角色管理', '1');
INSERT INTO `menu` VALUES ('4', '权限管理', '权限管理', '1');
INSERT INTO `menu` VALUES ('5', '新闻管理', '新闻管理', '0');
INSERT INTO `menu` VALUES ('6', '文章列表', '文章列表', '5');
INSERT INTO `menu` VALUES ('7', '分类管理', '分类管理', '5');

-- ----------------------------
-- Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '超级管理员', '拥有所有权限');
INSERT INTO `role` VALUES ('2', '医生护士', '可以看到患者的挂号信息');
INSERT INTO `role` VALUES ('3', '患者', '可以看到患者自身挂号的信息');
INSERT INTO `role` VALUES ('5', '测试', '');

-- ----------------------------
-- Table structure for `role_auth`
-- ----------------------------
DROP TABLE IF EXISTS `role_auth`;
CREATE TABLE `role_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `auth_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of role_auth
-- ----------------------------
INSERT INTO `role_auth` VALUES ('1', '1', '1');
INSERT INTO `role_auth` VALUES ('2', '1', '2');
INSERT INTO `role_auth` VALUES ('3', '1', '3');
INSERT INTO `role_auth` VALUES ('4', '1', '4');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1004 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('996', 'admin', '01974f4ff203e186b7ba753b0ebdd73e', 'admin@qq.com', '15992681283', '/upload/userIcon/02_icon_554d458e1e81d04e09d762a6ec2f62b4_curosr.png', '1');
INSERT INTO `user` VALUES ('997', '2', '02', '02', '02', '', '0');
INSERT INTO `user` VALUES ('1002', 'user', 'ee88bb9e5888edaaf29dfaa94ebfa3db', 'user@162.com', '15998562357', '', '2');
INSERT INTO `user` VALUES ('1003', 'test', 'd6ccc90b2178edca6e0b540872af55f6', 'test@163.com', '15856325478', null, '2');
