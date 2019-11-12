import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 设计时限基础表
 */

// 属性
let designLimitTimeModel = {
  "designlimittimeId": null,
  "designlimittimeName": null,
  "designlimittimeType": null,
  "designlimittimeTime": null
};

// 行为方法
class designLimitTimeModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createDesignLimitTimeModel: function () {
    return Object.seal(Object.assign({}, designLimitTimeModel));
  },

}

// 封装对象
function DesignLimitTimeModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(DesignLimitTimeModel,staticMethods);
export default DesignLimitTimeModel