Page({

  /**
   * 页面数据
   */
  data: {
    workList: [],
  },

  /**
   * 页面加载完毕后运行
   */
  onLoad() {
    this.getWorkList();
  },

  /**
   * 从服务器获取待办工单列表
   */
  getWorkList () {
    // const workList = WorkService.getWorkList(userID);
    const workList = [
      {projectName: '喀左一号项目', formName: '新、增装用电申请单', date: '2019年10月18日', step: '1/8'},
      {projectName: '喀左二号项目', formName: '用电答复单（高压）', date: '2019年10月18日', step: '2/8'},
      {projectName: '喀左三号项目', formName: '用电答复单（低压）', date: '2019年10月18日', step: '2/8'}     
    ];
    this.setData({
      workList: workList
    });
  },
});
