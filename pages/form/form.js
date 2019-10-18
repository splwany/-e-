export default {//这次改了weixin分支并提交

  /**
   * 页面启动初始化
   * @param {调用此函数的页面对象} $page 
   */
  formPageInit ($page) {
    this.updateHeadTitle($page);    //更新小节标题为当前section
    $page.animation = dd.createAnimation({    //创建动画对象
      duration: 300,
      timeFunction: 'ease-in-out'
    });
  },

  switchTags ($page) {
    let headTagAnimation, headTagsAreaAnimation, switchIcon;
    if($page.data.isTagsShow) {
      headTagAnimation = $page.animation.height('100rpx').step().export();
      headTagsAreaAnimation = $page.animation.opacity(0).translateY('0rpx').step().export();
      switchIcon = '/statics/icons/switch_arrow_down.png';
    } else {
      headTagAnimation = $page.animation.height('265rpx').step().export();
      headTagsAreaAnimation = $page.animation.opacity(100).translateY('50rpx').step().export();
      switchIcon = '/statics/icons/switch_arrow_up.png';
    }
    $page.setData({
      headTagAnimation: headTagAnimation,
      headTagsAreaAnimation: headTagsAreaAnimation,
      switchIcon: switchIcon,
      isTagsShow: !$page.data.isTagsShow
    });
  },

  /**
   * 切换section页
   * @param {调用此函数的页面对象} $page 
   * @param {模板传递的事件参数} e 
   */
  changeSection ($page, e) {
    $page.setData({
      curSection: e.target.dataset.nextSection
    }, () => {
      this.updateHeadTitle($page);
    });
  },

  /**
   * 更新headTitle文字为当前sectionName
   * @param {调用此函数的页面对象} $page 
   */
  updateHeadTitle ($page) {
    $page.setData({
      headTitle: $page.data.sections[$page.data.curSection].name
    });
  },

  /**
   * 输入框事件
   * @param {调用此函数的页面对象} $page 
   * @param {模板传递的事件参数} e 
   */
  bindKeyInput ($page, e) {
    const itemPath = e.target.dataset.itemPath;
    $page.setData({
      [`submitValues${itemPath}.value`]:e.detail.value
    });
  },

  /**
   * 日期选择事件
   * @param {调用此函数的页面对象} $page 
   * @param {模板传递的事件参数} e 
   */
  onDatePick ($page, e) {
    const currentDate = e.target.dataset.currentDate;
    const itemPath = e.target.dataset.itemPath;
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: currentDate,
      success: res => {
        $page.setData({
          [`submitValues${itemPath}.value`]: res.date
        });
      }
    });
  },

  /**
   * 选择器事件
   * @param {调用此函数的页面对象} $page 
   * @param {模板传递的事件参数} e 
   */
  bindPickerChange ($page, e) {
    const itemPath = e.target.dataset.itemPath;
    const array = e.target.dataset.array;
    const index = e.detail.value;
    $page.setData({
      [`submitValues${itemPath}.index`]: index,
      [`submitValues${itemPath}.value`]: array[index]
    });
  },

  /**
   * 添加图片
   * @param {调用此函数的页面对象} $page 
   * @param {模板传递的事件参数} e 
   */
  addImage ($page, e) {
    dd.chooseImage({
      count: e.target.dataset.max,
      sourceType: ['camera', 'album'],
      success: (res) => {
        const itemPath = e.target.dataset.itemPath;
        const filePaths = res.filePaths;
        $page.setData({
          [`submitValues${itemPath}.value`]: filePaths
        });
      },
      fail: (res) => {
        console.log(res.error);
      }
    });
  },

  /**
   * 表单提交
   * @param {调用此函数的页面对象} $page 
   */
  onSubmit ($page, submit) {
    dd.confirm({
      title: '提示',
      content: '确定提交吗？',
      confirmButtonText: '是',
      cancelButtonText: '取消',
      success: (res) => {
        if (res.confirm) {
          dd.showLoading({
            content: '提交中'
          });
          const success = submit();
          if (success) {
            dd.showToast({
              content: '提交成功',
              duration: 1000,
              type: 'success',
              success: () => {
                dd.navigateBack();
              }
            });
          }
        }
      }
    });
  },

  /**
   * 表单重置
   * @param {调用此函数的页面对象} $page 
   */
  onReset ($page) {
    dd.confirm({
      title: '警告',
      content: '确定重置表单吗？',
      confirmButtonText: '是',
      cancelButtonText: '点错了',
      success: res => {
        if(res.confirm) {
          $page.setData({
            submitValues: $page.data.originValues
          }, ()=>{
            dd.showToast({
              type: 'success',
              content: '重置成功'
            });
          });
        }
      }
    });
  },

}