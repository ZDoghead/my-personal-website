import Icon from '@/components/Icon';
import getComponentRootDOM from './getComponentRootDOM';
import styles from './showMessage.module.less';

/**
 * 弹出消息框
 * @param {String} content 消息框中的内容
 * @param {String} type 消息框的类型，规定类型为info、success、warn、error，默认为info
 * @param {Number} duration 消息框多久后消失
 * @param {HTMLElement} container 显示的容器
 * @param {Function} callback 消息框消失后执行的回调函数，可能没有
 */
export default function (options = {}) {
  const content = options.content || '';
  const type = options.type || 'info';
  const duration = options.duration || 2000;
  const container = options.container || document.body;
  const callback = options.callback;

  // 创建一个元素
  const div = document.createElement('div');
  // 需要一个函数来得到组件渲染后的DOM元素
  const cmpDOM = getComponentRootDOM(Icon, { type });
  div.innerHTML = `<span class="${styles['icon']}">${cmpDOM.outerHTML}</span><div>${content}</div>`;
  // 如果container传了，再判断container的CSS属性position是否为static
  if (options.container) {
    if (getComputedStyle(container, null).position === 'static') {
      container.style.position = 'relative';
    }
  }
  // 设置div的样式
  div.className = `${styles['message']} ${styles['message-' + type]}`;
  // 将div加入到页面中
  container.appendChild(div);

  // 需要强制渲染一次页面，否则会直接使用js中的样式
  div.clientHeight;

  div.style.opacity = 1;
  div.style.transform = `translate(-50%, -50%)`;

  // 一段时间后再消失
  setTimeout(() => {
    div.style.opacity = 0;
    div.style.transform = `translate(-50%, -50%) translateY(-25px)`;
    div.addEventListener('transitionend', () => {
      div.remove();
      // 如果有就执行回调
      callback && callback();
    }, {once: true});
  }, duration);
}