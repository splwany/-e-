Component({
  mixins: [],
  data: {},
  props: {
    value: {},
    itemPath: null,
    onChange: null
  },
  didMount() {
    this.setData({
      values: this.props.value
    });
  },
  didUpdate() {},
  didUnmount() {},
  methods: {

    onCheckTap (e) {
      const index = e.target.dataset.index;
      const checked = this.data.values.array[index].checked;
      this.setData({
        [`values.array[${index}].checked`]: !checked
      }, () => {
        const checkedList = this._makeCheckedList();
        const values = this.data.values;
        values.value = checkedList;
        const event = {
          detail: {
            value: values
          },
          target: {
            dataset: {
              itemPath: this.props.itemPath
            }
          }
        };
        this.props.onChange(event);
      });
    },
    _makeCheckedList () {
      const values = this.data.values;
      let checkedList = [];
      for(let item of values.array) {
        if(item.checked) checkedList.push(item.value);
      }
      return checkedList;
    },

  },
});
