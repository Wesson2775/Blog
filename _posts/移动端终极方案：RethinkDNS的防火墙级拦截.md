---
layout: post
title: "移动端终极方案：RethinkDNS的防火墙级拦截"
date: 2024-09-10
tags: [移动安全, Android]
---
**核心功能：**
- 基于本地VPN实现（非真实VPN）
- 支持超60种过滤列表
- 实时流量分析仪表盘

**配置流程：**
1. 从F-Droid安装应用
2. 启用"Firewall mode"
3. 勾选以下过滤列表：
   - [x] OISD Full
   - [x] Energized Ultimate
   - [x] 中国专属广告规则

**耗电测试（Pixel 7）：**
| 模式       | 24小时耗电 |
|------------|-----------|
| 关闭       | 2.8%      |
| 仅广告拦截 | 3.1%      |
| 全防护     | 4.5%      |