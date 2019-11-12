import StartsReportModel from '../model/StartsReportModel'
import ImageService from '../service/ImageService'
import util from '../utils/util'

export default {
  
  /**
   * @description: 提交开工报告单，并上传相关图片
   * @param {开工信息} submitValues 
   * @date: 2019/11/05 21:35
   */
  submitStartsReport:function(submitValues){
    const firstUser = submitValues.userList.shift();
    let nextStep = 0
    if(submitValues.taskType == 0){
      nextStep = 9
    }else if(submitValues.taskType == 1){
      nextStep = 3  //待确定
    }else{
      nextStep = 5  //待确定
    }
    //1.生成任务阶段列表
    return util.userListToTaskList(submitValues.userList, submitValues.startsReportModel, submitValues.taskType, nextStep, false, firstUser)
    .then(taskPhaseList =>{
      //2.提交开工单
      return StartsReportModel.addStartsReportModel(submitValues.startsReportModel, submitValues.taskPhaseId, taskPhaseList);
    })
    .catch(err=>{
      console.log('提交开工报告，生成任务阶段列表失败')
      return Promise.reject(err);
    })
    .then(result =>{
        let startsreportNo = result.data;
        let imageObjectList = [];
        let imagesUrlList = [];
        for (let item of submitValues.imagesList) {
          const picType = item.picType;
          const picUrlLength = item.picUrl.length;
          imagesUrlList = imagesUrlList.concat(item.picUrl);
          imageObjectList = imageObjectList.concat(ImageService.generateImageListByNoAndType(startsreportNo, picType, picUrlLength));
        }
        //3.上传开工单对应图片
        return ImageService.uploadImageList(imageObjectList, imagesUrlList);
    })
    .catch(err =>{
      console.log('提交开工报告，服务器异常');
      return Promise.reject(err);
    })
    .then(result =>{
      console.log('开工报告提交成功，并上传相关图片成功')
      return Promise.resolve();
    })
    .catch(err =>{
      //4.上传图片失败，将之前提交的开工信息删除
      StartsReportModel.deleteStartsReportModel(submitValues.startsReportModel.applyNo, submitValues.taskPhaseId, nextStep);
      console.log('开工报告提交，上传相关图片失败')
      return Promise.reject(err);
    })
  }

}