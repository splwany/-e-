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
      return Promise.resolve();
    }).catch(err=>{
      console.log('添加任务阶段失败');
      return Promise.reject(err);
    });
  },


  /** 
  * @Description：返回对应用户待办（未归档）任务阶段信息
  * @param {userId} 用户账号
  * @date: 2019/10/24 11:24
  * @author: ly
  */
  getAwaitTaskByUserId (userId) {
    let result_demo = [];
    return TaskModel.getAwaitTaskByUserIdModel(userId)
      .then (result => {    // 1.组装applyNoList
        console.log(result);
        let applyNoList = [];
        for(let item of result.data) {
          applyNoList.push(item.applyNo);
        }
        console.log('返回待办信息成功');
        result_demo = result.data;
        return ApplyFormModel.getClientNameListModel(applyNoList);
      })
      .catch (err => {
        console.log('返回待办信息失败');
        return Promise.reject(err);
      })
      .then (result => {    // 2.根据applyNoList请求返回clientNameList
        console.log('根据申请编号List获取客户名List信息成功');
        const clientNameList = result.data;
        return Promise.resolve(clientNameList);
      })
      .catch (err => {
        console.log('根据申请编号List获取客户名List信息失败');
        return Promise.reject(err);
      })
      .then (clientNameList => {    // 3.根据clientNameList扩充taskPhase的clientName字段
        for(let i in result_demo) result_demo[i].clientName = clientNameList[i];
        return Promise.resolve(result_demo);
      })
      .catch (err => {
        console.log(err);
        return Promise.reject(err);
      });
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
      return Promise.resolve(result.data);
    }).catch(err=>{
      console.log('返回任务阶段信息失败');
      return Promise.reject(err);
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
      return Promise.resolve();
    }).catch(err=>{
      console.log('修改任务阶段完成失败');
      return Promise.reject(err);
    });
  },

  /**
   * @description:判断该申请编号，是否为重复提交的配网领料申请
   * @param {申请编号} applyNo 
   * @date: 2019/11/07 16:46
   */
  existCurFinishedTask:function(applyNo){
    return TaskModel.existCurFinishedTaskModel(applyNo, 3).then(result=>{
      return Promise.reject(result.data)
    }).catch(err=>{
      console.log('获取配网改造当前任务是否为修改提交判断位失败')
      return Promise.reject(err)
    })
  },

  /**
   * @description:根据申请编号判断是不是领导签字的最后一个人
   * @param {申请编号} applyNo 
   */
  isLastLeader:function(applyNo){
    return TaskModel.isLastLeaderModel(applyNo, 6).then(result=>{
      return Promise.resolve(result.data);
    }).catch(err=>{
      console.log('服务器判断领导签字是否是最后一个人异常')
      return Promise.reject(err);
    })
  },

  addTaskTimeLimit :function() {

  },

}