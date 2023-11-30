## window 对象

`BOM` 的核心是 `window` 对象，表示浏览器的实例



## `Global` 作用域

+ 通过 `var` 声明的所有全局变量和函数都会变成 `window` 对象的属性和方法

  ```js
  var age = 29
  var sayAge = () => alert(this.age)
  alert(window.age) // 29
  sayAge() // 29
  window.sayAge() // 29
  ```



## 窗口关系

+ `window.top` 始终指向最上层窗口 => 浏览器窗口本身
+ `window.parent` 对象则始终指向当前窗口的父窗口，如果当前窗口是最上层窗口：`window.parent === window.top === window === window.self`
+ 可以把访问多个窗口的`window` 对象串联起来，如： `window.parent.parent`



## 窗口位置与像素比

+ 现代浏览器提供了`screenLeft`和`screenTop`属性，用于表示窗口相对于屏幕左侧和顶部的位置



### 像素比

+ `CSS`像素是`Web`开发中使用的统一像素单位
+ 这个单位的背后其实是一个角度: **0.0213°**
+ 这样定义像素大小是为了在不同设备上统一标准
+ 不同像素密度的屏幕下就会有不同的**缩放系数**，以便把**物理像素**（屏幕实际的分辨率）转换为**CSS像素**（浏览器报告的虚拟分辨率）
+ 物理像素与`CSS`像素之间的转换比率由`window.devicePixelRatio`属性提供



## 窗口大小

+ 现代浏览器都支持4个属性
  + `window.innerWidth`
  + `window.innerHeight`
  + `window.outerWidth`
  + `window.outerHeight`



`document.documentElement.clientWidth` 和 `document.documentElement.clientHeight` 返回**页面视口**的宽度和高度

`document.body.clientWidth` 和 `document.body.clientHeight`  表示 `body` 的宽高



 在移动设备上，`window.innerWidth` 和 `window.innerHeight` 返回视口的大小，是屏幕上页面可视区域的大小 ，`document.documentElement. clientWidth`和`document.documentElement.clientHeight`中提供了相同的信息



## 视口位置

度量文档相对于视口滚动距离的属性有两对

+ `window.pageXoffset`
+ `window.scrollX`
+ `window.pageYoffset`
+ `window.scrollY`

滚动页面方法

+ `scroll()`
+ `scrollTo()`
+ `scrollBy()`

这几个方法也都接收一个**`ScrollToOptions`字典**，除了提供**偏移值**，还可以通过`behavior`属性告诉浏览器是否平滑滚动





## 导航与打开新窗口

`window.open()`

+ `url`：在新窗口打开的 `URL`地址，如果省略或为 `about: blank`，则新窗口将显示一个空白页面
+ `target`：指定新窗口打开的位置
  + `_blank`：在新标签页或窗口中打开
  + `_self`：在当前标签页或窗口中打开
  + `_parent`：在当前页面的父级框架中打开
  + `_top`：在当前页面中的顶级框架中打开
+ `features`： 包含一些列以逗号分隔的选项，如窗口大小、位置、工具栏等
  + `width=600,height=400`
  + `top=100,left=100`
  + `toolbar=no,location=no`
+ `replace`：如果为 `true`，则新打开的窗口将替换浏览器历史中的当前条目，而不是创建新的历史记录



`window.postMessage` 使用—解决不同窗口之间的通信

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Send Message</title>
</head>
<body>
  <button id="btn">open window</button>
  <script>
    const targetWindow = window.open('http://localhost:8080/test2.html', '_blank');
    btn.addEventListener('click', () => {
      targetWindow.postMessage('Hello from sender!', 'http://localhost:8080');
    })
  </script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receiver Message</title>
</head>
<body>
  111
  <script>
    // 监听消息
    window.addEventListener('message', (event) => {
      console.log(event)
      console.log('Message received:', event.data);
      alert('Message')
    });
    console.log(window.origin)
  </script>
</body>
</html>
```

新创建窗口的`window`对象有一个属性`opener`，指向打开它的窗口。这个属性只在弹出窗口的最上层`window`对象（`top`）有定义，是指向调用`window.open()`打开它的窗口或窗格的指针

```js
let wroxWin = window.open("http://www.wrox.com/",
              "wroxWindow",
              "height=400, width=400, top=10, left=10, resizable=yes");
