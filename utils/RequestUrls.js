const ROOT_URL = "";
var urls = {
  // 用电申请单 URL
  'APPLYFORM_CRUD': ROOT_URL + "",
  // 任务 URL
  'TASK_CRUD': ROOT_URL + "",
};

function RequestUrls(){
  return Object.freeze(Object.assign({},urls));
}

Object.assign(RequestUrls,urls);
export default RequestUrls
