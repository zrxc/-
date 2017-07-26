
 $('.myaddress span').on('touchstart', function() {
	 	console.log(11);
	 	$('.increase').show();

	 })
	 $('.newly span').on('touchstart', function() {
	 	$('.increase').hide();
	 })
   

if (localStorage.getItem('token')) {
    $('.username').attr('href','').html(localStorage.getItem('username'))
 }

 $('#add').click(function() {
	    var data = $("form").serialize();
	    console.log(data);
	    $.post('http://h6.duchengjiu.top/shop/api_useraddress.php?status=add&token=' + localStorage.getItem("token"), 
	    	data, 
	 		function(response) {
	 			 if(response.code === 0 ) {
		          	$('.increase').hide();
		          	fetchUserAddress();
		          }
	 		},
	 		'json'
		);
 });

 fetchUserAddress() ;
 	function fetchUserAddress() {
	 $.ajax({
	 	'url':'http://h6.duchengjiu.top/shop/api_useraddress.php?token='+localStorage.getItem('token'),
	 	'type':'GET',
	 	'dataType':'json',
	 	'success':function(response) {
	 		var html = '';
	 		// console.log(response);
	 		for (var i = 0; i < response.data.length; i++) {
		            var obj = response.data[i];
		            html += '<div class="address-item" data-id="'+obj.address_id+'">'+ obj.address_name + '&nbsp&nbsp&nbsp&nbsp' + obj.province + '&nbsp&nbsp&nbsp&nbsp'  + '&nbsp&nbsp&nbsp&nbsp '  + obj.city + '&nbsp&nbsp&nbsp&nbsp ' + obj.district + '</br>'+ obj.mobile + '&nbsp&nbsp&nbsp&nbsp ' + ' <span class="out" address_id='+obj.address_id+');>删除</span></div>';
		          	var address_id = obj.address_id;
		         
		          }
				var out = document.getElementsByClassName('out');
				console.log(out);
	 			$('.address-my').html(html);
					bb(address_id);

	 	},
	 	"error": function() {}
	 });
	}
	function fun(address_id) {
		 $.get('http://h6.duchengjiu.top/shop/api_useraddress.php?token='+ localStorage.getItem('token'),
			{
				'status':'delete',
				'address_id':address_id
			},
			function(response){
				console.log(response);
				
			},
			'json'
		);
	}

	
function bb(address_id){
	var a = $('.out');
    a.click(function(){
    	var self = this;
    	$('.delete').show();
    	$('.delete span:eq(0)').on('touchstart',function() {

    		fun($(self).attr('address_id'));
    		$(self).parent().remove();
    		$('.delete').hide();
    	})
    	$('.delete span:eq(1)').on('touchstart',function() {
    		$('.delete').hide();
    	})	
    })
}




