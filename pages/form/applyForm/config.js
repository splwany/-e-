import util from "/utils/util";


export const curSection = 'baseInfo';

export const sections = {   //section列表信息
  baseInfo: {
    name: '基本信息',
    state: false
  },
  usePower: {
    name: '用电信息',
    state: false
  },
  applyCapa: {
    name: '申请容量',
    state: false
  },
  equipment: {
    name: '用电设备',
    state: false
  },
  images: {
    name: '相关照片',
    state: false
  },
  note: {
    name: '备注',
    state: false
  }
};

export const formStructure = {   //每个section的表单信息集合
  baseInfo: [   //基本信息
    {
      type: 'input',
      name: 'applyNo',
      title: '申请编号',
      value: util.makeApplyNo(),
      disabled: true
    },
    {
      type: 'time-picker',
      name: 'applyDate',
      title: '申请时间',
      value: util.getToday()
    },
    {
      type: 'input',
      name: 'custumNo',
      title: '客户编号',
      value: ''
    },
    {
      type: 'picker',
      name: 'regCate',
      title: '登记类别',
      array: ['高压新装', '高压增容', '高压装表临时用电', '小区新装', '低压居民新装', '低压非居民新装', '低压装表临时用电'],          
      index: -1,
    },
    {
      type: 'picker',
      name: 'isGarden',
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
      name: 'userName',
      title: '户名',
      value: ''
    },
    {
      type: 'input',
      name: 'conPerson',
      title: '联系人',
      value: ''
    },
    {
      type: 'input',
      name: 'conTel',
      title: '联系电话',
      value: ''
    }
  ],
  usePower: [   //用电信息
    {
      type: 'input',
      name: 'userAddr',
      title: '用电地址',
      value: ''
    },
    {
      type: 'picker',
      name: 'powerCount',
      title: '电源数量',
      array: ['单电源', '双电源', '多电源'],
      index: -1
    },
    {
      type: 'picker',
      name: 'volGrage',
      title: '电压等级',
      array: ['10kV', '0.4kV', '220V'],
      index: -1
    }
  ],
  applyCapa: [   //申请容量
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
      name: 'addCapacity',
      title: '增容',
      value: '',
      placeholder: '0',
      unit: 'kVA'
    },
    {
      type: 'input-unit',
      name: 'original',
      title: '原有',
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
  equipment: [   //用电设备
    {
      type: 'elec-equipment',
      name: 'equipment',
      data: [
        {
          type: 'picker',
          name: 'equipmentName',
          title: '设备名称',
          array: ['变压器', '高压电机'],
          index: -1
        },
        {
          type: 'picker',
          name: 'perCapa',
          title: '单台容量',
          array: ['10', '20', '30', '50', '80', '100', '160', '200', '250', '315', '400', '500', '630', '800', '1000', '1250', '1600', '2000', '2500', '3150', '4000', '5000', '6300', '8000', '10000'],              
          index: -1
        },
        {
          type: 'input-unit',
          name: 'count',
          title: '数量',
          value: '1',
          unit: '台'
        }
      ],
      value: []
    }
  ],
  images: [   //相关照片
    {
      type: 'add-image',
      name: 'surveyPhotos',
      title: '勘察照片',
      max: 5,   //最大允许选择的图片数
      value: []   //图片文件列表
    },
    {
      type: 'add-image',
      name: 'applyFormPhotos',
      title: '用电申请单照片',
      max: 2,
      value: []
    }
  ],
  note: [   //备注
    {
      type: 'note-area',
      name: 'note',
      title: '备注',
      value: '',
      placeholder: '输入备注',
      maxlength: 140
    }
  ]
};