import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 竣工报告表
 */

// 属性
let achieveReportModel = {
  "achievereportNo": null,
  "applyNo": null,
  "achievereportProname": null,
  "achievereportAddr": null,
  "achievereportUnit": null,
  "achievereportLeader": null,
  "achievereportPhone": null,
  "achievereportStarttime": null,
  "achievereportAchtime": null,
  "achievereportContent": null,
  "achievereportUnitsug": null,
  "achievereportClientsug": null,
  "achievereportAccperson": null,
  "achievereportApprover": null,
  "achievereportDate": null,
  "achievereportInstall": null,
  "achievereportrInstallper": null,
  "achievereportFlag": null,
  "achievereportAccdate": null,
};

// 行为方法
class achieveReportModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createAchieveReportModel: function () {
    return Object.seal(Object.assign({}, achieveReportModel));
  },

  // 添加竣工单
  addAchieveReportModel: function(achieveReportModel, taskPhaseId, taskPhaseList){
    return HelperUtil.httpReq(RequestUrls.ACHIEVE_REPORT_ADD,{
      'achieveReportModel':achieveReportModel,
      'taskPhaseId':taskPhaseId,
      'taskPhaseList':taskPhaseList
    },'POST');
  },

  // 删除竣工单
  deleteAchieveReportModel: function(applyNo, taskPhaseId, taskNum){
    return HelperUtil.httpReq(RequestUrls.ACHIEVE_REPORT_DELETE,{
      'applyNo':applyNo,
      'taskPhaseId':taskPhaseId,
      'taskNum':taskNum
    },'POST');
  },

  // 更新竣工单
  updateAchieveReportModel: function(achieveReportModel,taskPhaseId,taskPhaseList = null){
    return HelperUtil.httpReq(RequestUrls.ACHIEVE_REPORT_UPDATE,{
      'achieveReportModel':achieveReportModel,
      'taskPhaseId':taskPhaseId,
      'taskPhaseList':taskPhaseList
    },'POST');
  }
}

// 封装对象
function AchieveReportModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(AchieveReportModel,staticMethods);
export default AchieveReportModel