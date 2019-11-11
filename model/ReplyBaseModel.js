import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 答复单基础信息表
 */

// 属性
let replyBaseModel = {
  "replybaseNo": null,
  "applyNo": null,
  "clientNo": null,
  "clientName": null,
  "replaybaseClientContact": null,
  "replaybaseClientPhone": null,
  "replybaseLinkman": null,
  "replybasePhone": null,
  "replybaseNewvolumn": null,
  "replybaseAddvolumn": null,
  "applyUseaddr": null,
  "replybaseService": null,
  "applyDate": null,
  "replybaseDate": null,
  "replybasePowertype": null,
  "replybaseEleprop": null,
  "replybaseSupPower": null,
  "replybaseCalloc": null,
  "replybaseCaltype": null,
  "replybaseCalline": null,
  "replybaseCalvoltage": null,
  "replybaseCalele": null,
  "replybaseCalacc": null,
  "replybaseCalexe": null,
  "replybaseCalpeak": null,
  "replybaseCalrate": null,
  "replybaseOverhead": null,
  "replybaseCable": null
};

// 行为方法
class replyBaseModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createReplyBaseModel: function () {
    return Object.seal(Object.assign({}, replyBaseModel));
  },

}

// 封装对象
function ReplyBaseModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(ReplyBaseModel,staticMethods);
export default ReplyBaseModel