export const curSection = 'leadersign';

export const sections = {   //section列表信息

  leadersign: {
    name: '领导签字',
    state: false
  },

};

export const imageStructure = [   //申请照片
  {
      type: 'add-image',
      name: 'materialRequestFormImage',
      title: '您的数字签名',
      max: 1, //最大允许选择的图片数
      value: [],
      disabled: true
    }
];