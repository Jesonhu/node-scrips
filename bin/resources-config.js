const path = require('path');
const fs = require('fs');
const logger = require('../lib/logger');
const program = require('commander')
const keyTransform = require('../lib/utils/keyTransform');
const writeFileTree = require('../lib/writeFileTree');
const rm = require('rimraf').sync
const chalk = require('chalk')
const inquirer = require('inquirer');


/**
 * 基础路径
 */

const sour_base_path = ''
const dest_base_path = ''
// const sour_base_path = 'F:/web/h5_交互设计_h5模板/test-code/egret-res/resource'
// const dest_base_path = 'F:/web/h5_交互设计_h5模板/my-code/resource'

// 相对路径地址.
// const defaultResDirPath = path.join(process.cwd(), sour_base_path);
// 绝对路径地址.
const defaultResDirPath = sour_base_path;
const defaqultResFile = '/default.res.json';
let defaultResFilePath = defaultResDirPath + defaqultResFile;

// const desResDirPath = path.join(process.cwd(), dest_base_path);
let desResDirPath = dest_base_path;

// ================================================================================
// 目录配置
// ================================================================================
const sourceAskName = '✨ ' + ' sourcePath';
const destAskName = '✨ ' + ' generatePath';
const destAskFileName = '✨ ' + ' generateFileName';
let generateFileName = 'resource.config.json';

const ask1 = () => {
  return inquirer.prompt({
    name: sourceAskName,
    type: 'input',
  })
  .then(res => {
    const formatPath = res[sourceAskName].replace(/\\/, '/')
    defaultResFilePath = formatPath + defaqultResFile;
  })
  .catch(err => {
    console.log(err)
  });
}

const ask2 = () => {
  return inquirer.prompt({
    name: destAskName,
    type: 'input',
  })
  .then(res => {
    const formatPath = res[destAskName].replace(/\\/, '/')
    desResDirPath = formatPath;
  })
  .catch(err => {
    console.log(err)
  });
}

const aks3 = () => {
  return inquirer.prompt({
    name: destAskFileName,
    type: 'input',
  })
  .then(res => {
    const inputFileName = res[destAskFileName];
    if (inputFileName) { // 输入了文件名
      const regex = /(.json|.js)/g;
      const match = regex.exec(inputFileName)
      if (Array.isArray(match)) {
        const fileType = match[1];
        if (fileType !== '.json') {
          generateFileName = inputFileName.split(fileType)[0] + '.json';

          // File type must be a .json
          console.log();
          logger.fatal('File Type Must Be A .json');
        } else {
          generateFileName = inputFileName;
        }
      } else {
        generateFileName = inputFileName + '.json';
      }
      
    } else { 
      generateFileName = 'resource.config.json';
    }
  })
  .catch(err => {
    console.log(err);
  });
}

async function runAsk() {
  try {
    await ask1()
    await ask2();
    await aks3();
  
    run();
  } catch (err) {
    console.log(err);
  }
}
runAsk();

const run = () => {

  // ================================================================================
  // 目录是否存在判断
  // ================================================================================

  if (!fs.existsSync(defaultResFilePath)) {
    logger.fatal('可视化资源配置文件: ' + defaultResFilePath + " not exits.")
  }

  if (!fs.existsSync(desResDirPath)) {
    logger.fatal('项目资源文件目录: ' + desResDirPath + " not exits.")
  }

  // ================================================================================
  // 处理配置文件
  // ================================================================================
  let defaultRes = null;

  defaultRes = fs.readFileSync(defaultResFilePath, { encoding: 'utf8' })
  defaultRes = JSON.parse(defaultRes);
  let newRes = defaultRes;
  newRes['resources'] = keyTransform(defaultRes.resources, { url: 'src' })

  // ================================================================================
  // 生成新资源配置文件
  // ================================================================================

  /** 
   * 格式化新资源文件.
   */
  const formatDefaultRes = (str) => {
    return str;
  }

  const existsFilePath = desResDirPath + '/' + generateFileName;
  // 删除已存在的文件.
  if (fs.existsSync(existsFilePath)) {
    rm(existsFilePath)
  }

  writeFileTree(desResDirPath, {
    [generateFileName]: formatDefaultRes(JSON.stringify(newRes, null, 2))
  })
    .then(res => {
      const logStr = 'Node-bins · ' + chalk.bgBlue('  生成成功.  ');
      console.log();
      console.log(logStr);
      console.log();
    })
    .catch(err => {
      // console.log(err);
      logger.fatal(err)
    })

}






