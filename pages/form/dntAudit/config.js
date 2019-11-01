export const curSection = 'baseInfo';

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
  failureReason: {
    name: '未通过原因'
  }
};

export const baseFormStructure = {   //每个section的表单信息集合
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
      name: 'applyDate',
      title: '申请时间',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'clientNo',
      title: '客户编号',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'applyReg',
      title: '登记类别',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'isOpenZone',
      title: '是否在园区',
      value: '',
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
    }
  ],
  usePower: [   //用电信息
    {
      type: 'input',
      name: 'applyUseaddr',
      title: '用电地址',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'applyPowenum',
      title: '电源数量',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'applyVoltlevel',
      title: '电压等级',
      value: '',
      disabled: true
    }
  ],
  applyCapa: [   //申请容量
    {
      type: 'input-unit',
      name: 'applyNewvolumn',
      title: '新装',
      value: '',
      placeholder: '0',
      unit: 'kVA',
      disabled: true
    },
    {
      type: 'input-unit',
      name: 'applyAddvolumn',
      title: '增容',
      value: '',
      placeholder: '0',
      unit: 'kVA',
      disabled: true
    },
    {
      type: 'input-unit',
      name: 'applyOrignvolumn',
      title: '原有',
      value: '',
      placeholder: '0',
      unit: 'kVA',
      disabled: true
    },
    {
      type: 'input-unit',
      name: 'applySumvolumn',
      title: '合计',
      value: '',
      placeholder: '0',
      unit: 'kVA',
      disabled: true
    }
  ],
  note: [   //备注
    {
      type: 'note-area',
      name: 'applyNote',
      value: '',
      placeholder: '输入备注',
      maxlength: 140,
      disabled: true
    }
  ],
  failureReason: [    //未通过原因
    {
      type: 'note-area',
      name: 'failureReason',
      value: '',
      placeholder: '输入原因',
      maxlength: 140,
      disabled: true
    }
  ]
};

export const equipmentStructure = {   //用电设备
  name: 'equipment',
  data: [
    {
      type: 'input',
      name: 'deviceDetialName',
      title: '设备名称',
      value: '',
      disabled: true
    },
    {
      type: 'input',
      name: 'deviceDetialVolumn',
      title: '单台容量',
      value: '',
      disabled: true
    },
    {
      type: 'input-unit',
      name: 'deviceDetialQuantity',
      title: '数量',
      value: '',
      unit: '台',
      disabled: true
    }
  ],
  value: []
};

export const imageStructure = [   //相关照片
  {
    type: 'add-image',
    imageType: 'surveyImage',
    title: '勘察照片',
    max: 5,   //最大允许选择的图片数
    value: [],   //图片文件列表
    disabled: true
  },
  {
    type: 'add-image',
    imageType: 'applyFormImage',
    title: '用电申请单照片',
    max: 2,
    value: [],
    disabled: true
  }
];