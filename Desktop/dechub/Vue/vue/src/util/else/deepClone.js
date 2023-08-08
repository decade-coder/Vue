// 深拷贝
function deepClone(source) {
  const targetObj = source.constuctor === Array ? [] : {};
  for (let keys in source) {
    if (source.hasOwnProperty(keys)) {
      // 引用数据类型
      if (source[keys] && typeof source[keys] === "object") {
        // 递归
        source[keys] = deepClone(source[keys]);
      } else {
        // 基本数据类型
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}