alert(wroxWin.opener === window); // true
```

## `location` 对象

不仅保存着当前加载文档的信息，也保存着把`URL`解析为**离散片段**后能够通过属性访问的信息

### `location.search`

`location.search`返回了从**问号开始直到URL末尾的所有内容**

```js
let getQueryStringArgs = function() {
  // 取得没有开头问号的查询字符串
  let qs = (location.search.length > 0 ? location.search.substring(1) : ""),
    // 保存数据的对象
    args = {};
  // 把每个参数添加到args对象
  for (let item of qs.split("&").map(kv => kv.split("="))) {
    let name = decodeURIComponent(item[0]),
      value = decodeURIComponent(item[1]);
    if (name.length) {
      args[name] = value;
    }
  }
  return args;
}
```

### `URLSearchParams`

`URLSearchParams`提供了一组标准API方法—通过它们可以检查和修改查询字符串

```js
let qs = "? q=javascript&num=10";
let searchParams = new URLSearchParams(qs);
alert(searchParams.toString());   // " q=javascript&num=10"
searchParams.has("num");           // true
searchParams.get("num");           // 10
searchParams.set("page", "3");
alert(searchParams.toString());   // " q=javascript&num=10&page=3"
searchParams.delete("q");
alert(searchParams.toString());   // " num=10&page=3"
```

大多数支持`URLSearchParams`的浏览器也支持将`URLSearchParams`的实例用作**可迭代对象**

```js
let qs = "? q=javascript&num=10";
let searchParams = new URLSearchParams(qs);
for (let param of searchParams) {
  console.log(param);
}
// ["q", "javascript"]
// ["num", "10"]
```

### 操作地址

```js
location.assign('http://www.wrox.com')
```

```js
window.location = "http://www.wrox.com";
location.href = "http://www.wrox.com";
```

立即启动导航到新`URL`的操作

同时在浏览器历史记录中增加一条记录

如果给`location.href`或`window.location`设置一个`URL`，也会以同一个`URL`值调用`assign()`方法





修改`location`对象的属性也会修改当前加载的页面

```js
// 假设当前URL为http://www.wrox.com/WileyCDA/
// 把URL修改为http://www.wrox.com/WileyCDA/#section1
location.hash = "#section1";
// 把URL修改为http://www.wrox.com/WileyCDA/?q=javascript
location.search = "? q=javascript";
// 把URL修改为http://www.somewhere.com/WileyCDA/
location.hostname = "www.somewhere.com";
// 把URL修改为http://www.somewhere.com/mydir/
location.pathname = "mydir";
// 把URL修改为http://www.somewhere.com:8080/WileyCDA/
location.port = 8080;
```

除了`hash`之外，只要修改`location`的一个属性，就会导致页面重新加载新`URL`

### `location.reload()`

```js
location.reload();      // 重新加载，可能是从缓存加载
location.reload(true); // 重新加载，从服务器加载
```

脚本中位于`reload()`调用之后的代码可能执行也可能不执行，这取决于网络延迟和系统资源等因素。为此，最好把`reload()`作为**最后一行代码**



## `navigator` 对象

```navigato```r对象的属性通常用于确定浏览器的类型

### 检测插件

检测浏览器是否安装了某个插件是开发中常见的需求

除**IE10**及更低版本外的浏览器，都可以通过**plugins**数组来确定

```ts
export interface PluginItem {
  /** 插件名称 */
	name: string;
  /** 插件介绍 */
  description: string;
  /** 插件的文件名 */
  filename: string;
  /** 由当前插件处理的 MIME 类型数量 */
  length: number;
}
```

```js
// 插件检测，IE10 及更低版本无效
let hasPlugin = function(name) {
  name = name.toLowerCase();
  for (let plugin of window.navigator.plugins){
    if (plugin.name.toLowerCase().indexOf(name) > -1){
      return true;
    }
  }
  return false;
}
// 检测Flash
alert(hasPlugin("Flash"));
// 检测QuickTime
alert(hasPlugin("QuickTime"));
```

```js
// 在旧版本IE中检测插件
function hasIEPlugin(name) {
  try {
    new ActiveXObject(name);
    return true;
  } catch (ex) {
    return false;
  }
}
// 检测Flash
alert(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"));
// 检测QuickTime
alert(hasIEPlugin("QuickTime.QuickTime"));
```

```js
// 在所有浏览器中检测Flash
function hasFlash() {
  var result = hasPlugin("Flash");
  if (! result){
    result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
  }
  return result;
}
// 在所有浏览器中检测QuickTime
function hasQuickTime() {
  var result = hasPlugin("QuickTime");
  if (! result){
    result = hasIEPlugin("QuickTime.QuickTime");
  }
  return result;
}
// 检测Flash
alert(hasFlash());
// 检测QuickTime
alert(hasQuickTime());
```



## 注册处理程序

现代浏览器支持`navigator`上的（在**HTML5**中定义的）`registerProtocolHandler()`方法

这个方法可以把一个网站注册为处理某种特定类型信息应用程序

```js
navigator.registerProtocolHandler("mailto",
  "http://www.somemailclient.com?cmd=%s",
  "Some Mail Client");
```



## `window.history` 对象

`history`对象表示当前窗口首次使用以来用户的导航历史记录

出于安全考虑，这个对象不会暴露用户访问过的URL，但可以通过它在不知道实际`URL`的情况下前进和后退



### 导航

```js
// 后退一页
history.go(-1);
// 前进一页
history.go(1);
// 前进两页
history.go(2);
```

```js
// 后退一页
history.back();
// 前进一页
history.forward();
```

```js
if (history.length == 1){
  // 这是用户窗口中的第一个页面
}
```

`history`对象通常被用于**创建“后退”和“前进”按钮**，以及**确定页面是不是用户历史记录中的第一条记录**



### 历史状态管理

**HTML5**也为`history`对象增加了方便的状态管理特性

`hashchange`会在页面`URL`的**散列变化时**被触发，开发者可以在此时执行某些操作

状态管理`API`则可以让开发者改变浏览器`URL`而不会加载新页面

```js
let stateObject = {foo:"bar"};
history.pushState(stateObject, "My title", "baz.html");
```

`pushState()`方法执行后，状态信息就会被推到历史记录中，浏览器地址栏也会改变以反映新的相对`URL`

为防止滥用，这个状态的对象大小是有限制的，通常在**500KB～1MB**以内

因为`pushState()`会创建新的历史记录，所以也会相应地启用“后退”按钮。此时单击“后退”按钮，就会触发`window`对象上的`popstate`事件

```js
window.addEventListener("popstate", (event) => {
  let state = event.state;
  if (state) { // 第一个页面加载时状态是null
    processState(state);
  }
});
```

可以通过`history.state`获取当前的状态对象，也可以使用`replaceState()`并传入与`pushState()`同样的前两个参数来更新状态。更新状态**不会创建新历史记录**，**只会覆盖当前状态**

```js
history.replaceState({newFoo: "newBar"}, "New title");
```



