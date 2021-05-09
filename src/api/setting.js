import request from './request';

// 获取全局设置的数据
export async function getSetting() {
  return await request.get("/api/setting");
}