import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 供电电源接电点表
 */

// 属性
let replyPowerPlanModel = {
  "replypowerplanId": null,
  "replybaseNo": null,
  "replypowerplanVoltage": null,
  "replypowerplanLine": null,
  "replypowerplanSection": null,
  "replypowerplanBranch": null,
  "replypowerplanArea": null,
  "replypowerplanRod": null
};

// 行为方法
class replyPowerPlanModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createReplyPowerPlanModel: function () {
    return Object.seal(Object.assign({}, replyPowerPlanModel));
  },

}

// 封装对象
function ReplyPowerPlanModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(ReplyPowerPlanModel,staticMethods);
export default ReplyPowerPlanModel