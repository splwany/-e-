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
  getGoodsTypeListModel: function(goodsClass,typeList){
    return HelperUtil.httpReq(RequestUrls.GOODS_BY_TYPE,{
      'goodsClass':goodsClass,
      'typeList':typeList
    },'POST');
  },

  // 根据架空或电缆以及typeList查询对应的物资集合
  /**
    result.data={
    '子类1'：[],
    '子类2'：[],
    }
   */
  getClassByTypeModel: function(classType,typeList){
    return HelperUtil.httpReq(RequestUrls.GOODS_GET_OBJ_BY_CLASSTYPE,{
      'classType':classType,
      'typeList':typeList
    },'POST')
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