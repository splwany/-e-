export default {

  submit (formName, formData, callback) {

    console.log('已进入FormModel的submit()');
    const testData = {
      userNo: '2019101601',
      regCate: '高压新装',
      equipment: [
        {userNo: '2019101604', name: '变压器', capa: '10', count: '1'},
        {userNo: '2019101604', name: '高压电机', capa: '30', count: '1'}
      ]
    };
    dd.httpRequest({
      url: `http://192.168.137.231:8080/${formName}`,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify(testData),
      dataType: 'json',
      success: (res) => {
        callback(true);
      }
    });
  }

}