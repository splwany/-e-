export default [
  {
    name: 'class',
    type: 'picker',
    title: '导线类型',
    array: [
      {
        goodsClass: '架空'
      },
      {
        goodsClass: '电缆'
      }
    ],
    rangeKey: 'goodsClass',
    index: -1
  },
  {
    name: 'type',
    type: 'picker',
    title: '导线型号',
    array: [],
    rangeKey: 'goodsName',
    index: -1
  },
  {
    name: 'length',
    type: 'input_unit',
    title: '长度',
    value: '',
    unit: '米'
  }
]