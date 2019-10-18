import ApplyFormService from "/service/ApplyFormService";


export default {

  /**
   * 表单提交
   * @param {提交的表单内容} applyFormModel 
   */
  submit (applyFormModel) {
    return ApplyFormService.submitApplyForm(applyFormModel);
  },

}