import {curSection, sections} from "./config";

Page({
  /**
   * 页面数据
   */
  data: {
    taskId: '',    //任务ID,
    taskType: '',     //任务类别
    staffAccount: '',    //之前填申请表的职工的staffAccount
    isTagsShow: false,    //顶部标题是否展开状态
    switchIcon: '/statics/icons/switch_arrow_down.png',    //顶部标题箭头按钮
    headTitle: '小节名称',    //标题显示的小节名称
    sections: sections,    //section列表
    curSection: curSection,    //当前section
    src: '../../../../1.jpg',
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
  onInformTheLeader() {
    
  }
});
