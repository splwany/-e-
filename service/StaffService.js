import StaffModel from "../model/StaffModel";


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
      return result.data;
    }).catch(err =>{
      return err.message;
    });
  },

}