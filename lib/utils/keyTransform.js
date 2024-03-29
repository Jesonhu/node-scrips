/**
 * 字段转换.
 */
// ================================================================================
// 对象字段转换工具
// ================================================================================

/**
 * 数据兼容性处理.
 * @param {Object|Array} obj 
 */
const dataCompat = (obj) => {
  if (Array.isArray(obj)) {
    return JSON.parse(JSON.stringify(obj[0]));
  }
  return obj;
}

/**
 * 对象 key value 互换.
 * @param {object} obj 需要 key value 互换的对象.
 * @return {object} 互换后的对象.
 */
const reverseObj = (obj) => {
  if (!obj) {};

  const cloneObj = JSON.parse(JSON.stringify(obj));

  if (cloneObj && typeof cloneObj instanceof Array) {
    const obj = cloneObj[0];
    for (let key in obj) {
        const newKey = obj[key];
        obj[newKey] = key;
        delete obj[key];
    }
  } else {
    for (let key in cloneObj) {
      const newKey = cloneObj[key];
      cloneObj[newKey] = key;
      delete cloneObj[key];
    }
  }
  return cloneObj;
}

/**
 * 字段转换.
 * @param {object|array} sourceObj 源对象.
 * @param {object} translateMap 转换规则.
 * @param {[string]} type 是否翻转转换规则. type = 'reverse' 使用反转.
 */
const keyTransform = (sourceObj, translateMap, type = '') => {
  const cloneSourceObj = JSON.parse(JSON.stringify(sourceObj));

  // translateMap = {} handle.
  if (!translateMap) {
    return cloneSourceObj;
  }

  // sourceObj type is array.
  if (Array.isArray(cloneSourceObj)) {
    const resArr = [];
    for (let i = 0, len = cloneSourceObj.length; i < len; i++) {
      const translatedObj = keyTransform(cloneSourceObj[i], translateMap, type);
      resArr.push(translatedObj);
    }
    return resArr;
  }

  // reverse translate map.
  if (type === 'reverse') {
    translateMap = reverseObj(translateMap);
  }

  // key translate And key delete.
  for (let key in cloneSourceObj) {
    if (translateMap.hasOwnProperty(key)) {
      const newKey = translateMap[key];
      cloneSourceObj[newKey] = JSON.parse(JSON.stringify(cloneSourceObj[key]));
      delete cloneSourceObj[key];
    }
  }

  return cloneSourceObj;
}

module.exports = keyTransform;