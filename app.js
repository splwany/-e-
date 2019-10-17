App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
    // dd.getAuthCode({
    //   success: res => {
    //     const authCode = res.authCode;
    //     dd.httpRequest({
    //       url: `http://192.168.137.231:8080/login`,
    //       method: 'POST',
    //       data: {
    //         authCode: authCode
    //       },
    //       dataType: 'json',
    //       success: (res) => {
    //         console.log(res);
    //       }
    //     });
    //   }
    // });
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
