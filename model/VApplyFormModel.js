import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 配网改造基础信息表
 */

// 属性
let vApplyFromModel = {
  "applyNo": null,
  "vapplyAdd": null,
  "vapplyContent": null,
  "vapplyDate": null,
  "vapplyHuman": null,
  "vapplyId": null,
  "vapplyNo": null,
  "vapplyPerson": null,
  "vapplyPhone": null,
  "vapplyProname": null,
  "vapplyUnit": null
};

// 行为方法
class vApplyFromModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createVApplyFromModel: function () {
    return Object.seal(Object.assign({}, vApplyFromModel));
  },
}

// 封装对象
function VApplyFromModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(VApplyFromModel,staticMethods);
export default VApplyFromModel