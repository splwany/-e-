import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 用电申请表单
 */

// 属性
let applyFormModel = {
  "applyNo": null,
  "clientNo": null,
  "clientName": null,
  "applyDate": null,
  "applyReg": null,
  "applyUseaddr": null,
  "applyLinkman": null,
  "applyLinkphone": null,
  "applyIdtype": null,
  "applyIdnum": null,
  "applyBilltype": null,
  "applyOpenbank": null,
  "applyBusiness": null,
  "applyBankcard": null,
  "applyIndustry": null,
  "applyPowenum": null,
  "applyVoltlevel": null,
  "applyNewvolumn": null,
  "applyAddvolumn": null,
  "applyOrignvolumn": null,
  "applySumvolumn": null,
  "applyNote": null,
  "failureReason": null,
  "isOpenZone": null,
  "gs186": null
};

// 行为方法
class applyFormModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建用电申请表单对象
  createApplyFormModel: function () {
    return Object.seal(Object.assign({}, applyFormModel));
  },

  // 添加申请表单
  addApplyFormModel: function(applyFormModel,deviceList,taskList){
    return HelperUtil.httpReq(RequestUrls.APPLYFORM_CRUD,{ 
      "apply":applyFormModel,
      "devicedetialList":deviceList,
      "taskphaseList":taskList
    },'POST');
  },

  // 更新申请单对象内容
  updateApplyFormModel:function(applyFormModel){
    return HelperUtil.httpReq(RequestUrls.APPLYFORM_CRUD,applyFormModel,'PUT');
  },

  // 根据申请编号获取对应申请单对象信息及附属用电设备List及图片List
  /***  */
  getApplyFormByIdModel:function(applyFormNo){
    return HelperUtil.httpReq(RequestUrls.APPLYFORM_GET_BY_ID+applyFormNo).then((result) => {
      result.data.apply['applyDate'] = HelperUtil.dateStringFormat(result.data.apply['applyDate']);
      return Promise.resolve(result);
    }).catch((err) => {
      return Promise.reject(err);
    });
  },

  // 根据申请编号列表，返回对应客户名称列表，按顺序返回
  getClientNameListModel: function(applyFormNoList){
    return HelperUtil.httpReq(RequestUrls.APPLYFORM_GET_NAME_BY_NO, applyFormNoList,'POST');
  },

  // 1.修改applyObj对象；2.新增taskList任务阶段信息；3.将taskId置为完成
  reViewApplyFormModel:function(applyObj,taskList,taskId){
    return HelperUtil.httpReq(RequestUrls.APPLYFORM_UPDATE_ADD_TASK,{
      'applyObj':applyObj,
      'taskPhaseList':taskList,
      'taskPhaseId':taskId
    },'POST');
  },

  // 删除用电申请表
  deleteApplyFormModelL:function(applyNo){
    return HelperUtil.httpReq(RequestUrls.APPLYFORM_CRUD+applyNo,null,'DELETE');
  }
}

// 封装对象
function ApplyFormModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(ApplyFormModel,staticMethods);
export default ApplyFormModel