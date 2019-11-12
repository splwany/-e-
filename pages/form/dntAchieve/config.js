import util from "../../../utils/util";

const today = util.getToday();

export const curSection = 'baseInfo';

export const sections = {    //section列表信息
  baseInfo: {
    name: '基础信息'
  },
  note: {
    name: '说明'
  },
  images: {
    name: '照片'
  }
};

export const submitStructure = {
  baseInfo: [
    {
      type: 'input',
      title: '工程名称',
      name: 'achievereportProname',
      value: ''
    },
    {
      type: 'input',
      title: '施工地点',
      name: 'achievereportAddr',
      value:''
    },
    {
      type: 'input',
      title: '施工单位',
      name: 'achievereportUnit',
      value:''
    },
    {
      type: 'input',
      title: '施工负责人姓名',
      name: 'startsreportLeader',
      value: ''
    },
    {
      type: 'input',
      title: '施工负责人电话',
      name: 'startsreportPhone',
      value:''
    },
    {
      type: 'time-picker',
      title: '开工日期',
      name: 'approvallimitStarttime',
      value: '',
      disabled: true
    },
    {
      type: 'time-picker',
      title: '竣工日期',
      name: 'startsreportPretime',
      value: ''
    },
    {
      type: 'input',
      title: '受理人',
      name: 'startsreportAccperson',
      value:''
    },
    {
      type: 'time-picker',
      title: '受理日期',
      name: 'startsreportDate',
      value: today
    }
  ],
  note: [
    {
      type: 'note-area',
      name: 'startsreportContent',
      title: '工程内容',
      value: ''
    },
    {
      type: 'note-area',
      name: 'startsreportContent',
      title: '施工单位意见',
      value: ''
    }
  ],
  images: [
    {
      type: 'add-image',
      name: '05',
      title: '竣工照片',
      max: 3,
      value: []
    }
  ]
};