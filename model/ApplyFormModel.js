import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

// 属性
let applyFormModel = {

};

// 行为方法
class applyFormModelImpl{

}

// 静态方法
let staticMethods = {
  // 创建用电申请表单对象
  createApplyFormModel: function () {
    return Object.freeze(Object.assign({}, applyFormModel));
  },

  // 添加申请表单
  addApplyFromModel: function(applyFromModel){
    return HelperUtil.httpReq(RequestUrls.APPLYFORM_CRUD,applyFormModel).then(result =>{
      if (result.data.result) {
      }else{
        return HelperUtil.returnPromiseRejectObj(result);
      }
    });
  }
};

// 封装对象
function ApplyFormModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

export default ApplyFormModel;