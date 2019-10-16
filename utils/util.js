export default {

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
  }

}