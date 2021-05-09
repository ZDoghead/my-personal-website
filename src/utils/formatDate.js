/**
 * 获取格式化的日期时间
 * @param {Number} date 需要进行格式化的时间戳
 * @param {Boolean} time 是否要显示时间
 * @returns 
 */
export default function (date, time = false) {
  const publishDate = new Date(date);
  const year = publishDate.getFullYear();
  const month = (publishDate.getMonth() + 1).toString().padStart(2, 0);
  const day = publishDate.getDate().toString().padStart(2, 0);

  let str = `${year}-${month}-${day}`;
  if (time) {
    const hour = publishDate.getHours().toString().padStart(2, 0);
    const minute = publishDate.getMinutes().toString().padStart(2, 0);
    const second = publishDate.getSeconds().toString().padStart(2, 0);

    str += ` ${hour}:${minute}:${second}`;
  }
  return str;
}