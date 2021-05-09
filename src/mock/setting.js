import Mock from 'mockjs'

Mock.mock('/api/setting', 'get', {
  code: 0,
	msg: "",
	data: {
    avatar: "https://img0.baidu.com/it/u=383972333,536068591&fm=26&fmt=auto&gp=0.jpg", 
    siteTitle: "我的个人空间", 
    github: "https://github.com/ZDoghead?tab=repositories", 
    qq: "1169923537",
    weixin: "zmz1169923537", 
    mail: "zmz4871dh@163.com", 
    icp: "Powered by Zhao Mao Zhou", 
    githubName: "ZDoghead", 
    favicon: "https://img2.baidu.com/it/u=3896776807,2358786623&fm=26&fmt=auto&gp=0.jpg",
	}
})