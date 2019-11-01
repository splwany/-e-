import {curSection, sections, baseFormStructure, materialStructure, imageStructure} from "./config";
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
    submitBaseValues: baseFormStructure,    //页面填写的基础数据
    submitMaterialValues: materialStructure,    //填写的物资领料单
    submitImageValues: imageStructure,    //申请表照片
  },
  
  /**
   * 页面加载完成，当从缓存打开时，导入缓存信息
   */
  onLoad(query) {
  
    Form.formPageInit(this);

    this._getValuesFromWeb(this.data.applyNo);    //发送applyNo获取申请单内容并给页面赋值
  },
  _getValuesFromWeb (applyNo) { //我这里是随便写的 讨论了之后再改
    // const materialRequestFormValues = service.getMaterialRequestForm(applyNo);    //获取的物资领料申请表内容
    const materialRequestFormValues = {
      baseValues: {
        applyNo: '201910220003',
        clientName: '张三',
        applyUseaddr: ' 经济开发区兴城路1号',
        applyReg: '低压非居民新装',
        applyCapacity: '10',
        applyLinkman: '李四',
        applyLinkphone: '13800138000',
        vApplyHuman: '王二',
      },
      powerSupplyValues: {
        vPowerPlanVoltage: '66kVA变电站',
        vPowerPlanLine: '10kVA线',
        vPowerPlanSection: 'xx分歧',
        vPowerPlanBranch: '',
        vPowerPlanArea: 'yy配电台区',
        vPowerPlanRod: 'B5号杆',
      },
      transformationValues: {
        vChangNow: '原有型号 S9-100 kVA配电变压器一台，原有10千伏 JKLYJ-35 型号线路 x 千米，0.4千伏 xxx 型号线路 y 千米。',
        vChangRemove: '需拆除变压器 66 kVA一台',
        vChangNew: '新建型号_配电变压器_台；新建（改造）10千伏架空线路 x 千米，其中：导线采用 xxx 型 y 千米，导线采用 xxx 型 z 千米；新建（改造）0.4千伏架空线路 k 千米，其中：导线采用 xxx 型 m 千米，导线采用 xxx 型 n 千米，组立 xxx 型水泥杆 l 基，xxx 型水泥杆 h 基。',
        vChangPrice: '66 万元',
      },
      materialValues: [
        {
          pickingOrder: '1000000',
          pickingNum: '100',
          pickingDescribe: '变压器',
          pickingUnit: '台',
          pickingQuantity: '1',
          pickingAddr: '张三家',
        },
        {
          pickingOrder: '1000001',
          pickingNum: '101',
          pickingDescribe: '电缆',
          pickingUnit: '根',
          pickingQuantity: '2',
          pickingAddr: '李四家',
        }
      ],
      imageValues: [
        {
          picType: 'xxx1Image',    //照片类型（还没讨论呀）
          picUrl: ''    //照片url地址
        },
        {
          picType: 'xxx2Image',
          picUrl: ''
        }
      ]
    };

    const baseValues = materialRequestFormValues.baseValues;
    const powerSupplyValues = materialRequestFormValues.powerSupplyValues;
    const transformationValues = materialRequestFormValues.transformationValues;
    const materialValues = materialRequestFormValues.materialValues;
    const imageValues = materialRequestFormValues.imageValues;
    //填入submitBaseValues
    for(let section in this.data.submitBaseValues) {
      for(let item of this.data.submitBaseValues[section]) {
        item.value = baseValues[item.name];
      }
    }
    //填入submitMaterialValues
    for(let item of materialValues) {
      const material = JSON.parse(JSON.stringify(this.data.submitMaterialValues.data));
      material[0].value = item.purchaseOrderNo;
      material[1].value = item.materialNo;
      material[2].value = item.materialUnit;
      material[3].value = item.materialNum;
      material[4].value = item.warehouseLocal;
      this.$spliceData({
        'submitMaterialValues.value': [this.data.submitMaterialValues.value.length, 0, material]
      });
    }
    //填入submitImageValues
    for(let img of imageValues) {
      for(let index in this.data.submitImageValues) {
        const item = this.data.submitImageValues[index];
        const length = item.value.length;
        if(item.imageType === img.picType) {
          this.$spliceData({
            [`submitImageValues[${index}].value`]: [length, 0, img.picUrl]
          });
          break;
        }
      }
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
   * 点击提交按钮触发
   */
  onSubmit () {
    Form.onSubmit(this, [submitBaseValues, submitTenkVAValues, submitZPFourkVAValues, submitRobsValues, submitMaterialValues]);
  },
});