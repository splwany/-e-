import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 物料领料单
 */

// 属性
let pickModel = {
  "applyNo": null,
  "goodsId": null,
  "pickingAddr": null,
  "pickingDescribe": null,
  "pickingId": null,
  "pickingNum": null,
  "pickingOrder": null,
  "pickingQuantity": null,
  "pickingUnit": null,
  "vapplyNo": null
};

// 行为方法
class pickModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createPickModel: function () {
    return Object.seal(Object.assign({}, pickModel));
  },
}

// 封装对象
function PickModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(PickModel,staticMethods);
export default PickModel