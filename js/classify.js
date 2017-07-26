
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
