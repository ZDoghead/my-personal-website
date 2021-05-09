import Vue from "vue";

/**
 * 根据组件获取组件渲染后的dom元素
 * @param {*} component 组件
 * @param {*} props 传给组件的属性
 */
export default function (component, props) {
  const vm = new Vue({
    render: (h) => h(component, { props })
  });
  // 挂载后会生成对应的真实dom
  vm.$mount();
  return vm.$el;
}