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
  onShow() {
    console.log('刷新');
    this.getWorkList();
  },

  /**
   * 从服务器获取待办工单列表
   */
  getWorkList () {
    let workList = [];
    //先从缓存读取新增装用电申请单的缓存列表放入workList，再从服务器读取列表
    // const workList = WorkService.getWorkList(userID);    //从服务器读取列表
    const workListFromWeb = [
      {formType: 'applyForm', formNo: '201910180001', projectName: '喀左一号项目', formName: '新、增装用电申请单', date: '2019年10月18日', step: '1/8'},
      {formType: 'highReplyForm', formNo: '201910180002', projectName: '喀左二号项目', formName: '用电答复单（高压）', date: '2019年10月18日', step: '2/8'},
    ];
    workList = workList.concat(workListFromWeb);    //workListFromWeb合并入workList
    this.setData({
      workList: workList
    });
  },

  /**
   * 点击卡片，打开工单
   */
  openForm (e) {
    const formNo = e.target.dataset.formNo;
    const formType = e.target.dataset.formType;
    dd.navigateTo({
      url: `/pages/form/${formType}/${formType}?formNo=${formNo}`
    });
  },
});
