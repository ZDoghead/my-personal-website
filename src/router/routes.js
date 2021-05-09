import 'nprogress/nprogress.css';
import {start, done, configure} from 'nprogress';
import NotFound from '@/views/NotFound';

// 配置进度条
configure({
  strikleSpeed: 10,
  showSpinner: false
});

function delay(duration) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  })
}

// 在加载组件前，进行进度条显示
// 传入函数的原因，为了方便webpack分析依赖
function getAsyncComp(compResolver) {
  return async () => {
    start();
    if (process.env.NODE_ENV === 'development') {
      delay(2000);
    }
    const comp = await compResolver();
    done();
    return comp;  
  }
}

export default [
  {
    name: 'home', 
    path: '/', 
    component: getAsyncComp(() => import(/* webpackChunkName: "home" */'@/views/Home')), 
    meta: {
      title: '首页'
    }
  },
  {
    name: 'about', 
    path: '/about', 
    component: getAsyncComp(() => import(/* webpackChunkName: "about" */'@/views/About')), 
    meta: {
      title: '关于我'
    }
  },
  {
    name: 'blog', 
    path: '/blog', 
    component: getAsyncComp(() => import(/* webpackChunkName: "blog" */'@/views/Blog')), 
    meta: {
      title: '文章'
    }
  },
  {
    name: 'blogCategory', 
    path: '/blog/cate/:categoryId', 
    component: getAsyncComp(() => import(/* webpackChunkName: "blog" */'@/views/Blog')), 
    meta: {
      title: '文章'
    }
  },
  {
    name: 'blogDetail', 
    path: '/blog/detail/:id', 
    component: getAsyncComp(() => import(/* webpackChunkName: "blogDetail" */'@/views/Blog/Detail')), 
    meta: {
      title: '文章详情'
    }
  },
  {
    name: 'project', 
    path: '/project', 
    component: getAsyncComp(() => import(/* webpackChunkName: "project" */'@/views/Project')), 
    meta: {
      title: '项目&效果'
    }
  },
  {
    name: 'message', 
    path: '/message', 
    component: getAsyncComp(() => import(/* webpackChunkName: "message" */'@/views/Message')), 
    meta: {
      title: '留言板'
    }
  },
  {
    name: 'notFound',
    path: '*',
    component: NotFound
  }
];