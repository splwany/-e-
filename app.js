import ModelTest from "./test/modelTest"

const SYSTEM_MODE_TEST = false;

App({

  /**
   * 全局数据存放此处
   */
  globalData: {
    myStaffAccount: ''
  },

  /**
   * 小程序启动完毕后触发
   * @param {启动参数} options 
   */
  onLaunch(options) {
    
    if(SYSTEM_MODE_TEST){
      // 测试
      ModelTest.test();
    }
    
    // 模拟登录，正式运行需注释！
    this.globalData.myStaffAccount = options.query.staffAccount;
    // 第一次打开
    if(this.globalData.myStaffAccount === '') {
      dd.redirectTo({
        url: '/pages/login/login'
      });
    }

  },

  /**
   * 页面显示完毕后触发
   * @param {启动参数} options 
   */
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  }
  
});
