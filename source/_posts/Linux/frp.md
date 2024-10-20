---
title: Frp安装
category: Linux
tag:
    - Frp
    - Linux
---
# Frp安装

## 安装

[github](https://github.com/fatedier/frp/releases)

解压：`tar -zxvf frp_0.54.0_linux_amd64.tar.gz -C ./` *注意修改版本*

移动到当前文件夹：`mv frp_0.54.0_linux_amd64/* .`

frps为服务端，frpc则为客户端

## 配置

```toml
# frps.toml

# 服务端监听端口
bindPort = 6670

# HTTP 类型代理监听的端口
vhostHTTPPort = 6698

#dashboard
webServer.addr = "127.0.0.1"
webServer.port = 6699
webServer.user = "admin"
webServer.password = "password"

#设置客户端token
auth.token= "token"
```

## 自启动

`vim /etc/systemd/system/frps.service`

输入

```toml

```[Unit]
Description=frps Service
After=network.target

[Service]
ExecStart= /root/frp/frps -c /root/frp/frps.toml
Restart=always

[Install]
WantedBy=multi-user.target
```

设置自启动

```sh
systemctl enable frps
systemctl start frps
systemctl status frps
```
