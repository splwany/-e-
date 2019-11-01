import FindPageName from "/utils/FindPageName";
import service from "/service/TaskService";


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
    this.onPullDownRefresh();
  },

  /**
   * 下拉刷新时触发
   */
  onPullDownRefresh () {
    console.log('刷新');
    this.getWorkList();
  },

  /**
   * 从服务器获取待办工单列表
   */
  getWorkList () {
    const workList = [
      {taskphaseId: '0', staffAccount: '0', applyNo: '201910210002', clientName: '喀左一号项目', taskName: '用电答复单（高压）', taskPhaseStartDate: '2019年10月21日', taskType: '2', taskNum: '2'},
      {taskphaseId: '1', staffAccount: '0', applyNo: '201910210003', clientName: '配网改造一号项目', taskName: '配网改造认定审核', taskPhaseStartDate: '2019年10月21日', taskType: '0', taskNum: '2'},
      {taskphaseId: '2', staffAccount: '0', applyNo: '201910220003', clientName: '配网改造一号项目', taskName: '配网改造项目物资领料申请表', taskPhaseStartDate: '2019年10月22日', taskType: '0', taskNum: '3'},
    ];
    this.setData({
      workList: workList
    });
    // service.getAwaitTaskByUserId('YJB0001').then(res=>{
    //   // const workListFromWeb = [
    //   //   {taskphaseId: '0', staffAccount: '0', applyNo: '201910210002', clientName: '喀左一号项目', taskName: '用电答复单（高压）', taskPhaseStartDate: '2019年10月21日', taskType: '2', taskNum: '2'},
    //   //   {taskphaseId: '1', staffAccount: '0', applyNo: '201910210003', clientName: '配网改造一号项目', taskName: '配网改造认定审核', taskPhaseStartDate: '2019年10月21日', taskType: '0', taskNum: '2'},
    //   //   {taskphaseId: '2', staffAccount: '0', applyNo: '201910220003', clientName: '配网改造一号项目', taskName: '改造项目物资领料申请表', taskPhaseStartDate: '2019年10月22日', taskType: '0', taskNum: '3'},
    //   // ];
    //   this.setData({
    //     workList: res,
    //     // workList: workListFromWeb
    //   },()=>{
    //     console.log(this.data.workList);
    //   });
    // }).catch(res=>{

    // });    //从服务器读取列表
  },

  /**
   * 点击卡片，打开工单
   */
  openForm (e) {
    const taskId = e.target.dataset.taskId;
    const applyNo = e.target.dataset.applyNo;
    const taskType = e.target.dataset.taskType;
    const taskNum = e.target.dataset.taskNum;
    const staffAccount = e.target.dataset.staffAccount;
    const pageName = FindPageName[taskType][taskNum];
    dd.navigateTo({
      url: `/pages/form/${pageName}/${pageName}?taskId=${taskId}&applyNo=${applyNo}&taskType=${taskType}&staffAccount=${staffAccount}`
    });
  },

  /**
   * 点击新建按钮，打开新建申请单
   */
  addApplyForm () {
    dd.navigateTo({
      url: '/pages/form/applyForm/applyForm'
    });
  },

});
