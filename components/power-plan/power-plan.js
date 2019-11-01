// import service from "/service/GoodsService";


Component({
  mixins: [],
  data: {

  },
  props: {
    bind: '',
    values: {}
  },
  didMount() {
    const bind = this.props.bind;
    // const voltageList = service.getAllVoltage();    //获取变电站列表
    const voltageList = [
      {
        stationNo: '123213',
        stationName: '大城子变'
      },
      {
        stationNo: '324325',
        stationName: '乱七八糟变'
      },
      {
        stationNo: '353453',
        stationName: '各种变'
      }
    ];
    this.$page.setData({
      [`${bind}[0].array`]: voltageList
    });
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    bindStationChange (e) {
      const choosedIndex = e.detail.value;
      const array = e.target.dataset.array;
      const rangeKey = e.target.dataset.rangeKey;
      const itemPath = e.target.dataset.itemPath;
      const value = array[choosedIndex][rangeKey];
      this.$page.setData({
        [`${itemPath}.index`]: choosedIndex,
        [`${itemPath}.value`]: value
      }, ()=>{
        // const lineList = service.getAllLine(array[choosedIndex].stationNo);    //根据变电站编号获取线路列表
        const lineList = [
          {
            powerlineNo: '23423423',
            powerlineName: '某某线'
          },
          {
            powerlineNo: '23423344',
            powerlineName: '叉叉线'
          },
          {
            powerlineNo: '23343423',
            powerlineName: '乱七八糟线'
          }
        ];
        this.$page.setData({
          [`${this.props.bind}[1].array`]: lineList,
          [`${this.props.bind}[1].pickerDisabled`]: false
        });
      });
    },
    bindPowerlineChange (e) {
      const choosedIndex = e.detail.value;
      const array = e.target.dataset.array;
      const rangeKey = e.target.dataset.rangeKey;
      const itemPath = e.target.dataset.itemPath;
      const value = array[choosedIndex][rangeKey];
      this.$page.setData({
        [`${itemPath}.index`]: choosedIndex,
        [`${itemPath}.value`]: value
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
