// const events = {};

// export default {
//   $on(eventName, handler) {
//     // 监听某个事件
//     if (!events[eventName]) {
//       events[eventName] = new Set(); // Set中存监听了事件eventName的处理函数，使用Set防止多次注册同一个处理函数
//     }
//     events[eventName].add(handler);
//   },
//   $off(eventName, handler) {
//     // 可以监听，当然也可以取消监听
//     if (!events[eventName]) {
//       return;
//     }
//     events[eventName].delete(handler);
//   },
//   $emit(eventName, ...args) {
//     // 触发某个事件
//     if (!events[eventName]) {
//       return;
//     }
//     for (const handler of events[eventName]) {
//       handler(...args);
//     }
//   }
// }

import Vue from 'vue';

/**
 * 事件：mainScroll
 * 含义：表示main-container区域滚动时触发
 * 传递的参数：
 * - 滚动区域的dom元素，当为undefined时，表示dom元素已经不存在了
 * 
 * 事件：setScroll
 * 含义：表示点击了回到顶部按钮
 * 传递的参数：
 * - Number类型的0，用于设置scrollTop
 * 
 */
export default new Vue({});