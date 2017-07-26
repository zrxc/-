getQueryString = function(name) {
  var search = location.search.substr(1);
  var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
  var r = search.match(reg);
  if (r === null) return null;
  return decodeURI(r[2]);
};
var goods_id = getQueryString('goods_id');
console.log(goods_id);
var goods = document.getElementById('detail-goods');
console.log(goods);
$.ajax({
  "url":"http://h6.duchengjiu.top/shop/api_goods.php?goods_id="+goods_id,
  "type":"GET",
  "dataType":"json",
  "success":function (response) {
    console.log(response);
    var obj = response.data[0];
    var oDiv = document.createElement('div');
    var oImg = document.createElement('img');
    oImg.className = "goods-img";
    oImg.src = obj.goods_thumb;
    goods.appendChild(oDiv);
    oDiv.appendChild(oImg);
    oDiv.className="active";
    var oP =document.createElement('p');
    oP.className = 'wenben'
    oDiv.appendChild(oP);
    var price = document.createElement('span');
    

    oP.innerText = obj.goods_desc;

  }
})
