// import GoodsModel from "../model/GoodsModel";


export default {

  /**
   * @description: 获取基础物资类别字段集合（不重复）
   * @param {类别} type 0配网 1低压 2高压
   * @date: 2019/10/28 18:55
   * @author: ly
   */
  getGoodsClassList:function(type){
    let typeList = []
    if(type === undefined){
      typeList = [0, 1, 2];
    }else{
      if(type == 0){
        typeList = [2]
      }else if(type == 1){
        typeList = [0]
      }else{
        typeList = [1, 2]
      }
    }

    return GoodsModel.getGoodsClassListModel(typeList).then(result => {
      console.log('返回基础物资类别字段集合成功');
      return result.data;
    }).catch(err =>{
      console.log('返回基础物资类别字段集合失败');
      return err.message;
    });
  },

  /**
   * @description: 根据基础物资类别返回对应的基础物资集合
   * @param {物资类别} goodsClass 
   */
  getGoodsTypeList:function(goodsClass){
    return GoodsModel.getGoodsTypeListModel(goodsClass).then(result => {
      console.log('返回该物资类别下信息集合成功');
      return result.data;
    }).catch(err =>{
      console.log('返回该物资类别下信息集合失败');
      return err.message;
    });
  }

}