 	$.getQueryString = function(name) {
  var search = location.search.substr(1);
  var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
  var r = search.match(reg);
  if (r === null) return null;
  return decodeURI(r[2]);
};
// <!-- Jump 跳转APP -->

   	$('cancel').on('touchstart',function() {
   		$('.jump').style.display = 'none';
    	$('.search').style.top = '0';
    	$('.carousel').style.marginTop = '4rem';
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

// 跳转主页
$('footer li:eq(0) a').attr("href","index.html");

	
 
  