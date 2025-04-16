---
layout: post
title: "自建广告拦截：Pi-hole 部署指南"
date: 2023-09-05
tags: 三人日志
---
Pi-hole 是开源网络级广告拦截工具，通过DNS层过滤实现全设备广告屏蔽，适合树莓派或Linux服务器部署。

**部署步骤：**
```bash
curl -sSL https://install.pi-hole.net | bash