---
layout: post
title: "AdGuard Home 私有化部署实践"
date: 2024-06-06
tags: 三人日志
---
AdGuard Home 提供类似Pi-hole的解决方案，但具有更友好的图形界面和跨平台支持。

**对比优势：**
✔️ 原生支持DoH/DoT  
✔️ 内置查询日志分析  
✔️ 一键同步第三方过滤规则  
❌ 资源占用略高于Pi-hole

**推荐规则集：**
- AdGuard DNS filter
- StevenBlack/hosts
- 自定义社交媒体跟踪规则