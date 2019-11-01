const BASE_URL = {
    'mock':"http://apis.hstar.org/any-mock/HJKSuEiKB/",
    'base':"http://172.18.7.154:8333/"
};
const ROOT_URL = BASE_URL['base'];
var urls = {
  // 用电申请单 URL
  'APPLYFORM_CRUD': ROOT_URL + "apply/",
  'APPLYFORM_GET_BY_ID': ROOT_URL + "apply/",
  'APPLYFORM_GET_NAME_BY_NO': ROOT_URL + "apply/getclientNameByapplyNo/",
  'APPLYFORM_UPDATE_ADD_TASK': ROOT_URL + "apply/reViewApplyFormModel/",
  // 任务基础信息 URL
  'TASK_BASE_CRUD': ROOT_URL + "task/taskBase/",
  'TASK_BASE_TYPE_AND_PHASE':ROOT_URL + "task/taskBase/",
  // 任务阶段 URL
  'TASK_CRUD': ROOT_URL + "task/taskPhase/",
  'TASK_BATCH_ADD':ROOT_URL + "task/taskPhase/addTaskPhaseList/",
  'TASK_CHANGE_TYPE': ROOT_URL + "task/changeTypeByTaskId/",
  'TASK_GET_BY_USER_ID':ROOT_URL + "task/taskPhase/getTasksByUserId/",
  'TASK_EXIST_FINISHED': ROOT_URL + "task/taskPhase/existCurFinishedTaskModel/",
  'TASK_FINISH_AND_ADD_NEXT': ROOT_URL + "task/taskPhase/achCurAndAddFrontModel/",
  'TASK_FINISH_AND_ADD_NEW': ROOT_URL + "task/taskPhase/achCurAndFinNewModel/",
  // 部门 URL
  'DEPART_CRUD': ROOT_URL + "depart/",
  // 人员 URL
  'STAFF_CRUD': ROOT_URL + "staff/",
  'STAFF_DEPARTNO': ROOT_URL + "staff/staffByDepartId/",
  // 物料 URL
  'GOODS_CRUD': ROOT_URL + "goods/",
  'GOODS_CLASSES':ROOT_URL + "goods/getgoodsClass/",
  'GOODS_BY_TYPE':ROOT_URL + "goods/getgoodsByClass/",
  // 配网改造申请表 URL
  'DntGoodsApplyForm_CRUD': ROOT_URL + "vApply/",
  'DntGoodsApplyForm_ADD': ROOT_URL + "vApply/addvApply/",
  'DntGoodsApplyForm_UPDATE': ROOT_URL + "vApply/updatevApply/",
  // 图片
  'IMAGR_UPLOAD':ROOT_URL + 'upload/uploadPic/',

};


function RequestUrls(){
  return Object.freeze(Object.assign({},urls));
}

Object.assign(RequestUrls,urls);
export default RequestUrls
