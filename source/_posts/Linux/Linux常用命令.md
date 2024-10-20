---
title: Linux常用命令
category: Linux
tag:
    - Vps
    - Linux
---
# Linux常用命令

## 宝塔环境下安装node模块全局失效问题

`v20.18.0` 为实际安装的npm版本

进入对应模块检查bin目录下文件，然后创建连接，部分模块如下：

```bash
ln -sf /www/server/nodejs/v20.18.0/lib/node_modules/pnpm/bin/pnpm.cjs /usr/bin/pnpm

ln -sf /www/server/nodejs/v20.18.0/lib/node_modules/gulp-cli/bin/gulp.js /usr/bin/gulp

ln -sf /www/server/nodejs/v20.18.0/lib/node_modules/hexo-cli/bin/hexo /usr/bin/hexo
```

## 添加swap和zram

```bash
curl -L https://raw.githubusercontent.com/spiritLHLS/addzram/main/addzram.sh -o addzram.sh && chmod +x addzram.sh && bash addzram.sh

wget https://www.moerats.com/usr/shell/swap.sh && bash swap.sh
```