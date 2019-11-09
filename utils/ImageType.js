

var Type = {
  'Apply01' : '01',     //申请表类型1图片
  'Apply02' : '02',     //申请表类型2图片
  'STAFF_SING' : '10',  //客户数字签名图片
  'GOODS' : '20',        //物资图片
  'DNT_GOODSSELECT':'03' //配网提交
}

function ImageType(){
  return Object.freeze(Object.assign({},Type));
}

Object.assign(ImageType,Type);
export default ImageType