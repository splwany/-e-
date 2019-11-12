import {curSection, sections, baseFormStructure, powerPlan, changePlan, picking, images, staff} from "./config";
import Form from "../form";
import Toast from "../../../utils/Toast";
import ApplyFormService from "../../../service/ApplyFormService";
import DntGoodsApplyFormService from "../../../service/DntGoodsApplyFormService";
import VApplyFormModel from "../../../model/VApplyFormModel";
import PowerPlanModel from "../../../model/PowerPlanModel";
import ChangePlanModel from "../../../model/ChangePlanModel";
import PickModel from "../../../model/PickModel";
import TaskModel from "../../../model/TaskModel";
import DntGoodsApplyFormModel from "../../../model/DntGoodsApplyFormModel";

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
    submitPickingValues: [],    //物料申请单
    images: images,    //表单照片
    staffList: staff,    //创建任务数据
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
      staffAccount: query.staffAccount
    });
    Form.formPageInit(this);
    this._getValuesFromWeb(query.applyNo);    //发送applyNo获取申请单内容并给页面赋值
  },
  _getValuesFromWeb: async function (applyNo) {
    const existFlag = await TaskModel.existCurFinishedTaskModel(applyNo, 3)
      //判断数据库是否已存在记录
      .then(result =>{
        console.log('获取配网改造当前任务是否为修改提交判断位成功')
        const existFlag = JSON.parse(JSON.stringify(result.data));
        return existFlag;
      })
      .catch(err =>{
        console.log('获取配网改造当前任务是否为修改提交判断位失败')
        // return false;
        return true;
      });
    
    this.setData({
      isUpdate: existFlag
    });
    
    ApplyFormService.getApplyForm(applyNo)
      //获取的申请单内容
      .then(applyFormValues => {
        return Promise.resolve(applyFormValues.apply);
      })
      .catch(err=>{
        console.log('获取申请单基础信息失败');
        return Promise.reject(err);
      })
      .then(applyFormBaseInfo => {
        if(existFlag) {    //如果存在已有记录，则更改此表单
          DntGoodsApplyFormService.getDntApplyFormByApplyNo(applyNo)
            .then(formValues => {
              Object.assign(formValues.baseInfo, applyFormBaseInfo);    //申请表基础内容合并进来
              this._fillOutExistForm(formValues);
            })
            .catch(err => {
              Toast.failToast('网络异常');
            });
        } else {    //如果是第一次填写表单
          this._fillOutApplyForm(applyFormBaseInfo);
        }
      })
      .catch(err => {
        Toast.failToast('网络异常');
      });
  },
  _fillOutExistForm (formValues) {    //将上次提交的内容填入submitBaseValues
    let tmp = null;

    //填入基本信息
    tmp = this.data.submitBaseValues;
    for(let item of tmp.baseInfo) item.value = formValues.baseInfo[item.name];
    this.setData({
      submitBaseValues: tmp
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
  _fillOutApplyForm (values) {    //将申请单基础内容填入submitBaseValues
    const tmp = this.data.submitBaseValues;
    for(let section in tmp) {
      for(let item of tmp[section]) {
        let value = values[item.name];
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
   * 点击挑选物料按钮
   */
  navigateToSelect () {
    dd.navigateTo({
      url: `../materialSelection/materialSelection`
    })
  },

  /**
   * 点击提交按钮触发
   */
  onSubmit () {    
    Form.confirmToSubmit().then(res => {
      const submitBaseValues = this._formatBaseValues(this.data.submitBaseValues.baseInfo);
      const submitPowerPlan = this._formatPowerPlan(this.data.submitPowerPlan);
      const submitChangePlan = this._formatChangePlan(this.data.submitChangePlan);
      const submitPickingValues = this._formatPickingValues(this.data.submitPickingValues);
      const imagesList = this._formatImages(this.data.images);
      const staffList = this._formatStaffList(this.data.staffList);
      const taskId = this.data.taskId;
      const taskType = this.data.taskType;

      const submitObj = DntGoodsApplyFormModel.createDntGoodsApplyFormModel();
      const tmp = {
        baseInfo: submitBaseValues,
        powerPlan: submitPowerPlan,
        changePlan: submitChangePlan,
        goodsSelectList: this.data.goodsList,
        pickList: submitPickingValues,
        imagesList: imagesList
      };
      Object.assign(submitObj, tmp);
      
      const formValues = {
        taskType: taskType,
        taskId: taskId,
        userList: staffList,
        isUpdate: this.data.isUpdate,
        submitForm: submitObj
      };

      Form.submit(formValues, DntGoodsApplyFormService.submitDntGoodsApplyForm);    //表单提交
    });
  },
  _formatBaseValues (values) {
    const obj = VApplyFormModel.createVApplyFromModel();
    const tmp = {applyNo: this.data.applyNo};
    for(let {name, value} of values) tmp[name] = value;
    Object.assign(obj, tmp);
    return obj;
  },
  _formatPowerPlan (values) {
    const obj = PowerPlanModel.createPowerPlanModel();
    const tmp = {applyNo: this.data.applyNo};
    for(let {name, value} of values) tmp[name] = value ? value : null;
    const powerPlanPath = this.data.powerPlanPath;
    Object.assign(tmp, {
      vpowerplanVoltage: powerPlanPath.station,
      vpowerplanLine1: powerPlanPath.powerline,
      vpowerplanExtra: powerPlanPath.extra,
      vpowerplanArea: powerPlanPath.area,
      vpowerplanLine2: powerPlanPath.lowPowerline
    });
    Object.assign(obj, tmp);
    return obj;
  },
  _formatChangePlan ({now:_now, remove:_remove, new:_new}) {
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

    const vchangNow = makeStr(_now);
    const vchangRemove = makeStr(_remove);
    const vchangNew = makeStr(_new);
    const vchangPrice = makePrice(_new);

    const obj = ChangePlanModel.createChangePlanModel();
    const tmp = {
      applyNo: this.data.applyNo,
      vchangNow,
      vchangRemove,
      vchangNew,
      vchangPrice
    };
    Object.assign(obj, tmp);
    return obj;
  },
  _formatPickingValues (values) {
    let pickingList = [];
    for(let card of values) {
      const obj = PickModel.createPickModel();
      const tmp = {applyNo: this.data.applyNo};
      for(let {name, value} of card) tmp[name] = value;
      Object.assign(obj, tmp);
      pickingList.push(obj);
    }
    return pickingList;
  },
  _formatImages (values) {
    let imagesList = [];
    for(let {name:picType, value:picUrl} of values) {
      const tmp = {
        applyNo: this.data.applyNo,
        picType,
        picUrl
      };
      imagesList.push(tmp);
    }
    return imagesList;
  },
  _formatStaffList (values) {
    let staffList = [app.globalData.myStaffAccount];
    for(let {staff:{value:staffAcount}} of values.value)
      if(staffAcount) staffList.push(staffAcount);
    return staffList;
  }
});