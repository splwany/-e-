import Form from "../../pages/form/form";


Component({
  mixins: [],
  data: {

  },
  props: {
    bind: '',
    values: {}
  },
  didMount() {

  },
  didUpdate() {},
  didUnmount() {},
  methods: {

    /**
     * 点击添加按钮
     */
    onAdd () {
      const values = this.props.values;
      this.$page.$spliceData({
        [`${this.props.bind}.value`]: [values.value.length, 0, values.data]
      });
    },

    /**
     * 点击删除按钮
     */
    onDelete (e) {
      const index = e.target.dataset.index;
      this.$page.$spliceData({
        [`${this.props.bind}.value`]: [index, 1]
      });
    },

    /**
     * 输入框输入文字时触发
     */
    bindKeyInput (e) {
      Form.bindKeyInput(this.$page, e);
    },

    /**
     * 选项改变时触发
     */
    bindPickerChange (e) {
      Form.bindPickerChange(this.$page, e);
    },

  },
});
