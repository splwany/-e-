import Form from "/pages/form/form";


Component({
  mixins: [],
  data: {

  },
  props: {
    bind: '',
    values: {},
    onChange: {}
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
      let values = this.props.values;
      values.value.splice(values.value.length, 0, values.data);
      this.props.onChange({
        detail: {
          values: values
        }
      });
    },

    /**
     * 点击删除按钮
     */
    onDelete (e) {
      let values = this.props.values;
      const index = e.target.dataset.index;
      values.value.splice(index, 1);
      this.props.onChange({
        detail: {
          values: values
        }
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
