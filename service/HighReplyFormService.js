import util from '../utils/util'
import ReplyFormModel from '../model/ReplyFormModel'

export default {
  
  /**
   * @description: 提交高压答复单信息，并插入新的阶段
   * @date: 2019/11/04 18:03
   * @param {高压答复单} submitValues 
   * @author: ly
   */
  submitHighReplyForm:function(submitValues){
    const firstUser = submitValues.userList.shift();
    return util.userListToTaskList(submitValues.userList, submitValues.ReplyBaseModel, submitValues.taskPhaseType, 3, false, firstUser)
    .then(taskPhaseList =>{
      return ReplyFormModel.submitHighReplyFormModel(submitValues,taskPhaseList);
    })
    .catch(err =>{
      return Promise.reject(err);
    })
    .then(result =>{
      console.log('高压答复单提交成功');
      return Promise.resolve();
    })
    .catch(err =>{
      console.log('高压答复单提交失败');
      return Promise.reject(err);
    })
  },

  /**
   * 获取答复单内容
   * @param {答复单编号} replyFormNo 
   */
  getHighReply (replyFormNo) {

  },

  /**
   * 获取物资型号列表
   * @param {物资类别} goodType 
   */
  selectGoods (goodType) {

  },

  /**
   * 选择变电站
   */
  selectPowerStation () {

  },

  /**
   * 选择电线杆
   */
  selectPole () {

  },

  /**
   * 选择线路分支
   */
  selectBranch () {

  },

  /**
   * 根据杆号判断该杆的可开放容量是否满足用户的申请容量
   * @param {杆号} name 
   */
  openCapacityIsAvailable (name) {

  },

  /**
   * 生成方案草图
   * @param {方案对象} scheme 
   */
  generatePlanScheme (scheme) {

  },

  /**
   * 生成预算清单
   * @param {物资方案对象} scheme 
   */
  generatePlanBudget (scheme) {

  },

  /**
   * 生成高压答复单文档
   * @param {高压答复单} highReplyForm 
   */
  generateDoc (highReplyForm) {

  },

  /**
   * 打印文档
   * @param {文档文件} doc 
   */
  printDoc (doc) {

  }

}