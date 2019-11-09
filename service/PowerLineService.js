import util from '../utils/util'
import PowerLineModel from '../model/PowerLineModel'

export default {
  
  /**
   * @description:通过变电站编号获取电缆信息
   * @author:ly
   * @date: 2019/11/04 18:03
   */
  selectByStationNo:function(StationNo){
    return PowerLineModel.selectByStationNoModel(StationNo).then(result =>{
      console.log('根据变电站编号返回电缆信息成功');
      return Promise.resolve(result.data);
    }).catch(err =>{
      console.log('根据变电站编号返回电缆信息失败');
      return Promise.reject(err);
    })
  },

}