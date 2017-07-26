getQueryString = function(name) {
  var search = location.search.substr(1);
  var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
  var r = search.match(reg);
  if (r === null) return null;
  return decodeURI(r[2]);
};
var cat_id = getQueryString('cat_id');
// 以下是登录的后的相关的操作的js
// if (sessionStorage.getItem('token')) {
//      $('#classify-logoin').css("display","block");
//    }



// 以上是订单的登录后的页面的相关的JS
$.ajax({
  "url":'http://h6.duchengjiu.top/shop/api_goods.php?cat_id='+cat_id,
  "type":"GET",
  "dataType":"json",
  "success":function (response) {
    console.log(response);
    if(response.data.length === 0){
      $("#list-item").html("<h1>获取失败!!!</h1>");
    };
    for(var i = 0;i<response.data.length;i++){
      var obj = response.data[i];
      console.log(obj);
      $("#list-item-ul").append('<li>'
      +'<a href="detail.html?goods_id='+obj.goods_id+'">'
      +'<img class = "list-item-img" src = "'+obj.goods_thumb+'">'
      +'<p>'+obj.goods_name
      +'</p>'
      +'<span>'
      +"￥"+obj.price
      +'</span>'
      +'<img class = "aixin" src = "images/22958.png">'
      +'</a>'
      +'</li>'
    )
    }

  }
});
