import Toast from "../../utils/Toast";


export default {

  /**
   * 页面启动初始化
   * @param {调用此函数的页面对象} $page 
   */
  formPageInit ($page) {
    this.updateHeadTitle($page);    //更新小节标题为当前section
    this.initAnimation($page);
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
   * 初始化动画
   * @param {调用此函数的页面对象} $page 
   */
  initAnimation ($page) {
    $page.animation = dd.createAnimation({    //创建动画对象
      duration: 300,
      timeFunction: 'ease-in-out'
    });
  },

  /**
   * 获取上一页面对象
   */
  getPrePage () {
    const pageStack = getCurrentPages();    //获取页面栈
    const pageCount = pageStack.length;
    const $lastPage = pageStack[pageCount-2];    //获取上一个页面
    return $lastPage;
  },

  switchTags ($page) {
    let headTagAnimation, headTagsAreaAnimation, switchIcon;
    dd.createSelectorQuery($page).select('.tags-area').boundingClientRect().exec(ret=>{
      const height = ret[0].height;
      if($page.data.isTagsShow) {
        headTagAnimation = $page.animation.height('100rpx').step().export();
        headTagsAreaAnimation = $page.animation.opacity(0).translateY('0rpx').step().export();
        switchIcon = '/statics/icons/switch_arrow_down.png';
      } else {
        headTagAnimation = $page.animation.height(`calc(105rpx + ${height}px)`).step().export();
        headTagsAreaAnimation = $page.animation.opacity(100).translateY('50rpx').step().export();
        switchIcon = '/statics/icons/switch_arrow_up.png';
      }
      $page.setData({
        headTagAnimation: headTagAnimation,
        headTagsAreaAnimation: headTagsAreaAnimation,
        switchIcon: switchIcon,
        isTagsShow: !$page.data.isTagsShow
      });
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
   * 输入框事件
   * @param {调用此函数的页面对象} $page 
   * @param {模板传递的事件参数} e 
   */
  bindKeyInput ($page, e) {
    const itemPath = e.target.dataset.itemPath;
    $page.setData({
      [`${itemPath}.value`]:e.detail.value
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
          [`${itemPath}.value`]: res.date
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
      [`${itemPath}.index`]: index,
      [`${itemPath}.value`]: array[index]
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
          [`${itemPath}.value`]: filePaths
        });
      },
      fail: (res) => {
        console.log(res.error);
      }
    });
  },

  /**
   * 询问是否确认提交
   */
  confirmToSubmit () {
    return new Promise((resolve, reject) => {
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
            resolve();
          }
        }
      });
    });
  },

  submit (formValues, submitFun) {
    submitFun(formValues).then(() => {
      Toast.successToast('提交成功', () => {
        dd.navigateBack();
      });
    }).catch(() => {
      Toast.failToast('提交失败');
    });
  }

}