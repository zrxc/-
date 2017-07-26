	 $.ajax({
	 	'url':'http://h6.duchengjiu.top/shop/api_useraddress.php?token='+localStorage.getItem('token'),
	 	'type':'GET',
	 	'data':{
	 		'pagesize':1
	 	},
	 	'dataType':'json',
	 	'success':function(response) {
	 		var html = '';
	 		// console.log(response);
	 		for (var i = 0; i < response.data.length; i++) {
		            var obj = response.data[i];
		            html += '<div class="address-item" data-id="'+obj.address_id+'">'+ obj.address_name + '&nbsp&nbsp&nbsp&nbsp' + obj.province + '&nbsp&nbsp&nbsp&nbsp'  + '&nbsp&nbsp&nbsp&nbsp '  + obj.city + '&nbsp&nbsp&nbsp&nbsp ' + obj.district + '</br>'+ obj.mobile + '&nbsp&nbsp&nbsp&nbsp ' + ' </div>';
		          	var address_id = obj.address_id;
		         
		          }
	 			$('.address-my').html(html);

	 	},
	 	"error": function() {}
	 });

// 获取结算物品
$.ajax({
	'url':'http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.getItem('token'),
	'type':'post',
	'dataType':'json',
	'success':function(response){
		var html = '';
		var moneyPay = [];
		for (var i = 0; i < response.data.length; i++) {
			var obj = response.data[i];
			html +='<div class="settlement-goods" data-id="'+ obj.cart_id+'"><img src='+ obj.goods_thumb +'><p>' + obj.goods_name + '</p><span>￥'+ obj.goods_price +'</span><b>￥'+ parseInt(obj.goods_price * 0.8) +'</b><i>八折优惠</i></div>';
			
			moneyPay.push(obj.goods_price);
			
		}
			var sum = 0;
			for(var i = 0; i < moneyPay.length; i++) {
				sum += parseInt(moneyPay[i]);
			}
				$('#payMoneyTxt').text(parseInt(sum * 0.2));
				$('#payMoneyTxts').text(parseInt(sum * 0.8));

		$('.settlement').html(html)
	},
	'error':function() {

	}
})
