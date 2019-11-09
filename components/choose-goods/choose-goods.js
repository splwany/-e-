import GoodsService from "../../service/GoodsService";
import Toast from "../../utils/Toast";

Component({
  mixins: [],
  data: {
    newItem: [
      {
        name: 'goodsClass',
        title: '物资类别',
        array: [],
        index: -1
      },
      {
        name: 'goodsName',
        title: '物资型号',
        array: [],
        index: -1,
        pickerDisabled: true
      },
      {
        name: 'goodsQty',
        title: '数量',
        disabled: true
      }
    ]
  },
  props: {
    bind: '',
    values: {}
  },
  didMount() {
    if(this.$page.data.goodsClassList) {
      this.setData({
        'newItem[0].array': this.$page.data.goodsClassList
      });
    } else {
      GoodsService.getGoodsClassList(0)    //获取配网改造物资类别表
        .then(goodsClassList => {
          this.$page.setData({
            goodsClassList: goodsClassList
          });
          this.setData({
            'newItem[0].array': goodsClassList
          });
        })
        .catch(err => {
          console.log(err);
          Toast.failToast('获取失败，请重试');
        });
    }
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    onAdd (e) {
      const bind = this.props.bind;
      const length = e.target.dataset.length;
      this.$page.$spliceData({
        [`${bind}`]: [length, 0, this.data.newItem]
      });
    },
    onDelete (e) {
      const bind = this.props.bind;
      const index = e.target.dataset.index;
      this.$page.$spliceData({
        [`${bind}`]: [index, 1]
      });
    },
    bindClassChange (e) {
      const choosedIndex = e.detail.value;
      const index = e.target.dataset.index;
      const array = e.target.dataset.array;
      const itemPath = e.target.dataset.itemPath;
      const value = array[choosedIndex];
      this.$page.setData({
        [`${itemPath}[0].index`]: choosedIndex,
        [`${itemPath}[0].value`]: value
      });
      GoodsService.getGoodsTypeList(value)    //根据物资类别名称物资型号列表
        .then(typeList => {
          this.$page.setData({
            [`${this.props.bind}[${index}][1].array`]: typeList,
            [`${this.props.bind}[${index}][1].pickerDisabled`]: false
          });
        })
        .catch(err => {
          console.log(err);
          Toast.failToast('网络异常');
        });
    },
    bindTypeChange (e) {
      const choosedIndex = e.detail.value;
      const index = e.target.dataset.index;
      const array = e.target.dataset.array;
      const rangeKey = e.target.dataset.rangeKey;
      const itemPath = e.target.dataset.itemPath;
      const value = array[choosedIndex][rangeKey];
      this.$page.setData({
        [`${itemPath}[1].index`]: choosedIndex,
        [`${itemPath}[1].value`]: value
      }, ()=>{
        this.$page.setData({
          [`${this.props.bind}[${index}][2].disabled`]: false
        });
      });
    },
    bindKeyInput (e) {
      const value = e.detail.value;
      const itemPath = e.target.dataset.itemPath;
      this.$page.setData({
        [`${itemPath}[2].value`]: value
      });
    },
  },
});
