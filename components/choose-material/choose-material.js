Component({
  mixins: [],
  data: {
  
  },
  props: {
    bind: '',
    length: 0,
    values: {}
  },
  didMount() {
    if(this.props.values.array) return;
    // 数据库返回typeList
    const typeList = [
      {
        goodsName: '型号1',
        goodsPrice: 100.50
      },
      {
        goodsName: '型号2',
        goodsPrice: 200.65
      },
      {
        goodsName: '型号3',
        goodsPrice: 300.80
      }
    ];
    this.$page.setData({
      [`${this.props.bind}.array`]: typeList
    });
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    onAdd (e) {
      const bind = this.props.bind;
      const length = e.target.dataset.length;
      const newItem = [
        {
          name: 'goodsName',
          title: '型号',
          array: this.props.values.array,
          index: -1,
        },
        {
          name: 'goodsQty',
          title: '数量',
          disabled: true
        }
      ];
      this.$page.$spliceData({
        [`${bind}.value`]: [length, 0, newItem]
      });
    },
    onDelete (e) {
      const bind = this.props.bind;
      const index = e.target.dataset.index;
      this.$page.$spliceData({
        [`${bind}.value`]: [index, 1]
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
        [`${itemPath}[0].index`]: choosedIndex,
        [`${itemPath}[0].value`]: value
      }, ()=>{
        this.$page.setData({
          [`${this.props.bind}.value[${index}][1].value`]: 1,
          [`${this.props.bind}.value[${index}][1].disabled`]: false
        });
      });
    },
    bindKeyInput (e) {
      const value = e.detail.value;
      const itemPath = e.target.dataset.itemPath;
      this.$page.setData({
        [`${itemPath}[1].value`]: value
      });
    },
  },
});
