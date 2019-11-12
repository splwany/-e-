import {curSection, sections, baseFormStructure, IOLineStructure} from "./config";
import Form from "../form";
import Toast from "../../../utils/Toast";
import ReplyBaseModel from "../../../model/ReplyBaseModel";
import HighPowerFeatureModel from "../../../model/HighPowerFeatureModel";
import HighPowerInsectionModel from "../../../model/HighPowerInsection";
import HighReplyPropertyModel from "../../../model/HighReplyPropertyModel";
import ReplyFormModel from "../../../model/ReplyFormModel";
import ApplyFormService from "../../../service/ApplyFormService";
import HighReplyFormService from "../../../service/HighReplyFormService";

const app = getApp();

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
    submitBaseValues: baseFormStructure,  //基础信息
    PDP: {},    //path组件返回的接电点数据
    POC: {},    //path组件返回的分界点数据
    ioLine: {},    //io-line组件返回的进出线路数据
  },

  /**
   * 页面加载完成后运行
   */
  onLoad(query) {
    console.log(query)
    this.setData({
      taskId: query.taskId,    //从待办列表页传来的此任务的taskId
      taskType: query.taskType,
      staffAccount: query.staffAccount,    //之前填申请单的职工的账号
      applyNo: query.applyNo    //从待办列表页传来的此任务的applyNo
    });
    Form.formPageInit(this);
    //从服务器读取表单数据
    this._getValuesFromWeb(query.applyNo);
    
  },
  _getValuesFromWeb: async function (applyNo) {
    const applyFormValues = await ApplyFormService.getApplyForm(applyNo).then(res => {    //获取的申请单内容
      console.log(res)
      return res;
    }).catch(err=>{
      console.log(err);
    });
    const baseValues = applyFormValues.apply;
    let tmp = null;
    
    //填入submitBaseValues
    tmp = this.data.submitBaseValues;
    for(let item of tmp['baseInfo']) {
      if(baseValues[item.name] != undefined){
        let value = baseValues[item.name];
        value = value ? value : '';
        item.value = value;
      }
      if(item.name == 'replybaseService'){
        let value = baseValues['applyReg'];
        value = value ? value : '';
        item.value = value;
      }
    };
    
    this.setData({
      submitBaseValues: tmp
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
    Form.changeSection(this, e);
  },

  /**
   * 输入框输入文字时触发
   */
  bindKeyInput (e) {
    console.log(e);
    Form.bindKeyInput(this, e);
  },

  /**
   * 选项框选择改变时触发
   */
  bindPickerChange (e) {
    Form.bindPickerChange(this, e);
  },

  /**
   * 开关切换时触发
   */
  bindSwitchChange (e) {
    Form.bindSwitchChange(this, e);
  },

  /**
   * 多选改变时触发
   */
  bindCheckChange (e) {
    Form.bindCheckChange(this, e);
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
    //要询问是否确定提交
    Form.confirmToSubmit().then(res => {
      // dd.redirectTo({
      //   url: '../hrfSketch/hrfSketch'
      // });
      const replyBase = this._formatReplyBaseModelData(this.data.submitBaseValues.baseInfo, this.data.submitBaseValues.powerCapa, this.data.submitBaseValues.connectionInfo, this.data.submitBaseValues.metering);
      const highPowerFeature = this._formatHighPowerFeatureModelData(this.data.submitBaseValues.baseInfo, this.data.submitBaseValues.powerScheme, this.data.submitBaseValues.metering);
      const highPowerInsection = this._formatHighPowerInsectionData(this.data.POC);
      const highReplyProperty = this._formatHighReplyPropertyData(this.data.PDP);
      const userList = this._formatStaffList(this.data.staffAccount);
      const formValues = this._formatData(replyBase, highPowerInsection, highReplyProperty, highPowerFeature, userList, this.data.taskId, this.data.taskType);
      HighReplyFormService.submitHighReplyForm(formValues).then(() => {    //表单提交
        Toast.successToast('提交成功', () => {
          dd.redirectTo({
            url: '../hrfSketch/hrfSketch',
          });
        });
      }).catch(() => {
        Toast.failToast('提交失败');
      });
    });
  },
  _formatReplyBaseModelData (baseInfo, powerCapa, connectionInfo, metering) {   //供电方案基础表
    let replyBaseModel = ReplyBaseModel.createReplyBaseModel();
    for(let item of baseInfo){
      if(replyBaseModel[item.name] !== undefined){
        let value = item.value;
        value = value ? value : '';
        replyBaseModel[item.name] = value;
      }
    }
    for(let item of powerCapa){
      if(replyBaseModel[item.name] !== undefined){
        let value = item.value;
        value = value ? value : '';
        replyBaseModel[item.name] = value;
      }
    }
    for(let item of connectionInfo){
      if(replyBaseModel[item.name] !== undefined){
        let value = item.value;
        value = value ? value : '';
        replyBaseModel[item.name] = value;
      }
    }
    for(let item of metering){
      if(replyBaseModel[item.name] !== undefined){
        let value = item.value;
        value = value ? value : '';
        replyBaseModel[item.name] = value;
      }
    }
    return replyBaseModel
  },
  _formatHighPowerInsectionData (POC) {   //供电电源接电点表
    let highPowerInsectionModel = HighPowerInsectionModel.createHighPowerInsectionModel();
    highPowerInsectionModel.highreplyinsectionVoltage = POC.station;
    highPowerInsectionModel.highreplyinsectionLine = POC.powerline;
    highPowerInsectionModel.highreplyinsectionExtra = POC.extra;
    return highPowerInsectionModel
  },
  _formatHighReplyPropertyData (PDP) {   //产权分界点
    let highReplyPropertyModel = HighReplyPropertyModel.createHighReplyPropertyModel();
    highReplyPropertyModel.highpropertyVoltage = PDP.station;
    highReplyPropertyModel.highpropertyLine = PDP.powerline;
    highReplyPropertyModel.highpropertyExtra = PDP.extra;
    return highReplyPropertyModel
  },

  _formatHighPowerFeatureModelData (baseInfo, powerScheme, metering) {   //高压特性
    let highPowerFeatureModel = HighPowerFeatureModel.createHighPowerFeatureModel();
    for(let item of baseInfo){
      if(highPowerFeatureModel[item.name] !== undefined){
        let value = item.value;
        value = value ? value : '';
        highPowerFeatureModel[item.name] = value;
      }
    }
    for(let item of powerScheme){
      if(highPowerFeatureModel[item.name] !== undefined){
        let value = item.value;
        value = value ? value.join(";") : '';
        highPowerFeatureModel[item.name] = value;
      }
    }
    for(let item of metering){
      if(highPowerFeatureModel[item.name] !== undefined){
        let value = item.value;
        value = value ? value : '';
        highPowerFeatureModel[item.name] = value;
      }
    }
    return highPowerFeatureModel
  },
  _formatStaffList (value) {   //userList
    const curStaffAccount = app.globalData.myStaffAccount;
    let staffList = [curStaffAccount, value];
    return staffList;
  },
  _formatData (replyBaseModel, highPowerInsectionModel, highReplyPropertyModel, highPowerFeatureModel, userList, taskPhaseId, taskPhaseType) {
    let highReplyForm = ReplyFormModel.createHighReplyFormModel();
    highReplyForm.replyBaseModel = replyBaseModel;
    highReplyForm.highPowerInsectionModel = highPowerInsectionModel;
    highReplyForm.highReplyPropertyModel = highReplyPropertyModel;
    highReplyForm.highPowerFeatureModel = highPowerFeatureModel;
    highReplyForm.userList = userList;
    highReplyForm.taskPhaseId = taskPhaseId;
    highReplyForm.taskPhaseType = taskPhaseType;
    return highReplyForm
  }
});