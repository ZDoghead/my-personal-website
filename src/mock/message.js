import Mock from 'mockjs';
import qs from 'querystring';

// 提交留言
Mock.mock('/api/message', 'post', {
  code: 0,
	msg: "",
	data: {
    id: "@guid",
    nickname: "@cname",
    content: "@cparagraph(1, 8)",
    createDate: Date.now(),
    "avatar|1": [
      "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
      "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
      "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
      "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
    ],
	}
});

// 分页获取留言
Mock.mock(/^\/api\/message\/?(\?.+)?$/, 'get', function (options) {
  const query = qs.parse(options.url);
  return Mock.mock({
    code: 0,
    msg: "",
    data: { 
      "total": 64, //总数
      [`rows|${query.limit}`]: [ // 当前页列表数据
        {
          id: '@guid',
          nickname: "@cname",
          content: "@cparagraph(1, 10)",
          createDate: Date.now(),
          "avatar|1": [
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
          ],
        }
      ]
    }
  })
})