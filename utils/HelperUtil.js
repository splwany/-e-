// 静态方法
let staticMethods = {

  // 对httpReq 进行再次封装
  httpReq: function(url, data,method = "POST") { 
    return new Promise(function(resolve, reject) {
      dd.httpRequest({
        headers: {
          "Content-Type": "application/json"
        },
        url: url,
        method: method,
        dataType: 'json',
        data: JSON.stringify(data),
        success: (res) => {
          if (res.status == 200) {
            resolve(res);
          } else {
            reject(res);
          }
        },
        fail: () => {
          reject();
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