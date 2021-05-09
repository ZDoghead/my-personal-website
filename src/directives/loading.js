import loadingUrl from '@/assets/loading.svg';
import styles from './loading.module.less';

function createLoadingEle() {
  const img = document.createElement('img');
  img.dataset.role = 'loading';
  img.className = styles.loading;
  img.src = loadingUrl;
  return img;
}

function getLoadingEle(el) {
  return el.querySelector('img[data-role=loading]');
}

export default function (el, binding) {
  // 看binding.value是否为true，在看为true时加载动画的元素是否有了，有就不再创建
  // 没有就创建一个加载动画的元素
  // 当binding.value为false时，如果有加载动画的元素，就删除该元素
  const imgEle = getLoadingEle(el);
  if (binding.value) {
    // 需要显示加载动画的元素
    if (!imgEle) {
      // 当前el中没有加载动画的元素
      const loadingEle = createLoadingEle();
      el.appendChild(loadingEle);
    }
  } else {
    // 需要隐藏加载动画的元素
    if (imgEle) {
      imgEle.remove();
    }
  }
}