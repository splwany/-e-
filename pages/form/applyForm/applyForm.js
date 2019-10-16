import {manager} from "/service/pageManager/ApplyFormManager";


Page({

  /**
   * 页面数据
   */
  data: {
    isTagsShow: false,    //顶部标题是否展开状态
    switchIcon: '/statics/icons/switch_arrow_down.png',    //顶部标题箭头按钮
    headTitle: '小节名称',    //标题显示的小节名称
    sections: manager.sections,    //section列表
    curSection: manager.curSection,    //当前section
    originValues: manager.formStructure,   //页面数据初始值，给重置功能使用
    submitValues: manager.formStructure    //页面填写的数据
  },

  /**
   * 页面加载完成
   */
  onLoad() {
    this.updateHeadTitle();    //更新小节标题为当前section
    this.animation = dd.createAnimation({    //创建动画对象
      duration: 300,
      timeFunction: 'ease-in-out'
    });
  },

  /**
   * 更新headTitle文字
   */
  updateHeadTitle () {
    this.setData({
      headTitle: this.data.sections[this.data.curSection].name
    });
  },
  
  /**
   * 头部标签展开/折叠
   */
  switchTags () {
    let headTagAnimation, headTagsAreaAnimation, switchIcon;
    if(this.data.isTagsShow) {
      headTagAnimation = this.animation.height('100rpx').step().export();
      headTagsAreaAnimation = this.animation.opacity(0).translateY('0rpx').step().export();
      switchIcon = '/statics/icons/switch_arrow_down.png';
    } else {
      headTagAnimation = this.animation.height('265rpx').step().export();
      headTagsAreaAnimation = this.animation.opacity(100).translateY('50rpx').step().export();
      switchIcon = '/statics/icons/switch_arrow_up.png';
    }
    this.setData({
      headTagAnimation: headTagAnimation,
      headTagsAreaAnimation: headTagsAreaAnimation,
      switchIcon: switchIcon,
      isTagsShow: !this.data.isTagsShow
    });
  },

  /**
   * 切换section页面
   */
  changeSection (e) {
    this.setData({
      curSection: e.target.dataset.nextSection
    }, () => {
      this.updateHeadTitle();
    });
  },

  /**
   * 输入框输入文字时触发
   */
  bindKeyInput (e) {
    const itemPath = e.target.dataset.itemPath;
    this.setData({
      [`submitValues${itemPath}.value`]:e.detail.value
    });
  },

  /**
   * 选项改变时触发
   */
  bindPickerChange (e) {
    const itemPath = e.target.dataset.itemPath;
    const array = e.target.dataset.array;
    const index = e.detail.value;
    this.setData({
      [`submitValues${itemPath}.index`]: index,
      [`submitValues${itemPath}.value`]: array[index]
    });
  },

  /**
   * 点击添加用电设备时触发
   */
  addNewElecEquipment () {
    this.$spliceData({
      [`submitValues.equipment[0].value`]: [this.data.submitValues.equipment[0].value.length, 0, this.data.submitValues.equipment[0].data]
    });
  },

  /**
   * 点击删除用电设备时触发
   */
  deleteElecEquipment (e) {
    const index = e.target.dataset.index;
    this.$spliceData({
      [`submitValues.equipment[0].value`]: [index, 1]
    });
  },

  /**
   * 点击图片添加按钮时触发
   */
  addImage (e) {
    dd.chooseImage({
      count: e.target.dataset.max,
      sourceType: ['camera', 'album'],
      success: (res) => {
        const itemPath = e.target.dataset.itemPath;
        const filePaths = res.filePaths;
        this.setData({
          [`submitValues${itemPath}.value`]: filePaths
        });
      },
      fail: (res) => {
        console.log(res.error);
      },
      complete: () => {

      }
    });
  },
  
  /**
   * 点击提交按钮触发
   */
  onSubmit () {
    const submitValues = this.data.submitValues;
    manager.submit(submitValues);
  },

  /**
   * 点击重置按钮触发
   */
  onReset () {
    dd.confirm({
      title: '警告',
      content: '确定重置表单吗？',
      confirmButtonText: '是',
      cancelButtonText: '点错了',
      success: res => {
        if(res.confirm) {
          this.setData({
            submitValues: this.data.originValues
          }, ()=>{
            dd.showToast({
              type: 'success',
              content: '重置成功'
            });
          });
        }
      }
    });
    
  }

});