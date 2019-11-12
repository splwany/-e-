export const curSection = 'getMaterial';

export const sections = {    //section列表信息
  getMaterial: {
    name: '领料信息'
  },
  task: {
    name: '创建任务'
  }
};

export const submitStructure = [    //领料表单结构
  {
    type: 'input',
    name: 'vapplyNo',
    title: '领料编号',
    value: ''
  },
  {
    type: 'input',
    name: 'vapplyUnit',
    title: '领料单位',
    value: ''
  },
  {
    type: 'input',
    name: 'vapplyPerson',
    title: '领料人',
    value: ''
  },
  {
    type: 'input',
    name: 'vapplyPhone',
    title: '领料人联系电话',
    value: ''
  }
];

export const staff = {
  max: 1,
  value: []
}