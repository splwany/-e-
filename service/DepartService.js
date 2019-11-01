import DepartModel from "../model/DepartModel";


export default {

  /** 
  * @Description：获取所有部门信息
  * @date: 2019/10/22 14:51
  * @author: ly
  */
  getAllDepart() {
    return DepartModel.getAllDepartModel().then(result => {
      console.log('获取所有部门成功');
      return result.data;
    }).catch(err =>{
      console.log('获取所有部门失败');
      return err.message;
    });
  },

}