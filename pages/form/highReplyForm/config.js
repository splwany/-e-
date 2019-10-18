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
      value: ''
    },
    {
      type: 'input',
      name: 'accountName',
      title: '户名',
      value: ''
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
      value: ''
    },
    {
      type: 'time-picker',
      name: 'replyDate',
      title: '答复日期',
      value: ''
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
  connectionInfo:[
    {
      type: 'picker',
      name: 'supplyWay',
      title: '供电方式',
      array: ['单电源', '双电源','多电源'],
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
  POC:[//待完善

  ],
  PDP:[//待完善

  ],
  IOLine: [
  ],
  powerScheme: [
    {
      type:'picker',
      name:'poweredPointBuild',
      title:'受电点建设类型',
      array:['双杆式配电变压器台','箱变','变电站','高压计量柜','环网柜'],
      index:-1  
    },
    {
      type:'picker',
      name:'poweredPointProtect',
      title:'受电点保护方案',
      array:['10kV跌落式熔断器','10kV真空断路器','10kV刀闸保护'],
      index:-1
    }

  ],
  metering: [

  ]

};