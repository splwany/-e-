// import service from "/service/Goods";

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
      const goodsClassList = ['类别1', '类别2', '类别3'];    //从服务器获取类别列表
      this.$page.setData({
        goodsClassList: goodsClassList
      }, ()=>{
        this.setData({
          'newItem[0].array': this.$page.data.goodsClassList
        });
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
      }, ()=>{
        // const typeList = service.getAllTypes(value);    //根据物资类别名称物资型号列表
        const typeList = [
          {
            goodsName: '型号1',
            goodsPrice: 10000
          },
          {
            goodsName: '型号2',
            goodsPrice: 5000
          },
          {
            goodsName: '型号3',
            goodsPrice: 20000
          }
        ];
        this.$page.setData({
          [`${this.props.bind}[${index}][1].array`]: typeList,
          [`${this.props.bind}[${index}][1].pickerDisabled`]: false
        });
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
