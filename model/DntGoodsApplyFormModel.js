import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 配网改造
 */

// 属性
let dntGoodsApplyFormModel = {
  "baseInfo": null,
  "changePlan": null,
  "goodsSelectList": null,
  "pickList": null, 
  "powerPlan": null
};

// 行为方法
class goodsModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createDntGoodsApplyFormModel: function () {
    return Object.seal(Object.assign({}, dntGoodsApplyFormModel));
  },

  // 配网改造申请表提交
  submitDntGoodsApplyFormModel: function(submitForm,taskList,taskId){
    return HelperUtil.httpReq(RequestUrls.DntGoodsApplyForm_ADD,{
      'submitForm':submitForm,
      'taskList':taskList,
      'taskId':taskId
    },'POST');
  },

  // 配网改造申请表修改
  updateDntGoodsApplyFormModel:function(submitForm,taskList,taskPhaseId){
    return HelperUtil.httpReq(RequestUrls.DntGoodsApplyForm_UPDATE,{
      'submitForm':submitForm,
      'taskList':taskList,
      'taskPhaseId':taskPhaseId
    },'POST');
  }
  
}

// 封装对象
function DntGoodsApplyFormModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(DntGoodsApplyFormModel,staticMethods);
export default DntGoodsApplyFormModel