import HighReplyFormService from "../../service/HighReplyFormService"
import {highReplyFormData} from "../mockData/service/hignReplyFormData"

// 静态方法
let staticMethods = {

  // 测试
  test:function(){
    HighReplyFormService.submitHighReplyForm(highReplyFormData)
      .then(res => {
        console.log('submitHighReplyForm测试成功');
      })
      .catch(err => {
        console.log('submitHighReplyForm测试失败');
        console.log(err);
      });
  }
}

function dntServiceTest(){
  return Object.freeze(Object.assign(staticMethods)); 
}

Object.assign(dntServiceTest,staticMethods);
export default dntServiceTest