// 静态方法
let staticData = {
  // 竣工报告表
  "AchieveReportModel":{
    "addAchieveReportModel":{
      "achieveReportModel":null,
      "taskPhaseId":null,
      "taskPhaseList":null
    },
    "deleteAchieveReportModel":{
      'applyNo':null,
      'taskPhaseId':null,
      'taskNum':null
    },
    "updateAchieveReportModel":{
      'achieveReportModel':null,
      'taskPhaseId':null,
      'taskPhaseList':null
    },

  },

  // 用电申请表单
  "ApplyFormModel":{
    "addApplyFormModel":{
      "apply":null,
      "devicedetialList":null,
      "taskphaseList":null
    },
    "updateApplyFormModel":{
      "applyFormModel":null
    },
    "getApplyFormByIdModel":{
      "applyFormNo":null
    },
    "getClientNameListModel":{
      "applyFormNoList":null
    },
    "reViewApplyFormModel":{
      'applyObj':null,
      'taskPhaseList':null,
      'taskPhaseId':null
    },
    "deleteApplyFormModelL":{
      "applyNo":null
    }

  },

  // 部门 
  "DepartModel":{
    "getAllDepartModel":null
  },

  // 物料
  "GoodsModel":{
    "getGoodsClassListModel":{
      "typeList":null
    },
    "getGoodsTypeListModel":{
      'goodsClass':null,
      'typeList':null
    },
    "getClassByTypeModel":{
      'classType':null,
      'typeList':null
    }
  },

  // 配网改造
  "DntGoodsApplyFormModel":{
    "submitDntGoodsApplyFormModel":{
      'submitForm':null,
      'taskPhaseList':null,
      'taskPhaseId':null
    },
    "updateDntGoodsApplyFormModel":{
      'submitForm':null,
      'taskPhaseList':null,
      'taskPhaseId':null
    },
    "getDntApplyFormByApplyNoModel":{
      "applyNo":null
    },
    "deleteDntGoodsApplyFormModel":{
      'applyNo':null,
      'taskPhaseId':null,
      'taskNum':null
    },
    "downLoadDntApplyFormFile":{
      "applyNo":null
    }
  },

  // 图片
  "ImageModel":{
    "saveImageModel":{
      "uploadImgs":null
    },
    "getImageUrlModel":{
      'picNo':null,
      'picType':null
    }
  },

  // 10kv线表
  "PowerLineModel":{
    "selectByStationNoModel":{
      "stationNo":null
    }
  },

  // 答复单的整合对象管理
  "ReplyFormModel":{
    "submitHighReplyFormModel":{
      'highReplyFormModel':null,
      'taskPhaseList':null
    },
    "submitLowReplyFormModel":{
      'lowReplyFormModel':null,
      'taskPhaseList':null
    }

  },

  // 人员
  "StaffModel":{
    "selectStaffByDepartModel":{
      "departNo":null
    },
    "loginModel":{
      'staffAccount':null,
      'staffPassword':null
    }
  },

  // 开工报告表
  "StartsReportModel":{
    "addStartsReportModel":{
      'startsReportModel':null,
      'taskPhaseId':null,
      'taskPhaseList':null
    },
    "deleteStartsReportModel":{
      'applyNo':null,
      'taskPhaseId':null,
      'taskNum':null
    }
  },

  // 66kv变电站表
  "StationModel":{
    "getAllStationModel":null
  },

  // 任务基础
  "TaskBaseModel":{
    "getAllTaskModel":null,
    "getTaskBaseByTypeAndPhaseModel":{
      "taskType":null,
      "taskPhase":null
    }
  },

  // 任务阶段
  "TaskModel":{
    "addSingleTaskModel":{
      "taskModel":null
    },
    "addTaskModel":{
      "taskModelList":null
    },
    "getAwaitTaskByUserIdModel":{
      "userId":null
    },
    "isDoneModel":{
      "taskPhaseId":null
    },
    "existCurFinishedTaskModel":{
      'applyNo':null,
      'taskPaseNum': null
    },
    "achCurAndAddFrontModel":{
      'taskPhaseId':null,
      'taskPhaseList': null
    },
    "confirmSignModel":{
      'applyNo':null,
      'taskNum': null,
      'staffAccount':null,
      'taskPhaseList': null
    }    
  },

  // 配网改造基础信息表 
  "VApplyFormModel":{
    "updateVApplyFormModel":{
      'vApplyModel':null,
      'taskPhaseId':null,
      'taskPhaseList':null
    },

  },
}

// 封装对象
function ModelData(){
  return Object.freeze(Object.assign({},
      staticData // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(ModelData,staticData);
export default ModelData