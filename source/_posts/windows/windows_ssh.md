---
title: windows下创建公钥私钥
category: Linux
tag:
    - ssh
    - Linux
---
# windows下创建公钥私钥

```shell
ssh-keygen -t rsa -b 4096 -C "你的邮箱地址"
```

使用默认值的话公钥私钥保存在 `C:\Users\%userprofile%\.ssh`

其中.pub 文件是公钥

将公钥传至vps中：

```shell
cd root
mkdir .ssh
cd .ssh
vim authorized_keys
```

将windows上的公钥文本复制进authorized_keys文件中

使用ssh连接即可

```shell
ssh -i "路径\到\私钥文件" 用户名@远程服务器地址
ssh -p "端口" -i "路径\到\私钥文件" 用户名@远程服务器地址
```
