import {curSection, sections, baseFormStructure, equipmentStructure} from "./config";
import Form from "../form";


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
    originBaseValues: baseFormStructure,   //页面基础数据初始值，给重置功能使用
    originEquipmentValues: equipmentStructure,    //设备数据初始值，给重置功能用
    submitBaseValues: baseFormStructure,    //页面填写的基础数据
    submitEquipmentValues: equipmentStructure    //填写的设备数据
  },

  /**
   * 页面加载完成，当从缓存打开时，导入缓存信息
   */
  onLoad(query) {
    Form.formPageInit(this);
    if (query.formNo) {
      //从服务器读取表单数据
      console.log(`表单编号为：${query.formNo}`);
    }
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
   * 从组件更新页面数据
   */
  updateData (bind, value) {
    this.setData({
      [`${bind}`]: value
    });
  },

  /**
   * 点击提交按钮触发
   */
  onSubmit () {
    Form.onSubmit(this, [submitBaseValues, submitEquipmentValues]);
  },

  /**
   * 点击重置按钮触发
   */
  onReset () {
    Form.onReset(this);    
  }

});