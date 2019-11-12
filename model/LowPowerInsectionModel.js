import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 供电电源接电点表(低压)
 */

// 属性
let lowPowerInsectionModel = {
  "lowreplyinsectionId": null,
  "replybaseNo": null,
  "lowreplyinsectionVoltage": null,
  "lowreplyinsectionLine1": null,
  "lowreplyinsectionExtra": null,
  "lowreplyinsectionArea": null,
  "lowreplyinsectionLine2": null
};

// 行为方法
class lowPowerInsectionModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createLowPowerInsectionModel: function () {
    return Object.seal(Object.assign({}, lowPowerInsectionModel));
  },

}

// 封装对象
function LowPowerInsectionModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(LowPowerInsectionModel,staticMethods);
export default LowPowerInsectionModel