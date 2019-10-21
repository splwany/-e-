import ApplyFormModel from "/model/ApplyFormModel";

export default {

  /**
   * 获取申请单内容
   * @param {申请单编号} applyFormNo 
   */
  getApplyForm (applyFormNo) {

  },

  /**
   * 更新申请单内容
   * @param {表单内容} applyForm 
   */
  updateApplyForm (applyForm) {

  },

    /**
   * 提交申请单内容
   * @param {表单内容} applyFormModel 
   */
  submitApplyForm(submitValues){
    ApplyFormModel.addApplyFromModel(submitValues).then(result => {
      console.log('添加申请表单信息成功');
      return true;
    }).catch(result=>{
      console.log('异常');
      return false;
    });
  }

}