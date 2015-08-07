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