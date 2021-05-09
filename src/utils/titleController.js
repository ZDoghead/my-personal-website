// 控制网站标题

let routeTitle = '', siteTitle = '';

function setTitle() {
  if (routeTitle && siteTitle) {
    document.title = routeTitle + '-' + siteTitle;
  } else if (routeTitle && !siteTitle) {
    document.title = routeTitle;
  } else if (!routeTitle && siteTitle) {
    document.title = siteTitle;
  } else {
    document.title = '加载中...';
  }
}

export default {
  // 设置路由标题
  setRouteTitle(title) {
    routeTitle = title;
    setTitle();
  },
  // 设置网站标题
  setSiteTitle(title) {
    siteTitle = title;
    setTitle();
  }
}