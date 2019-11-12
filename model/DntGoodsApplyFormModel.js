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
  "powerPlan": null,
  "imagesList":null
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
      'taskPhaseList':taskList,
      'taskPhaseId':taskId
    },'POST');
  },

  // 配网改造申请表修改
  updateDntGoodsApplyFormModel:function(submitForm,taskList,taskPhaseId){
    return HelperUtil.httpReq(RequestUrls.DntGoodsApplyForm_UPDATE,{
      'submitForm':submitForm,
      'taskPhaseList':taskList,
      'taskPhaseId':taskPhaseId
    },'POST');
  },

  // 根据申请编号返回配网有关信息：
  /**
    result.data={
      'baseInfo'(小微企业物资申请表)，
      'powerPlan'(小微供电方岸),
      'changePlan'(小微改造方岸),
      'goodsSelectList'(物料选择清单表）,
      'pickList'(小微物资领料申请表)
    },
   */
  getDntApplyFormByApplyNoModel: function(applyNo){
    return HelperUtil.httpReq(RequestUrls.DntGoodsApplyForm_GET_BY_NO + applyNo)
  },

  /**
   * 
  1）根据applyNo将配网改造有关信息dntGoodsApplyFormModel里涉及的信息删除；
  2）将taskPhaseId置为未完成；
  3）根据applyNo和taskNum删除任务阶段表中对应的信息
   */
  deleteDntGoodsApplyFormModel: function(applyNo, taskPhaseId, taskNum){
    return HelperUtil.httpReq(RequestUrls.DntGoodsApplyForm_DELETE,{
      'applyNo':applyNo,
      'taskPhaseId':taskPhaseId,
      'taskNum':taskNum
    },'POST')
  },

  // 根据申请编号下载领料申请单
  downLoadDntApplyFormFile: function(applyNo){
    // return HelperUtil.downloadFile(RequestUrls.DntGoodsApplyForm_DOWNLOAD + applyNo);
    return Promise.resolve({
      'data':RequestUrls.DntGoodsApplyForm_DOWNLOAD + applyNo,
      'message':null
      });
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