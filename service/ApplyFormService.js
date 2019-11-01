import ApplyFormModel from "/model/ApplyFormModel";
import DeviceModel from '/model/DeviceModel'
import TaskBaseService from '/service/TaskBaseService'
import TaskModel from '/model/TaskModel'
import TaskService from '/service/TaskService'
import ImageService from '../service/ImageService'
import util from '../utils/util'
export default {


  /**
   * 根据申请编号获取对应申请单对象信息
   * @param {申请单编号} applyFormNo 
   * @date 2019/10/24 12:14
   */
  getApplyForm(applyFormNo) {
    return ApplyFormModel.getApplyFormByIdModel(applyFormNo).then(result => {
      console.log('根据申请编号返回申请单信息成功');
      return result.data;
    }).catch(err => {
      console.log('根据申请编号返回申请单信息失败');
      return err.message;
    });
  },


  /**
   * @description: 根据申请单编号List返回clientNameList
   * @param {申List请单编号} applyFormNoList 
   * @date 2019/10/29 12:10
   */
  getClientNameList: function(applyFormNoList){
    return ApplyFormModel.getClientNameListModel(applyFormNoList).then(result =>{
      console.log('根据客申请编号集合返回客户姓名集合成功')
      return result;
    }).catch(err =>{
      console.log('根据客申请编号集合返回客户姓名集合失败')
      return err.message;
    });
  },


  /**
   * 更新申请单内容
   * @param {表单内容} applyForm 
   */
  updateApplyForm(applyForm) {
    return ApplyFormModel.updateApplyFormModel(applyForm).then(result => {
      console.log('更新申请单内容成功');
    }).catch(err => {
      console.log('更新申请单内容失败');
      return err.message;
    });
  },



  /**
   * @description:提交申请单内容
  * @param {表单内容} submitValues 
  */
  submitApplyForm: async function(submitValues) {
    
    //1.调用util工具，生成第一个默认完成的task
    let taskFirtList = []
    const firstUser = submitValues.userList.shift();
    taskFirtList.push(firstUser);
    await util.applySubmitUserListToTaskList(taskFirtList, submitValues.taskType, 1, true).then(result => {
      taskFirtList = result;
    }).catch(err => {
      return err.message;
    });
    
    //2.调用util工具，生成taskList;
    let taskList = []
    await util.applySubmitUserListToTaskList(submitValues.userList, submitValues.taskType, 2, false).then(result => {
      taskList = result;
    }).catch(err => {
      return err.message;
    });
    taskList.push(taskFirtList[0]);

    //3.插入申请表单
    return ApplyFormModel.addApplyFormModel(submitValues.submitBaseValues, submitValues.submitEquipmentValues, taskList).then(result => {
      let applyNo = result.data;
      //拼接申请表两种类型的图片
      let ImageObjList01 = []
      let ImageObjList02 = []
      ImageObjList01 = ImageService.generateImageListByNoAndType(applyNo, submitValues.imagesList[0].picType, submitValues.imagesList[0].picUrl.length);
      ImageObjList02 = ImageService.generateImageListByNoAndType(applyNo, submitValues.imagesList[1].picType, submitValues.imagesList[1].picUrl.length);
      let ImageObjList = ImageObjList01.concat(ImageObjList02);
      imagesUrlList = submitValues.imagesList[0].picUrl.concat(submitValues.imagesList[1].picUrl)
      //上传申请表有关图片
      ImageService.uploadImageList(ImageObjList, imagesUrlList).then(res =>{
        console.log('添加申请表单及对应图片信息成功')
      }).catch(err =>{
        ApplyFormModel.deleteApplyFormModel(applyNo);
      })
    }).catch(err => {
      console.log('添加申请表单失败信息失败');
      return err.message;
    });
  },

  /**
   * 前端审核用电申请单的方法
   * @param {表单内容} submitValues：申请单对象submitBaseValues，userlist，本阶段的taskid 
   */
  submitReview:  async function(submitValues) {

    let nextStep = 0
    if (submitValues.isPassed) {
      nextStep = 3
    } else {
      if(submitValues.taskType == 0){nextStep = 12}   //配网
      else if(submitValues.taskType == 1){nextStep = 5}//低压
      else{nextStep = 10}//高压
    }
    let taskList = []
    await util.userListToTaskList(submitValues.userList, submitValues.submitBaseValues, submitValues.taskType, nextStep, false).then(result =>{
      console.log('申请表审批阶段，生成任务阶段信息成功')
      taskList = result;
    }).catch(err =>{
      console.log('申请表审批阶段，生成任务阶段信息失败')
      return err.message;
    });

    //通过：1将当前状态设置为完成；2.新增任务阶段；
    if(submitValues.isPassed)
    {
      TaskModel.achCurAndFinNewModel(submitValues.taskId, taskList).then(result =>{
        console.log('申请表审批阶段(通过)，操作阶段信息成功')
      }).catch(err =>{
        console.log('申请表审批阶段(通过)，操作阶段信息失败')
        return err.message;
      })
    }
    //未通过：1.更新申请表；2.新增归档任务阶段；3.把当前阶段置为完成
    else
    {
      ApplyFormModel.reViewApplyFormModel(submitValues.submitBaseValues, taskList, submitValues.taskId).then(result => {
        console.log('申请表审批阶段(未通过)，操作阶段及修改申请表信息成功');
      }).catch(err => {
        console.log('申请表审批阶段(未通过)，操作阶段及修改申请表信息失败');
        return err.message;
      });
    }
  }

}