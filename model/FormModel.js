export default {

  submit (formName, formData) {

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
      url: `http://192.168.137.166:8080/${formName}`,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify(testData),
      dataType: 'json',
      success: (res) => {
        return new Promise((resolve) => {
          resolve(res);
        });
      },
      fail: () => {
        return new Promise((resolve) => {
          resolve('失败了');
        });
      }
    });

  }

}