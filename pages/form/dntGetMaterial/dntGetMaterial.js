import {curSection, sections, submitStructure, staff} from "./config";
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
    submitValues: submitStructure,    //表单结构
    isFinished: false,    //是否领料完成
    staffList: staff
  },
  
  /**
   * 页面加载完成，当从缓存打开时，导入缓存信息
   */
  onLoad(query) {
    DntGoodsApplyFormService.getDntApplyFormByApplyNo(query.applyNo)    //获取配网信息
      .then(({baseInfo}) => {
        this.setData({
          baseInfo: baseInfo
        });
      });
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

  /**
   * 头部标签展开/折叠
   */
  switchTags () {
    Form.switchTags(this);
  },

  /**
   * 切换section页面
   */
  changeSection (e) {
    if(e.target.dataset.finished) {
      console.log(e.target.dataset.finished);
      this.setData({
        isFinished: e.target.dataset.finished
      });
    }
    Form.changeSection(this, e);
  },

  /**
   * 输入框输入文字时触发
   */
  bindKeyInput (e) {
    Form.bindKeyInput(this, e);
  },

  /**
   * 点击提交按钮触发
   */
  onSubmit () {
    Form.confirmToSubmit().then(res => {
      const applyNo = this.data.applyNo;
      const taskId = this.data.taskId;
      const taskType = this.data.taskType;
      const staffList = this._formatStaffList(this.data.staffList);
      const submitValues = this._formatSubmitValues(this.data.submitValues);
      
      const obj = this.data.baseInfo;
      Object.assign(obj, submitValues);

      const formValues = {
        vApplyObj: obj,
        userList: staffList,
        taskPhaseId: taskId,
        taskType: taskType
      };

      Form.submit(formValues, DntGoodsApplyFormService.signFinish);    //表单提交
    });
  },
  _formatSubmitValues (values) {
    const obj = {};
    for(let {name, value} of values) tmp[name] = value;
    return obj;
  },
  _formatStaffList (values) {
    let staffList = [app.globalData.myStaffAccount];
    for(let {staff:{value:staffAcount}} of values.value)
      if(staffAcount) staffList.push(staffAcount);
    return staffList;
  }
});
