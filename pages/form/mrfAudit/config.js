export const curSection = 'baseInfo';

export const sections = {   //section列表信息
  baseInfo: {
    name: '基本信息',
    state: false
  },
  powerSupplyPlan: {
    name: '供电方案',
    state: false
  },
  transformationPlan: {
    name: '改造方案',
    state: false
  },
  materialsCol: {
    name: '物资领料申请',
    state: false
  },
  images: {
    name: '申请表照片',
    state: false
  },
  audit: {
    name: '审核',
    state: false
  },
};

export const baseFormStructure = {   //每个section的表单信息集合
  baseInfo: [   //基本信息
    {
      type: 'input',
      name: 'clientName',
      title: '客户名称',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'applyUseaddr',
      title: '用电地址',
      value: '',
      disabled: true          
    },
    {
      type: 'picker',
      name: 'applyReg',
      title: '用电类别',
      array: ['低压非居民新装', '低压装表临时用电','低压居民新装'],
      index: 1,
      disabled: true
    },
    {
      type: 'input-unit',
      name: 'applySumvolumn',
      title: '申请容量',
      value: '',
      placeholder: '0',
      unit: 'kVA',
      disabled: true
    },
    {
      type: 'input',
      name: 'applyLinkman',
      title: '联系人',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'applyLinkphone',
      title: '联系电话',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'vApplyHuman',
      title: '方案员',
      value: '',
      disabled: true
    },
  ],
  powerSupplyPlan: [   //供电方案
    {
      type: 'input',
      name: 'vPowerPlanVoltage',
      title: '变电站',
      value: [],
      disabled: true
    },
    {
      type: 'input',
      name: 'vPowerPlanLine',
      title: '线',
      value: [],
      disabled: true
    },
    {
      type: 'input',
      name: 'vPowerPlanSection',
      title: '分岐',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'vPowerPlanBranch',
      title: '分支',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'vPowerPlanArea',
      title: '台区(支)',
      value: '',
      disabled: true
    },
    {
      type: 'input-unit',
      name: 'vPowerPlanRod',
      title: '杆',
      value: '',
      unit: '号',
      disabled: true
    },
  ],
  transformationPlan: [   //改造方案
    {
      type: 'note-area',
      name: 'vChangNow',
      title: '现状规模',
      value: '',
      maxlength: -1,
      disabled: true,
    },
    {
      type: 'note-area',
      name: 'vChangRemove',
      title: '拆除规模',
      value: '',
      maxlength: -1,
      disabled: true,
    },
    {
      type: 'note-area',
      name: 'vChangNew',
      title: '新建规模',
      value: '',
      maxlength: -1,
      disabled: true,
    },
    {
      type: 'input-unit',
      name: 'vChangPrice',
      title: '概率金额',
      value: '',
      unit: '万元',
      disabled: true,
    },
  ],
  audit: [
    {
      type: 'note-area',
      name: 'failureReason',
      value: '',
      placeholder: '如审核未通过，请输入原因',
      maxlength: 140,
    }
  ]
};

export const materialStructure = {   //物资领料条目
  name: 'material',
  data: [
    {
      type: 'input',
      name: 'pickingOrder',
      title: '采购订单号',
      value: '',
      disabled: true,
    },
    {
      type: 'input',
      name: 'pickingNum',
      title: '物料编号',
      value: '',
      disabled: true,
    },
    {
      type: 'input',
      name: 'pickingDescribe',
      title: '物料描述',
      value: '',
      disabled: true,
    },
    {
      type: 'input',
      name: 'pickingUnit',
      title: '单位',
      value: '',
      disabled: true,
    },
    {
      type: 'input',
      name: 'pickingQuantity',
      title: '数量',
      value: '',
      placeholder: '0',
      disabled: true,
    },
    {
      type: 'input',
      name: 'pickingAddr',
      title: '库存地点',
      value: '',
      disabled: true,
    },
  ],
  value: []
}

export const imageStructure = [   //申请照片
  {
      type: 'add-image',
      name: 'materialRequestFormImage',
      title: '改造物资领料申请单照片',
      max: 2, //最大允许选择的图片数
      value: [],
      disabled: true
    }
];