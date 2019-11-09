Component({
  mixins: [],
  data: {
    newCard: [
      {
        type: 'input',
        name: 'pickingOrder',
        title: '采购订单号',
        value: ''
      },
      {
        type: 'input',
        name: 'pickingNum',
        title: '物料编号',
        value: ''
      },
      {
        type: 'input',
        name: 'pickingDescribe',
        title: '物料描述',
        value: ''
      },
      {
        type: 'input',
        name: 'pickingUnit',
        title: '单位',
        value: ''
      },
      {
        type: 'input',
        name: 'pickingQuantity',
        title: '数量',
        value: ''
      },
      {
        type: 'input',
        name: 'pickingAddr',
        title: '库存地点',
        value: ''
      }
    ]
  },
  props: {
    bind: '',
    values: [],
    disabled: false
  },
  didMount() {
    
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    onAdd () {
      const bind = this.props.bind;
      const length = this.props.values.length;
      this.$page.$spliceData({
        [`${bind}`]: [length, 0, this.data.newCard]
      });
    },
    onDelete (e) {
      const bind = this.props.bind;
      const index = e.target.dataset.index;
      this.$page.$spliceData({
        [`${bind}`]: [index, 1]
      });
    },
    bindKeyInput (e) {
      const value = e.detail.value;
      const itemPath = e.target.dataset.itemPath;
      this.$page.setData({
        [`${itemPath}.value`]: value
      });
    },
  },
});
