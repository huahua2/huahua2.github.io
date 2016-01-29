title: 顺势而为，HTML发展与UI组件设计进化
date: 2016-01-29
tags:
- 前端相关
categories: 学习笔记
#顺势而为，HTML发展与UI组件设计进化
---

转自([http://isux.tencent.com/development-of-ui-components-based-on-native-html.html](http://isux.tencent.com/development-of-ui-components-based-on-native-html.html))

![图片1][1]

在阅读本文之前，建议先阅读之前的一篇文章：“[面向设计的半封装web组件开发](http://isux.tencent.com/half-package-web-components-for-design.html)”，便于理解文章的一些解惑。
<!--more-->
### 一、现状

**1. 前端发展现状**

前端这几年的发展都是有目共睹的，然而，如果按照已经落地投入实践的标准梳理下，会发现，基本上都是偏后的JS开发层面的，比方说Node.js下的前后端分离，MV*库，React.js，各种包管理工具及前端集成解决方案等。

而往前，Shadow DOM, Web Components规范和标准虽然也出现了，给大家看到了方向和未来，但由于兼容性的问题（参见下表），或者可能缺乏优秀团队的强势引领，我们在实际的项目中鲜有看到。

<iframe src="http://caniuse.com/shadowdom/embed" width="100%" height="420" frameborder="0"></iframe>

就算有[webcomponents.js](https://github.com/WebComponents/webcomponentsjs)这样的polyfills处理，也只有IE11+才完全支持。

难道我们就这样干等着，直到Web Components一统江山的时候，我们才开始在HTML侧发力吗？这么多年HTML5的发展就这么白费了？我们做PC端的就因为一些过时的浏览器而止步不前？

**2. UI组件现状**

成熟的团队都有自己的一套组件库，以便各种项目来的时候，都能从容应对。

为了能够从容应对，我们必然要考虑周全，企业级，能应对大型项目，各种复杂场景，充分发挥组件的复用性。往往最终，会让组件变得比较重，逻辑比较复杂，API数量也比较多。我们不妨可以看下kissy 5.0的DatePicker的组件使用示意：

![顺势而为，HTML发展与UI组件设计进化](http://isux.tencent.com/wp-content/uploads/2015/12/20160113172239951.png)

如果我们单看功能，确实很强大，禁用日期可以任意自定义，可以轻松定义各个操作栏是否显示，确实是企业级的web组件，看上去能适应各种复杂场景。

但是，在我看来，问题却非常多。

1.  诸位静下心来想想看，我们所经历的项目，是不是绝大多数都不复杂，我们是否有必要使用企业级的大而重的产品？就好比你一个展示性为主的网站，却使用AngularJS MVVM来高大上。截趾适屦，敦云其愚。
2.  看上去能适应各种场景，但是，眼下现代web技术飞速发展，UI层变化日新月异，你确定你这个组件能跟得上这些变化。怕是最后演变成，组件支持跟不上，而否决了设计师的一些想法。本末倒置了！
3.  代码中出现了`GregorianCalendar`, `GregorianCalendarFormat`这样的方法或对象，请问在座的各位你知道这是个什么鬼吗？你知道他是干嘛用的吗？学习成本啊~~
4.  `render`, `showWeekNumber`, `showClear`, `showToday`, `disabledDate`这些API名称大家有没有觉得在哪里见过？

    “好像是在哪儿见过？”

    “好像个鬼啊，是之前根本就没见过！”

    现在大家闭上眼睛，还记不记得这些API名称是什么？假设一周以后呢，你还记不记得。是不是你要去翻API文档了？使用成本啊~
5.  想象这样的场景，项目启动了，负责组件的前端和负责业务的前端一起开工，谁知突然，负责组件的前端的老婆突然要临盆，不得不去陪产。此时负责业务的前端该怎么搞？会不会像这样一样在心中马景涛：“时间选择组件还没完成，这里的日期交互依赖组件，这不是丢锅给我接吗！？”可以看到，两人的开发被牵制了！两种结果，一是自己上，二是这块工作暂停。

    所以大家发现没，组件和业务耦合在一起，不利于协作啊。比方说上面截图代码的`picker.on('select', function(e) {});`，组件不弄好，根本就没法使用啊！要么就自己先搞搞，回头再改，都是很烦的。

### 二、探索

正是由于当下有这些不如意的现状，所以我就一直在思考，有没有什么办法可以做出改变，不一定是大跨越式的一步到位，至少能指明柳暗花明的另一条路。

我们还是拿时间选择器举例，想想看，HTML5有没有为我们带来`native`的UI组件？对吧，有的，应该都知道的：

<pre>&lt;input type="date"&gt;</pre>

`date`类型的`input`输入框，天然可以选择时间。

![顺势而为，HTML发展与UI组件设计进化](http://isux.tencent.com/wp-content/uploads/2015/12/20160113181504658.png)

我们可以使用`min`/`max`属性限制可以选择的时间范围，使用`value`确定当前选择日期。也就是说，从原始功能角度而言，原生的`date`时间选择可以满足绝大多数的业务需求。

这些符合标准，业界规范的HTML特性要是可以直接在实际项目中应用该多好啊！

然而，问题在于，浏览器原生的界面往往跟我们站点的设计风格有些不协调，说白了，就是设计师觉得丑，而且不能自由定义某些功能，例如清除。

还有一个很现实的问题是兼容性，包括IE11在内的IE浏览器都没有`type="date"`组件行为，![顺势而为，HTML发展与UI组件设计进化](http://mat1.gtimg.com/www/mb/images/face/36.gif) 这个补刀直接剐在了心头。

怎么办呢？

我们此时不妨梳理下：

<pre>&lt;input type="date" min="2016-01-01" max="2016-12-31" value="2016-02-14"&gt;</pre>

`type`/`min`/`max`/`value`这些原生标准的HTML属性并没有问题，有问题的只是点击出现的那个长相简陋的选择浮层。所谓对症下药，哪个有问题就搞哪个，我们只要想办法把丑陋的浮层搞漂亮就可以了。

考虑到兼容性，我们其实可以和传统的时间选择器组件一样，对浮层内容进行自定义，注意，我们仅自定义浮层，HTML还是原始的。

我们构建一个名叫`DateTime`的实例方法，理想状况下，我们只要绑定初始化一下，类似这样：

<pre>new DateTime($("[type=date]");</pre>

然后duang，时间选择器浮层直接美化成设计师需要的模样，那该多完美啊！

梦想总是有的，万一实现了呢？

既然使用自定义的浮层，那就需要干掉浏览器原生的浮层，怎么弄呢？我们可以让`input`框`readonly`只读，这样，就不会出现原始的输入框了。

那`input`框内置的三角(需要隐藏)和斜杠(需要使用短横)该怎么办呢？ 这部分是支持自定义的，类似：

<pre>::-webkit-clear-button,
::-webkit-inner-spin-button,
::-webkit-calendar-picker-indicator {
  display:none;
}
[type="date"]::-webkit-datetime-edit-text {
  color: transparent;
}
[type="date"]::-webkit-datetime-edit-text::before {
  content: '-';
  position: absolute;
}
::-webkit-datetime-edit-text,
::-webkit-datetime-edit-year-field,
::-webkit-datetime-edit-month-field,
::-webkit-datetime-edit-day-field,
::-webkit-datetime-edit-hour-field,
::-webkit-datetime-edit-minute-field,
::-webkit-datetime-edit-ampm-field {
  background: none;
}</pre>

就可以把webkit下的时间输入框改造成我们想要的样子了，而IE等不支持date输入框的浏览器，保持原来的样子就可以。

于是乎，通过CSS和JS的配合，我们就可以实现基于原生HTML5标准的时间选择器了。

“稍等，怎么就实现了？”有人可能会有这样的疑问。

下面这段是我年轻时候使用过的一套组件库的初始化示意：

<pre>new DatePicker($("#date"), {
  <span style="color: #cd0000;">type</span>: "date",
  <span style="color: #62009b;">initDate</span>: ..,
  <span style="color: #0da000;">beginDate</span>: ..,
  <span style="color: #006fc9;">endDate</span>: ..,
  onSelected: $.noop
});</pre>

对比：

<pre>&lt;input <span style="color: #cd0000;">type</span>="date" <span style="color: #0da000;">min</span>="2016-01-01" <span style="color: #006fc9;">max</span>="2016-12-31" <span style="color: #62009b;">value</span>="2016-02-14"&gt;</pre>

我们是不是可以找到之间的关系？没错，这位同学好生眼力，HTML中的`type`属性对应JS中的`type` API, `value`属性值对应`initDate`值, `min`/`max`分别对应`beginDate`/`endDate`。其实内部实现跟传统的组件没什么差别。

那`onSelected`呢？`onSelected`是个回调方法，解读下就是当选择日期之后，干嘛干嘛。其实我们原生的`input`框有类似的事件，什么呢？`change`事件。既然，我们这里使用的是原生的HTML输入框，那我们就可以使用其原生的`change`事件。所以，什么`onSelected`回调，完全不需要。我们只要在组件内部，当赋值的同时`trigger`下原生的`change`事件。

于是乎，我们就得到了一个HTML是原生，API也是原生，事件也是原生，UI自定义的时间选择控件。真真切切将HTML5应用到了实际项目中，同时，就算是是10年前的IE6也是可以兼容。

完美！

然而，一定会有小伙伴提出质疑，你这个功能也太局限了吧，如果遇到特殊需求，例如，所有的周末都不能选择，你怎么整？

OK，此时就需要“[面向设计的半封装web组件开发](http://isux.tencent.com/half-package-web-components-for-design.html)”的这篇文章出马了？

之所以有人会提出上面的质疑，还是按照了传统组件的思维方式去思考。没错，确实有些项目的时间组件要求周末不能选择。但是，你现在做的这个项目，有这个需求吗？你好好想想。

CSS3现在发展越来越成熟，UI层的变化越来越迅速和不可预知，这种趋势，要求我们的UI组件要轻快，灵活，随时可以根据上层变化做调整。而那种妄图考虑各种场景，代码又大又冗余的组件开发方式已经越来越不适应未来的潮流了。

如果你真的遇到“周末都不能选择”的需求，我告诉你怎么办？自定义一个名为”`date-no-weekend`“的`type`类型，内部的JS代码当然该重用的重用，该模块化的模块化：

<pre>&lt;input type="date-no-weekend"&gt;</pre>

还是觉得难以接受，仔细品味后面这句话：组件要面向设计，落地项目，追求品质。

好，我们现在实现了基于HTML5时间选择组件落地实践生产，加以推广，势必对HTML5标准在国内的学习与普及带来帮助。

然而，就单单一个组件，势单力薄，怕是针落大海，激不起一点水花，其他些组件是不是也可以找这种面向HTML的思路去开发呢？

有！

告诉大家，QQ公众平台的UI组件体系贯穿始终，就是基于面向HTML标准开发的思想实现，同时借助面向设计的开发思想，让组件极致体验，同时轻便快捷，风一吹就可以飞到天上去。

### 三、实践

QQ公众平台的UI组件实现，和传统实现是完全不同的设计思想。从JS层进一步往下沉淀了一个层次，基于原生的HTML实现。

多说无益，眼见为实（狠击下面）。

[**demo-点击这里-demo**](http://isux.tencent.com/wp-content/uploads/2015/12/20151221162207754.html)

点击上面的demo, 进入一个平凡的静态页面，引入眼帘的是一个普通的表单，里面的UI都是系统默认的，HTML功能也是原生的。

<div>**例如：**</div>

*   title提示

    [![顺势而为，HTML发展与UI组件设计进化](http://isux.tencent.com/wp-content/uploads/2015/12/20151221150833418.png)](http://isux.tencent.com/wp-content/uploads/2015/12/20151221150833418.png)
*   选择日期

    [![顺势而为，HTML发展与UI组件设计进化](http://isux.tencent.com/wp-content/uploads/2015/12/20151221151623905.png)](http://isux.tencent.com/wp-content/uploads/2015/12/20151221151623905.png)
*   点击提交的表单验证

    [![顺势而为，HTML发展与UI组件设计进化](http://isux.tencent.com/wp-content/uploads/2015/12/20151222142540703.png)](http://isux.tencent.com/wp-content/uploads/2015/12/20151222142540703.png)
<div style="margin-top: 28px; margin-bottom: 20px;">UI虽然原始，但是功能却是很健全的。</div>
<div>**例如：**</div>

*   男女款式、城市以及运费险对价格的影响

    [![顺势而为，HTML发展与UI组件设计进化](http://isux.tencent.com/wp-content/uploads/2015/12/20151222142805210.png)](http://isux.tencent.com/wp-content/uploads/2015/12/20151222142805210.png)
*   表单提交事件

    [![顺势而为，HTML发展与UI组件设计进化](http://isux.tencent.com/wp-content/uploads/2015/12/20151221154020659.png)](http://isux.tencent.com/wp-content/uploads/2015/12/20151221154020659.png)
<div style="margin-top: 38px;">下面，见证奇迹的时刻到了，点击demo页面（下图所示）的按钮进行QQ公众平台UI组件资源的加载和初始化：</div>

[![顺势而为，HTML发展与UI组件设计进化](http://isux.tencent.com/wp-content/uploads/2015/12/2015122214303373.png)](http://isux.tencent.com/wp-content/uploads/2015/12/2015122214303373.png)

结果，一瞬间，上面原始粗糙的界面一下子变成了这样子：

[![顺势而为，HTML发展与UI组件设计进化](http://isux.tencent.com/wp-content/uploads/2015/12/20151221155007578.png)](http://isux.tencent.com/wp-content/uploads/2015/12/20151221155007578.png)

妥妥的丑小鸭变成了白天鹅，包括之前原生的HTML功能。

<div>**例如：**</div>

*   title提示

    [![顺势而为，HTML发展与UI组件设计进化](http://isux.tencent.com/wp-content/uploads/2015/12/20151221161323875.png)](http://isux.tencent.com/wp-content/uploads/2015/12/20151221161323875.png)
*   选择日期

    [![顺势而为，HTML发展与UI组件设计进化](http://isux.tencent.com/wp-content/uploads/2015/12/20151221162536141.png)](http://isux.tencent.com/wp-content/uploads/2015/12/20151221162536141.png)
*   点击提交的表单验证

    [![顺势而为，HTML发展与UI组件设计进化](http://isux.tencent.com/wp-content/uploads/2015/12/20151221162606553.png)](http://isux.tencent.com/wp-content/uploads/2015/12/20151221162606553.png)

而，最最重要，和**最最神奇的事情是**：我们仅仅是引入了QQ公众平台的UI组件，对，仅仅是引入和一点初始化，没有动之前一点点一丝丝的业务JS. 但是，之前的各种交互功能，却完全不受影响，反而体验更上两层楼！

请看下面的gif截图演示：

[![顺势而为，HTML发展与UI组件设计进化](http://isux.tencent.com/wp-content/uploads/2015/12/20151221161027795.gif)](http://isux.tencent.com/wp-content/uploads/2015/12/20151221161027795.gif)

真是一场意外之旅，发现没，面向HTML开发，实际上不是简单推动了HTML5等现代web技术落地实践，对我们的开发流程等也带来了巨大帮助——UI组件可以和业务JavaScript完全分离，可以实现无缝对接。就是因为整个组件体系基于原生HTML开发的设计理念，让UI组件回归了其本质或者说本职作用——UI.

### 四、优势

下面总结下面向HTML的UI组件开发的优势。

**1. HTML/CSS侧的现代产物落地实践**

基于HTML标准来开发我们的UI组件，通过技术跨越各种兼容问题，使得我们前端技术在HTML层也乘上了现代web技术的快车，标准的HTML5规范和属性提前很多年在广受众的传统PC页面呈现，我觉得是非常有意义的一件事情。

**2. 规避了传统组件的很多问题**

1.  更强的语义化，可访问性，SEO等；
2.  学习和使用成本低；
3.  专注HTML控件本身，而不是组件；
4.  可以一次性全局处理；
<div style="margin: 30px 0 10px;">**①. 语义化，可访问性**</div>

毕竟是基于原生HTML来开发的，这一块必定杠杠的。

例如，时间选择：

<pre>&lt;input type="date"&gt;</pre>

显然语义要比下面的`text`类型要好：

<pre>&lt;input type="text"&gt;</pre>

又如基于`checkbox`/`radio`类型的`input`框模拟的单复选框自然要比传统`div`元素模拟的无论是语义、设备可访问性都要高很多。

<div style="margin: 30px 0 10px;">**②. 更低的学习和使用成本**</div>

不会出现类似`GregorianCalendar`, `GregorianCalendarFormat`一眼不知道干嘛的对象和方法。

不需要记住类似`showWeekNumber`, `showClear`, `showToday`, `disabledDate`这样千差万别的JS API名称，记住标准的HTML5属性即可，只要记住一次，终身受用，放心，不会变的，HTML5文案已经定稿了。

而学习成本低对于跨团队合作非常有帮助。你说kissy上手快，还是只需要写写标准HTML就OK上手快！

其他团队同学乐于使用你的东西，介入快，实现效果好，大家都开心。反之，API千差万别，每次使用都要去翻文档，肯定影响合作。

不过，实践下来，有一点学习成本我没考虑到，就是转换思维方式的学习成本。实际上只要面向元素的HTML元素开发就可以了，但是有遇到小伙伴，还是按照老的思维方式，在生成的UI组件元素上做文章。 ![顺势而为，HTML发展与UI组件设计进化](http://mat1.gtimg.com/www/mb/images/face/1.gif)

<div style="margin: 30px 0 10px;">**③. 专注HTML控件本身，而不是组件**</div>

举个例子，日期选择器，当日期修改了，我们要干嘛干嘛，直接：

<pre>$("input").change(function() {});</pre>

想要修改日期范围，直接：

<pre>$("input").attr({
  "min": "2015-12-27",
  "max": "2016-12-27"
});</pre>

UI组件会自动同步。没有任何组件相关的JS代码，也没有什么故弄玄虚，没有所谓的高屋建瓴，全是很简单基础的HTML操作。是不是这样的开发反而很省心，连小白用户也能上手？

于是乎，在多团队联合协作开发的时候，前端开发的进度并不会受UI组件开发影响，面向HTML，专心自身业务开发就可以了。

负责组件开发的前端去休陪产假了，负责业务的前端，直接按照标准的HTML控件元素是实现自己的业务逻辑，什么回调啊都直接使用原生的事件和方法。等负责组件开发的前端，回来了，哪怕拖了个把星期，只要组件完成，公共JS一初始化，业务JS没有任何修改，无缝对接。

于是乎，实现了一个听上去很了不得的东西：**前端分离**。

这对于整个开发流程和效率也带来了巨大的提升。

不仅如此，厂子里有很多开发，负责内部项目，会写JS擅长业务功能实现，但是，UI这块是个软肋。OK，此时，我们这里面向HTML开发的UI组件体系就是其救星，对吧，直接引入CSS和JS，简单全局初始化一下（可能还有一些简单的微调），结果，页面立马高大上了，是不是很有用！

<div style="margin: 30px 0 10px;">**④. 可以一次性全局处理**</div>

传统实现，每个具体业务的脚本里面要参与UI组件的具体API参数设置。而面向HTML的实现，API落地与具体的业务页面，于是乎，只要在项目的common.js中全局初始化一下，如下拉`Select.init()`, 具体的业务JS文件（绝大多数情况下）中就无需再出现UI组件相关的JS代码。

UI层的JS代码和业务层JS代码分离，实现进一步的「前端分离」，去耦合。对于日后的维护、升级等要比传统组件更轻松。

### 五、结果

面向HTML的UI组件开发贯穿于整个QQ公众平台UI组件体系。包括上面没出现过的range范围选择，自定义滚动效果等等。

从实践的结果来看，前端同事啧啧称赞过（功能层），我们设计中心这边leader希望这套可以推到其他team去（体验层）。

大家有兴趣，不妨速度加入QQ公众平台，也来体验下，欢迎反馈以及提出宝贵意见。

### 六、结语

一个`type="date"`的`input`框实际上就是一个终极的Web Components，一小段`&lt;input&gt;`就是一个可以被`import`的模块，然后就可以出现界面复杂的组件效果(shadow DOM)，而API就是HTML的原生属性。

QQ公众平台UI组件离Web Components到底有多远？如果说传统的web组件距离是1条长安街的话，那QQ公众平台UI组件只有0.5条长安街的距离。

HTML和API利用了原生的Web Components模式，非Web Components模式的仅仅是自定义的浮层这一块，但是，设计思想和思路都是朝着Web Components模式前进的。

换句话说，虽然无法一步直达Web Components，但是，我们可以利用HTML的发展，通过一些策略和设计，对UI组件进行一些变革，让其在朝着Web Components前进的道路上迈出一大步。

本文主讲设计思想，至于具体的技术细节，以后有机会会慢慢分享，能够讲的点非常非常多，越是简单的成品越是需要足够的积累。

以上，希望本文的内容能够对大家有一点启示。

![顺势而为，HTML发展与UI组件设计进化](http://mat1.gtimg.com/www/mb/images/face/14.gif)

			


  [1]: http://isux.tencent.com/wp-content/uploads/2015/12/20151223204108331-590x337.png