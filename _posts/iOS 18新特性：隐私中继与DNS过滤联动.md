---
layout: post
title: "iOS 18新特性：隐私中继与DNS过滤联动"
date: 2024-09-14
tags: [iOS, 隐私保护]
---
**配置步骤：**
1. 设置 → 无线局域网 → DNS → 选择"加密DNS"
2. 添加自定义DoH：
3. Safari高级设置：
   - 启用"隐藏IP地址"
   - 关闭"跨网站跟踪"

**越狱方案（Checkra1n设备）：**
```deb
# 安装MyBloxx插件
dpkg -i mybloxx_3.0_iphoneos-arm.deb