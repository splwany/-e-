import TaskBaseModel from "../model/TaskBaseModel";


export default {

  /** 
  * @Description：获取任务基础表所有信息
  * @date: 2019/10/22 14:48
  * @author: ly
  */
  getAllTask :function() {
    return TaskBaseModel.getAllTaskModel().then(result => {
      console.log('查询所有任务基础信息成功');
      return Promise.resolve(result.data);
    }).catch(err=>{
      console.log('查询所有任务基础信息失败');
      return Promise.reject(err.message);
    });
  },

  /** 
  * @Description：根据任务类别和任务所处阶段，返回一条唯一的任务基础表对象
  * @param {task_type}  任务类别：高压0 低压1 小微2
  * @param {task_phase} 任务所处阶段
  * @date: 2019/10/23 09:45
  * @author: ly
  */
  selectByTypeAndPhase :function(task_type, task_phase){
    return TaskBaseModel.getTaskBaseByTypeAndPhaseModel(task_type,task_phase).then(result => {
      console.log('根据任务类型和任务阶段查询任务基础信息成功');
      return Promise.resolve(result.data);
    }).catch(err=>{
      console.log('根据任务类型和任务阶段查询任务基础信息失败');
      return Promise.reject(err);
    });
  }

}