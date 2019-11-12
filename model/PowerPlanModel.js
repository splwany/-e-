import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 供电方案表
 */

// 属性
let powerPlanModel = {
  "applyNo": null,
  "vapplyNo": null,
  "vpowerplanArea": null,
  "vpowerplanExtra": null,
  "vpowerplanId": null,
  "vpowerplanLine1": null,
  "vpowerplanLine2": null,
  "vpowerplanVoltage": null,
  "vpowerplanOverhead":null,
  "vpowerplanCable":null,
  "vpowerplanFrontwire":null,
  "vpowerplanFrontcable":null
};

// 行为方法
class powerPlanModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createPowerPlanModel: function () {
    return Object.seal(Object.assign({}, powerPlanModel));
  },
}

// 封装对象
function PowerPlanModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(PowerPlanModel,staticMethods);
export default PowerPlanModel