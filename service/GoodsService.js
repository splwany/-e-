import GoodsModel from "../model/GoodsModel";
import ImageType from '../utils/ImageType'


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
      return Promise.resolve(result.data);
    }).catch(err =>{
      console.log('返回基础物资类别字段集合失败');
      return Promise.reject(err);
    });
  },

  /**
   * @description: 根据基础物资类别返回对应的基础物资集合
   * @param {物资类别} goodsClass 
   * @param  {类别} type 0配网 1低压 2高压
   */
  getGoodsTypeList:function(goodsClass, type){
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
    return GoodsModel.getGoodsTypeListModel(goodsClass, typeList).then(result => {
      console.log('返回该物资类别下信息集合成功');
      return Promise.resolve(result.data);
    }).catch(err =>{
      console.log('返回该物资类别下信息集合失败');
      return Promise.reject(err);
    });
  },

  /**
   * 根据物资ID获取对应图片URL
   * @param {物资ID} goodsId 
   * @date: 2019/11/02 10:59
   */
  getGoodsImage:function(goodsId){
    return ImageService.getImageUrl(goodsId, ImageType.GOODS).then(result =>{
      return Promise.resolve(result);
    }).catch(err =>{
      console.log('服务器返回物资照片地址失败')
      return Promise.reject(err);
    });
  },

  /**
   * 
   * @param {架空线或线缆} lingType 
   * @param {用电类型} type 
   */
  getClassByType:function(lingType, type){
    let typeList = []
    if(type ==1){
      typeList = [0]
    }else{
      typeList = [1,2]
    }
    return GoodsModel.getClassByTypeModel(lingType, typeList).then(result =>{
      console.log('返回架空线或线缆信息成功')
      return Promise.resolve(result.data);
    }).catch(err =>{
      console.log('返回架空线或电缆信息失败');
      return Promise.reject(err);
    })
  }


}