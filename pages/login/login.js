import staffService from "/service/StaffService";

const app = getApp();

Page({

  /**
   * 页面数据
   */
  data: {
    account: "",
    password: "",
  },

  /**
   * 页面加载完成
   */
  onLoad() {},

  /**
   * 页面关闭，缓存信息
   */
  onUnload() {},

  /**
   * 用户名键盘输入完成时操作
   */
  bindAccountInput(e) {
    this.setData({
      account: e.detail.value,
    })
  },

  /**
   * 密码键盘输入完成时操作
   */
  bindPasswordInput(e) {
    this.setData({
      password: e.detail.value,
    })
  },

  /**
   * 登录
   */
  login() {
    staffService.login(this.data.account, this.data.password).then(res => {
      dd.setStorage({
        key: 'token',
        data: res
      })
      app.globalData.myStaffAccount = this.data.account;
      dd.redirectTo({
        url: '../work/work'
      })
    }).catch()
  },
});
