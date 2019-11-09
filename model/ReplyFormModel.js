import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 答复单的整合对象管理
 */

// 属性
// 高压答复单Model
let highReplyFormModel = {
 'replyBaseModel':null,
 'replyPowerPlanModel':null,
 'replyPropertyModel':null,
 'highPowerFeatureModel':null,
 'replyBranchModel':null,
 'userList':null,
 'taskPhaseId':null,
 'taskPhaseType':null
};
// 低压答复单Mdoel
let lowReplyFormModel = {
 'replyBaseModel':null,
 'replyPowerPlanModel':null,
 'replyPropertyModel':null,
 'lowPowerFeatureModel':null,
 'replyBranchModel':null,
 'userList':null,
 'taskPhaseId':null,
 'taskPhaseType':null
};

// 行为方法
class replyFormModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建高压答复单Model对象
  createHighReplyFormModel: function () {
    return Object.seal(Object.assign({}, highReplyFormModel));
  },

  // 创建低压答复单Mdoel对象
  createLowReplyFormModel: function () {
    return Object.seal(Object.assign({}, lowReplyFormModel));
  },

  // 提交高压答复单
  submitHighReplyFormModel: function(highReplyFormModel,taskPhaseList){
    return HelperUtil.httpReq(RequestUrls.REPLY_FORM_HIGH_SUBMIT,{
      'highReplyFormModel':highReplyFormModel,
      'taskPhaseList':taskPhaseList
    },'POST');
  },

  // 提交低压答复单
  submitLowReplyFormModel: function(lowReplyFormModel,taskPhaseList){
    return HelperUtil.httpReq(RequestUrls.REPLY_FORM_LOW_SUBMIT,{
      'lowReplyFormModel':lowReplyFormModel,
      'taskPhaseList':taskPhaseList
    },'POST');
  }


}

// 封装对象
function ReplyFormModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(ReplyFormModel,staticMethods);
export default ReplyFormModel