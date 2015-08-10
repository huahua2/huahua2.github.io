title: 解决Git push时重复输入用户名密码的问题
date: 2015-8-3
tags:
- Hexo
- git
categories: 学习笔记
---
在windows上使用git来push到github服务器的时候，每次都需要填写用户名/邮箱、密码，很麻烦。最近用hexo写博客，需要频繁的push，每次执行hexo deploy都需要输入用户名、密码验证，不胜其烦，以下方法可以解决。
<!--more-->

### 1.首先添加环境变量：

<img src="http://ww2.sinaimg.cn/large/5e8cb366jw1e51yjjv0okj20b00b5gmp.jpg" alt="">

### 2.在用户文件夹如`C:\Users\zhangsan`下新建一个名为`_netrc`的文件

### 3.编辑该文件：
``` bash
machine github.com
login zhangsan
password 123456
```

