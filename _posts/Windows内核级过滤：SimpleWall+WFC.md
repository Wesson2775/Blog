---
layout: post
title: "Windows内核级过滤：SimpleWall+WFC"
date: 2024-09-13
tags: [Windows, 系统安全]
---
**组合方案：**
- SimpleWall（图形界面）
- Windows Firewall Control（策略增强）

**注册表优化（管理员CMD）：**
```reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters]
"EnableConnectionRateLimiting"=dword:00000000
"DisableTaskOffload"=dword:00000001