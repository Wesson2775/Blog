---
layout: post
title: "智能分流：SmartDNS与Clash的广告拦截协同"
date: 2024-09-09
tags: [技术笔记, 网络优化]
---
**原理架构：**
**部署步骤：**
1. SmartDNS配置（`/etc/smartdns.conf`）：
```ini
server-name smartdns
bind :53
cache-size 2048
prefetch-domain yes
speed-check-mode ping,tcp:443
address /adservice.google.com/#
domain-rules /tracking/ -block