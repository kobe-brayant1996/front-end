/** 
 * 什么是 AJAX ?
 * Asynchronous JavaScript and XML;
 * 一种无需重新加载整个页面的情况下，能够更新部分网页的技术;
 * 通过 JavaScript 发出异步请求，与服务器进行数据交换；
 * 使网页实现异步更新，提高用户体验。
 */

/**
 * AJAX 如何工作
 * AJAX 实现依赖于 XMLHttpRequest 对象， 它允许 Web 页面创建异步 HTTP 请求；
 */

// let xhr = new XMLHttpRequest();

// xhr.open('GET', 'https://psstatic.cdn.bcebos.com/basics/pc_operate/light_new_1698989816000.json', true);
// console.log(xhr.readyState) // 1

// xhr.onreadystatechange = (v) => {
//   console.log(xhr.readyState) // 2, 3, 4
// }

// xhr.onload = () => {
//   if (xhr.status >= 200 && xhr.status < 300) {
//     console.log(xhr.status) // 2xx
//     // console.log(xhr.response)
//     console.log(JSON.parse(xhr.response))
//   } else {
//     console.log(xhr.status)
//   }
// }

// xhr.onerror = () => {
//   console.log('error')
// }

// xhr.send();

/** 
 * Fetch
 * 
 * 它是 window 对象的一部分，用于代替传统的 XMLHttpRequest
 * 使用Promise,使得处理异步请求和响应变得更加简洁和抑郁惯了
 */

fetch('https://psstatic.cdn.bcebos.com/basics/pc_operate/light_new_1698989816000.json').then(res => {
  console.log(res)
  console.log(res.json())
})





