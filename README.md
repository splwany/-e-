# 喀左业扩项目e处理平台

2019年10月16日 魏鑫

## 目录结构描述
```
|--- components                     // 自定义组件
|--- model                          // 负责对服务器发送请求
|    |--- CheckCapacityModel.js
|    |--- Common.js
|    |--- FormModel.js
|    |--- TaskModel.js
|--- pages                          // 前端页面
|    |--- form
|    |    |--- appllyForm
|    |    |    |--- applyForm.acss
|    |    |    |--- applyForm.axml
|    |    |    |--- applyForm.js
|    |    |    |--- applyForm.json
|    |    |--- form.acss
|--- service                        // page与model的中间层，负责业务流程
|    |--- pageManager               // page页面数据的定义，以及数据的转换
|    |    |--- ApplyFormManager.js
|    |--- CheckCapacityService.js
|    |--- CommonService.js
|    |--- FormService.js
|    |--- TaskService.js
|--- statics                        // 静态资源
|    |--- icons                     // 图标
|--- templates                      // 模板
|    |--- formItems.axml
|--- utils                          // 公用文件
|    |--- util.js                   // 公用函数
|--- app.acss                       // 小程序全局样式
|--- app.js                         // 小程序全局交互
|--- app.json                       // 小程序全局配置
|--- snapshot.png
```

