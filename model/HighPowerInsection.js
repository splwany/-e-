import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 供电电源接电点表(高压)
 */

// 属性
let highPowerInsectionModel = {
  "highreplyinsectionId": null,
  "replybaseNo": null,
  "highreplyinsectionVoltage": null,
  "highreplyinsectionLine": null,
  "highreplyinsectionSection": null,
  "highreplyinsectionBranch": null,
  "highreplyinsectionBranchPole": null,
  "highreplyinsectionPole": null
};

// 行为方法
class highPowerInsectionModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createHighPowerInsectionModel: function () {
    return Object.seal(Object.assign({}, highPowerInsectionModel));
  },

}

// 封装对象
function HighPowerInsectionModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(HighPowerInsectionModel,staticMethods);
export default HighPowerInsectionModel