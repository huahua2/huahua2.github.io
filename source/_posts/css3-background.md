title: css3的background属性
date: 2015-08-5 21:50
tags:
- css3
categories: 学习笔记
---
css3的background属性

用图片作为背景平铺，以封面形式展示

```css
.main-wrapper{
  background:#444 url(../img/bg.jpg);
  background-attachment:fixed;
  background-repeat:no-repeat;
  background-size:cover;
  background-position:center center;
}
```



