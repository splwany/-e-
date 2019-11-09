import StaffModel from "../model/StaffModel";
import ImageService from '../service/ImageService'
import ImageType from '../utils/ImageType'

export default {

  /** 
  * @Description：返回对应部门编号下的人员
  * @param {departNo} 部门编号
  * @date: 2019/10/22 14:48
  * @author: ly
  */
  selectStaffByDepart :function(departNo) {
    return StaffModel.selectStaffByDepartModel(departNo).then(result => {
      console.log('返回对应部门编号下的人员成功');
      return Promise.resolve(result.data);
    }).catch(err =>{
      return Promise.reject(err);
    });
  },

  /**
   * @description: 用户登录
   * @param {密码} staffPassword
   * @param {账号} staffAcount
   */
  login:function(staffAccount, staffPassword){
    return StaffModel.loginModel(staffAccount, staffPassword).then(result => {
      console.log('登录成功');
      return result.data;
    }).catch(err =>{
      return err.message;
    });
  },
  
  /**
   * @description: 根据用户账号获取对应的数字签名照片
   * @param {用户账号} staffAccount 
   */
  getSignImage:function(staffAccount){
    return ImageService.getImageUrl(staffAccount, ImageType.STAFF_SING).then(result =>{
      return Promise.resolve(result);
    }).catch(err =>{
      console.log('服务器返回客户数字签名照片地址失败')
      return Promise.reject(err);
    });
  }
  
}