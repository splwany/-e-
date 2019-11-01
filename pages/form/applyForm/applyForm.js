import {curSection, sections, baseFormStructure, equipmentStructure} from "./config";
import util from "/utils/util";
import Form from "../form";
import service from "/service/ApplyFormService";
import ApplyFormModel from "/model/ApplyFormModel";
import DeviceModel from "/model/DeviceModel";


Page({

  /**
   * 页面数据
   */
  data: {
    applyNo: baseFormStructure.applyNo,    //申请编号
    isTagsShow: false,    //顶部标题是否展开状态
    switchIcon: '/statics/icons/switch_arrow_down.png',    //顶部标题箭头按钮
    headTitle: '小节名称',    //标题显示的小节名称
    sections: sections,    //section列表信息
    curSection: curSection,    //当前section
    submitBaseValues: baseFormStructure,    //页面填写的基础数据
    submitEquipmentValues: equipmentStructure,    //填写的设备数据
    staffList: []    //任务默认结构,
  },

  /**
   * 页面加载完成
   */
  onLoad(query) {
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
    Form.changeSection(this, e);
  },

  /**
   * 输入框输入文字时触发
   */
  bindKeyInput (e) {
    Form.bindKeyInput(this, e);
  },

  /**
   * 选项改变时触发
   */
  bindPickerChange (e) {
    Form.bindPickerChange(this, e);
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
   * 设备更改触发
   */
  onEquipmentChange (e) {
    const values = e.detail.values;
    this.setData({
      submitEquipmentValues: values
    });
  },

  /**
   * 点击提交按钮触发
   */
  onSubmit () {
    const applyNo = util.makeApplyNo();
    const submitBaseValues = this._formatBaseValues(this.data.submitBaseValues);
    submitBaseValues.applyNo = applyNo;
    const submitEquipmentValues = this._formatEquipmentValues(this.data.submitEquipmentValues);
    for(let item of submitEquipmentValues) {
      item.applyNo = applyNo;
    }
    const staffList = this._formatStaffList(this.data.staffList);
    const isLowValtage = this.data.submitBaseValues.baseInfo[3].index>3 ? true : false;    //是低压
    const isDNR = this.data.submitBaseValues.baseInfo[5].index===0 ? true : false;    //是配网改造
    const taskType = isLowValtage && isDNR ? 0 : (isLowValtage ? 1 : 2);    //任务类型
    
    Form.onSubmit({
      submitBaseValues: submitBaseValues,
      submitEquipmentValues: submitEquipmentValues,
      userList: staffList,
      taskType: taskType
    }, service.submitApplyForm);
  },
  _formatStaffList (values) {
    let staffList = ['123456786575'];
    for(let item of values) {
      if(item.staff.value) staffList.push(item.staff.value);
    }
    return staffList;
  },
  _formatBaseValues (values) {
    let obj = ApplyFormModel.createApplyFormModel();
    for(let item of values.baseInfo) {
      if(item.name=='isDNR') continue;
      obj[item.name] = item.value;
    }
    for(let item of values.usePower) obj[item.name] = item.value;
    for(let item of values.applyCapa) obj[item.name] = item.value;
    // for(let item of values.images) obj[item.name] = item.value;
    for(let item of values.note) obj[item.name] = item.value;
    return obj;
  },
  _formatEquipmentValues (values) {
    let array = [];
    for(let item of values.value) {
      let tmp = DeviceModel.createDeviceModel();
      for(let i in item) {
        tmp[item[i].name] = item[i].value
      }
      array.push(tmp);
    }
    return array;
  }

});