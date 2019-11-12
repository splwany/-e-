import util from "../../../utils/util";

const today = util.getToday();

export const curSection = 'baseInfo';

export const sections = {    //section列表信息
  baseInfo: {
    name: '基础信息'
  },
  extra: {
    name: '其他信息'
  }
};

export const submitStructure = {
  baseInfo: [
    {
      type: 'input',
      title: '工程名称',
      name: 'startsreportProname',
      value: ''
    },
    {
      type: 'input',
      title: '施工地点',
      name: 'startsreportAddr',
      value:''
    },
    {
      type: 'input',
      title: '施工单位',
      name: 'startsreportUnit',
      value:''
    },
    {
      type: 'input',
      title: '施工资质',
      name: 'startsreportQualification',
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
      type: 'input',
      title: '申请编号',
      name: 'applyNo',
      value:'',
      disabled: true
    },
    {
      type: 'time-picker',
      title: '开工日期',
      name: 'approvallimitStarttime',
      value: today
    },
    {
      type: 'time-picker',
      title: '预计竣工日期',
      name: 'startsreportPretime',
      value: today
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
  extra: [
    {
      type: 'note-area',
      name: 'startsreportContent',
      title: '工程内容',
      value: '',
    },
    {
      type: 'add-image',
      name: '04',
      title: '开工照片',
      max: 3,
      value: []
    }
  ]
};