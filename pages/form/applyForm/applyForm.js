import {curSection, sections, baseFormStructure, equipmentStructure, images, staff} from "./config";
import Form from "../form";
import ApplyFormService from "../../../service/ApplyFormService";
import ApplyFormModel from "../../../model/ApplyFormModel";
import DeviceModel from "../../../model/DeviceModel";


const app = getApp();


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
    submitBaseValues: baseFormStructure,    //页面填写的基础数据
    submitEquipmentValues: equipmentStructure,    //填写的设备数据
    images: images,    //图片数据
    staffList: staff    //任务创建数据
  },

  /**
   * 页面加载完成
   */
  onLoad() {
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
   * 选项框选择改变时触发
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
   * 点击提交按钮触发
   */
  onSubmit () {

    Form.confirmToSubmit().then(() => {

      const submitBaseValues = this._formatBaseValues(this.data.submitBaseValues);
      const submitEquipmentValues = this._formatEquipmentValues(this.data.submitEquipmentValues);
      const imagesList = this._formatImagesList(this.data.images);
      const staffList = this._formatStaffList(this.data.staffList);
      
      const isLowValtage = this.data.submitBaseValues.baseInfo[2].index>3 ? true : false;    //是低压
      const isDNR = this.data.submitBaseValues.baseInfo[4].index===0 ? true : false;    //是配网改造
      const taskType = isLowValtage && isDNR ? 0 : (isLowValtage ? 1 : 2);    //任务类型
      
      const formValues = {
        submitBaseValues: submitBaseValues,
        submitEquipmentValues: submitEquipmentValues,
        imagesList: imagesList,
        userList: staffList,
        taskType: taskType
      };

      Form.submit(formValues, ApplyFormService.submitApplyForm);    //表单提交
      
    });

  },
  _formatStaffList (values) {
    let staffList = [app.globalData.myStaffAccount];
    for(let {staff:{value:staffAccount}} of values.value)
      if(staffAccount) staffList.push(staffAccount);
    return staffList;
  },
  _formatBaseValues (values) {
    let obj = ApplyFormModel.createApplyFormModel();
    for(let key of Object.keys(values))
      for(let {name, value} of values[key])
        obj[name] = value;
    return obj;
  },
  _formatEquipmentValues (values) {
    let array = [];
    for(let item of values.value) {
      let tmp = DeviceModel.createDeviceModel();
      for(let i in item) tmp[item[i].name] = item[i].value;
      array.push(tmp);
    }
    return array;
  },
  _formatImagesList (values) {
    let imagesList = [];
    for(let {name:picType, value:picUrl} of values)
      imagesList.push({picType, picUrl});
    return imagesList;
  }

});