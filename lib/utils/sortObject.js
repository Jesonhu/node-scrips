/**
 * 对象排序.
 * 
 * @param {Object} obj 需要排序的源对象.
 * @param {Array} keyOrder 对象排序规则.
 * @param {Boolean} dontSortByUnicode （可选）按照首字母升序排列 (存在 keyOrder 需要为 null).
 * @return {Object} 排序后的新对象.
 */
function sortObject (obj, keyOrder, dontSortByUnicode = false) {

  const midPkg = Object.assign({}, obj);
  const resPkg = {};

  if (keyOrder) {
    keyOrder.forEach(i => {
      if (typeof(midPkg[i]) !== 'undefined') {
        resPkg[i] = midPkg[i]
      }
    })
  }

  if (dontSortByUnicode) {
    const keys = Object.keys(obj).sort();
    keys.forEach(key => {
      resPkg[key] = midPkg[key]
    })
  }

  return resPkg;
}

module.exports = sortObject