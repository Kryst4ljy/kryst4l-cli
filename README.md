# kryst4l-cli脚手架工具

本项目为仿`vue-cli`实现的一个自己的项目管理脚手架工具。

本项目旨在实现通过全局安装的本脚手架工具，通过一行命令实现项目的快速搭建。

目前实现的逻辑是使用命令行`git clone`来拉取本人的`github`上面的项目。

后续还可以集成更多的功能。

### 下载

```
npm i kryst4l-cli -g
```

### 使用

1. 创建一个基于react-ts的前端项目。

项目地址：https://github.com/Kryst4ljy/react-ts

```
KCLI create demo -r
```

2. 创建一个基于express和ts的服务端小项目

项目地址：https://github.com/Kryst4ljy/express-ts

```
KCLI create demo -e
```
## 结语

本项目还会不断的更新更多的功能，主要是为了自己服务，搭建一个脚手架工具，可以基于node实现各种自己想实现的功能。
