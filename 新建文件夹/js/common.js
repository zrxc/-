$.getQueryString = function(name) {
  var search = location.search.substr(1);
  var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
  var r = search.match(reg);
  if (r === null) return null;
  return decodeURI(r[2]);
};

// 导航栏
//var goodsUl = document.getElementById('goods-ul');
$.ajax({
	"url": 'http://lc.shudong.wang/api_cat.php',
  	"type": "GET",
  	"dataType": "json",
  	"success": function(response){

  		for (var i = 0; i < response.data.length; i++) {
      	var obj = response.data[i];
    	$("#nav-ul").append('<li><a href="list.html?cat_id=' + obj.cat_id +'">' + obj.cat_name + '</a></li>');

   // 滑入变色

      $("#nav-ul>li").mouseover(function() {
        $(this).css('background','red');

           });
      $("#nav-ul>li").mouseout(function() {
        $(this).css('background','');

       });
    }
	},


	 "error": function(message) {

	}
});




// 搜索框
// var searchBtn = document.getElementById('search-btn');
var searchBtn = $('#search-btn');
if(searchBtn.length === 1) {
	searchBtn.click(function() {
	location.href = 'search.html?search_text=' + $('#search-text').val();
	});
}

    $('.shopp').click(function() {
      console.log(localStorage.getItem('username'));
        if(localStorage.getItem('username') == null) {
          location.href = 'login.html';
          console.log('点击');
          return;
        }else {
          location.href='shopping.html'
        }
    });

// 登录退出
  if (localStorage.getItem('token')) {
     $('.header').html(localStorage.getItem('username'));
   }
   $('.out>a').click(function() {
    localStorage.clear();
   });
window.shop = {
    config: {
        API_PREFIX: "http://h6.duchengjiu.top/shop/",
        PAGESIZE: 10,
        USER_TOKEN: 'token',
        CART_PREFIX: 'cart_'//在本地存储商品ID和对应数量的时候使用
    },
    base: {
        storage: {
            "setItem": function(k, v) {
                return localStorage.setItem(k, v);
            },
            "getItem": function(k) {
                return localStorage.getItem(k);
            }
        },
        business: {
            "getToken": function() {
                return shop.base.storage.getItem(shop.config.USER_TOKEN);
            },
            "saveGoodsInfoOfCart": function(goods_id, number) {
                return shop.base.storage.setItem(shop.config.CART_PREFIX + goods_id, number);
            }
        }
    },
    api: {
        fetchGoodsCategory: function(callback){
            $.get(shop.config.API_PREFIX + 'api_cat.php', callback, 'json');
        },
        fetchGoodsListByCatId: function(cat_id, callback){
            $.get(shop.config.API_PREFIX + 'api_goods.php', "cat_id="+cat_id, callback, 'json');
        },
        fetchGoodsDetail: function(goods_id, callback) {
            $.get(shop.config.API_PREFIX + 'api_goods.php', "goods_id="+goods_id, callback, 'json');
        },
        fetchHotGoods: function(callback){
            $.get(shop.config.API_PREFIX + 'api_goods.php', callback, 'json');
        },
        searchGoods: function(opts){
            var data = {};
            data.search_text = opts.search_text;
            data.page = opts.page || 1;
            data.pagesize = opts.pagesize || shop.config.PAGESIZE;
            var callback = opts.callback;
            $.get(shop.config.API_PREFIX + 'api_goods.php', data, callback, 'json');
        },
        checkUsernameUnique: function(username, callback) {
            var data = {
                "status": "check",
                "username": username
            };
            $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
        },
        register: function(username, password, callback){
            var data = {
                "status": "register",
                "username": username,
                "password": password
            };
            $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
        },
        login: function(username, password, callback){
            var data = {
                "status": "login",
                "username": username,
                "password": password
            };
            $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
        },
        updateCart: function(goods_id, number, callback) {
            var data = {
                "goods_id": goods_id,
                "number": number
            };
            $.post(shop.config.API_PREFIX + 'api_cart.php?token='+shop.base.business.getToken(), data, callback, 'json');
        },
        fetchCart: function(callback){
            $.get(shop.config.API_PREFIX + 'api_cart.php', "token="+shop.base.business.getToken(), callback, 'json');
        },
        fetchUserAddress: function(callback) {
            $.get(shop.config.API_PREFIX + 'api_useraddress.php', "token="+shop.base.business.getToken(), callback, 'json');
        },
        addUserAddress: function(data, callback){
            $.post(shop.config.API_PREFIX + 'api_useraddress.php?token='+shop.base.business.getToken() + '&status=add', data, callback, 'json');
        },
        delteUserAddress: function(){

        },
        editUserAddress: function(){ },//:TODO
        fetchOrder: function(callback){//获取当前用户的订单列表
            $.get(shop.config.API_PREFIX + 'api_order.php', "token="+shop.base.business.getToken(), callback, 'json');
        },
        addOrder: function(address_id, total_prices, callback){
            var data = {
                "address_id": address_id,
                "total_prices": total_prices
            };
            $.post(shop.config.API_PREFIX + 'api_order.php?token='+shop.base.business.getToken()+'&status=add', data, callback, 'json');
        },
        cancelOrder: function(){

        }
    }
};


var goodsUl = document.getElementById('goods-ul');
//获取分类信息
if (goodsUl) {//如果页面上面有这个元素则显示出来
    shop.api.fetchGoodsCategory(function(response){
        var oNavLiTemplateStr = document.getElementById('nav-li-template').innerHTML;
        //处理返回的数据
        for (var i = 0; i < response.data.length; i++) {
            var obj = response.data[i];
            // var diyClassName = '';
            // if (i % 5 === 0) {
            //     diyClassName = "zihao";
            // }
            $('#nav-ul').append('<li class="' + diyClassName + '"><a href="list.html?cat_id=' + obj.cat_id + '">' + obj.cat_name + '</a></li>')
        }
    });
}

//添加搜索功能
var searchBtn = $("#search-btn");
if (searchBtn.length === 1) {
    searchBtn.click(function(){
        location.href = 'search.html?search_text=' + $("#search-text").val();
    });
}

//更新购物车的方法
function updateCartInfo(goods_id, goods_number, callback) {
    shop.api.updateCart(goods_id, goods_number, function(response) {
        console.log(response);
        //加入购物车了之后把商品ID和对应的数量存储到本地
        shop.base.business.saveGoodsInfoOfCart(goods_id, goods_number);
        callback(response);
    });
}






   