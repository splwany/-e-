import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

// 属性
let taskModel = {
 
};

// 行为方法
class taskModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建任务对象
  createTaskModel: function () {
    return Object.freeze(Object.assign({}, taskModel));
  },

  // 添加任务
  addApplyFromModel: function(taskModel){
    return HelperUtil.httpReq(RequestUrls.TASK_CRUD,taskModel);
  }
};

// 封装对象
function TaskModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(TaskModel,staticMethods);
export default TaskModel;