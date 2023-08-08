// 懒加载
function lazyload(element) {
  let height = document.documentElement.clientHeight;
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // 实际开发中以下代码块放在循环中对多个元素进行遍历
  if (element.offSetTop < height + scrollTop) {
    if (element.getAttribute("src" === "xxx.jpg")) {
      element.src = element.getAttribute("data-src");
    }
  }
}
