---
layout: post
title: "容器化方案：Docker实现网络级隔离"
date: 2024-09-15
tags: [Docker, 云计算]
---
**docker-compose.yml核心配置：**
```yaml
services:
  pihole:
    image: pihole/pihole:latest
    networks:
      adguard_net:
        ipv4_address: 172.16.238.2
    dns:
      - 127.0.0.1
      - 1.1.1.1

  wireguard:
    image: linuxserver/wireguard
    network_mode: "service:pihole"