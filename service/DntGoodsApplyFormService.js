import DntGoodsApplyFormModel from "../model/DntGoodsApplyFormModel";
import TaskModel from '../model/TaskModel'
import ImageService from '../service/ImageService'
import VApplyFormModel from '../model/VApplyFormModel'
import util from '../utils/util'

export default {


  /**
   * @description: 提交配网改造信息,首先判断是否已存在当前阶段完成的任务，存在则表示审核未通过后重复提交(update)，否则表示初次提交(add)
   * @param {配网改造信息} submitObj
   * @date: 2019/10/28 19:02
   * @author: ly 
   */
  submitDntGoodsApplyForm: function(submitValues){
    return TaskModel.existCurFinishedTaskModel(submitValues.submitForm.baseInfo.applyNo, 3).then(result =>{
      console.log('获取配网改造当前任务是否为修改提交判断位成功')
      const existFlag = JSON.parse(JSON.stringify(result.data));
      if(existFlag){
        //存在执行修改
        return this.updateDntGoodsApplyForm(submitValues);
      }else{
        //不存在执行新增
        return this.addDntGoodsApplyForm(submitValues);
      }
    }).catch(err =>{
      console.log('获取配网改造当前任务是否为修改提交判断位失败')
      return Promise.reject(err);
    })
  },

  /**
   * @description:配网改造物资领料审核
   * @param {配网改造物资领料审核} submitValues 
   * @date: 2019/10/30 14:49
   */
  submitDntGoodsApplyReview: function(submitValues){
    //通过：1.将本阶段的设置为已完成 2.插入新的阶段
    if(submitValues.isPassed){
      const firstUser = submitValues.userList.shift();
      return util.userListToTaskList(submitValues.userList, {applyNo: submitValues.applyNo}, 0, 5, false, firstUser)
      .then(taskList =>{
        return TaskModel.achCurAndFinNewModel(submitValues.taskId, taskList);
      })
      .catch(err =>{
        return Promise.reject(err);
      })
      .then(result =>{
        console.log('配网审核通过情况下，操作任务阶段成功')
        return Promise.resolve();
      })
      .catch(err =>{
        console.log('配网审核通过情况下，操作任务阶段失败')
        return Promise.reject(err);
      })
    }

    //未通过：1.将本阶段设置为已完成 2.插入一条之前的阶段(选择同样用户)，设置为未完成
    else{
      return TaskModel.achCurAndAddFrontModel(submitValues.taskId).then(result =>{
        console.log('配网审核未通过情况下，操作任务阶段成功')
        return Promise.resolve();
      }).catch(err =>{
        console.log('配网审核未通过情况下，操作任务阶段失败')
        return Promise.reject(err);
      })
    }
  },

  /**
   * @description: 新增配网改造信息
   * @param {配网改造信息} submitValues 
   */
  addDntGoodsApplyForm: function(submitValues) {
    let applyNoObject = {"applyNo": null}
    applyNoObject.applyNo = submitValues.submitForm.baseInfo.applyNo;

    let imagesUrlList = [];
    let imageObjectList = [];
    for (let item of submitValues.imagesList) {
      const picType = item.picType;
      const picUrlLength = item.picUrl.length;
      imagesUrlList = imagesUrlList.concat(item.picUrl);
      imageObjectList = imageObjectList.concat(ImageService.generateImageListByNoAndType(applyNoObject.applyNo, picType, picUrlLength));
    }
    submitValues.submitForm.imagesList = imageObjectList;

    //1.生成任务阶段表
    const firstUser = submitValues.userList.shift();
    return util.userListToTaskList(submitValues.userList, applyNoObject, 0, 4, false, firstUser)
      .then(taskList => {
        //2.添加配网改造领料单信息
        return DntGoodsApplyFormModel.submitDntGoodsApplyFormModel(submitValues.submitForm, taskList, submitValues.taskId);
      })
      .catch(err => {
        console.log('审核通过后提交，生成阶段信息失败')
        return Promise.reject(err);
      })
      .then(result => {
        //3.上传配网对应图片信息
        return ImageService.uploadImageList(imageObjectList, imagesUrlList);
      })
      .catch(err => {
        console.log('审核通过后，添加配网改造领料单信息失败');
        return Promise.reject(err);
      })
      .then(result =>{
        console.log('审核通过后,添加配网领料及图片信息成功')
        return Promise.resolve();
      })
      .catch(err =>{
        console.log('审核通过后,添加配网上传图片失败')
        //4.如果上传配网对应图片失败则删除已提交的配网信息
        DntGoodsApplyFormModel.deleteDntGoodsApplyFormModel(submitValues.submitForm.baseInfo.applyNo, submitValues.taskId, 4);
        return Promise.reject(err);
      })
  },

  /**
   * @description:修改配网改造信息
   * @param {配网改造信息} submitValues 
   * @date: 2019/10/30 14:57
   */
  updateDntGoodsApplyForm: function(submitValues){
    let applyNoObject = {"applyNo": null}
    applyNoObject.applyNo = submitValues.submitForm.baseInfo.applyNo;
    //1.生成任务阶段表
    const firstUser = submitValues.userList.shift();
     return util.userListToTaskList(submitValues.userList, applyNoObject, 0, 4, false, firstUser)
     .then(taskList => {
        return DntGoodsApplyFormModel.updateDntGoodsApplyFormModel(submitValues.submitForm, taskList, submitValues.taskId);
      })
      .catch(err =>{
        console.log('审核未通过后重新提交，生成阶段信息失败')
        return Promise.reject(err);
      })
      //2.修改配网改造申请单
      .then(result =>{
        console.log('审核未通过后，重新提交配网改造领料单信息成功');
        return Promise.resolve();
      })
      .catch(err =>{
        console.log('审核未通过后，重新提交配网改造领料单信息失败');
        return Promise.reject(err);
      })
  },

  /**
   * @description： 配网, 领导签字
   * @param {领导签字信息} submitValues
   */
  confirmSign: function(submitValues){
    let curUserId = submitValues.userList.shift()
    let taskList = []
    let applyNoObject = {"applyNo": submitValues.applyNo}

    if(userList.length <= 1){
      return TaskModel.confirmSignModel(submitValues.applyNo, 5, curUserId).then(result=>{
        console.log('配网审核成功')
        return Promise.resolve();
      }).catch(err=>{
        console.log('服务器配网审核信息异常')
        return Promise.reject(err);
      })
    }else{
      return util.userListToTaskList(submitValues.userList, applyNoObject, 0, 6, false, curUserId)
        .then(taskPhaseList =>{
          return TaskModel.confirmSignModel(submitValues.applyNo, 5, curUserId, taskPhaseList)
        })
        .catch(err =>{
          return Promise.reject(err);
        })
        //确认领导签字
        .then(result =>{
          console.log('配网审核成功')
          return Promise.resolve();
        })
        .catch(err =>{
          console.log('服务器配网审核信息异常')
          return Promise.reject(err);
        })
    }
  },

  /**
   * @description:根据申请编号获得配网信息
   * @param {申请编号} applyNo 
   * @date: 2019/11/04 18:58
   * @author:ly
   */
  getDntApplyFormByApplyNo:function(applyNo){
    return DntGoodsApplyFormModel.getDntApplyFormByApplyNoModel(applyNo).then(result =>{
      console.log('根据申请编号获得配网信息成功')
      return Promise.resolve(result.data);
    }).catch(err =>{
      console.log('根据申请编号获得配网信息失败')
      return Promise.reject(err);
    })
  },

  /**
   * @description: 根据申请编号下载配网领料单
   * @param {申请编号} applyNo 
   */
  downLoadDntApplyForm:function(applyNo){
    return DntGoodsApplyFormModel.downLoadDntApplyFormFile(applyNo).then(result=>{
      return Promise.resolve(result.data);
    }).catch(err=>{
      console.log('下载配网领料单，服务器异常')
      return Promise.reject(err);
    })
  },

  /**
   * @description: 完成配网领料
   * @param {领料信息} submitValues 
   */
  achGetGoods:function(submitValues){
    const firstUser = submitValues.userList.shift();
    return util.userListToTaskList(submitValues.userList, submitValues.vApplyObj, 0, 7, false, firstUser)
    .then(taskPhaseList =>{
      return VApplyFormModel.updateVApplyFormModel(submitValues.vApplyObj, submitValues.taskPhaseId, taskPhaseList);
    })
    .catch(err =>{
      return Promise.reject(err);
    })
    .then(result=>{
      console.log('打印领料单并配网领料成功')
      return Promise.resolve();
    })
    .catch(err=>{
      console.log('打印领料单并配网领料失败')
      return Promise.reject(err);
    })
  }

}