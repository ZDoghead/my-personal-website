import axios from 'axios';
import showMessage from '../utils/showMessage';

const ins = axios.create();
ins.interceptors.response.use(function (resp) {
  // 出错了
  if (resp.data.code !== 0) {
    showMessage({
      content: resp.data.msg,
      type: 'error'
    });
    return null;
  }
  // 没有问题，直接返回数据
  return resp.data.data;
})

export default ins;