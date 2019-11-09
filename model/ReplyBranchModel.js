import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 支表
 */

// 属性
let replyBranchModel = {
  "replybranchId": null,
  "replybaseNo": null,
  "replybranchName": null,
  "replybranchNote": null
};

// 行为方法
class replyBranchModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createReplyBranchModel: function () {
    return Object.seal(Object.assign({}, replyBranchModel));
  },

}

// 封装对象
function ReplyBranchModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(ReplyBranchModel,staticMethods);
export default ReplyBranchModel