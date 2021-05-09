import request from './request';

// 提交留言接口
export async function postMessage(msg) {
  return await request.post('/api/message', {
    data: msg
  })
}

// 分页获取留言
export async function getMessages(page = 1, limit = 10) {
  return await request.get('/api/message', {
    params: {
      page,
      limit
    }
  });
}