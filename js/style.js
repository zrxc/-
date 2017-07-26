 	$.getQueryString = function(name) {
  var search = location.search.substr(1);
  var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
  var r = search.match(reg);
  if (r === null) return null;
  return decodeURI(r[2]);
};
// <!-- Jump 跳转APP -->

   	$('.cancel').on('touchstart',function() {
      console.log(1);
   		$('.jump').hide();
    	$('.search').css('top','0');
    	$('.carousel').css('marginTop' , '4rem');
   	})
    		

    // <!-- search  搜索-->
var searchBtn = $('#search-btn');
searchBtn.on('touchstart',function() {
	if($('#search-text').val() === '') {
		return;
	}
  else{
	 location.href = 'search.html?search_text=' + $('#search-text').val();
	}
});




 $("#user").click(function () {
        $("#list").toggle();
    })

 // 关于lockstorge删除值得方法

$('.classify-humman').click(function(){
  console.log(11111);
  $('.classify-cart').toggle();
})
$(".outter").click(function(){
   localStorage.clear();
   location.assign("index.html");
})

// 登录后样式
if (localStorage.getItem('token')) {
     $('#classify-logoin').show();
     $('.classify-logo a').hide();
   }

  