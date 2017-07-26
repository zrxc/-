getQueryString = function(name) {
  var search = location.search.substr(1);
  var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
  var r = search.match(reg);
  if (r === null) return null;
  return decodeURI(r[2]);
};
var goods_id = getQueryString('goods_id');
var goods = document.getElementById('detail-goods');
var number = 1;

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
     opan = document.createElement('span');
    opan.innerHTML = "+";
    Input = document.createElement('input');
    Input.value = number;
    Sopan = document.createElement('span');
    Sopan .innerHTML = "-";
    oDiv.appendChild(price);
    oDiv.appendChild( opan);
    oDiv.appendChild(Input);
    oDiv.appendChild( Sopan);
    opan.className="jaoha0";
    Sopan.className = "jianhao";
    Input.setAttribute("id","iput");

    oP.innerText = obj.goods_desc;

    opan.onclick = function(){
      number++;
      console.log(number); 
      Input.value = number ;
    };

    Sopan.onclick = function(){
      number--;
      console.log(number);
       Input.value = number ;

    }
    if(number<1){
      number = 1;
    }
    var btn = $(".detail_cart")[0];
    console.log(btn);
    console.log(localStorage.token)
    btn.onclick = function(){
      if(!localStorage.token){
        location.href = 'login.html#callback ='+location.href;
        return;
      }
      $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
        "type":"post",
        "data":{
          "goods_id":goods_id,
          "number":number
        },
        "dataType":"json",
        "success":function(response){
          console.log(response);
        }
      })
    }
  }
})
var jian = document.getElementsByClassName('jaoha0');
var jia = document.getElementsByClassName('jianhao');
var Iputv = document.getElementById('iput');

