import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 产权分界点表
 */

// 属性
let replyPropertyModel = {
  "replypropertyId": null,
  "replybaseNo": null,
  "replypropertyVoltage": null,
  "replypropertyLine": null,
  "replypropertySection": null,
  "replypropertyBranch": null,
  "replypropertyArea": null,
  "replypropertyRod": null
};

// 行为方法
class replyPropertyModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createReplyPropertyModel: function () {
    return Object.seal(Object.assign({}, replyPropertyModel));
  },
}

// 封装对象
function ReplyPropertyModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(ReplyPropertyModel,staticMethods);
export default ReplyPropertyModel