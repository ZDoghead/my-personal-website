import request from './request';

// 获取博客分类
export async function getBlogTypes() {
  return await request.get('/api/blogtype');
}

// 获取博客
export async function getBlogs(page = 1, limit = 10, categoryId = -1) {
  return await request.get('/api/blog', {
    params: {
      page,
      limit,
      categoryId,
    }
  })
}

// 获取单个博客
export async function getBlog(id) {
  return await request.get(`/api/blog/${id}`);
}

// 提交评论
export async function commitComment(commentInfo) {
  return await request.post('/api/comment', {
    data: commentInfo
  });
}

// 分页获取评论
export async function getComments(blogid, page = 1, limit = 10) {
  return await request.get('/api/comment', {
    params: {
      blogid,
      page,
      limit
    }
  })
}

