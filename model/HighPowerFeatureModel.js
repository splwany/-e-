import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 高压特性表
 */

// 属性
let highPowerFeatureModel = {
  "replyBaseNo": null,
  "highpowerBuildType": null,
  "highpowerProtectMode": null,
  "highpowerBaseCost": null,
  "highpowerEndPosition": null,
  "highpowerFactor": null,
  "highpowerApportion": null,
  "highpowerLoadLevel": null
};

// 行为方法
class highPowerFeatureModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createHighPowerFeatureModel: function () {
    return Object.seal(Object.assign({}, highPowerFeatureModel));
  },

}

// 封装对象
function HighPowerFeatureModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(HighPowerFeatureModel,staticMethods);
export default HighPowerFeatureModel