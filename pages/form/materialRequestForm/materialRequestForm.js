import {curSection, sections, baseFormStructure, powerPlan, changePlan, images} from "./config";
import Form from "../form";
import ApplyFormService from "../../../service/ApplyFormService";
import VApplyFormModel from "../../../model/VApplyFormModel";
import PowerPlanModel from "../../../model/PowerPlanModel";
import ChangePlanModel from "../../../model/ChangePlanModel";
import PickModel from "../../../model/PickModel";
import ImageModel from "../../../model/ImageModel";

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
    submitPowerPlan: powerPlan,    //供电方案
    submitChangePlan: changePlan,    //改造方案
    submitPickingValues: [],    //物料申请单
    images: images,    //表单照片
    staffList: [],
    materialSelected: false,    //物料选择是否完毕
  },
  
  /**
   * 页面加载完成，当从缓存打开时，导入缓存信息
   */
  onLoad(query) {
    this.setData({
      applyNo: query.applyNo,
      taskType: query.taskType,
      taskId: query.taskId,
      curStaff: query.staffAccount
    });
    Form.formPageInit(this);
    this._getValuesFromWeb(query.applyNo);    //发送applyNo获取申请单内容并给页面赋值
  },
  _getValuesFromWeb: async function (applyNo) {
    const applyFormValues = await ApplyFormService.getApplyForm(applyNo).then(res => {    //获取的申请单内容
      return res;
    }).catch(err=>{
      console.log(err);
    });
    const baseValues = applyFormValues.apply;
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
   * 点击图片添加按钮时触发
   */
  addImage (e) {
    Form.addImage(this, e);
  },

  /**
   * 供电方案改变时触发
   */
  onPowerPlanChange (e) {
    const value = e.detail.value;
    this.setData({
      submitPowerPlan: value
    });
  },

  /**
   * 点击挑选物料按钮
   */
  navigateToSelect () {
    dd.navigateTo({
      url: '../materialSelection/materialSelection'
    })
  },

  /**
   * 点击提交按钮触发
   */
  onSubmit () {
    const applyNo = this.data.applyNo;
    const taskType = this.data.taskType;    //任务类型
    const taskId = this.data.taskId;    //任务编号
    const submitBaseValues = this._formatBaseValues(this.data.submitBaseValues.baseInfo);
    const submitPowerPlan = this._formatPowerPlan(this.data.submitPowerPlan);
    const submitChangePlan = this._formatChangePlan(this.data.submitChangePlan);
    const submitPickingValues = this._formatPickingValues(this.data.submitPickingValues);
    const imagesList = this._formatImages(this.data.images);
    const staffList = this._formatStaffList(this.data.staffList);
    
    const obj = {
      applyNo: applyNo,
      taskType: taskType,
      taskId: taskId,
      submitBaseValues: submitBaseValues,
      submitPowerPlan: submitPowerPlan,
      submitChangePlan: submitChangePlan,
      submitPickingValues: submitPickingValues,
      imagesList: imagesList,
      userList: staffList
    };
    console.log(obj);
    
    // Form.onSubmit(submitValues, GoodsService.onSubmit);
  },
  _formatBaseValues (values) {
    const obj = VApplyFormModel.createVApplyFromModel();
    const tmp = {};
    for(let item of values) tmp[item.name] = item.value;
    Object.assign(obj, tmp);
    return obj;
  },
  _formatPowerPlan (values) {
    const obj = PowerPlanModel.createPowerPlanModel();
    const tmp = {};
    for(let item of values) tmp[item.name] = item.value;
    Object.assign(obj, tmp);
    return obj;
  },
  _formatChangePlan (values) {
    function makeStr (_value) {
      let str = '';
      for(let item of _value) {
        const goodsClass = item[0].value;
        const goodsType = item[1].value;
        const count = item[2].value;
        const tmp = `${goodsType} ${goodsClass} ${count};`;
        str += tmp;
      }
      return str;
    }
    function makePrice (_value) {
      let totalPrice = 0;
      for(let item of _value) {
        const price = item[1].array[item[1].index].goodsPrice;
        const count = item[2].value;
        totalPrice += price * count;
      }
      return totalPrice;
    }

    const now_str = makeStr(values.now);
    const remove_str = makeStr(values.remove);
    const new_str = makeStr(values.new);
    const price = makePrice(values.new);

    const obj = ChangePlanModel.createChangePlanModel();
    const tmp = {
      vchangNow: now_str,
      vchangRemove: remove_str,
      vchangNew: new_str,
      vchangPrice: price
    };
    Object.assign(obj, tmp);
    return obj;
  },
  _formatPickingValues (values) {
    const pickingList = [];
    for(let card of values) {
      const obj = PickModel.createPickModel();
      const tmp = {};
      for(let item of card) tmp[item.name] = item.value;
      Object.assign(obj, tmp);
      pickingList.push(obj);
    }
    return pickingList;
  },
  _formatStaffList (values) {
    const staffList = [this.data.curStaff];
    for(let item of values) {
      const staffAccount = item.staff.value;
      staffList.push(staffAccount);
    }
    return staffList;
  },
  _formatImages (values) {
    const imagesList = [];
    for(let imageType of values) {
      const obj = ImageModel.createImageModel();
      const tmp = {
        picType: imageType.name,
        picUrl: imageType.value
      };
      Object.assign(obj, tmp);
      imagesList.push(obj);
    }
    return imagesList;
  }
});