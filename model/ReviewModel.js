import RequestUrls from "../utils/RequestUrls"
import HelperUtil from "../utils/HelperUtil"

/**
 * 审批表
 */

// 属性
let reviewModel = {
  "reviewNo": null,
  "reviewId": null,
  "vapplyNo": null,
  "applyNo": null,
  "reviewPersonname": null,
  "reviewDept": null,
  "reviewSign": null,
  "reviewApplydate": null,
  "reviewRedate": null,
  "reviewContent": null,
  "reviewLimit": null
};

// 行为方法
class reviewModelImpl{
  
}

// 静态方法
let staticMethods = {
  // 创建对象
  createReviewModel: function () {
    return Object.seal(Object.assign({}, reviewModel));
  },

}

// 封装对象
function ReviewModel(){
  return Object.freeze(Object.assign({
        // 在此列出模型对象方法
      },
      staticMethods // 将静态模型方法注入到模型对象方法中
  ));
}

Object.assign(ReviewModel,staticMethods);
export default ReviewModel