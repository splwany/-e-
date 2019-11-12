import modelData from "../test/mockData/model/modelData"

import AchieveReportModel from "../model/AchieveReportModel"
import ApplyFormModel from "../model/ApplyFormModel"
import DepartModel from "../model/DepartModel"
import GoodsModel from "../model/GoodsModel"
import DntGoodsApplyFormModel from "../model/DntGoodsApplyFormModel"
import ImageModel from "../model/ImageModel"
import PowerLineModel from "../model/PowerLineModel"
import ReplyFormModel from "../model/ReplyFormModel"
import StaffModel from "../model/StaffModel"
import StartsReportModel from "../model/StartsReportModel"
import StationModel from "../model/StationModel"
import TaskBaseModel from "../model/TaskBaseModel"
import TaskModel from "../model/TaskModel"
import VApplyFormModel from "../model/VApplyFormModel"

let HelpMethods = {
  mock:function(funcName,func){
    console.log("***********");
    console.log(funcName+ "  测试开始");
    return func.then(res => {
      console.log(funcName+ "  测试成功！");
      console.log("***********");
    }).catch(err => {
      console.log(funcName+ "  测试失败！xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log("错误报告：" + JSON.stringify(err));
      console.log("***********");
    });

  }
};

// 静态方法
let staticMethods = {

  // 测试
  test:async function(){
    console.log(" =========     Model层测试开始     =========");
    console.log(" ---------     竣工报告表测试开始     ---------");
    let data = modelData.AchieveReportModel;
    await HelpMethods.mock(
      "addAchieveReportModel", 
      AchieveReportModel.addAchieveReportModel(
        data.addAchieveReportModel.achieveReportModel,
        data.addAchieveReportModel.taskPhaseId,
        data.addAchieveReportModel.taskPhaseList
      )
    );

    await HelpMethods.mock(
      "deleteAchieveReportModel", 
      AchieveReportModel.deleteAchieveReportModel(
        data.deleteAchieveReportModel.applyNo,
        data.deleteAchieveReportModel.taskPhaseId,
        data.deleteAchieveReportModel.taskNum
      )
    ); 

    await HelpMethods.mock(
      "updateAchieveReportModel", 
      AchieveReportModel.updateAchieveReportModel(
        data.updateAchieveReportModel.achieveReportModel,
        data.updateAchieveReportModel.taskPhaseId,
        data.updateAchieveReportModel.taskPhaseList
      )
    );
    console.log(" ---------     竣工报告表测试结束     ---------");

    console.log(" ---------     用电申请表单测试开始     ---------");
    data = modelData.ApplyFormModel;
    await HelpMethods.mock(
      "addApplyFormModel", 
      ApplyFormModel.addApplyFormModel(
        data.addApplyFormModel.apply,
        data.addApplyFormModel.devicedetialList,
        data.addApplyFormModel.taskphaseList
      )
    );

    await HelpMethods.mock(
      "updateApplyFormModel", 
      ApplyFormModel.updateApplyFormModel(
        data.updateApplyFormModel.applyFormModel,
      )
    ); 

    await HelpMethods.mock(
      "getApplyFormByIdModel", 
      ApplyFormModel.getApplyFormByIdModel(
        data.getApplyFormByIdModel.applyFormNo,
      )
    );

    await HelpMethods.mock(
      "getClientNameListModel", 
      ApplyFormModel.getClientNameListModel(
        data.getClientNameListModel.applyFormNoList,
      )
    );

    await HelpMethods.mock(
      "reViewApplyFormModel", 
      ApplyFormModel.reViewApplyFormModel(
        data.reViewApplyFormModel.applyObj,
        data.reViewApplyFormModel.taskPhaseList,
        data.reViewApplyFormModel.taskPhaseId
      )
    ); 

    await HelpMethods.mock(
      "deleteApplyFormModelL", 
      ApplyFormModel.deleteApplyFormModelL(
        data.deleteApplyFormModelL.applyNo,
      )
    );
    console.log(" ---------     用电申请表单测试结束     ---------");

    console.log(" ---------     部门表单测试开始     ---------");
    data = modelData.DepartModel;
    await HelpMethods.mock(
      "getAllDepartModel", 
      DepartModel.getAllDepartModel()
    );
    console.log(" ---------     部门表单测试结束     ---------");

    console.log(" ---------    物料表单测试开始     ---------");
    data = modelData.GoodsModel;
    await HelpMethods.mock(
      "getGoodsClassListModel", 
      GoodsModel.getGoodsClassListModel(
        data.getGoodsClassListModel.typeList
      )
    );

    await HelpMethods.mock(
      "getGoodsTypeListModel", 
      GoodsModel.getGoodsTypeListModel(
        data.getGoodsTypeListModel.goodsClass,
        data.getGoodsTypeListModel.typeList,
      )
    ); 

    await HelpMethods.mock(
      "getClassByTypeModel", 
      GoodsModel.getClassByTypeModel(
        data.getClassByTypeModel.classType,
        data.getGoodsTypeListModel.typeList,
      )
    );
    console.log(" ---------     物料表单测试结束     ---------");

    console.log(" ---------    配网改造表单测试开始     ---------");
    data = modelData.DntGoodsApplyFormModel;
    await HelpMethods.mock(
      "submitDntGoodsApplyFormModel", 
      DntGoodsApplyFormModel.submitDntGoodsApplyFormModel(
        data.submitDntGoodsApplyFormModel.submitForm,
        data.submitDntGoodsApplyFormModel.taskPhaseList,
        data.submitDntGoodsApplyFormModel.taskPhaseId,
      )
    );

    await HelpMethods.mock(
      "updateDntGoodsApplyFormModel", 
      DntGoodsApplyFormModel.updateDntGoodsApplyFormModel(
        data.updateDntGoodsApplyFormModel.submitForm,
        data.updateDntGoodsApplyFormModel.taskPhaseList,
        data.updateDntGoodsApplyFormModel.taskPhaseId,
      )
    ); 

    await HelpMethods.mock(
      "getDntApplyFormByApplyNoModel", 
      DntGoodsApplyFormModel.getDntApplyFormByApplyNoModel(
        data.getDntApplyFormByApplyNoModel.applyNo,
      )
    );

    await HelpMethods.mock(
      "deleteDntGoodsApplyFormModel", 
      DntGoodsApplyFormModel.deleteDntGoodsApplyFormModel(
        data.deleteDntGoodsApplyFormModel.applyNo,
        data.deleteDntGoodsApplyFormModel.taskPhaseId,
        data.deleteDntGoodsApplyFormModel.taskNum,
      )
    ); 

    await HelpMethods.mock(
      "downLoadDntApplyFormFile", 
      DntGoodsApplyFormModel.downLoadDntApplyFormFile(
        data.downLoadDntApplyFormFile.applyNo,
      )
    );
    console.log(" ---------     配网改造表单测试结束     ---------");

    console.log(" ---------     图片表单测试开始     ---------");
    data = modelData.ImageModel;
    console.log("saveImageModel 接口无法进行单元测试，需联调！");
    await HelpMethods.mock(
      "getImageUrlModel", 
      ImageModel.getImageUrlModel(
        data.getImageUrlModel.picNo,
        data.getImageUrlModel.picType,
      )
    );
    console.log(" ---------     图片表单测试结束     ---------");

    console.log(" ---------     10kv线表单测试开始     ---------");
    data = modelData.PowerLineModel;
    await HelpMethods.mock(
      "selectByStationNoModel", 
      PowerLineModel.selectByStationNoModel(
        data.selectByStationNoModel.stationNo,
      )
    );
    console.log(" ---------     10kv线表单测试结束     ---------");

    console.log(" ---------     答复单的整合对象管理测试开始     ---------");
    data = modelData.ReplyFormModel;
    await HelpMethods.mock(
      "submitHighReplyFormModel", 
      ReplyFormModel.submitHighReplyFormModel(
        data.submitHighReplyFormModel.highReplyFormModel,
        data.submitHighReplyFormModel.taskPhaseList,
      )
    );

    await HelpMethods.mock(
      "submitLowReplyFormModel", 
      ReplyFormModel.submitLowReplyFormModel(
        data.submitHighReplyFormModel.lowReplyFormModel,
        data.submitHighReplyFormModel.taskPhaseList,
      )
    );
    console.log(" ---------     答复单的整合对象管理测试结束     ---------");

    console.log(" ---------     人员表测试开始     ---------");
    data = modelData.StaffModel;
    await HelpMethods.mock(
      "selectStaffByDepartModel", 
      StaffModel.selectStaffByDepartModel(
        data.selectStaffByDepartModel.departNo,
      )
    );

    await HelpMethods.mock(
      "loginModel", 
      StaffModel.loginModel(
        data.loginModel.staffAccount,
        data.loginModel.staffPassword,
      )
    );
    console.log(" ---------     人员表测试结束     ---------");

    console.log(" ---------     开工报告表测试开始     ---------");
    data = modelData.StartsReportModel;
    await HelpMethods.mock(
      "addStartsReportModel", 
      StartsReportModel.addStartsReportModel(
        data.addStartsReportModel.startsReportModel,
        data.addStartsReportModel.taskPhaseId,
        data.addStartsReportModel.taskPhaseList,
      )
    );

    await HelpMethods.mock(
      "deleteStartsReportModel", 
      StartsReportModel.deleteStartsReportModel(
        data.deleteStartsReportModel.applyNo,
        data.deleteStartsReportModel.taskPhaseId,
        data.deleteStartsReportModel.taskNum,
      )
    );
    console.log(" ---------     开工报告表测试结束     ---------");

    console.log(" ---------     66kv变电站表测试开始     ---------");
    data = modelData.StationModel;
    await HelpMethods.mock(
      "getAllStationModel", 
      StationModel.getAllStationModel()
    );
    console.log(" ---------     66kv变电站表测试结束     ---------");

    console.log(" ---------     任务基础表测试开始     ---------");
    data = modelData.TaskBaseModel;
    await HelpMethods.mock(
      "getAllTaskModel", 
      TaskBaseModel.getAllTaskModel()
    );

    await HelpMethods.mock(
      "getTaskBaseByTypeAndPhaseModel", 
      TaskBaseModel.getTaskBaseByTypeAndPhaseModel(
        data.getTaskBaseByTypeAndPhaseModel.taskType,
        data.getTaskBaseByTypeAndPhaseModel.taskPhase,
      )
    );
    console.log(" ---------     任务基础表测试结束     ---------");

    console.log(" ---------     任务阶段表测试开始     ---------");
    data = modelData.TaskModel;
    await HelpMethods.mock(
      "addSingleTaskModel", 
      TaskModel.addSingleTaskModel(
        data.addSingleTaskModel.taskModel,
      )
    );

    await HelpMethods.mock(
      "addTaskModel", 
      TaskModel.addTaskModel(
        data.addTaskModel.taskModelList,
      )
    );

    await HelpMethods.mock(
      "getAwaitTaskByUserIdModel", 
      TaskModel.getAwaitTaskByUserIdModel(
        data.getAwaitTaskByUserIdModel.userId,
      )
    );

    await HelpMethods.mock(
      "isDoneModel", 
      TaskModel.isDoneModel(
        data.isDoneModel.taskPhaseId,
      )
    );

    await HelpMethods.mock(
      "existCurFinishedTaskModel", 
      TaskModel.existCurFinishedTaskModel(
        data.existCurFinishedTaskModel.applyNo,
        data.existCurFinishedTaskModel.taskPaseNum,
      )
    );

    await HelpMethods.mock(
      "achCurAndAddFrontModel", 
      TaskModel.achCurAndAddFrontModel(
        data.achCurAndAddFrontModel.taskPhaseId,
        data.achCurAndAddFrontModel.taskPhaseList,
      )
    );

    await HelpMethods.mock(
      "confirmSignModel", 
      TaskModel.confirmSignModel(
        data.confirmSignModel.applyNo,
        data.confirmSignModel.taskNum,
        data.confirmSignModel.staffAccount,
        data.confirmSignModel.taskPhaseList,
      )
    );
    console.log(" ---------     任务阶段表测试结束     ---------");

    console.log(" ---------     配网改造基础信息表测试开始     ---------");
    data = modelData.VApplyFormModel;
    await HelpMethods.mock(
      "updateVApplyFormModel", 
      VApplyFormModel.updateVApplyFormModel(
        data.updateVApplyFormModel.vApplyModel,
        data.updateVApplyFormModel.taskPhaseId,
        data.updateVApplyFormModel.taskPhaseList,
      )
    );
    console.log(" ---------     配网改造基础信息表测试结束     ---------");

    console.log(" =========     Model层测试结束     =========");
    
  }
}

function ModelTest(){
  return Object.freeze(Object.assign(staticMethods)); 
}

Object.assign(ModelTest,staticMethods);
export default ModelTest