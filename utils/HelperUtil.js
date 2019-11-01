// 静态方法
let staticMethods = {

  // 对httpReq 进行再次封装
  httpReq: function(url, data = null,method = "GET") { 
    let datas = null;
    if(data !== null){
      datas =  JSON.stringify(data);
    }
    return new Promise(function(resolve, reject) {
      dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: url,
        method: method,
        dataType: 'json',
        data:datas,
        success: (res) => {
          let result = {
            message:res.data.msg,
            data:res.data.data
          }
          if (res.status == 200) {
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

    // 对uploadFile 进行再次封装
  uploadFile: function(url, fileName, filePath, fileType = "image") { 
    return new Promise(function(resolve, reject) {
      dd.uploadFile({
        url: url,
        fileType: fileType,
        fileName: fileName,
        filePath: filePath,
        success: (res) => {
          let result = {
            message:res.data.msg,
            data:res.data.data
          }
          if (res.status == 200) {
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

  // 返回 Promise Reject 对象
  returnPromiseRejectObj: function(result){
    return Promise.reject();
  },

}

function HelperUtil(){
  return Object.freeze(Object.assign(staticMethods)); 
}

Object.assign(HelperUtil,staticMethods);
export default HelperUtil