import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 任务阶段
 */

// 属性
let taskModel = {
  "taskPhaseId": null,
  "applyNo": null,
  "staffAccount": null,
  "taskType": null,
  "taskNum": null,
  "taskName": null,
  "taskphaseStartdate": null,
  "taskphaseDatelimit": null,
  "taskphaseIsfinished": null,
  "prestaffAccount":null
};

// 行为方法
class taskModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建任务阶段对象
  createTaskModel: function () {
    return Object.seal(Object.assign({}, taskModel));
  },

  // 添加单个任务阶段
  addSingleTaskModel: function(taskModel){
    return HelperUtil.httpReq(RequestUrls.TASK_CRUD,taskModel,'POST');
  },
  
  // 批量添加任务阶段
  addTaskModel: function(taskModelList){
    return HelperUtil.httpReq(RequestUrls.TASK_BATCH_ADD,taskModelList,'POST');
  },
  
  // 返回任务阶段表对应用户账号id下未完成的任务阶段集合列表
  getAwaitTaskByUserIdModel: function(userId){
    return HelperUtil.httpReq(RequestUrls.TASK_GET_BY_USER_ID+userId);
  },

  // 根据任务阶段id修改该任务阶段为完成状态
  isDoneModel: function(taskPhaseId){
    return HelperUtil.httpReq(RequestUrls.TASK_CHANGE_TYPE+taskPhaseId);
  },

  // 看有没有applyNo对应的第taskPaseNum阶段并且已完成的数据，有返回true，否则返回false
  existCurFinishedTaskModel:function(applyNo, taskPaseNum){
    return HelperUtil.httpReq(RequestUrls.TASK_EXIST_FINISHED,{
      'applyNo':applyNo,
      'taskPaseNum': taskPaseNum
    },'POST');
  },

  /**
   * 1.根据taskPhaseId将对应的任务阶段设为已完成
   * 2.并且重新插入一条该对象对应申请编号前一阶段的信息，用户与原先前一阶段的一样
   * @param {*} taskPhaseId 
   */
  achCurAndAddFrontModel: function(taskPhaseId){
    return HelperUtil.httpReq(RequestUrls.TASK_FINISH_AND_ADD_NEXT+taskPhaseId);
  },

  // 将taskPhaseId表示的任务阶段状态修改为已完成，并插入taskPhaseList列表
  achCurAndFinNewModel: function(taskPhaseId, taskPhaseList){
    return HelperUtil.httpReq(RequestUrls.TASK_FINISH_AND_ADD_NEW,{
      'taskPhaseId':taskPhaseId,
      'taskPhaseList': taskPhaseList
    },'POST');
  },

  // 判断applyNo第taskNum阶段未完成的数目是否大于1；
  confirmSignModel:function(applyNo, taskNum, staffAccount, taskPhaseList){
    return HelperUtil.httpReq(RequestUrls.TASK_CONFIRM_SIGN,{
      'applyNo':applyNo,
      'taskNum': taskNum,
      'staffAccount':staffAccount,
      'taskPhaseList': taskPhaseList
    },'POST');
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