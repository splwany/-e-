import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 10kv线表
 */

// 属性
let powerLineModel = {
  "id": null,
  "powerlineNo": null,
  "stationNo": null,
  "powerlineName": null
};

// 行为方法
class powerLineModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createPowerLineModel: function () {
    return Object.seal(Object.assign({}, powerLineModel));
  },

  // 根据变电站编号返回符合条件的电缆列表
  selectByStationNoModel: function(stationNo){
    return HelperUtil.httpReq(RequestUrls.POWER_LINE_GET_BY_STATIONNO + stationNo);
  }

}

// 封装对象
function PowerLineModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(PowerLineModel,staticMethods);
export default PowerLineModel