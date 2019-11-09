import DepartService from "../../service/DepartService";
import StaffService from "../../service/StaffService";
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
    if(this.props.values.department && this.props.values.value.length!==0) return;
    DepartService.getAllDepart().then(departmentList => {    //获取部门列表departmentList
      this.$page.setData({
        [`${this.props.bind}.department`]: departmentList,
        [`${this.props.bind}.count`]: 0,
        [`${this.props.bind}.canAdd`]: true
      });
    }).catch(err => {    //使用预定义数据
      Toast.failToast('获取部门列表失败');
    });
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    onAdd () {
      const count = this.props.values.count + 1;
      this.$page.setData({
        [`${this.props.bind}.count`]: count
      });

      if(count >= this.props.values.max) {
        this.$page.setData({
          [`${this.props.bind}.canAdd`]: false
        });
      }
      const newItem = {
        department: {
          array: this.props.values.department,
          index: -1
        }
      };
      console
      this.$page.$spliceData({
        [`${this.props.bind}.value`]: [this.props.values.value.length, 0, newItem]
      });
    },
    onDelete (e) {
      const index = e.target.dataset.index;
      const count = this.props.values.count
      this.$page.$spliceData({
        [`${this.props.bind}.value`]: [index, 1]
      }, () => {
        if(count < this.props.values.max) {
          this.$page.setData({
            [`${this.props.bind}.canAdd`]: true
          });
        }
        this.$page.setData({
          [`${this.props.bind}.count`]: count - 1
        });
      });
    },
    onDepartChange (e) {
      const choosedIndex = e.detail.value;
      const index = e.target.dataset.index;
      this.$page.setData({
        [`${this.props.bind}.value[${index}].department.index`]: choosedIndex
      });
      
      const choosedDepartNo = this.$page.data.staffList.value[index].department.array[choosedIndex].departNo;
      StaffService.selectStaffByDepart(choosedDepartNo).then(staffList=>{    //获取该部门下的人员列表
        const staff = {
          array: staffList,
          index: 0,
          value: staffList[0].staffAccount,
          pickerDisabled: false
        };
        this.$page.setData({
          [`${this.props.bind}.value[${index}].staff`]: staff
        });
      }).catch(res => {
        console.log(res);
        const staff = {
          pickerDisabled: true
        };
        this.$page.setData({
          [`${this.props.bind}.value[${index}].staff`]: staff
        });
      });
    },
    onStuffChange (e) {
      const choosedIndex = e.detail.value;
      const index = e.target.dataset.index;
      this.$page.setData({
        [`${this.props.bind}.value[${index}].staff.index`]: choosedIndex,
        [`${this.props.bind}.value[${index}].staff.value`]: this.$page.data.staffList.value[index].staff.array[choosedIndex].staffAccount,
      });
    },
  },
});
