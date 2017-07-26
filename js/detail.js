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
var number2 = 0;
// gen();
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
    price.className = "goods_price";
    price.innerHTML = "￥"+obj.price;
    oDiv.appendChild(price);
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

      Input.value = number ;
    };

    Sopan.onclick = function(){
      number--;

       Input.value = number ;
       if(number<1){
         number = 1;
       };
       if(Input.value<1){
          Input.value = 1;
       };

    }


    Input.value = number;

    var btn = $(".detail_cart")[0];
    console.log(localStorage.token)
    btn.onclick = function(){
      if(!localStorage.token){
        console.log('1234');
        location.href = 'register.html';
        return;
      }else{
        $.ajax({
           "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
           'type':'post',
           'dataType':'json',
           'data':{
            "goods_id":goods_id,
            'number':number
           },
           'success':function(response){
              console.log(response);
              if(response.code === 0) {
                $('.join').html('<span>加入成功</span>');
                setTimeout(function() {
                  $('.join span').hide();
                },1000)
              }
              if(response.code === 2) {
                 $('.join').html('<span>购物车已拥有</span>');
                 setTimeout(function() {
                  $('.join span').hide();
                },1000)
              }
           }
        });
      };

      // 这个部分是判断的
      // $.ajax({
      //       "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
      //       "type":"GET",
      //       "dataType":"json",
      //       "success":function (response) {
      //         console.log(response);
      //         for(var i = 0 ;i<response.data.length;i++){
      //           var obj = response.data;
      //           console.log(obj);
      //         if(obj[i].goods_id == goods_id){
      //           console.log(obj[i].goods_id);
      //           var shua = parseInt(obj[i].goods_number);
      //           console.log(shua);
      //           number2 = number + shua;

      //           $.ajax({
      //             "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
      //             "type":"post",
      //             "data":{
      //               "goods_id":goods_id,
      //               "number":number2
      //             },
      //             "dataType":"json",
      //             "success":function(response){
      //                 console.log(response);
      //                 console.log(123223);
      //             }
      //           });

      //         }else {
      //           $.ajax({
      //             "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
      //             "type":"post",
      //             "data":{
      //               "goods_id":goods_id,
      //               "number":number
      //             },
      //             "dataType":"json",
      //             "success":function(response){
      //                 console.log(response);
      //                 // gen();
      //             }
      //           })
      //         };

      //       }
      //     }
      //   });
      }
  }
});

var jun = document.getElementById('classify-logo');
console.log(jun);
if(localStorage.getItem('token')){
  $('.classify-logo').html("");
}
function gen() {
  var logoin = document.getElementById('classify-logoin');
  console.log(logoin);
  $.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
    "type":"GET",
    "dataType":"json",
    "success":function (response) {
      var Txt = document.createElement("div");
      Txt.className = "txt";
      logoin.appendChild(Txt);
      for(var i = 0;i<response.data.length;i++){
        Txt.innerText = response.data.length;
      }
    }
  })
}
