Component({
  mixins: [],
  data: {

  },
  props: {
    bind: '',
    onChange: {}
  },
  didMount() {
    this.setData({
      structure: this.$page.data[this.props.bind].data,
      value: this.$page.data[this.props.bind].value
    });
  },
  didUpdate() {},
  didUnmount() {},
  methods: {

    /**
     * 点击添加按钮
     */
    onAdd () {
      const bind = this.props.bind;    //绑定的页面属性
      const length = this.data.value.length;
      this.$spliceData({
        value: [length, 0, this.data.structure]
      },()=>{
        this.props.onChange(`${bind}.value`, this.data.value);
      });
    },

    /**
     * 点击删除按钮
     */
    onDelete () {

    },

    /**
     * 输入框输入文字时触发
     */
    bindKeyInput (e) {
      const itemPath = e.target.dataset.itemPath;
      const path = itemPath.split('.')[1];
      const value = e.detail.value;
      this.setData({
        [`${path}.value`]: value
      },()=>{
        this.props.onChange(`${itemPath}.value`, value);
      });
    },

    /**
     * 选项改变时触发
     */
    bindPickerChange (e) {
      const itemPath = e.target.dataset.itemPath;
      const path = itemPath.split('.')[1];
      const array = e.target.dataset.array;
      const index = e.detail.value;
      this.setData({
        [`${path}.index`]: index,
        [`${path}.value`]: array[index]
      },()=>{
        this.props.onChange(`${itemPath}.index`, index);
        this.props.onChange(`${itemPath}.value`, array[index]);
      });
    },

    /**
     * 日期选择
     */
    onDatePick (e) {
      
    },

    /**
     * 点击图片添加按钮时触发
     */
    addImage (e) {
      
    },

  },
});
