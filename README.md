本项目为 https://github.com/SilveryStar/Adachi-BOT 衍生插件，用于查询原神H5小活动数据。

## 安装

在 `src/plugins`目录下使用下面的命令

### 网好用这个

```sh
git clone https://github.com/BennettChina/genshin-h5tool.git
```

### 网差用这两个

```shell
git clone https://ghproxy.com/https://github.com/BennettChina/genshin-h5tool.git
```

需要注意的时 `GitClone` 镜像同步比较慢(夜间同步)，因此如果 `pull` 时未拉取到内容可将插件删掉用 `Ghproxy` 重新克隆。

```shell
git clone https://gitclone.com/github.com/BennettChina/genshin-h5tool.git
```

> 感谢[GitClone](https://gitclone.com/) 和 [GitHub Proxy](https://ghproxy.com/) 提供的镜像服务！

## 使用方法

需要私聊使用并且开启私人服务（即绑定了个人cookie）。

```
# 查询H5活动数据
命令: <header> geth5
范围: 私聊
权限: 用户 (User)
```

## 更新日志

- 2022/04/22 第一版用于查询【轻风雅游】活动中可莉回来的时间和动物来访时间，并制定定时任务通知用户。