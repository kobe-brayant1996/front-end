
## `Natives modules`

+ 当前层内容是由 `JS` 实现
+ 提供应用程序可直接调用库，例如 `fs`、`path`、 `http`...
+ `JS` 语言无法直接操作底层硬件设置 （`Builtin modules` 胶水层）

## 底层

### V8
  + 执行 `JS` 代码，提供桥梁接口
### Libuv
  + 事件循环
  + 事件队列
  + 异步 IO

### 第三方模块
  + `zlib`
  + `http`
  + `c-ares`












### Nodejs 异步IO 和 事件驱动

