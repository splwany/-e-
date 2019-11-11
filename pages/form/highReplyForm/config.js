export const sections = {   //section列表信息
  baseInfo: {
    name: '基本信息',
    state: false
  },
  powerCapa: {
    name: '供电容量',
    state: false
  },
  connectionInfo: {
    name: '接入信息',
    state: false
  },
  POC: {
    name: '接电点',
    state: false
  },
  PDP: {
    name: '分界点',
    state: false
  },
  IOLine: {
    name: '进出线路',
    state: false
  },
  powerScheme: {
    name: '受电方案',
    state: false
  },
  metering: {
    name: '计量计费',
    state: false
  }
};

export const curSection = 'baseInfo';

export const formStructure = {   //每个section的表单信息集合
  baseInfo: [   //基本信息
    {
      type: 'input',
      name: 'applyNo',
      title: '申请编号',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'custumNo',
      title: '客户编号',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'address',
      title: '用电地址',
      value: ''
    },
    {
      type: 'picker',
      name: 'regCate',
      title: '业务类型',
      array: ['高压新装', '高压增容', '高压装表临时用电', '小区新装'],
      index: -1
    },
    {
      type: 'input',
      name: 'usePerson',
      title: '用电方联系人',
      value: ''
    },
    {
      type: 'input',
      name: 'useTel',
      title: '用电方联系电话',
      value: ''
    },
    {
      type: 'input',
      name: 'givePerson',
      title: '供电方联系人',
      value: ''
    },
    {
      type: 'input',
      name: 'giveTel',
      title: '供电方联系电话',
      value: ''
    },
    {
      type: 'time-picker',
      name: 'applyDate',
      title: '申请日期',
      disabled: true
    }
  ],
  powerCapa: [
    {
      type: 'input-unit',
      name: 'newInstall',
      title: '新装',
      value: '',
      placeholder: '0',
      unit: 'kVA'
    },
    {
      type: 'input-unit',
      name: 'total',
      title: '合计',
      value: '',
      placeholder: '0',
      unit: 'kVA'
    }
  ],
  connectionInfo: [
    {
      type: 'picker',
      name: 'supplyWay',
      title: '供电方式',
      array: ['单电源', '双电源', '多电源'],
      index: -1
    },
    {
      type: 'picker',
      name: 'powerType',
      title: '电源性质',
      array: ['主供', '备用'],
      index: -1
    },
  ],
  powerScheme: [
    {
      name: 'poweredPointBuild',
      title: '受电点建设类型',
      array: [
        {value: '双杆式配电变压器台'}, 
        {value: '箱变'}, 
        {value: '变电站'}, 
        {value: '高压计量柜'}, 
        {value: '环网柜'}
      ]
    },
    {
      name: 'poweredPointProtect',
      title: '受电点保护方式',
      array: [
        {value: '10kV跌落式熔断器'}, 
        {value: '10kV真空断路器'}, 
        {value: '10kV刀闸保护'}
      ]
    }

  ],
  metering: [
    {
      type: 'picker',
      name: 'measurementPlace',
      title:'高压计量装置位置',
      array:['计量柜（箱）','环网柜','箱变'],
      index:-1
    },
    {
      type: 'picker',
      name: 'connectWay',
      title:'接线方式',
      array:['三相四线制','三相三线制'],
      index:-1
    },
    {
      type: 'picker',
      name: 'measrementVoltage',
      title:'计量点电压',
      array:['0.4kV','10kV'],
      index:-1
    },
    {
      type: 'picker',
      name: 'currentTransformer',
      title:'电流互感器变比',
      array:['无','10/5','20/5','25/5','30/5','35/5','40/5','50/5','100/5','500/5','1000/5'],
      index: 0,
      value: '无',
      disabled: false
    },
    {
      type: 'input',
      name: 'accuracyLevel',
      title: '准确度等级',
      value: '0.5S'
    },
    {
      type: 'picker',
      name: 'priceType',
      title:'电价类别',
      array:['居民生活用电','工商及其他','农业生产','农业排灌'],
      index:-1
    },
    {
      type: 'switch',
      name: 'peakValleyPrice',
      title: '峰谷分时电价',
      value: false
    },
    {
      type: 'switch',
      name: 'interestRates',
      title:'利率电费',
      value: false
    },
    {
      type: 'switch',
      name: 'basicRates',
      title:'基本电费',
      value: true
    },
    {
      type: 'picker',
      name: 'powerFactor',
      title:'功率因数考核标准',
      array:['0.90','0.85','0.80'],
      index:-1
    },
    {
      type: 'picker',
      name: 'lossAllocation',
      title:'损耗分摊办法',
      array:['高供低计计算变损，计算线损','高供高计不计算变损，计算线损'],
      index:-1
    }
  ]
};