import defaultData from "./config";
import Toast from "../../utils/Toast";
import StationService from "../../service/StationService";
import PowerLineService from "../../service/PowerLineService";

Component({
  mixins: [],
  data: {
    loaded: false,
    values: {},
  },
  props: {
    bind: '',    //绑定的页面数据变量名
    type: ''    //用来区分高低压
  },
  didMount() {
    const bind = this.props.bind;
    if(this.$page[bind] && this.$page[bind].success) {    // 先从页面恢复data数据
      this.setData({
        values: this.$page[bind],
        loaded: true
      });
    } else {    // 如果页面没有变电站数据和线路数据，则获取变电站数据和线路数据
      dd.showLoading({
        content: '请稍后...'
      });
      StationService.getAllStation()    //获取所有变电站数据
        .then(stationList => {
          dd.hideLoading();
          if (this.props.type === 'high') {
            this.setData({
              'values.success': true,
              'values.value[0].array': stationList
            });
          } else {
            this.setData({
              'values.success': true,
              'values.value.lowDefault1[0].array': stationList
            });
          }
        })
        .catch(err => {
          Toast.failToast('获取变电站失败');
          this._fillOutFakeStationList();
        });
      this.setData({
        'values.level': 0,    //记录级数
        'values.value': defaultData[this.props.type],
        loaded: true
      });
    }
    
  },

  didUnmount() {
    const bind = this.props.bind;
    // 把data数据给页面，方便切回组件的时候用
    this.$page[bind] = this.data.values;

    // 生成需要的数据格式给页面，用于表单提交
    this._generateValues();
  },
  methods: {

    /**
     * 点击添加按钮时触发
     */
    onAdd () {
      const level = this.data.values.level + 1;
      const value = this.data.values.value;
      const newItem = defaultData[level>3?3:level];
      const pole = defaultData['pole'];

      this.setData({
        'values.level': level
      });

      if(this.props.type === 'high') {
        this.$spliceData({
          'values.value': [value.length, 0, newItem, pole]
        });
      } else {
        this.$spliceData({
          'values.value.lowDefault1': [value.lowDefault1.length, 0, newItem, pole]
        });
      }
    },

    /**
     * 点击删除按钮时触发
     */
    onDelete () {
      const level = this.data.values.level - 1;
      const value = this.data.values.value;
      
      this.setData({
        'values.level': level
      });

      if(this.props.type === 'high') {
        this.$spliceData({
          'values.value': [value.length-2, 2]
        });
      } else {
        this.$spliceData({
          'values.value.lowDefault1': [value.lowDefault1.length-2, 2]
        });
      }
    },

    /**
     * 输入框文字改变时触发
     */
    input (e) {
      const value = e.detail.value;
      const itemPath = e.target.dataset.itemPath;
      this.setData({
        [`${itemPath}.value`]: value
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

      if(itemIndex === 0) {    //如果改变的是变电站选项，则获取对应的线路列表并填入数据
        const stationNo = array[index].stationNo;
        this._fillOutPowerLineList(stationNo);
      }
      this.setData({
        [`${itemPath}.index`]: index,
        [`${itemPath}.value`]: array[index][rangeKey]
      });
    },

    _generateValues () {
      const bind = this.props.bind;
      let value = null;    //高压线路部分
      let lowValue = null;    //低压线路部分
      
      if(this.props.type === 'high') {
        value = this.data.values.value;
      } else {
        value = this.data.values.value.lowDefault1;
        lowValue = this.data.values.value.lowDefault2;    //低压线路部分
      }

      const station = value[0].value;    //获取变电站名称
      const powerline = value[1].value;    //获取线路10千伏线路名称
      const pole = value[2].value ? `(${value[2].value})` : '';    //获取第一个杆的值
      let tmp = {
        station: station,    //变电站名称
        powerline: `${powerline}${pole}`    //10千伏线路和对应的电线杆组合
      };
    
      let extra = '';    //扩展字段文本初始值
      for(let i=3; i<value.length-1; i+=2) {    //遍历高压线路数据
        const title = value[i].title;    //分岐、分支、支
        const value1 = value[i].value;    //分岐名字、分支名字、支名字
        const value2 = value[i+1].value ? `(${value[i+1].value})` : '';    //杆号
        const str = `${value1}${title}${value2}，`;
        extra += str;    //拼接入extra
      }
      tmp.extra = extra==='' ? null : extra.substring(0, extra.length-1)+'。';

      // 以下是低压答复单情况，需填写低压线路
      if(lowValue) {
        const area = lowValue[0].value;    //获取低压台区名称
        const lowPowerline = lowValue[1].value;    //0.4千伏线名称
        const lowPole = lowValue[2].value ? `(${lowValue[2].value})` : '';    //低压电线杆号
        tmp.area = area;
        tmp.lowPowerline = `${lowPowerline}${lowPole}`;
      }

      this.$page.setData({
        [`${bind}`]: tmp
      });

    },

    /**
     * 填入10千伏线路列表
     */
    _fillOutPowerLineList (stationNo) {
      dd.showLoading({
        content: '请稍后...'
      });
      PowerLineService.selectByStationNo(stationNo)    //获取10千伏线路列表
        .then(powerlineList => {
          dd.hideLoading();
          if (this.props.type === 'high') {
            this.setData({
              'values.value[1].array': powerlineList
            });
          } else {
            this.setData({
              'values.value.lowDefault1[1].array': powerlineList
            });
          }
        })
        .catch(err => {
          Toast.failToast('获取线路失败');
          this._fillOutFakePowerLineList();
        });
    },

    /**
     * 填入假的变电站数据，待删
     */
    _fillOutFakeStationList () {
      const values = [
        {
          stationNo: '111',
          stationName: '111变'
        },
        {
          stationNo: '222',
          stationName: '222变'
        },
        {
          stationNo: '333',
          stationName: '333变'
        }
      ];
      if(this.props.type === 'high') {
        this.setData({
          'values.success': true,
          'values.value[0].array': values
        });
      } else {
        this.setData({
          'values.success': true,
          'values.value.lowDefault1[0].array': values
        }); 
      }
    },

    _fillOutFakePowerLineList () {
      const values = [
        {
          'powerlineNo': '123124',
          'stationNo': '111',
          'powerlineName': '111线'
        },
        {
          'powerlineNo': '123125',
          'stationNo': '111',
          'powerlineName': '222线'
        },
        {
          'powerlineNo': '123126',
          'stationNo': '111',
          'powerlineName': '333线'
        }
      ];
      if(this.props.type === 'high') {
        this.setData({
          'values.success': true,
          'values.value[1].array': values
        });
      } else {
        this.setData({
          'values.success': true,
          'values.value.lowDefault1[1].array': values
        });
      }
    },
  }
});
