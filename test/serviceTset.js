

// 静态方法
let staticMethods = {

  // 测试
  test:function(){
    
  }
}

function ServiceTest(){
  return Object.freeze(Object.assign(staticMethods)); 
}

Object.assign(ServiceTest,staticMethods);
export default ServiceTest