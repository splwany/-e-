import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 开工任务单时限表
 */

// 属性
let startTaskLimitTimeModel = {
  "starttasklimittimeId": null,
  "departNo": null,
  "timeLimit": null
};

// 行为方法
class startTaskLimitTimeModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createStartTaskLimitTimeModel: function () {
    return Object.seal(Object.assign({}, startTaskLimitTimeModel));
  },
}

// 封装对象
function StartTaskLimitTimeModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(StartTaskLimitTimeModel,staticMethods);
export default StartTaskLimitTimeModel