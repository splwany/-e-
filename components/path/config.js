// 杆结构
const pole = {
  name: 'pole',
  type: 'input',
  title: '杆',
  value: ''
};

// 高压初始结构
const highDefault = [
  {
    name: 'highreplyinsectionVoltage',
    type: 'picker',
    title: '66千伏',
    array: [],
    rangeKey: 'stationName',
    index: -1
  },
  {
    name: 'highreplyinsectionLine',
    type: 'picker',
    title: '10千伏',
    array: [],
    rangeKey: 'powerlineName',
    index: -1
  },
  pole
];

// 低压初始结构(高压线路部分)
const lowDefault = [
  {
    name: 'lowreplyinsectionVoltage',
    type: 'picker',
    title: '66千伏',
    array: [],
    rangeKey: 'stationName',
    index: -1
  },
  {
    name: 'lowreplyinsectionLine1',
    type: 'picker',
    title: '10千伏',
    array: [],
    rangeKey: 'powerlineName',
    index: -1
  },
  pole
];

export default {
  1: {
    name: 'branch1',
    type: 'input',
    title: '分岐',
    value: ''
  },
  2: {
    name: 'branch2',
    type: 'input',
    title: '分支',
    value: ''
  },
  3: {
    name: 'branch3',
    type: 'input',
    title: '支',
    value: ''
  },
  pole: pole,
  high: highDefault,
  low: {
    lowDefault1: lowDefault,
    lowDefault2: [
      {
        name: 'lowreplyinsectionArea',
        type: 'input',
        title: '台区',
        value: ''
      },
      {
        name: 'lowreplyinsectionLine2',
        type: 'input',
        title: '0.4千伏',
        value: ''
      },
      pole
    ]
  }
  
};