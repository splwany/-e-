import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 主干线可开放容量表
 */

// 属性
let trunkCapacityModel = {
  "id": null,
  "trunkName": null,
  "trunkCapacity": null,
  "maxRatedCurrent": null,
  "maxYearCurrent": null,
  "cableType": null,
  "exitCurrent": null,
  "trunkCableType": null,
  "minCablePostion": null,
  "minCableCurrent": null,
  "tenMaxCurrent": null,
  "maxAvalableCapacity": null,
  "trunkcapacityNo": null,
  "trunkcapacityId": null,
  "trunkcapacityCapacity": null,
  "trunkcapacityName": null,
  "trunkcapacityNote": null
};

// 行为方法
class trunkCapacityModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createTrunkCapacityModel: function () {
    return Object.seal(Object.assign({}, trunkCapacityModel));
  },
}

// 封装对象
function TrunkCapacityModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(TrunkCapacityModel,staticMethods);
export default TrunkCapacityModel