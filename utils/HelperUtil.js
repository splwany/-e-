// 静态方法
let staticMethods = {

  // 获取token
  getToken: function(){
    let token = dd.getStorageSync({ key: 'token' }).data;
    if(token === null){
      return "";
    }else{
      return token;
    }
  },

  // 获取header 对象22
  getHeaderObj: function(){
    let token = HelperUtil.getToken();
    let headers = {};
    if(token === ""){
      headers = {
        "Content-Type": "application/json",
      };
    }else{
      headers = {
        "Content-Type": "application/json",
        "token":token
      };
    }
    return headers;
  },

  // 对httpReq 进行再次封装
  httpReq: function(url, data = null, method = "GET") { 
    let datas = null;
    if(data !== null){
      datas =  JSON.stringify(data);
    }
    return new Promise(function(resolve, reject) {
      dd.showLoading({
        content: '请稍后...'
      });
      dd.httpRequest({
        headers: HelperUtil.getHeaderObj(),
        url: url,
        method: method,
        dataType: 'json',
        data:datas,
        success: (res) => {
          dd.hideLoading();
          let result = {};
          if(res.headers.hasOwnProperty("token")){
            result = {
              message:null,
              data:res.headers['token']
            }
          }else{
            result = {
              message:res.data.msg,
              data:res.data.data
            }
          }
          if (res.status == 200) {
            resolve(result);
          } else {
            reject(result);
          }
        },
        fail: (err) => {
          dd.hideLoading();
          let result = {
            message:"服务器异常！",
            data:null
          }
          reject(result);
        }
      });
    });
  },

  // 对uploadFile 进行再次封装
  uploadFile: function(url, fileName, filePath, fileType = "image") { 
    return new Promise(function(resolve, reject) {
      dd.uploadFile({
        url: url,
        headers: HelperUtil.getHeaderObj(),
        fileType: fileType,
        fileName: fileName,
        filePath: filePath,
        success: (res) => {
          let result = {
            message:res.data.msg,
            data:res.data.data
          }
          if (res.statusCode === 200) {
            resolve(result);
          } else {
            reject(result);
          }
        },
        fail: () => {
          let result = {
            message:"服务器异常！",
            data:null
          }
          reject(result);
        }
      });
    });
  },

  // 对downloadFile 进行再次封装
  downloadFile: function(url) { 
    return new Promise(function(resolve, reject) {
      dd.downloadFile({
        url: url,
        success: (res) => {
        },
        fail: (err) => {
          let result = {
            message:"服务器异常！",
            data:null
          }
          reject(result);
        }
      });
    });
  },

  // Date 对象 解析工具
  dateStringFormat: function(dataString,formatType = "yyyy-MM-dd"){
    Date.prototype.Format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) 
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) 
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    return (new Date(dataString).Format(formatType));
  },

}

function HelperUtil(){
  return Object.freeze(Object.assign(staticMethods)); 
}

Object.assign(HelperUtil,staticMethods);
export default HelperUtil