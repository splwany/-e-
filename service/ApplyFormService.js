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
      return Promise.resolve(result.data);
    }).catch(err => {
      console.log('根据申请编号返回申请单信息失败');
      return Promise.reject(err);
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
      return Promise.resolve(result);
    }).catch(err =>{
      console.log('根据客申请编号集合返回客户姓名集合失败')
      return Promise.reject(err);
    });
  },


  /**
   * 更新申请单内容
   * @param {表单内容} applyForm 
   */
  updateApplyForm(applyForm) {
    return ApplyFormModel.updateApplyFormModel(applyForm).then(result => {
      console.log('更新申请单内容成功');
      return Promise.resolve()
    }).catch(err => {
      console.log('更新申请单内容失败');
      return Promise.reject(err);
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
    await util.applySubmitUserListToTaskList(taskFirtList, submitValues.taskType, 1, true, firstUser).then(result => {
      taskFirtList = result;
    }).catch(err => {
      return Promise.reject(err);
    });
    
    //2.调用util工具，生成taskList;
    let taskList = []
    await util.applySubmitUserListToTaskList(submitValues.userList, submitValues.taskType, 2, false, firstUser).then(result => {
      taskList = result;
    }).catch(err => {
      return Promise.reject(err);
    });
    taskList.push(taskFirtList[0]);

    //3.插入申请表单
    let imagesUrlList = [];
    return ApplyFormModel.addApplyFormModel(submitValues.submitBaseValues, submitValues.submitEquipmentValues, taskList)
      .then(result => {
        const applyNo = result.data;
        let imageObject = [];
        for (let item of submitValues.imagesList) {
          const picType = item.picType;
          const picUrlLength = item.picUrl.length;
          imagesUrlList = imagesUrlList.concat(item.picUrl);
          imageObject = imageObject.concat(ImageService.generateImageListByNoAndType(applyNo, picType, picUrlLength));
        }
        return Promise.resolve(imageObject);
      })
      .catch(err => {
        console.log('添加申请表单信息失败');
        return Promise.reject(err);
      })
      .then(result => {
        const ImageObjList = result;
        return ImageService.uploadImageList(ImageObjList, imagesUrlList);
      })
      .catch(err => {
        return Promise.reject(err);
      })
      .then(res => {
        console.log('添加申请表单及对应图片信息成功');
        return Promise.resolve(res);
      })
      .catch(err => {
        ApplyFormModel.deleteApplyFormModel(applyNo);
        console.log('添加申请表单及对应图片信息失败');
        return Promise.reject(err);
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
    const firstUser = submitValues.userList.shift();
    let taskList = []
    await util.userListToTaskList(submitValues.userList, submitValues.submitBaseValues, submitValues.taskType, nextStep, false, firstUser).then(result =>{
      console.log('申请表审批阶段，生成任务阶段信息成功')
      taskList = result;
    }).catch(err =>{
      console.log('申请表审批阶段，生成任务阶段信息失败')
      return Promise.reject(err);
    });

    //通过：1将当前状态设置为完成；2.新增任务阶段；
    if(submitValues.isPassed)
    {
      TaskModel.achCurAndFinNewModel(submitValues.taskId, taskList).then(result =>{
        console.log('申请表审批阶段(通过)，操作阶段信息成功')
        return Promise.resolve();
      }).catch(err =>{
        console.log('申请表审批阶段(通过)，操作阶段信息失败')
        return Promise.reject(err);
      })
    }
    //未通过：1.更新申请表；2.新增归档任务阶段；3.把当前阶段置为完成
    else
    {
      ApplyFormModel.reViewApplyFormModel(submitValues.submitBaseValues, taskList, submitValues.taskId).then(result => {
        console.log('申请表审批阶段(未通过)，操作阶段及修改申请表信息成功');
        return Promise.resolve();
      }).catch(err => {
        console.log('申请表审批阶段(未通过)，操作阶段及修改申请表信息失败');
        return Promise.reject(err);
      });
    }
  }

}