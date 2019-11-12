import DntGoodsApplyFormService from "../../service/DntGoodsApplyFormService"
import {dntSubmitMockData} from "../mockData/service/dntApplyFormData"

// 静态方法
let staticMethods = {

  // 测试
  test:function(){
    DntGoodsApplyFormService.submitDntGoodsApplyForm(dntSubmitMockData)
      .then(res => {
        console.log('submitDntGoodsApplyForm测试成功');
      })
      .catch(err => {
        console.log('submitDntGoodsApplyForm测试失败');
        console.log(err);
      });
  }
}

function dntServiceTest(){
  return Object.freeze(Object.assign(staticMethods)); 
}

Object.assign(dntServiceTest,staticMethods);
export default dntServiceTest