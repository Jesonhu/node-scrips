# 生成资源配置文件

> egret RES 与 createjs proloadjs 配置文件关联

```
npm run resource


? ✨  sourcePath: sourcePath
? ✨  generatePath: generatePath
? ✨  generateFileName: 


```

+ sourcePath: `default.res.json` 所在的文件夹路径.
+ generatePath: 生成新的配置文件的路径.
+ generateFileName: 生成的新配置文件名称.
  + 不输入, 将生成 `resource.config.json`. 
  + 输入 `aaa` 将生成 `aaa.json` 文件.
  + 输入 `aaa.json` 将生成 `aaa.json` 文件. 
  + 输入 `aaa.js` 将会报错 -- 必须为 `.json` 类型.