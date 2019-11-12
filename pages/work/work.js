import FindPageName from "/utils/FindPageName";
import TaskService from "../../service/TaskService";
import Toast from "../../utils/Toast";


const app = getApp();    //获取小程序对象，全局变量存在其中


Page({

  /**
   * 页面数据
   */
  data: {
    workList: [],    //待办工单列表
  },
  
  /**
   * 页面显示后运行
   */
  onShow() {
    setTimeout(() => {
      this.onPullDownRefresh()    //500毫秒后执行刷新动作
    }, 500);
  },

  /**
   * 下拉刷新时触发
   */
  onPullDownRefresh() {
    console.log('刷新中...');
    this.getWorkList();
  },

  /**
   * 从服务器获取待办工单列表
   */
  getWorkList: function() {
    TaskService.getAwaitTaskByUserId(app.globalData.myStaffAccount)    //从服务器读取列表
      .then(workList => {    //成功，返回数据
        dd.stopPullDownRefresh();
        return workList;
      })
      .catch(() => {    //失败，使用预定义数据
        dd.stopPullDownRefresh();
        const workList = [
          { taskphaseId: '0', prestaffAccount: 'YKFZX0001', staffAccount: 'YKFZX0001', applyNo: '201910210002', clientName: '喀左一号项目', taskName: '用电答复单（高压）', taskphaseStartdate: '2019年10月21日', taskType: '2', taskNum: '2' },
          { taskphaseId: '1', prestaffAccount: 'YWB0001', staffAccount: 'YJB0001', applyNo: '201910210003', clientName: '配网改造一号项目', taskName: '配网改造认定审核', taskphaseStartdate: '2019年10月21日', taskType: '0', taskNum: '2' },
          { taskphaseId: '2', prestaffAccount: 'YJB0001', staffAccount: 'YWB0001', applyNo: '201910220003', clientName: '配网改造一号项目', taskName: '配网改造项目物资领料申请表', taskphaseStartdate: '2019年10月22日', taskType: '0', taskNum: '3' },
        ];
        return workList;
      })
      .then(workList => {
        this.setData({    //在data中填入workList
          workList: workList
        });
      });
  },

  /**
   * 点击卡片，打开工单
   */
  openForm(e) {
    const taskId = e.target.dataset.taskId;    //任务阶段编号
    const applyNo = e.target.dataset.applyNo;    //申请编号
    const taskType = e.target.dataset.taskType;    //任务类型
    const taskNum = e.target.dataset.taskNum;    //任务当前所处阶段
    const staffAccount = e.target.dataset.staffAccount;    //任务发起人账号（上一任务的人的账号）
    const pageName = FindPageName[taskType][taskNum];    //根据任务类型和任务阶段获取要跳转的页面的名字
    dd.navigateTo({
      url: `/pages/form/${pageName}/${pageName}?taskId=${taskId}&applyNo=${applyNo}&taskType=${taskType}&staffAccount=${staffAccount}`
    });
  },

  /**
   * 点击新建按钮，打开新建申请单
   */
  addApplyForm() {
    dd.navigateTo({
      url: '/pages/form/applyForm/applyForm'
    });
  },

});
