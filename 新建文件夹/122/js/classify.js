
$.ajax({
  "url":"http://h6.duchengjiu.top/shop/api_cat.php",
  "type":"Get",
  "dataType":"json",
  "success":function (response) {
    console.log(response);
    if(response.data.length === 0){
      $("#classify-goods").html("<h1>你的api请求没有成功</h1>");
    };
  for(var i = 0; i<response.data.length;i++){
      var obj = response.data[i];

      $("#classify-goods-ul").append(
        '<li>'+
        '<a href ="list.html?cat_id=' +
        obj.cat_id + '">'+'<img src = "images/2'+i+".png"+'">'
        +'</a>'
        +'</li>'
      )
    }
  }

});
if (localStorage.getItem('token')) {
     $('#classify-logoin').css("display","block");
   }
// 关于lockstorge删除值得方法
$('.classify-humman').click(function(){
  console.log(11111);
  $('.classify-cart').css('display','block')
})
$(".outter").click(function(){
   localStorage.clear();
   location.assign("index");
})
