import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 开工报告表
 */

// 属性
let startsReportModel = {
  "startsreportNo": null,
  "applyNo": null,
  "startsreportProname": null,
  "startsreportAddr": null,
  "startsreportUnit": null,
  "startsreportLeader": null,
  "startsreportPhone": null,
  "approvallimitStarttime": null,
  "startsreportPretime": null,
  "startsreportContent": null,
  "startsreportUnitsug": null,
  "startsreportClientsug": null,
  "startsreportAccperson": null,
  "startsreportApprover": null,
  "startsreportDate": null
};

// 行为方法
class startsReportModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createStartsReportModel: function () {
    return Object.seal(Object.assign({}, startsReportModel));
  },

  /***
    1）在开工表增加startsReportModel对象；
    2）在任务阶段表将taskPhaseId对应信息置为完成；
    3）在任务阶段表添加taskPhaseList

    succsee:返回开工报告编号；fail:返回失败原因
   */
  addStartsReportModel: function(startsReportModel, taskPhaseId, taskPhaseList){
    return HelperUtil.httpReq(RequestUrls.START_REPORT_ADD,{
      'startsReportModel':startsReportModel,
      'taskPhaseId':taskPhaseId,
      'taskPhaseList':taskPhaseList
    },'POST');
  },

  /***
    1）根据applyNo将从开工表删除对应行；
    2）将taskPhaseId置为未完成；
    3）根据applyNo和taskNum删除任务阶段表中对应的信息
   */
  deleteStartsReportModel:function(applyNo, taskPhaseId, taskNum){
    return HelperUtil.httpReq(RequestUrls.START_REPORT_DELETE,{
      'applyNo':applyNo,
      'taskPhaseId':taskPhaseId,
      'taskNum':taskNum
    },'POST');
  }
}

// 封装对象
function StartsReportModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(StartsReportModel,staticMethods);
export default StartsReportModel