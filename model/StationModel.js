import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 66kv变电站表
 */

// 属性
let stationModel = {
  "id": null,
  "stationNo": null,
  "stationName": null
};

// 行为方法
class stationModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createStationModel: function () {
    return Object.seal(Object.assign({}, stationModel));
  },

  // 获取所有变电站对象列表
  getAllStationModel:function(){
    return HelperUtil.httpReq(RequestUrls.STATION_CRUD);
  }

}

// 封装对象
function StationModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(StationModel,staticMethods);
export default StationModel