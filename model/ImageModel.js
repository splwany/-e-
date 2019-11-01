import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 图片
 */

// 属性
let imageModel = {
  "picId":null,
  "picName":null,
  "picType":null,
  "picNo":null,
  "url":null
};

// 行为方法
class imageModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createImageModel: function () {
    return Object.seal(Object.assign({}, imageModel));
  },

  // 图片上传
  saveImageModel: function(imageModelList,imagePathList){
    var uploadImgs = [];
    for(let i = 0;i<imagePathList.length;i++){
      var imageName = imageModelList[i].picName;
      var imagePath = imagePathList[i];
      uploadImgs.push(HelperUtil.uploadFile(RequestUrls.IMAGR_UPLOAD,imageName,imagePath));
    }
    return Promise.all(uploadImgs).then(res =>{
      return Promise.resolve(res[0]);
    });
  }
 
}

// 封装对象
function ImageModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(ImageModel,staticMethods);
export default ImageModel