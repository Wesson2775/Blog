---
layout: post
title: "Firefox 的广告拦截生存方案"
date: 2024-09-08
tags: 三人日志
---
Firefox 仍支持Manifest V2扩展，是目前uBlock Origin完整功能的最佳载体。

**配置优化：**
1. 启用高级用户模式
2. 添加以下规则集：
   - uBlock filters
   - EasyPrivacy
   - 区域特定规则（如CHN filter）
3. 开启动态规则更新

**注意事项：**
- 需禁用Firefox遥测功能
- 建议配合Arkenfox隐私强化配置