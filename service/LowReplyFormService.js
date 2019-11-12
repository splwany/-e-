import util from '../utils/util'
import ReplyFormModel from '../model/ReplyFormModel'

export default {
  
  /**
   * @description:提交低压答复单，并添加对应任务阶段
   * @param {低压答复单} submitValues 
   * @date: 2019/11/04 18:03
   */
  submitLowReplyForm:function(submitValues){
    const firstUser = submitValues.userList.shift();
    return util.userListToTaskList(submitValues.userList, submitValues.replyBaseModel, submitValues.taskPhaseType, 3, false, firstUser)
    .then(taskPhaseList =>{
      return ReplyFormModel.submitLowReplyFormModel(submitValues,taskPhaseList);
    })
    .catch(err =>{
      return Promise.reject(err);
    })
    .then(result =>{
      console.log('低压答复单提交成功');
      return Promise.resolve();
    })
    .catch(err =>{
      console.log('低压答复单提交失败');
      return Promise.reject(err);
    })
  },

}