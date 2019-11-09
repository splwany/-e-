import AchieveReportModel from '../model/AchieveReportModel'
import ImageService from '../service/ImageService'
import util from '../utils/util'

export default {
  
  /**
   * @description: 提交竣工有关信息，并上传相关图片
   * @param {竣工有关信息} submitValues 
   * @date: 2019/11/05 10:03
   */
  submitAchieveReport:function(submitValues){
    const firstUser = submitValues.userList.shift();
    let nextStep = 0
    if(submitValues.taskType == 0){
      nextStep = 9
    }else if(submitValues.taskType == 1){
      nextStep = 4 //待确定
    }else{
      nextStep = 8 //待确定
    }
    //1.生成任务阶段列表
    return util.userListToTaskList(submitValues.userList, submitValues.achieveReportModel, submitValues.taskType, nextStep, false, firstUser)
    .then(taskPhaseList =>{
      //2.提交竣工单
      return AchieveReportModel.addAchieveReportModel(submitValues.achieveReportModel, submitValues.taskPhaseId, taskPhaseList);
    })
    .catch(err =>{
      console.log('提交竣工单，生成任务阶段List失败')
      return Promise.reject(err)
    })
    .then(result =>{
        const achievereportNo = result.data;
        let imageObjectList = [];
        let imagesUrlList = [];
        for (let item of submitValues.imagesList) {
          const picType = item.picType;
          const picUrlLength = item.picUrl.length;
          imagesUrlList = imagesUrlList.concat(item.picUrl);
          imageObjectList = imageObjectList.concat(ImageService.generateImageListByNoAndType(achievereportNo, picType, picUrlLength));
        }
        //3.上传竣工单对应图片
        return ImageService.uploadImageList(imageObjectList, imagesUrlList);
    })
    .catch(err =>{
      console.log('提交竣工报告，服务器异常');
      return Promise.reject(err);
    })
    .then(result =>{
      console.log('竣工报告提交成功，并上传相关图片成功')
      return Promise.resolve();
    })
    .catch(err =>{
      //4.上传图片失败，将之前提交的竣工信息删除
      AchieveReportModel.deleteAchieveReportModel(submitValues.achieveReportModel.applyNo, submitValues.taskPhaseId, nextStep);
      console.log('开工报告提交，上传相关图片失败')
      return Promise.reject(err);
    })
  },


  /**
   * @description:验收
   * @param {验收单信息} submitValues 
   */
  acceptance:function(submitValues){
    let nextStep = 0;
    if(submitValues.taskType == 0){
      nextStep = 10;
    }else if(submitValues.taskType == 1){
      nextStep = 4; //待确定
    }else{
      nextStep = 9; //待确定
    }
    const firstUser = submitValues.userList.shift();
     //1.生成任务阶段列表
    return util.userListToTaskList(submitValues.userList, submitValues.achieveReportModel, submitValues.taskType, nextStep, false, firstUser)
    .then(taskPhaseList =>{
      //2.验收
      return AchieveReportModel.updateAchieveReportModel(submitValues.achieveReportModel, submitValues.taskPhaseId, taskPhaseList);
    })
    .catch(err =>{
      console.log('验收阶段，生成任务阶段List失败')
      return Promise.reject(err)
    })
    .then(result =>{
      console.log('验收成功');
      return Promise.resolve();
    })
    .catch(err =>{
      console.log('验收，服务器异常')
      return Promise.reject(err)
    })
  },

  /**
   * @description:装表接电
   * @param {装表接电信息} submitValues 
   */
  assemble:function(submitValues){
    let nextStep = 0;
    if(submitValues.taskType == 0){
      nextStep = 11;
    }else if(submitValues.taskType == 1){
      nextStep = 5; //待确定
    }else{
      nextStep = 10; //待确定
    }
    const firstUser = submitValues.userList.shift();
     //1.生成任务阶段列表
    return util.userListToTaskList(submitValues.userList, submitValues.achieveReportModel, submitValues.taskType, nextStep, false, firstUser)
    .then(taskPhaseList =>{
      //2.装表接电
      return AchieveReportModel.updateAchieveReportModel(submitValues.achieveReportModel, submitValues.taskPhaseId, taskPhaseList);
    })
    .catch(err =>{
      console.log('装表接电阶段，生成任务阶段List失败')
      return Promise.reject(err)
    })
    .then(result =>{
      console.log('装表接电成功');
      return Promise.resolve();
    })
    .catch(err =>{
      console.log('装表接电，服务器异常')
      return Promise.reject(err)
    })
  },

  /**
   * @description:归档
   * @param {归档信息} submitValues 
   */
  achievedProject:function(submitValues){
    //归档，更新竣工单归档字段并将归档任务阶段置为完成
    return AchieveReportModel.updateAchieveReportModel(submitValues.achieveReportModel, submitValues.taskPhaseId).then(result=>{
      console.log('归档成功');
      return Promise.resolve();
    }).catch(err =>{
      console.log('归档失败')
      return Promise.reject(err);
    })
  }

}