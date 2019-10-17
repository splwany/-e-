import FormService from "/service/FormService";


export default {

  /**
   * 表单提交
   * @param {提交的表单内容} submitValues 
   */
  submit (submitValues) {
    const formName = 'applyForm';
    FormService.submit(formName, submitValues);
  },

}