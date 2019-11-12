import {curSection, sections, submitStructure} from "./config";
import Form from "../form";
import Toast from "../../../utils/Toast";
import StartsReportModel from "../../../model/StartsReportModel";
import DntGoodsApplyFormService from "../../../service/DntGoodsApplyFormService";
import StartsReportService from "../../../service/StartsReportService";

const app = getApp();

Page({
  data: {
    isTagsShow: false,    //顶部标题是否展开状态
    switchIcon: '/statics/icons/switch_arrow_down.png',    //顶部标题箭头按钮
    headTitle: '小节名称',    //标题显示的小节名称
    sections: sections,    //section列表信息
    curSection: curSection,    //当前section
    submitValues: submitStructure,
  },
  
  /**
   * 页面加载完成，当从缓存打开时，导入缓存信息
   */
  onLoad(query) {
    DntGoodsApplyFormService.getDntApplyFormByApplyNo(query.applyNo)    //获取配网信息
      .then(({baseInfo}) => {
        this._fillOutForm(baseInfo);    //物资领料基础表信息回填
      })
      .catch(err => {
        console.log(err);
      });
    this.setData({
      applyNo: query.applyNo,
      taskType: query.taskType,
      taskId: query.taskId,
      staffAccount: query.staffAccount
    });
    Form.formPageInit(this);
  },
  _fillOutForm (values) {
    const {
      vapplyProname: startsreportProname,
      vapplyAdd: startsreportAddr,
      applyNo: applyNo
    } = values;
    const tmp = {startsreportProname, startsreportAddr, applyNo};
    const baseInfo = this.data.submitValues.baseInfo;
    for(let item of baseInfo) item.value = tmp[item.name];
    // baseInfo[9].value = app.globalData.userInfo.staffName
    this.setData({
      'submitValues.baseInfo': baseInfo
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
   * 日期选择
   */
  onDatePick (e) {
    Form.onDatePick(this, e);
  },

  /**
   * 点击图片添加按钮时触发
   */
  addImage (e) {
    Form.addImage(this, e);
  },

  /**
   * 点击图片预览
   */
  previewImage (e) {
    Form.previewImage(e);
  },

  /**
   * 点击提交按钮触发
   */
  onSubmit () {
    Form.confirmToSubmit().then(res => {
      const applyNo = this.data.applyNo;
      const staffList = [app.globalData.myStaffAccount, app.globalData.myStaffAccount];
      const taskId = this.data.taskId;
      const taskType = this.data.taskType;
      const startsReportModel = this._formatSubmitValues(this.data.submitValues);
      const imagesList = this._formatImagesList(this.data.submitValues.extra[1]);
      
      const formValues = {
        applyNo: applyNo,
        userList: staffList,
        taskPhaseId: taskId,
        taskType: taskType,
        startsReportModel: startsReportModel,
        imagesList: imagesList
      };

      Form.submit(formValues, StartsReportService.submitStartsReport);    //表单提交
    });
  },
  _formatSubmitValues (values) {
    const model = StartsReportModel.createStartsReportModel();
    const tmp = {};
    for(let _values of Object.values(values))
      for(let {name, value} of _values) tmp[name] = value;
    Object.assign(model, tmp);
    return model;
  },
  _formatImagesList ({name: picType, value: picUrl}) {
    return [{picType, picUrl}];
  }
});
