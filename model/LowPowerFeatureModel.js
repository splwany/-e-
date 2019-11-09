import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 低压特性表
 */

// 属性
let lowPowerFeatureModel = {
  "replybaseNo": null,
  "lowpowerfeatureVoltage": null,
  "lowpowerfeatureMetering": null
};

// 行为方法
class lowPowerFeatureModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createLowPowerFeatureModel: function () {
    return Object.seal(Object.assign({}, lowPowerFeatureModel));
  },
}

// 封装对象
function LowPowerFeatureModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(LowPowerFeatureModel,staticMethods);
export default LowPowerFeatureModel