import {curSection, sections, staff} from "./config";
import Form from "../form";
import Toast from "../../../utils/Toast";
import StaffService from "../../../service/StaffService";
import DntGoodsApplyFormService from "../../../service/DntGoodsApplyFormService";

Page({
  /**
   * 页面数据
   */
  data: {
    isTagsShow: false,    //顶部标题是否展开状态
    switchIcon: '/statics/icons/switch_arrow_down.png',    //顶部标题箭头按钮
    headTitle: '小节名称',    //标题显示的小节名称
    sections: sections,    //section列表信息
    curSection: curSection,    //当前section
    digitalSignUrl: '/statics/images/no_digital_sign.png',    //数字签名图片url
    needToChooseStaff: false,    //是否需要人员选择来创建任务
    isSigned: false,    //是否点过签字了
    staffList: staff
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
    StaffService.getSignImage(app.globalData.myStaffAccount)    //获取签名图片的url
      .then(url => {
        this.setData({
          digitalSignUrl: url
        });
      });
    DntGoodsApplyFormService.isLastLeader(query.applyNo)    //根据applyNo判断是否是最后一个签字的领导
      .then(isLastLeader => {
        this.setData({
          isLastLeader: isLastLeader
        });
        ;
      })
      .catch(err => {
        console.log(err);
        Toast.failToast('加载失败，请重试');
      });
  },

   /**
   * 页面关闭，缓存信息
   */
  onUnload() {

  },
  
  /**
   * 头部标签展开/折叠
   */
  switchTags () {
    if(this.data.needToChooseStaff) Form.switchTags(this);
  },

  /**
   * 切换section页面
   */
  changeSection (e) {
    Form.changeSection(this, e);
  },

  /**
   * 输入框输入文字时触发
   */
  bindKeyInput (e) {
    Form.bindKeyInput(this, e);
  },

  /**
   * 点击签字按钮触发
   */
  onSign (e) {
    this.setData({
      isSigned: true
    }, () => {
      if(this.data.isLastLeader) {
        this.setData({
          'sections.task': {
            name: '创建任务'
          }
        }, () => {
          this.changeSection(e);
        });
      } else {
        this.onSubmit();
      }
    });
  },

  /**
   * 点击提交按钮触发
   */
  onSubmit () {
    Form.confirmToSubmit().then(res => {
      const applyNo = this.data.applyNo;
      const staffList = this._formatStaffList(this.data.staffList);
      const taskId = this.data.taskId;
      const taskType = this.data.taskType;
      
      const formValues = {
        applyNo: applyNo,
        userList: staffList,
        taskId: taskId,
        taskType: taskType
      };

      Form.submit(formValues, DntGoodsApplyFormService.confirmSign);    //表单提交
    });
  },
  _formatStaffList (values) {
    let staffList = [app.globalData.myStaffAccount];
    for(let {staff:{value:staffAccount}} of values.value)
      if(staffAccount) staffList.push(staffAccount);
    return staffList;
  }
});