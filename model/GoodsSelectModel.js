import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 物料选择
 */

// 属性
let goodsSelectModel = {
  "applyNo": null,
  "goodsClass": null,
  "goodsName": null,
  "goodsPrice": null,
  "goodsQty": null,
  "id": null
};

// 行为方法
class goodsSelectModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createGoodsSelectModel: function () {
    return Object.seal(Object.assign({}, goodsSelectModel));
  },
}

// 封装对象
function GoodsSelectModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(GoodsSelectModel,staticMethods);
export default GoodsSelectModel