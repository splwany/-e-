import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 施工拍照表
 */

// 属性
let projectPhotoModel = {
  "startsreportNo": null,
  "projectphotoFilenames": null,
  "projectphotoPhotostype": null
};

// 行为方法
class projectPhotoModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createProjectPhotoModel: function () {
    return Object.seal(Object.assign({}, projectPhotoModel));
  },

}

// 封装对象
function ProjectPhotoModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(ProjectPhotoModel,staticMethods);
export default ProjectPhotoModel