Page({
  /**
   * 页面数据
   */
  data: {
    taskId: '',    //任务ID,
    taskType: '',     //任务类别
    staffAccount: '',    //之前填申请表的职工的staffAccount
    src: '../../../../1.jpg'
  },

  /**
   * 页面加载完成后运行
   */
  onLoad(query) {
    //TODO: 从服务器获取图片地址
    this.setData({
      taskId: query.taskId,    //从待办列表页传来的此任务的taskId
      taskType: query.taskType,
      staffAccount: query.staffAccount,    //之前填申请单的职工的账号
      applyNo: query.applyNo    //从待办列表页传来的此任务的applyNo
    });
  },

  /**
   * 点击提交按钮触发
   */
  onNext() {
    dd.redirectTo({
      url: '../hrfPreview/hrfPreview',
      success: function(){
        dd.navigateTo({
          url: '../materialSelection/materialSelection'
        })
      }
    })
  }
});
