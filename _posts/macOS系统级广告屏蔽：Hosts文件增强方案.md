---
layout: post
title: "macOS系统级广告屏蔽：Hosts文件增强方案"
date: 2024-09-11
tags: [macOS, 系统优化]
---
**自动化脚本：**
```bash
#!/bin/zsh
# 使用Ansible同步更新hosts
curl -s https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts | \
grep '^0\.0\.0\.0' | \
sudo tee -a /etc/hosts

# 刷新DNS缓存
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder