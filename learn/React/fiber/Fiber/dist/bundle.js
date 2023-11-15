/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
console.log("charon is a handsome boy");

/**
 *  requstsIdleCallback
 * 
 *  利用浏览器空余时间执行任务，如果有更优先级的任务要执行，当前的任务可以被终止，优先执行高级别任务
 * 
 * */

requestIdleCallback(function (deadline) {
  // 可以获取浏览器的空余时间
  deadline.timeRemaining();
});
/******/ })()
;
//# sourceMappingURL=bundle.js.map