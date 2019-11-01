import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 人员
 */

// 属性
let staffModel = {
  "staffId": null,
  "staffAccount": null,
  "staffPassword": null,
  "staffPhone": null,
  "departNo": null,
  "staffDd": null,
  "staffNote": null,
  "staffChecker": null
};

// 行为方法
class staffModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createStaffModel: function () {
    return Object.seal(Object.assign({}, staffModel));
  },

  // 根据部门编号选择部门人员
  selectStaffByDepartModel: function(departNo){
    return HelperUtil.httpReq(RequestUrls.STAFF_DEPARTNO + departNo);
  },


  
}

// 封装对象
function StaffModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(StaffModel,staticMethods);
export default StaffModel