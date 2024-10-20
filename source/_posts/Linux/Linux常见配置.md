---
title: Linux 常见配置
category: Linux
tag:
    - Vps
    - Linux
---
# Linux 常见配置

## bbr 加速

1. 修改系统变量
  - `echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf`
  - `echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf`

2. 确认修改
  - `sysctl -p`

3. 检查成果
  - `lsmod | grep bbr` 显示 `tcp_bbr  20480  1`

## zsh

```bash
# 安装zsh
sudo apt-get install zsh
zsh --version

# 安装oh-my-zsh，需要先安装好git
sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"

# 配置一些插件
# git z 这两个插件已经自带，只需要配置上就可以了

# zsh-syntax-highlighting
# 高亮语法，如图，输入正确语法会显示绿色，错误的会显示红色，使得我们无需运行该命令即可知道此命令语法是否正确
git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# zsh-autosuggestions
# 显示之前运行的命令, 按<control + e>即可补全，或者按右键→即可补全
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# 在.zshrc加上

vim ~/.zshrc

plugins=(git z zsh-autosuggestions zsh-syntax-highlighting)

# source ~/.zshrc 生效
source ~/.zshrc
```

## tcp 窗口调优

```bash
# /etc/sysctl.conf

# 设置 TCP 拥塞控制和调度器
net.core.default_qdisc=fq
net.ipv4.tcp_congestion_control=bbr

# TCP 缓存与窗口相关设置
net.ipv4.tcp_window_scaling=1
net.ipv4.tcp_adv_win_scale=-2
net.ipv4.tcp_rmem=8192 41943040 167772160
net.ipv4.tcp_wmem=4096 16384 167772160

# 禁用慢启动
net.ipv4.tcp_slow_start_after_idle=0

# 安全设置
net.ipv4.icmp_echo_ignore_all=1
```

## 网络

`/etc/resolv.conf` dns

`/etc/hosts` 主机名