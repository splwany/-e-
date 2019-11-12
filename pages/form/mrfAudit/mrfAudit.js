import {curSection, sections, baseFormStructure, powerPlan, changePlan, goods, picking, images, staff} from "./config";
import Form from "../form";
import Toast from "../../../utils/Toast";
import ApplyFormService from "../../../service/ApplyFormService";
import DntGoodsApplyFormService from "../../../service/DntGoodsApplyFormService";

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
    submitPowerPlan: powerPlan,    //供电方案
    submitChangePlan: changePlan,    //改造方案
    goodsList: [],    //物资数据
    submitPickingValues: [],    //物料申请单
    images: images,    //表单照片
    staffList: staff    //创建任务数据
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
    this._getValuesFromWeb(query.applyNo);    //发送applyNo获取申请单内容并给页面赋值
  },
  _getValuesFromWeb (applyNo) {
    let applyFormBaseInfo = {};
    
    ApplyFormService.getApplyForm(applyNo)
      //获取申请表基础内容
      .then(applyFormValues => {
        applyFormBaseInfo = applyFormValues.baseInfo;
        return DntGoodsApplyFormService.getDntApplyFormByApplyNo(applyNo);
      })
      .catch(err => {
        return Promise.reject(err);
      })
      //获取物资领料申请单内容
      .then(formValues => {
        Object.assign(formValues.baseInfo, applyFormBaseInfo);    //申请表基础内容合并进来
        this._fillOutForm(formValues);
      })
      .catch(err => {
        Toast.failToast('网络异常');
      });
  },
  _fillOutForm (formValues) {
    let tmp = null;

    //填入基本信息
    tmp = this.data.submitBaseValues;
    for(let item of tmp.baseInfo) item.value = formValues.baseInfo[item.name];
    this.setData({
      submitBaseValues: tmp
    });

    //填入供电方案
    tmp = this.data.submitPowerPlan;
    for(let item of tmp) item.value = formValues.powerPlan[item.name];
    this.setData({
      submitPowerPlan: tmp
    });

    //填入改造方案
    tmp = this.data.submitChangePlan;
    for(let item of tmp) item.value = formValues.changePlan[item.name];
    this.setData({
      submitChangePlan: tmp
    });

    //填入物料清单
    let goodsList = [];
    for(let good of formValues.goodsSelectList) {
      tmp = JSON.parse(JSON.stringify(goods));
      for(let item of tmp) item.value = good[item.name];
      goodsList.push({value: tmp});
    }
    this.setData({
      goodsList: goodsList
    });

    //填入领料清单
    let pickingList = [];
    for(let good of formValues.pickList) {
      tmp = JSON.parse(JSON.stringify(picking));
      for(let item of tmp) item.value = good[item.name];
      pickingList.push(tmp);
    }
    this.setData({
      submitPickingValues: pickingList
    });

    //填入照片
    tmp = this.data.images;
    for(let image of tmp) image.value = formValues.imagesList[image.name];
    this.setData({
      images: tmp
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
    this.setData({
      isPassed: e.target.dataset.passed
    });
    Form.changeSection(this, e);
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
  _formatStaffList (values) {
    let staffList = [app.globalData.myStaffAccount];
    for(let staff of values.value) {
      if(staff.staff.value) staffList.push(staff.staff.value);
    }
    return staffList;
  }
});