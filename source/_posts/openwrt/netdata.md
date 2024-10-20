---
title: netdata配置
category: openwrt
tag:
    - openwrt
---
# openwrt下使用netdata监测cpu温度以及vps延迟

## openwrt安装

推荐使用骷髅头大佬的固件

固件自带的netdata版本为`1.33.1-1`，此版本支持温度监测以及fping监测ping延迟

## netdata 使用

使用`ip:19999` 即可进入netdata界面，`ip:19999/netdata.conf`则是由netdata补全完的配置信息

netdata 配置文件在 `/etc/netdata/netdata.conf`

重启netdata命令为 `/etc/init.d/netdata restart`

部分配置如下：

```conf
[global]
    update every = 1
    memory deduplication (ksm) = no
    debug log = syslog
    error log = syslog
    access log = none
    run as user = root
    memory mode = save
    history = 86940
    hostname = r2s
```

* update every: 更新周期，即1秒更新一次
* memory mode: 数据存储方式
    * save: 数据全部存储在内存
    * dbengine: 官网推荐这种方式，默认使用32MB的内存和256MB的存储来保存数据，但是r2s上实测与save方式内存使用无异，可能是版本过低的原因
    * ...
* history: 全局历史记录保存时间，其他设置中未指定history的都按这个值。86940=24*60*60=一天
* hostname: 主机名

## chat监测温度

有Python.d和chart.d 两种方式监测温度，楼主的r2s使用python.d无法获取，故介绍chart.d的方式

1. 安装timeout `opkg install coreutils-timeout`
    * 出错则需要刷新列表 `opkg update`
2. 编辑`/etc/netdata/charts.d.conf`，于末尾添加`sensors=force`
    * 一句命令：`sh -c 'echo "sensors=force" >> /etc/netdata/charts.d.conf'`
    * 检查: `cat /etc/netdata/charts.d.conf`
3. 开启插件: 编辑`/etc/netdata/netdata.conf`，将`[plugins]`中的`charts.d`设置为`yes`
4. 重启: `/etc/init.d/netdata restart`

## fping监测vps延迟变化

1. 安装 `opkg install fping`
2. 编辑配置文件 `/usr/lib/netdata/conf.d/fping.conf`
    * 修改hosts内容，多host用空格间隔
    * 推荐在/etc/hosts 中设置自定义域名
      * 如添加 `127.0.0.2 root` 此时在fping.conf的hosts中添加root即可
3. 测试
    * `cd /usr/lib/netdata/plugins.d`
    * `./fping.plugin`
    * 有数据则表示正常
4. 配置netdata
    * 修改`/etc/netdata/netdata.conf`，将`[plugins]`中的`fping`设置为`yes`
5. 重启 `/etc/init.d/netdata restart`

## 其他优化

netdata会将所有数据存放在内存中，为了减少内存的使用可以将不需要的数据以及图表关闭。可以打开netdata后查看不需要的图表名

如Current CPU Frequency (cpu.cpufreq)，访问配置文件`ip:19999/netdata.conf`中CTRL+F 搜索括号内的关键词，即可找到对应配置，将该配置中enabled设置成no，并复制到`/etc/netdata/netdata.conf`即可
