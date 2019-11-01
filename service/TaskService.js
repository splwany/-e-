import TaskModel from "../model/TaskModel";
import ApplyFormModel from "/model/ApplyFormModel";
import ApplyFormService from '../service/ApplyFormService'

export default {

  
  /** 
  * @Description：添加任务阶段
  * @param {taskList} 新增的任务阶段列表
  * @date: 2019/10/22 14:48
  * @author: ly
  */
  addTask :function(taskList) {
    return TaskModel.addTaskModel(taskList).then(result => {
      console.log('添加任务阶段成功');
    }).catch(err=>{
      console.log('添加任务阶段失败');
      return err.message;
    });
  },


  /** 
  * @Description：返回对应用户待办（未归档）任务阶段信息
  * @param {userId} 用户账号
  * @date: 2019/10/24 11:24
  * @author: ly
  */
  getAwaitTaskByUserId: async function(userId){
    let applyNoList = [];
    let result_demo = [];
    await TaskModel.getAwaitTaskByUserIdModel(userId).then(result => {
      //1.组装appltNoList
      for(let i=0; i<result.data.length; i++){
        applyNoList.push(result.data[i].applyNo);
      }
      console.log('返回待办信息成功');
      result_demo = result;
    }).catch(err=>{
      console.log('返回待办信息失败');
      return err.message;
    });
    //2.根据applyNoList请求返回clientNameList
    let clientNameList = [];
    await ApplyFormModel.getClientNameListModel(applyNoList).then(result =>{
      console.log('根据申请编号List获取客户名List信息成功');
      clientNameList = result;
    }).catch(err => {
      console.log('根据申请编号List获取客户名List信息失败');
      return err.message;     
    });
    //3.根据clientNameList扩充taskPhase的clientName字段
    for(let i=0; i<result_demo.data.length; i++){
      result_demo.data[i].clientName = clientNameList.data[i];
    }
    return result_demo.data;
  },

  
  /** 
  * @Description：返回任务阶段编号任务阶段信息
  * @param {taskId} 任务阶段编号
  * @date: 2019/10/24 11:39
  * @author: ly
  */
  getTaskByTaskId:function(taskId){
    return TaskModel.getTaskByTaskIdModel(taskId).then(result => {
      console.log('返回任务阶段信息成功');
      return result.data;
    }).catch(err=>{
      console.log('返回任务阶段信息失败');
      return err.message;
    });
  },

  /** 
  * @Description：根据任务阶段id修改该任务阶段为完成状态
  * @param {taskId} 任务阶段编号
  * @date: 2019/10/24 16:29
  * @author: ly
  */
  isDone:function(taskId){
    return TaskModel.isDoneModel(taskId).then(result => {
      console.log('修改任务阶段完成成功');
    }).catch(err=>{
      console.log('修改任务阶段完成失败');
      return err.message;
    });
  },

  addTaskTimeLimit :function() {

  },

}