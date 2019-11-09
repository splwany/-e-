import StationService from "../../service/StationService";
import PowerLineService from "../../service/PowerLineService";
import Toast from "../../utils/Toast";


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
    StationService.getAllStation()    //获取变电站列表
      .then(voltageList => {
        this.$page.setData({
          [`${bind}[0].array`]: voltageList
        });
      })
      .catch(err => {
        Toast.failToast('网络异常');
      })
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
        PowerLineService.selectByStationNo(array[choosedIndex].stationNo)    //根据变电站编号获取线路列表
          .then(lineList => {
            this.$page.setData({
              [`${this.props.bind}[1].array`]: lineList,
              [`${this.props.bind}[1].pickerDisabled`]: false
            });
          })
          .catch(err => {
            Toast.failToast('网络异常');
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
