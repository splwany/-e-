import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 设备
 */

// 属性
let deviceModel = {
  "devicedetialId": null,
  "applyNo": null,
  "devicedetialName": null,
  "devicedetialVolumn": null,
  "devicedetialQuantity": null,
  "devicedetialSum": null
};

// 行为方法
class deviceModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createDeviceModel: function () {
    return Object.seal(Object.assign({}, deviceModel));
  },

};

// 封装对象
function DeviceModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(DeviceModel,staticMethods);
export default DeviceModel;