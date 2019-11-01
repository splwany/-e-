import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 物料
 */

// 属性
let goodsModel = {
  "goodsId":null,
  "goodsName":null,
  "goodsPrice":null,
  "goodsClass":null,
  "goodsVflag":null,
  "goodsChangedate":null,
  "goodsChangestuff":null,
  "goodsUseflag":null
};

// 行为方法
class goodsModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createGoodsModel: function () {
    return Object.seal(Object.assign({}, goodsModel));
  },
  
  // 获取基础物资类别字段集合（有哪些类别）
  getGoodsClassListModel: function(typeList){
    return HelperUtil.httpReq(RequestUrls.GOODS_CLASSES,typeList,'POST');
  },

  // 根据基础物资类别返回对应的基础物资集合
  getGoodsTypeListModel: function(goodsClass){
    return HelperUtil.httpReq(RequestUrls.GOODS_BY_TYPE + goodsClass);
  }

}

// 封装对象
function GoodsModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(GoodsModel,staticMethods);
export default GoodsModel