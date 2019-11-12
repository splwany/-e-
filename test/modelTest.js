import DntGoodsApplyFormModel from "../model/DntGoodsApplyFormModel"
import ApplyFormModel from "../model/ApplyFormModel"

// 静态方法
let staticMethods = {

  // 测试
  test:function(){
    // 根据申请编号下载领料申请单
    // DntGoodsApplyFormModel.downLoadDntApplyFormFile("102");
    // ApplyFormModel.getApplyFormByIdModel("201911040057");
    DntGoodsApplyFormModel.getDntApplyFormByApplyNoModel("201911050002")
      .then(res => {
        console.log('getDntApplyFormByApplyNoModel测试成功');
      })
      .catch(err => {
        console.log('getDntApplyFormByApplyNoModel测试失败');
        console.log(err);
      });
  }
}

function ModelTest(){
  return Object.freeze(Object.assign(staticMethods)); 
}

Object.assign(ModelTest,staticMethods);
export default ModelTest