---
layout: post
title: "OpenWRT路由器部署AdGuard+IPSet"
date: 2024-09-12
tags: [网络硬件, 路由器]
---
**LuCI界面操作：**
1. 服务 → AdGuard Home → 启用
2. 网络 → DHCP/DNS → 自定义DNS：

**IPTables规则（`/etc/firewall.user`）：**
```bash
iptables -t nat -A PREROUTING -p udp --dport 53 -j REDIRECT --to-ports 5053
ipset create adblock hash:net
iptables -I FORWARD -m set --match-set adblock dst -j DROP