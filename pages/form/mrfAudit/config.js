export const curSection = 'baseInfo';

export const sections = {   //section列表信息
  baseInfo: {
    name: '基本信息'
  },
  powerPlan: {
    name: '供电方案'
  },
  changePlan: {
    name: '改造方案'
  },
  materials: {
    name: '物料清单'
  },
  materialsApply: {
    name: '领料清单'
  },
  images: {
    name: '表单照片'
  },
  task: {
    name: '创建任务'
  }
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
      name: 'applyReg',
      title: '用电类别',
      value: '',
      disabled: true
    },
    {
      type: 'input-unit',
      name: 'applySumvolumn',
      title: '用电容量',
      value: '',
      placeholder: '0',
      unit: 'kVA',
      disabled: true
    },
    {
      type: 'input',
      name: 'applyLinkman',
      title: '客户联系人',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'applyLinkphone',
      title: '客户联系电话',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'vapplyAdd',
      title: '施工地点',
      value: ''      ,
      disabled: true   
    },
    {
      type: 'input',
      name: 'vapplyProname',
      title: '工程名称',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'vapplyHuman',
      title: '方案员',
      value: '',
      disabled: true
    }
  ]
};

export const powerPlan = [    //供电方案
  {
    type: 'input',
    name: 'vpowerplanVoltage',
    title: '66千伏变电站',
    value: '',
    disabled: true
  },
  {
    type: 'input',
    name: 'vpowerplanLine1',
    title: '10千伏线路',
    value: '',
    disabled: true
  },
  {
    type: 'input',
    name: 'vpowerplanExtra',
    title: '其他',
    value: '',
    disabled: true
  },
  {
    type: 'input',
    name: 'vpowerplanArea',
    title: '台区',
    value: '',
    disabled: true
  },
  {
    type: 'input',
    name: 'vpowerplanLine2',
    title: '0.4千伏线路',
    value: '',
    disabled: true
  },
  {
    type: 'input-unit',
    name: 'vpowerplanOverhead',
    title: '架空',
    value: '',
    unit: '米',
    disabled: true
  },
  {
    type: 'input-unit',
    name: 'vpowerplanCable',
    title: '电缆',
    value: '',
    unit: '米',
    disabled: true
  },
  {
    type: 'input-unit',
    name: 'vpowerplanFrontwire',
    title: '表前导线',
    value: '',
    unit: '米',
    disabled: true
  },
  {
    type: 'input-unit',
    name: 'vpowerplanFrontcable',
    title: '表前电缆',
    value: '',
    unit: '米',
    disabled: true
  }
];

export const changePlan = [    //改造方案
  {
    type: 'note-area',
    name: 'vchangNow',
    title: '现状规模',
    value: '',
    disabled: true
  },
  {
    type: 'note-area',
    name: 'vchangRemove',
    title: '拆除规模',
    value: '',
    disabled: true
  },
  {
    type: 'note-area',
    name: 'vchangNew',
    title: '新建规模',
    value: '',
    disabled: true
  }
];

export const goods = [    //物资清单
  {
    type: 'input',
    name: 'goodsClass',
    title: '物资类别',
    value: '',
    disabled: true
  },
  {
    type: 'input',
    name: 'goodsName',
    title: '物资型号',
    value: '',
    disabled: true
  },
  {
    type: 'input',
    name: 'goodsQty',
    title: '物资数量',
    value: '',
    disabled: true
  },
  {
    type: 'input-unit',
    name: 'goodsPrice',
    title: '预算金额',
    value: '',
    unit: '万元',
    disabled: true
  }
];

export const picking = [    //领料清单
  {
    type: 'input',
    name: 'pickingOrder',
    title: '采购订单号',
    value: '',
    disabled: true
  },
  {
    type: 'input',
    name: 'pickingNum',
    title: '物料编号',
    value: '',
    disabled: true
  },
  {
    type: 'input',
    name: 'pickingDescribe',
    title: '物料描述',
    value: '',
    disabled: true
  },
  {
    type: 'input',
    name: 'pickingUnit',
    title: '单位',
    value: '',
    disabled: true
  },
  {
    type: 'input',
    name: 'pickingQuantity',
    title: '数量',
    value: '',
    disabled: true
  },
  {
    type: 'input',
    name: 'pickingAddr',
    title: '库存地点',
    value: '',
    disabled: true
  }
];

export const images = [    //申请表照片
  {
    type: 'add-image',
    name: '03',
    title: '表单照片',
    value: [],   //图片文件列表
    disabled: true
  }
];

export const staff = {    //创建任务
  max: 3,    //最多选3人
  value: []    //用于存放选择的员工账号
};