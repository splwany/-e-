

var progress = {
  'HIGH':{
    'HIGH_APPLYFORM_SUBMIT':1,  //高压申请表提交
    'HIGH_REPLY':2,             //提交高压答复单
    'HIGH_PRINT':3,             //打印高压草图、概算
    //4
    'HIGH_ACHIEVE_REPORT':5,    //高压开工任务单
    //6
    //7
    //8
    //9
    //10
  },
  'LOW':{
    'LOW_APPLYFORM_SUBMIT':1,  //低压申请表提交
    'LOW_REPLY':2,              //提交低压答复单
    'LOW_PRINT':3,              //打印低压草图、概算
    //4
    //5
  },
  'DNT':{
    'DNT_APPLYFORM_SUBMIT':1,   //小微配网申请表提交
    'DNT_APPLYFORM_REVIEW':2,   //小微配网申请表审核
    'DNT_SELECTGOODS_SUBMIT':3, //小微配网物资领料申请表提交
    'DNT_SELECTGOODS_REVIEW':4, //小微配网物资领料申请表审核
    'DNT_LEADER_SIGN':5,        //小微配网领导签字
    'DNT_PRINTANDSIGN':6,       //小微打印预览
    'DNT_STARTR_EPORT':7,        //小微开工报告单
    'DNT_ACHIEVE_REPORT':8,     //小微竣工报告单提交
    //7
    //8
    'DNT_ACCEPTANCE':9,          //小微竣工验收
    'DNT_ASSEMBLE0':10,           //小微装表接电
    'DNT_ACHIEVE_PROJECT':11      //小微配网归档
  },
}

function ImageType(){
  return Object.freeze(Object.assign({},progress));
}

Object.assign(Progress,Type);
export default Progress