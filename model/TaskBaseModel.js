import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 任务基础
 */

// 属性
let taskBaseModel = {
  "taskName": null,
  "taskId": null,
  "taskType": null,
  "taskNum": null,
  "taskNote": null
};

// 行为方法
class taskBaseModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createTaskBaseModel: function () {
    return Object.seal(Object.assign({}, taskBaseModel));
  },

  // 获取所有任务信息
  getAllTaskModel: function(){
    return HelperUtil.httpReq(RequestUrls.TASK_BASE_CRUD);
  },

  // 根据任务类别和任务所处阶段，返回一条唯一的任务基础表对象
  getTaskBaseByTypeAndPhaseModel: function(taskType,taskPhase){
    return HelperUtil.httpReq(RequestUrls.TASK_BASE_TYPE_AND_PHASE+taskType+"/"+taskPhase);
  },
  
}

// 封装对象
function TaskBaseModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(TaskBaseModel,staticMethods);
export default TaskBaseModel