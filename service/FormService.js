import FormModel from "/model/FormModel";
import TaskService from "./TaskService";


export default {
  
  /**
   * 表单提交
   * @param {表单名称} formName 
   * @param {表单提交的数据} formData 
   */
  submit (formName, formData) {
    FormModel.submit(formName, formData, (success)=>{
      if(success) {
        TaskService.saveFirstTask();
      } else {
        
      }
    });
  },

};