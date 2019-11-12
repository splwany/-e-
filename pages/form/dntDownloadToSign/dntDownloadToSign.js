import {curSection, sections} from "./config";
import Form from "../form";
import Toast from "../../../utils/Toast";
import DntGoodsApplyFormService from "../../../service/DntGoodsApplyFormService";

const app = getApp();

Page({
  data: {
    isTagsShow: false,    //顶部标题是否展开状态
    switchIcon: '/statics/icons/switch_arrow_down.png',    //顶部标题箭头按钮
    headTitle: '小节名称',    //标题显示的小节名称
    sections: sections,    //section列表信息
    curSection: curSection,    //当前section
  },
  
  /**
   * 页面加载完成，当从缓存打开时，导入缓存信息
   */
  onLoad(query) {
    this.setData({
      applyNo: query.applyNo,
      taskType: query.taskType,
      taskId: query.taskId,
      staffAccount: query.staffAccount
    });
    Form.formPageInit(this);
  },

   /**
   * 页面关闭，缓存信息
   */
  onUnload() {

  },

  downloadDoc () {
    DntGoodsApplyFormService.downLoadDntApplyForm(this.data.applyNo)
      .then(downloadUrl => {
        console.log(downloadUrl);
        dd.setClipboard({
          text: downloadUrl,
          success: () => {
            Toast.successToast('链接已复制，请到浏览器打开');
          }
        });
      })
      .catch(err => {
        Toast.failToast('获取下载链接失败');
        console.log(err);
      });
  },

  /**
   * 点击提交按钮触发
   */
  onSubmit () {
    Form.confirmToSubmit().then(res => {
      const applyNo = this.data.applyNo;
      const staffList = [app.globalData.myStaffAccount];
      const taskId = this.data.taskId;
      const taskType = this.data.taskType;
      const isPassed = this.data.isPassed;
      
      const formValues = {
        applyNo: applyNo,
        userList: staffList,
        taskId: taskId,
        taskType: taskType,
        isPassed: isPassed
      };

      Form.submit(formValues, DntGoodsApplyFormService.submitDntGoodsApplyReview);    //表单提交
    });
  },
});
