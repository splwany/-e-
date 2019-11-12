import util from '../utils/util'
import StationModel from '../model/StationModel'

export default {
  
  /**
   * @description:获取所有变电站信息
   * @author:ly
   * @date: 2019/11/04 18:03
   */
  getAllStation:function(){
    return StationModel.getAllStationModel().then(result =>{
      console.log('返回所有变电站信息成功');
      return Promise.resolve(result.data);
    }).catch(err =>{
      console.log('返回所有变电站信息失败');
      return Promise.reject(err);
    })
  },

}