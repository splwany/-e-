import TaskBaseService from '../service/TaskBaseService'
import TaskModel from '../model/TaskModel'

export default {

  /**
   * 获取当前日期
   */
  getToday () {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const todayDate = [year, month, day].map(this.formatTimeNumber).join('-');
    return todayDate;
  },

  /**
   * 自动生成申请编号
   */
  makeApplyNo () {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const random = this.makeRandom(4);    //获得四位随机数

    const applyNo = [year, month, day].map(this.formatTimeNumber).join('') + random;    //申请编号由年月日及四位随机数组成
    return applyNo;
  },

  /**
   * 生成随机数
   * @param {随机数位数} count 
   */
  makeRandom (count) {
    let randomNum = Math.random();
    randomNum = randomNum.toString().substr(2, count);
    return randomNum;
  },

  /**
   * 在一位数字前加0
   * @param {数字} n 
   */
  formatTimeNumber (n) {
    return n < 10 ? '0'+n : n;
  },

  /** 
  * @Description：根据用户列表、任务阶段数，生成任务阶段列表并返回
  * @param {userList}       用户列表
  * @param {applyForm}      申请表单对象
  * @param {taskType}       任务类型：0小微 1低压 2高压
  * @param {taskphasePhase} 任务阶段数
  * @param {taskIsFinshed}  任务阶段是否完成标志
  * @param {prestaffAccount} 该任务阶段前一个人
  * @date: 2019/10/28 17:22
  */
  userListToTaskList(userList, applyForm, taskType, taskphasePhase, taskIsFinshed, prestaffAccount){
    let taskList = [];
    let requests = [];
    for (let user in userList) {
      requests.push(TaskBaseService.selectByTypeAndPhase(taskType, taskphasePhase));
    }
    return Promise.all(requests).then(result => {
      for (let index in result) {
        let task = TaskModel.createTaskModel()
        task.applyNo = applyForm.applyNo //申请编号
        task.staffAccount = userList[index] //用户账号
        task.taskName = result[index].taskName; //任务基础表名称
        task.taskNum = taskphasePhase; //任务基础表阶段
        task.taskType = taskType; //任务类型
        task.prestaffAccount = prestaffAccount; //前一阶段人员
        task.taskphaseIsfinished = taskIsFinshed; // 任务阶段是否完成
        taskList.push(task)
      }
      return Promise.resolve(taskList);
    }).catch(err => {
      return Promise.reject(err.message);
    });
  },

    /** 
  * @Description：根据用户列表、任务阶段数，生成任务阶段列表并返回
  * @param {userList}       用户列表
  * @param {taskType}       任务类型：0小微 1低压 2高压
  * @param {taskphasePhase} 任务阶段数
  * @param {taskIsFinshed}  任务阶段是否完成标志
  * @param {prestaffAccount} 该任务阶段前一个人
  * @date: 2019/11/01 14:18
  */
  applySubmitUserListToTaskList(userList, taskType, taskphasePhase, taskIsFinshed, prestaffAccount){
    let taskList = [];
    let requests = [];
    for (let user in userList) {
      requests.push(TaskBaseService.selectByTypeAndPhase(taskType, taskphasePhase));
    }
    return Promise.all(requests).then(result => {
      for (let index in result) {
        let task = TaskModel.createTaskModel()
        task.staffAccount = userList[index] //用户账号
        task.taskName = result[index].taskName; //任务基础表名称
        task.taskNum = taskphasePhase; //任务基础表阶段
        task.taskType = taskType; //任务类型
        task.prestaffAccount = prestaffAccount; //前一阶段人员
        task.taskphaseIsfinished = taskIsFinshed; // 任务阶段是否完成
        taskList.push(task)
      }
      return Promise.resolve(taskList);
    }).catch(err => {
      return Promise.reject(err.message);
    });
  }

}