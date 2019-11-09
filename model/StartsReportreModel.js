import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 开工报告审批
 */

// 属性
let startsReportReModel = {
  "startsreportreId": null,
  "startsreportNo": null,
  "startsreportreUnit": null,
  "startsreportApprover": null,
  "startsreportreContent": null,
  "startsreportreRedate": null
};

// 行为方法
class startsReportReModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createStartsReportReModel: function () {
    return Object.seal(Object.assign({}, startsReportReModel));
  },

}

// 封装对象
function StartsReportReModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(StartsReportReModel,staticMethods);
export default StartsReportReModel