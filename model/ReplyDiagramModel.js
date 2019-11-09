import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 答复单方案简图
 */

// 属性
let replyDiagramModel = {
  "replydiagramId": null,
  "replyNo": null,
  "replydiagramName": null
};

// 行为方法
class replyDiagramModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createReplyDiagramModel: function () {
    return Object.seal(Object.assign({}, replyDiagramModel));
  },

}

// 封装对象
function ReplyDiagramModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(ReplyDiagramModel,staticMethods);
export default ReplyDiagramModel