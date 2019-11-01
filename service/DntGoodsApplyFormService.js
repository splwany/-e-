import DntGoodsApplyFormModel from "../model/DntGoodsApplyFormModel";
import TaskModel from '../model/TaskModel'
import util from '../utils/util'

export default {


  /**
   * @description: 提交配网改造信息,首先判断是否已存在当前阶段完成的任务，存在则表示审核未通过后重复提交(update)，否则表示初次提交(add)
   * @param {配网改造信息} submitObj
   * @date: 2019/10/28 19:02
   * @author: ly 
   */
  submitDntGoodsApplyForm: function(submitValues){
    TaskModel.existCurFinishedTaskModel(submitValues.baseInfo.applyNo, 3).then(result =>{
      console.log('获取配网改造当前任务是否为修改提交判断位成功')
      if(result.data){
        //存在执行修改
        return this.updateDntGoodsApplyForm(submitValues);
      }else{
        //不存在执行新增
        return this.addDntGoodsApplyForm(submitValues);
      }
    }).catch(err =>{
      console.log('获取配网改造当前任务是否为修改提交判断位失败')
      return err.message;
    })
  },

  /**
   * 配网改造物资领料审核
   * @param {配网改造物资领料审核} submitValues 
   * @date: 2019/10/30 14:49
   */
  submitDntGoodsApplyReview: async function(submitValues){
    let baseInfo = {"applyNo": null}
    baseInfo.applyNo = submitValues.applyNo;
    
    //通过：1.将本阶段的设置为已完成 2.插入新的阶段
    if(submitValues.isPassed){
      let taskList = [] 
      await util.userListToTaskList(submitValues.userList, baseInfo, 0, 5, false).then(result =>{
        taskList = result;
      }).catch(err =>{
        return err.message;
      })
      await TaskModel.achCurAndFinNewModel(submitValues.taskId, taskList).then(result =>{
        console.log('配网审核通过情况下，操作任务阶段成功')
      }).catch(err =>{
        console.log('配网审核通过情况下，操作任务阶段失败')
        return err.message;
      })
    }

    //未通过：1.将本阶段设置为已完成 2.插入一条之前的阶段(选择同样用户)，设置为未完成
    else{
      TaskModel.achCurAndAddFrontModel(submitValues.taskId).then(result =>{
        console.log('配网审核未通过情况下，操作任务阶段成功')
      }).catch(err =>{
        console.log('配网审核未通过情况下，操作任务阶段失败')
        return err.message;
      })
    }
  },

  /**
   * @description: 新增配网改造信息
   * @param {配网改造信息} submitValues 
   */
  addDntGoodsApplyForm: async function(submitValues){
    //1.生成任务阶段表
    let taskList = []
    await util.userListToTaskList(submitValues.userList, submitValues.submitForm.baseInfo, 0, 4, false).then(result => {
      console.log('审核通过后提交，生成阶段信息成功')
      taskList = result;
    }).catch(err =>{
      console.log('审核通过后提交，生成阶段信息失败')
      return err.message;
    });

    //2.插入配网改造申请单
    return DntGoodsApplyFormModel.submitDntGoodsApplyFormModel(submitValues.submitForm, taskList, submitValues.taskId).then(result => {
      console.log('审核通过后，添加配网改造领料单信息成功');
    }).catch(err => {
      console.log('审核通过后，添加配网改造领料单信息失败');
      return err.message;
    });
  },

  /**
   * 修改配网改造信息
   * @param {配网改造信息} submitValues 
   * @date: 2019/10/30 14:57
   */
  updateDntGoodsApplyForm: async function(submitValues){
    //1.生成任务阶段表
    let taskList = []
    await util.userListToTaskList(submitValues.userList, submitValues.submitForm.baseInfo, 0, 4, false).then(result => {
      console.log('审核未通过后重新提交，生成阶段信息成功')
      taskList = result;
    }).catch(err =>{
      console.log('审核未通过后重新提交，生成阶段信息失败')
      return err.message;
    });

    //2.修改配网改造申请单
    return DntGoodsApplyFormModel.updateDntGoodsApplyFormModel(submitValues.submitForm, taskList, submitValues.taskId).then(result => {
      console.log('审核未通过后，重新提交配网改造领料单信息成功');
    }).catch(err => {
      console.log('审核未通过后，重新提交配网改造领料单信息失败');
      return err.message;
    });
  }

}