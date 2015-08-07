title: Hexo发布命令 Generating
date: 2015-8-5 22:44
tags:
- Hexo
categories: 学习笔记
---

- [Hexo全部命令]  
[Hexo全部命令]: https://github.com/hexojs/site/tree/master/source/docs
- [本文源] 
[本文源]: https://github.com/hexojs/site/blob/master/source/docs/generating.md
title: Generating
---
Generate static files with Hexo is quite easy and fast.

``` bash
$ hexo generate
```
<!--more-->
### Watch for File Changes

Hexo can watch for file changes and regenerate files immediately. Hexo will compare SHA1 checksum of files and only write if files changed.

``` bash
$ hexo generate --watch
```

### Deploy After Generating

To deploy after generating, you can run one of the following commands. Both of them are equaled.

``` bash
$ hexo generate --deploy
$ hexo deploy --generate
```

常用命令：

``` bash
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #将.deploy目录部署到GitHub
```

常用复合命令：

``` bash
hexo deploy -g
hexo server -g
```

简写：
``` bash
hexo n == hexo new
hexo g == hexo generate
hexo s == hexo server
hexo d == hexo deploy
```