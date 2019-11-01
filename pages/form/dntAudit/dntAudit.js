import {curSection, sections, baseFormStructure, equipmentStructure, imageStructure} from "./config";
import Form from "../form";
import service from "/service/ApplyFormService";
import ApplyFormModel from "/model/ApplyFormModel";


Page({

  /**
   * 页面数据
   */
  data: {
    taskId: '',    //任务ID,
    taskType: '',     //任务类别
    staffAccount: '',    //之前填申请表的职工的staffAccount
    applyNo: '',    //申请编号
    isTagsShow: false,    //顶部标题是否展开状态
    switchIcon: '/statics/icons/switch_arrow_down.png',    //顶部标题箭头按钮
    headTitle: '小节名称',    //标题显示的小节名称
    sections: sections,    //section列表信息
    curSection: curSection,    //当前section
    submitBaseValues: baseFormStructure,    //页面填写的基础数据
    submitEquipmentValues: equipmentStructure,    //填写的设备数据
    submitImageValues: imageStructure,    //上传的图片的数据
  },

  /**
   * 页面加载完成
   */
  onLoad(query) {
    this.setData({
      taskId: query.taskId,    //从待办列表页传来的此任务的taskId
      taskType: query.taskType,
      staffAccount: query.staffAccount,    //之前填申请单的职工的账号
      applyNo: query.applyNo    //从待办列表页传来的此任务的applyNo
    });

    Form.formPageInit(this);
    this._getValuesFromWeb(query.applyNo);    //发送applyNo获取申请单内容并给页面赋值
  },
  _getValuesFromWeb: async function (applyNo) {
    const applyFormValues = await service.getApplyForm(applyNo).then(res => {    //获取的申请单内容
      return res;
    }).catch(err=>{
      console.log(err);
    });
    const baseValues = applyFormValues.apply;
    const equipmentValues = applyFormValues.devicedetialList;
    let tmp = null;
    
    //填入submitBaseValues
    tmp = this.data.submitBaseValues;
    for(let section in tmp) {
      for(let item of tmp[section]) {
        let value = baseValues[item.name];
        value = value ? value : '';
        item.value = value;
      }
    }
    this.setData({
      submitBaseValues: tmp
    });

    //填入submitEquipmentValues
    tmp = this.data.submitEquipmentValues;
    for(let item of equipmentValues) {
      const equipment = JSON.parse(JSON.stringify(tmp.data));
      equipment[0].value = item.devicedetialName;
      equipment[1].value = item.devicedetialVolumn;
      equipment[2].value = item.devicedetialQuantity;
      tmp.value.splice(tmp.value.length, 0, equipment);
    }
    this.setData({
      'submitEquipmentValues': tmp
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
    const passed = e.target.dataset.passed;
    if(passed) {
      this._setFailedReasonDisabledState(JSON.parse(passed));    // 如果点击了未通过，则设置状态为可输入状态
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
  onSubmit (e) {
    const passed = e.target.dataset.passed;
    if(passed) this._setFailedReasonDisabledState(JSON.parse(passed));    //如果点了合格按钮来提交，则设置未通过原因的输入状态
    
    const submitBaseValues = this._formatBaseValues(this.data.submitBaseValues);
    const staffList = [this.data.staffAccount];
    const taskId = this.data.taskId;
    const taskType = this.data.taskType;
    
    Form.onSubmit({
      submitBaseValues: submitBaseValues,
      isPassed: passed,
      userList: staffList,
      taskId: taskId,
      taskType: taskType
    }, service.submitReview);
  },
  _formatBaseValues (values) {
    let obj = ApplyFormModel.createApplyFormModel();
    for(let item of values.baseInfo) {
      if(item.name=='isDNR') continue;
      obj[item.name] = item.value;
    }
    for(let item of values.usePower) obj[item.name] = item.value;
    for(let item of values.applyCapa) obj[item.name] = item.value;
    for(let item of values.note) obj[item.name] = item.value;
    for(let item of values.failureReason) obj[item.name] = item.value?item.value:null;
    return obj;
  },

  /**
   * 通过是否合格的状态设置未通过原因框是否可输入
   * @param {是否合格} state 
   */
  _setFailedReasonDisabledState (state) {    //设置未通过原因可输入状态
    if(state === true) {    //如果通过审核，要清空填写的未通过原因（如果手贱先未通过然后写了原因然后又改成通过）
      this.setData({
        'submitBaseValues.failureReason[0].value': null
      });
    }
    this.setData({
      'submitBaseValues.failureReason[0].disabled': state
    });
  },

});