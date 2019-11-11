import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 产权分界点表（低压）
 */

// 属性
let lowReplyPropertyModel = {
  "lowpropertyId": null,
  "replybaseNo": null,
  "lowpropertyVoltage": null,
  "lowpropertyLine1": null,
  "lowpropertyExtrra": null,
  "lowpropertyArea": null,
  "lowpropertyLine2": null
};

// 行为方法
class lowReplyPropertyModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createLowReplyPropertyModel: function () {
    return Object.seal(Object.assign({}, lowReplyPropertyModel));
  },
}

// 封装对象
function LowReplyPropertyModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(LowReplyPropertyModel,staticMethods);
export default LowReplyPropertyModel