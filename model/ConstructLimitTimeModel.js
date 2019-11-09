import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 施工时限基础表
 */

// 属性
let constructLimitTimeModel = {
  "constructlimittimeId": null,
  "constructlimittimeName": null,
  "constructlimittimeType": null,
  "constructlimittimeTime": null
};

// 行为方法
class constructLimitTimeModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createConstructLimitTimeModel: function () {
    return Object.seal(Object.assign({}, constructLimitTimeModel));
  },

}

// 封装对象
function ConstructLimitTimeModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(ConstructLimitTimeModel,staticMethods);
export default ConstructLimitTimeModel