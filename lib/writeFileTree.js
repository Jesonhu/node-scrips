const fs = require('fs-extra')
const path = require('path')

/**
 * 单个文件写入.
 */

/**
 * 删除就文件.
 */
function deleteRemovedFiles (directory, newFiles, previousFiles) {
  // get all files that are not in the new filesystem and are still existing
  const filesToDelete = Object.keys(previousFiles)
    .filter(filename => !newFiles[filename])

  // delete each of these files
  return Promise.all(filesToDelete.map(filename => {
    return fs.unlink(path.join(directory, filename))
  }))
}

/**
 * 文件写入.
 * 
 * @param {String} dir 写入文件的上级文件夹路径 (本地绝对路径).
 * @param {Object} files 需要写入的文件. `eg. { 'new.text': '这是文本内容' }`
 * @param {Boolean} previousFiles 是否删除之前的文件标记.
 * 
 * @see `@vue/cli3 writeFileTree`
 */
async function writeFileTree (dir, files, previousFiles) {
  if (previousFiles) {
    await deleteRemovedFiles(dir, files, previousFiles)
  }
  Object.keys(files).forEach((name) => {
    const filePath = path.join(dir, name)
    fs.ensureDirSync(path.dirname(filePath))
    fs.writeFileSync(filePath, files[name])
  })
}

module.exports = writeFileTree