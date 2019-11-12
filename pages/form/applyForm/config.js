export const sections = {   //section列表信息
  baseInfo: {
    name: '基本信息'
  },
  usePower: {
    name: '用电信息'
  },
  applyCapa: {
    name: '申请容量'
  },
  equipment: {
    name: '用电设备'
  },
  images: {
    name: '相关照片'
  },
  note: {
    name: '备注'
  },
  task: {
    name: '创建任务'
  }
};

export const curSection = 'baseInfo';    //指定初始section

export const baseFormStructure = {   //每个section的表单信息集合
  baseInfo: [   //基本信息
    {
      type: 'input',
      name: 'clientName',
      title: '客户名称',
      value: ''
    },
    {
      type: 'input',
      name: 'clientNo',
      title: '客户编号',
      value: ''
    },
    {
      type: 'picker',
      name: 'applyReg',
      title: '登记类别',
      array: ['高压新装', '高压增容', '高压装表临时用电', '小区新装', '低压居民新装', '低压非居民新装', '低压装表临时用电'],          
      index: -1,
    },
    {
      type: 'picker',
      name: 'isOpenZone',
      title: '是否在园区',
      array: ['是', '否'],
      index: -1
    },
    {
      type: 'picker',
      name: 'isDNR',
      title: '是否配网改造',
      array: ['是', '否'],
      index: -1
    },
    {
      type: 'input',
      name: 'applyLinkman',
      title: '联系人',
      value: ''
    },
    {
      type: 'input',
      name: 'applyLinkphone',
      title: '联系电话',
      value: ''
    }
  ],
  usePower: [   //用电信息
    {
      type: 'input',
      name: 'applyUseaddr',
      title: '用电地址',
      value: ''
    },
    {
      type: 'picker',
      name: 'applyPowenum',
      title: '电源数量',
      array: ['单电源', '双电源', '多电源'],
      index: -1
    },
    {
      type: 'picker',
      name: 'applyVoltlevel',
      title: '电压等级',
      array: ['10kV', '0.4kV', '220V'],
      index: -1
    }
  ],
  applyCapa: [   //申请容量
    {
      type: 'input-unit',
      name: 'applyNewvolumn',
      title: '新装',
      value: '0',
      placeholder: '0',
      unit: 'kVA'
    },
    {
      type: 'input-unit',
      name: 'applyAddvolumn',
      title: '增容',
      value: '0',
      placeholder: '0',
      unit: 'kVA'
    },
    {
      type: 'input-unit',
      name: 'applyOrignvolumn',
      title: '原有',
      value: '0',
      placeholder: '0',
      unit: 'kVA'
    },
    {
      type: 'input-unit',
      name: 'applySumvolumn',
      title: '合计',
      value: '0',
      placeholder: '0',
      unit: 'kVA'
    }
  ],
  note: [   //备注
    {
      type: 'note-area',
      name: 'applyNote',
      value: '',
      placeholder: '输入备注',
      maxlength: 140
    }
  ]
};

export const equipmentStructure = {   //用电设备
  name: 'equipment',
  data: [
    {
      type: 'picker',
      name: 'devicedetialName',
      title: '设备名称',
      array: ['变压器', '高压电机'],
      index: -1
    },
    {
      type: 'picker',
      name: 'devicedetialVolumn',
      title: '单台容量',
      array: [10, 20, 30, 50, 80, 100, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300, 8000, 10000],              
      index: -1
    },
    {
      type: 'input-unit',
      name: 'devicedetialQuantity',
      title: '数量',
      value: 1,
      unit: '台'
    }
  ],
  value: []
};

export const images = [    //表单图片
  {
    type: 'add-image',
    name: '01',    //数据库中对应的图片类型
    title: '勘察照片',
    max: 5,   //最大允许选择的图片数
    value: []   //图片临时url列表
  },
  {
    type: 'add-image',
    name: '02',
    title: '用电申请单照片',
    max: 2,
    value: []
  }
];

export const staff = {    //创建任务
  max: 1,    //最多选3人
  value: []    //用于存放选择的员工账号
};