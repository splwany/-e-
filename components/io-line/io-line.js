import defaultData from "./config";
import Toast from "../../utils/Toast";
import GoodsService from "../../service/GoodsService";

Component({
  mixins: [],
  data: {
    values: {
      count: 0,
      value: []
    }
  },
  props: {
    bind: '',
    type: ''
  },
  didMount() {
    const bind = this.props.bind;
    if(this.$page[bind]) {
      this.setData({
        values: this.$page[bind]
      });
    }
  },

  didUnmount() {
    const bind = this.props.bind;
    this.$page[bind] = this.data.values;
    this._generateValues();
  },

  methods: {

    /**
     * 点击添加按钮时触发
     */
    onAdd () {
      const count = this.data.values.count + 1;
      const value = this.data.values.value;
      const newItem = defaultData;

      this.setData({
        'values.count': count
      });
      this.$spliceData({
        'values.value': [value.length, 0, newItem]
      });
    },

    /**
     * 点击删除按钮时触发
     */
    onDelete (e) {
      const count = this.data.values.count - 1;
      const index = e.target.dataset.index;

      this.setData({
        'values.count': count
      });
      this.$spliceData({
        'values.value': [index, 1]
      });
    },

    /**
     * 输入框文字改变时触发
     */
    input_unit (e) {
      const value = e.detail.value;
      const itemPath = e.target.dataset.itemPath;
      const itemIndex = e.target.dataset.index;
      this.setData({
        [`${itemPath}[${itemIndex}].value`]: value
      });
    },

    /**
     * 选项框改变时触发
     */
    picker (e) {
      const index = e.detail.value;
      const array = e.target.dataset.array;
      const rangeKey = e.target.dataset.rangeKey;
      const itemPath = e.target.dataset.itemPath;
      const itemIndex = e.target.dataset.index;
      const type = this.props.type === 'high' ? 2 : 1;

      if(itemIndex === 0) {    //如果改变的是变电站选项，则获取对应的导线类别列表并填入数据
        const goodsClass = array[index].goodsClass;
        GoodsService.getClassByType(goodsClass, type)
          .then(listObj => {
            const typeList = [];
            for(let key in listObj) typeList.push({goodsClass: key});
            this.setData({
              [`${itemPath}[1].array`]: typeList,
              [`${itemPath}[1].tmp`]: listObj,
              [`${itemPath}[1].index`]: -1,
              [`${itemPath}[1].value`]: '',
              [`${itemPath}[2].array`]: [],
              [`${itemPath}[2].index`]: -1,
              [`${itemPath}[2].value`]: ''
            });
          })
          .catch(err => {
            Toast.failToast('获取型号失败');
          });
      }
      if(itemIndex === 1) {    //根据导线类别显示型号列表
        const type = array[index].goodsClass;
        const i = itemPath.match(/\d+/g);
        const modelList = this.data.values.value[i][1]['tmp'][type];
        this.setData({
          [`${itemPath}[2].array`]: modelList,
          [`${itemPath}[2].index`]: -1,
          [`${itemPath}[2].value`]: ''
        });
      }
      this.setData({
        [`${itemPath}[${itemIndex}].index`]: index,
        [`${itemPath}[${itemIndex}].value`]: array[index][rangeKey]
      });
    },
    _generateValues () {
      const value = this.data.values.value;
      let overhead = '';
      let cable = '';
      for(let item of value) {
        const type = item[0].index    //导线类型：0是架空, 1是电缆
        const goodsName = item[2].value;    //导线型号
        if(!goodsName) continue;    //如果导线型号为undefined，则此条作废不添加
        const length = item[3].value;    //导线长度
        const unit = item[3].unit;    //长度单位
        const str = `${length}${unit}(${goodsName})；`;    //组合字符串
        if(type === 0) overhead += str;    //架空字符串拼接
        if(type === 1) cable += str;    //电缆字符串拼接
      }
      overhead = overhead.substring(0, overhead.length-1);    //去掉最后一个分号
      cable = cable.substring(0, cable.length-1);    //去掉最后一个分号

      const tmp = {
        overhead: overhead?overhead:null,
        cable: cable?cable:null
      };
      this.$page.setData({
        [`${this.props.bind}`]: tmp
      });
    }

  },
});
