import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 配网改造基础信息表
 */

// 属性
let vApplyFormModel = {
  "applyNo": null,
  "vapplyAdd": null,
  "vapplyContent": null,
  "vapplyDate": null,
  "vapplyHuman": null,
  "vapplyId": null,
  "vapplyNo": null,
  "vapplyPerson": null,
  "vapplyPhone": null,
  "vapplyProname": null,
  "vapplyUnit": null
};

// 行为方法
class vApplyFormModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createVApplyFormModel: function () {
    return Object.seal(Object.assign({}, vApplyFormModel));
  },
  
  /**
  1）更新vApplyObj；
  2）将任务阶段表taskPhaseId对应的置为完成；
  3）在任务阶段表新增taskPhaseList
   */
  updateVApplyFormModel: function(vApplyModel, taskPhaseId, taskPhaseList){
    return HelperUtil.httpReq(RequestUrls.VAPPLYFORM_UPDATE,{
      'vApplyModel':vApplyModel,
      'taskPhaseId':taskPhaseId,
      'taskPhaseList':taskPhaseList
    },'POST');
  }
}

// 封装对象
function VApplyFormModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(VApplyFormModel,staticMethods);
export default VApplyFormModel