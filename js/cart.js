$(function () {
    $('#btn_submit').on('touchstart',function () {
        location.assign('checkout.html?total=' + $('#payMoneyTxt').text());
    });
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
        "type": "GET",
        "dataType": "json",
        "goods_id": "goods_id",
        "success": function (response) {
            console.log(response);
            var obj = response.data;
            console.log(obj);
            var moneyPay = [];
            if (response.data.length > 0) {
                //令购物车图标里的数字显示
                // $("#shuZi").text = response.data.length;
                for (var i = 0; i < response.data.length; i++) {
                    // console.log(response.data.length);
                    //令购物车为空的div消失
                    $("#empty").hide();
                    //让全选的图标换
                    $("#allseicon").attr("src", "images/check.png");
                    //令购物车图标里的数字显示i
                    $('#shuZi').text(response.data.length);
                    var object = response.data[i];
                    console.log(object);
                    var subtotal = (object.goods_price)*(object.goods_number);


                    var ppppp = $('#goods_price').text()*$('#goodsNumber').val();
                    console.log(ppppp);
                    // console.log(subtotal);
                    moneyPay.push(subtotal);
                    var div = '<div class="cartContent" style="width: 100%;height: 8.875rem;background-color: gainsboro;position:relative;top: 0.5rem" data-id="'+ object.goods_id + '">' +
                        '<div style="width: 13%;height: 100%;float: left" class="left_icon"><img src="images/check.png" alt="" style="width:1.2rem;height:1.3rem;position:absolute;top: 3rem;left: 1rem;display: block" class="check_btn">' +
                        '<img src="images/nocheck.png" alt="" style="width:1.2rem;height:1.3rem;position:absolute;top: 3rem;left: 1rem;display: none" class="nocheck_btn"></div>' +
                        '<div style="width: 73%;height: 100%;float: left"><img src="' + object.goods_thumb + '" alt="" style="width: 6.56rem;height: 6.56rem;margin-top: 1rem">' +
                        '<div style="width:8rem;height: 90%;padding-top:5%;float: right;margin-top: 5px;font-size: 0.75rem">' +
                        '<p style="width: 80%;height: 2.4rem;overflow: hidden">' + object.goods_name + '</p>' +
                        '<p style="margin: 5px 0 5px 0">¥<span id="moneyPay"> '+ object.goods_price + '</span></p>' +
                        '<p><img src="images/increase.png" alt="" style="width:1.5rem;height: 1.5rem;float: left" class="increase">' +
                        '<input class="goodsNumber" id="goodsNumber" style="width:3.5rem;height: 1.4rem;display: block;border:none;border-bottom: 1px solid black;border-top: 1px solid black;float: left;text-align: center;font-size: 1rem" value="' + object.goods_number + '">'+
                        '<img src="images/decrease.png" alt="" style="width:1.5rem;height: 1.5rem;float: left" class="decrease"></p></div></div>' +
                        '<div style="width: 14%;height: 100%;float: left"><img src="images/delete.png" alt="" style="width: 1.4rem;height: 1.6rem;margin-top: 3rem;margin-left: 1rem" class="delete"></div></div>' +
                        '<div style="width: 100%;height: 0.6rem;"></div>';
                    $('.yourCart').append($(div));

                }

                console.log(moneyPay);
                var sum = 0;
                for(var i = 0;i<moneyPay.length;i++){
                    sum += moneyPay[i];
                }
                // console.log(sum);
                $('#payMoneyTxt').text(sum)
            }
        }
    });
    console.log($('#goods_price').text());
$(".outter").on('touchstart',function(){
   localStorage.clear();
   location.assign("index.html");
})





    $('.yourCart').on('touchstart',function (event) {
        if(event.target.className == "check_btn"){
            $(event.target).toggle();
            $(event.target.nextSibling).toggle();
        }
        if(event.target.className == "nocheck_btn"){
            $(event.target).toggle();
            $(event.target.previousSibling).toggle();
        }

        //购物车++
        if (event.target.className == "increase") {
            var number = parseInt($(event.target).next().val());
            $(event.target).next().val(++number);
            if(number>10){
                $(event.target).next().val(10);
                return;
            }
            var goods_id = $(event.target).parent().parent().parent().parent().attr('data-id');
            shop.api.updateCart(goods_id, number, function (response) {
                console.log(response);
            });
            return;
            
        }
        //购物车--
        if (event.target.className == "decrease") {
            var number = parseInt($(event.target).prev().val());
            $(event.target).prev().val(--number);
            if(number<1){
                $(event.target).prev().val(1);
                return;
            }
            var goods_id = $(event.target).parent().parent().parent().parent().attr('data-id');
            shop.api.updateCart(goods_id, number, function (response) {
                // console.log(response);
            });
            return;
        }

        if(event.target.className == "delete"){
            var goods_id = $(event.target).parent().parent().attr('data-id');
            deleteGoods(event.target,goods_id);
            console.log(goods_id);
        }
    });
});


function deleteGoods(object,goods_id) {
    $.ajax({
        "url": ' http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
        "type": 'POST',
        "dataType": 'JSON',
        "data":{
            'goods_id':goods_id,
            'number':0
        },
        "success": function(response){
            console.log(response);
            // 删除DOM元素
            var oDiv = object.parentNode.parentNode;
            oDiv.parentNode.removeChild(oDiv);
        }

    })}
    
    
    
    
    
    
    
    
    
    // shop.api.updateCart(object,"0")
        // console.log(111111);
    // }
    // 删除DOM元素
    // var oDiv = object.parentNode.parentNode;
    // oDiv.parentNode.removeChild(oDiv);








