---
title: wsl的配置
category: Windows
tag:
    - wsl
    - Windows
---
# wsl

```shell
Install-Module -Name PowerShellGet -Force # 管理员权限
Exit # 退出

Install-Module PSReadLine -AllowPrerelease -Force # 普通权限
Exit
```

## install

[Microsoft](https://learn.microsoft.com/zh-cn/windows/wsl/install-manual#step-2---check-requirements-for-running-wsl-2)

```shell
wsl -l -v # 查看已安装版本
wsl --list --online # 查看可安装版本
wsl --install -d Debian # 安装Debian
```

## oh-my-zsh

安装

```bash
sudo apt-get install zsh
sudo apt-get install curl
sudo apt-get install git
sudo apt-get install vim
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# 将默认Shell更改为 zsh
#chsh -s `which zsh`
```

安装插件

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

修改配置

```bash
vim ~/.zshrc

# 修改
plugins=(git z zsh-syntax-highlighting zsh-autosuggestions)

# 更新配置
source ~/.zshrc
```
