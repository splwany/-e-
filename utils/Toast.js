function showToast (type, content, next) {
  dd.showToast({
    type: type,
    content: content,
    success: next ? next() : ()=>{}
  });
}

export default {

  successToast (content, next) {
    showToast('success', content, next);
  },

  failToast (content, next) {
    showToast('fail', content, next);
  }

}