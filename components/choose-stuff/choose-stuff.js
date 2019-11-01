import DepartService from "/service/DepartService";
import StaffService from "/service/StaffService";


Component({
  mixins: [],
  data: {
    count: 0,
    canAdd: true,
  },
  props: {
    staffList: [],
    max: 1
  },
  didMount() {
    if(this.$page.data.departmentList) return;
    const departmentList = [
      {
        departNo: 'YJB',
        departName: '运检部'
      }
    ];
    this.$page.setData({
      departmentList: departmentList
    });

    // DepartService.getAllDepart().then(result=>{    //获取部门列表departmentList
    //   this.$page.setData({
    //     departmentList: result
    //   });
    // });
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    onAdd () {
      const count = this.data.count + 1;
      this.setData({
        count: count
      });
      if(count >= this.props.max) {
        this.setData({
          canAdd: false
        });
      }
      const newItem = {
        department: {
          array: this.$page.data.departmentList,
          index: -1
        }
      };
      this.$page.$spliceData({
        staffList: [this.$page.data.staffList.length, 0, newItem]
      });
    },
    onDelete (e) {
      const index = e.target.dataset.index;
      this.setData({
        count: this.data.count - 1
      }, () => {
        this.$page.$spliceData({
          staffList: [index, 1]
        });
        if(this.data.count < this.props.max) {
          this.setData({
            canAdd: true
          });
        }
      });
    },
    onDepartChange (e) {
      const choosedIndex = e.detail.value;
      const index = e.target.dataset.index;
      this.$page.setData({
        [`staffList[${index}].department.index`]: choosedIndex
      });
      
      const choosedDepartNo = this.$page.data.staffList[index].department.array[choosedIndex].departNo;
      const staffList = [
        {
          staffName: '魏鑫',
          staffAccount: '1234567'
        },
        {
          staffName: '刘炎',
          staffAccount: '7654321'
        },
        {
          staffName: '张凡',
          staffAccount: '1234566'
        }
      ];
      const staff = {
        array: staffList,
        index: 0,
        value: staffList[0].staffAccount,
        pickerDisabled: false
      };
      this.$page.setData({
        [`staffList[${index}].staff`]: staff
      });
      
      // StaffService.selectStaffByDepart(choosedDepartNo).then(res=>{    //获取该部门下的人员列表
      //   const staff = {
      //     array: res,
      //     index: 0,
      //     value: res[0].staffAccount,
      //     pickerDisabled: false
      //   };
      //   this.$page.setData({
      //     [`staffList[${index}].staff`]: staff
      //   });
      // }).catch(res=>{
      //   console.log(res);
      //   const staff = {
      //     pickerDisabled: true
      //   };
      //   this.$page.setData({
      //     [`staffList[${index}].pickerDisabled`]: true,
      //     [`staffList[${index}].staff`]: staff
      //   });
      // });
    },
    onStuffChange (e) {
      const choosedIndex = e.detail.value;
      const index = e.target.dataset.index;
      this.$page.setData({
        [`staffList[${index}].staff.index`]: choosedIndex,
        [`staffList[${index}].staff.value`]: this.$page.data.staffList[index].staff.array[choosedIndex].staffAccount,
      });
    },
  },
});
