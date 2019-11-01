import ImageModel from "../model/ImageModel";


export default {


  /**
   * @description: 根据编号和类型，返回图片对象列表
   * @param {编号} picNo 
   * @param {图片类别} picType 
   * @param {图片数量} picNum 
   */
  generateImageListByNoAndType:function(picNo, picType, picNum){
    let ImageObjList = []
    for(let i=0; i<picNum; i++){
      let ImageObj = ImageModel.createImageModel();
      ImageObj.picType = picType;
      ImageObj.picNo = picNo;
      ImageObj.picName = picType.toString() + "_" + picNo.toString() + "_" + i.toString();
      ImageObjList.push(ImageObj);
    }
    return ImageObjList;
  },

  /**
   * @description: 上传图片并在数据库中增加对应字段
   * @param {图片对象集合} ImageObjList 
   * @param {图片URL缓存集合} imagesUrlList 
   */
  uploadImageList:function(ImageObjList, imagesUrlList){
    return ImageModel.saveImageModel(ImageObjList, imagesUrlList).then(result =>{
      console.log('上传图片失败');
    }).catch(err =>{
      return err.message;
    })
  }

}