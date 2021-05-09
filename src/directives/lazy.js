import defaultGif from '@/assets/default.gif';
import eventBus from '@/eventBus';
import {debounce} from '@/utils';

let images = [];

// 当滚动条滚动时，也需要判断视口内的图片是否需要处理
eventBus.$on('mainScroll', debounce(setImages, 150));

// 处理所有图片
function setImages() {
  // 遍历数组看哪些图片需要进行处理
  for (const img of images) {
    setImage(img);
  }
}

// 处理某个图片
function setImage(img) {
  // 让所有的图片都是用占位图
  img.dom.src = defaultGif;
  const top = img.dom.getBoundingClientRect().top;
  // 看该元素是否在视口范围内
  if (top > -img.dom.clientHeight && top < document.documentElement.clientHeight) {
    // 在视口范围内
    const image = new Image();
    image.onload = function () {
      img.dom.src = img.src;
    }
    image.src = img.src;

    // 干掉处理过了，留下没处理的
    images = images.filter(i => i !== img);
  }
}

export default {
  inserted(el, binding) {
    // 得到所有使用v-lazy指令的元素
    images.push({
      dom: el,
      src: binding.value  // 真实的图片地址
    });

    // 页面第一次加载时，需要处理一次图片
    setImages();
  },
  // 元素都没了，就不用再进行处理了
  unbind() {
    images = [];
  }
}