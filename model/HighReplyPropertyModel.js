import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 产权分界点表（高压）
 */

// 属性
let highReplyPropertyModel = {
  "highpropertyId": null,
  "replybaseNo": null,
  "highpropertyVoltage": null,
  "highpropertyLine": null,
  "highpropertySection": null,
  "highpropertyBranch": null,
  "highpropertySubBranch": null,
  "highpropertyPole": null
};

// 行为方法
class highReplyPropertyModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createHighReplyPropertyModel: function () {
    return Object.seal(Object.assign({}, highReplyPropertyModel));
  },
}

// 封装对象
function HighReplyPropertyModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(HighReplyPropertyModel,staticMethods);
export default HighReplyPropertyModel