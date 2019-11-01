import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 部门
 */

// 属性
let departModel = {
  "departId": null,
  "departNo": null,
  "departName": null,
  "departLeader": null
};

// 行为方法
class departModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createDepartModel: function () {
    return Object.seal(Object.assign({}, departModel));
  },

  // 获取所有部门信息
  getAllDepartModel: function(){
    return HelperUtil.httpReq(RequestUrls.DEPART_CRUD);
  }
}

// 封装对象
function DepartModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(DepartModel,staticMethods);
export default DepartModel