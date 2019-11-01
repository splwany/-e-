import GoodsModel from "../../../model/GoodsModel";
import service from "../../../service/GoodsService";
import Form from "../form";

Page({
  /**
   * 页面数据
   */
  data: {
    isTagsShow: false,    //顶部标题是否展开状态
    switchIcon: '/statics/icons/switch_arrow_down.png',    //顶部标题箭头按钮
    headTitle: '小节名称',    //标题显示的小节名称
  },

  /**
   * 页面加载完成，当从缓存打开时，导入缓存信息
   */
  onLoad (query) {
    this.$lastPage = Form.getPrePage();    //获取上一页面对象
    const taskType = query.taskType;

    const goodsClassList = ['类别1', '类别2', '类别3'];  
    this.setData({
      sections: goodsClassList,
      curSection: 0
    });  
    // service.getGoodsClassList(taskType).then(res => {
    //   this.setData({
    //     sections: res,
    //     curSection: 0
    //   });
    // }).catch(err => {
    //   console.log(err);
    // });
    const submitValues = [];
    for(let item of goodsClassList) {
      submitValues.push({
        name: item,
        value: []
      })
    }
    this.setData({
      submitValues: submitValues
    });
    this._pageInit();
  },

  /**
   * 物资选择页面初始化
   */
  _pageInit () {
    this._updateHeadTitle();
    Form.initAnimation(this);
  },

  /**
   * 更新物资选择页面的headTitle文字为当前section
   */
  _updateHeadTitle () {
    this.setData({
      headTitle: this.data.sections[this.data.curSection]
    });
  },

  /**
   * 页面关闭，缓存信息
   */
  onUnload() {

  },
  
  /**
   * 头部标签展开/折叠
   */
  switchTags () {
    Form.switchTags(this);
  },

  /**
   * 切换section页面
   */
  changeSection: async function (e) {
    const nextSection = e.target.dataset.nextSection;
    this.setData({
      curSection: nextSection
    }, () => {
      this._updateHeadTitle();
    });
    let typeList = ['型号1', '型号2', '型号3', '型号4'];
    // await service.getGoodsTypeList(nextSection).then(res => {
    //   typeList = res;
    // }).catch(err => {
    //   console.log(err);
    // });
    this.setData({

    });

  },

  /**
   * 输入框输入文字时触发
   */
  bindKeyInput (e) {
    Form.bindKeyInput(this, e);
  },

  /**
   * 选项改变时触发
   */
  bindPickerChange (e) {
    Form.bindPickerChange(this, e);
  },

   /**
   * 点击确定按钮触发
   */
  onDone () {
    const [goodsList, price] = this._getPrice();
    this.$lastPage.setData({
      goodsList: goodsList,
      price: price,
      materialSelected: true
    });
    dd.navigateBack({
      delta: 1
    })
  },
  _getPrice () {
    const goodValues = this.data.submitValues;
    
    let totalPrice = 0;
    let goodsList = [];
    for(let goodsClass of goodValues) {
      for(let good of goodsClass.value) {
        const price = good[0].array[good[0].index].goodsPrice;
        const count = good[1].value;
        totalPrice += price * count;
        // const goodsModel = GoodsModel.createGoodsModel();
        // Object.assign(goodsModel, {
        //   goodsClass: goodsClass.name,
        //   goodsName: good[0].value,
        //   goodsPrice: price * count,
        //   goodsQty: count
        // });
        // goodsList.push(goodsModel);
        goodsList.push({
          goodsClass: goodsClass.name,
          goodsName: good[0].value,
          goodsPrice: price * count,
          goodsQty: count
        });
      }
    }

    return [goodsList, totalPrice];
  }
});
