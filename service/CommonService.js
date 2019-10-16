// 通用的都放在这里

export default {

  /**
   * 生成方案简图
   * @param {表单填写的相关信息组成的键值对集合} schemeObj 
   * @return {生成的图片}
   */
  makeSchemePic (schemeObj) {

  },

  /**
   * 生成概算清单
   * @param {物料方案清单} schemeBill 
   */
  makeSchemeBudget (schemeBill) {

  },

  /**
   * 领导数字签名合成到excel表中
   * @param {用户ID} userId 
   * @param {申请单编号} applyId 
   */
  digitSign (userId, applyId) {

  },

  /**
   * 设置时限
   * @param {用户ID} userId 
   * @param {任务ID} taskId 
   * @param {时限} timeLimit 
   */
  setTimeLimit (userId, taskId, timeLimit) {

  },

  /**
   * 获取时限
   * @param {用户ID} userId 
   * @param {任务ID} taskId 
   */
  getTimeLimit (userId, taskId) {

  },

  /**
   * 取消时限
   * @param {用户ID} userId 
   * @param {任务ID} taskId  
   */
  cancelTimeLimit (userId, taskId) {

  },
  
};
