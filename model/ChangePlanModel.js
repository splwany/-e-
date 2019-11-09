import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 小微改造方案表
 */

// 属性
let changePlanModel = {
  "applyNo": null,
  "vapplyNo": null,
  "vchangId": null,
  "vchangNew": null,
  "vchangNow": null,
  "vchangPrice": null,
  "vchangRemove": null
};

// 行为方法
class changePlanModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createChangePlanModel: function () {
    return Object.seal(Object.assign({}, changePlanModel));
  },
}

// 封装对象
function ChangePlanModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(ChangePlanModel,staticMethods);
export default ChangePlanModel