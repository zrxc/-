window.onload = function(){
      var carousel = document.querySelector('#carousel');
      var imageLis = document.querySelectorAll('#carousel .imagesList li');
      var circleLis = document.querySelectorAll('#circles li');
      console.log(imageLis);

      var idx = 0;//当前中间图片
      var next = 1;//下一张图
      var prev = imageLis.length - 1;//上一张
      var timer = setInterval(function(){
        showNext();
      }, 3000);
      //批量给小圆点绑定touch事件
      for (var i = 0; i < circleLis.length; i++) {
        (function(i){
          circleLis[i].addEventListener('touchstart', function(){
            clearInterval(timer);
            setCurrentImage(i);//设置当前应该显示第几张
          }, false);
        })(i);
      }
      function setCurrentImage(_idx) {
        idx = _idx;
        prev = idx - 1;
        if (prev === -1) {
          prev = imageLis.length - 1;
        }
        next = idx + 1;
        if (next > imageLis.length - 1) {
          next = 0;
        }

        init(); //设置一下当前的图片合适的位置和小圆点合适的位置

        clearInterval(timer);
        timer = setInterval(function(){
          showNext();
        }, 3000);
      }


      var windowWidth;
      init();
      window.onresize = init;

      function init() {
        windowWidth = document.documentElement.clientWidth;
        carousel.style.height =  windowWidth / (980 / 520) + 'px';

        for (var i = 0; i < imageLis.length; i++) {
          imageLis[i].style.webkitTransform = "translateX(" + windowWidth + 'px)';
        }

        changepic();
        setPoint();
      }

      //事件监听
      carousel.addEventListener('touchstart', touchstartHandler, false);
      carousel.addEventListener('touchmove', touchmoveHandler, false);
      carousel.addEventListener('touchend', touchendHandler, false);

      var startX, startTime;
      
      function touchstartHandler(event) {
        event.preventDefault();
        clearInterval(timer);
        //记录偏移值
        startX = event.touches[0].clientX;
        //记录时间戳
        startTime = new Date();
        imageLis[prev].style.transition = "none";
        imageLis[idx].style.transition = "none";
        imageLis[next].style.transition = "none";
      }
      function touchmoveHandler (event) {
        event.preventDefault();
        //得到坐标x
        var clientX = event.touches[0].clientX;
        //改变图片的位置
        imageLis[idx].style.webkitTransform = "translateX(" + (clientX - startX) + 'px)';
        imageLis[next].style.webkitTransform = "translateX(" + (windowWidth + (clientX - startX)) + 'px)';
        imageLis[prev].style.webkitTransform = "translateX(" + (-windowWidth + (clientX - startX)) + 'px)';
      }
      function touchendHandler(event) {
        event.preventDefault();
        //判断滑动是否成功
        var distance = event.changedTouches[0].clientX - startX;
        var time = new Date() - startTime;

        if (distance >= windowWidth/2 || (distance > 30 && time < 300)) {
          showPrev();
        } else if (distance <= -windowWidth/2 || (distance < -30 && time < 300)) {
          showNext();
        } else {
          //绝对值不到windowWidth/2
          console.log('不成功');

          //移动
          imageLis[prev].style.webkitTransform = "translateX(" + -windowWidth + 'px)';
          imageLis[idx].style.webkitTransform = "translateX(0px)";
          imageLis[next].style.webkitTransform = "translateX(" + windowWidth + 'px)';

          imageLis[prev].style.transition = "all 0.3s ease 0s";
          imageLis[next].style.transition = "all 0.3s ease 0s";
          imageLis[idx].style.transition = "all 0.3s ease 0s";
        }

        clearInterval(timer);
        timer = setInterval(function(){
          showNext();
        }, 3000);
      }

      function showPrev() {
          next = idx;
          idx = prev;
          prev--;
          if (prev < 0) {
            prev = imageLis.length - 1;
          }
          changepic();
          setPoint();
          imageLis[prev].style.transition = "none";
          imageLis[next].style.transition = "all 0.3s ease 0s";
          imageLis[idx].style.transition = "all 0.3s ease 0s";
      }
      function showNext() {
        //先改变信号量
        prev = idx;
        idx = next;
        next++;
        if (next > imageLis.length - 1) {
          next = 0;
        }
        changepic();
        setPoint();
        imageLis[prev].style.transition = "all 0.3s ease 0s";
        imageLis[idx].style.transition = "all 0.3s ease 0s";
        imageLis[next].style.transition = "none";
      }
      function changepic() {
        imageLis[idx].style.webkitTransform = "translateX(0px)";
        imageLis[next].style.webkitTransform = "translateX(" + windowWidth + 'px)';
        imageLis[prev].style.webkitTransform = "translateX(" + -windowWidth + 'px)';
      }
      function setPoint() {
        for (var i = 0; i < circleLis.length; i++) {
          circleLis[i].className = '';
        }
        circleLis[idx].className = 'cur';
      }
    }
 
//  <!-- 热门商品 -->

$.ajax({
  'url':' http://h6.duchengjiu.top/shop/api_goods.php',
  'type':'GET',
  'dataType':'json',
  'data':{
    "pagesize":15,
   },
    'success':function(response) {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
          var obj = response.data[i];
            $('#hot-ul').html($('#hot-ul').html() + '<li class=""><a href="detail.html?goods_id=' + obj.goods_id +'"><img src=' + obj.goods_thumb + '><p>' + obj.goods_name + '</p></a></li>');
            if (i % 3 === 2) {
              $('li').eq(i).addClass("size") ;
            }
         }
  },
  "error": function(message) {
    console.log(message);
  }
})
 //   <!-- nav 列表 -->

$.ajax({
  'url':'http://h6.duchengjiu.top/shop/api_goods.php',
  'type':'GET',
  'dataType':'json',
  'data':{
    "pagesize":9,
  },
  'success':function(response) {
    console.log(response);
      for (var i = 0; i < response.data.length; i++) {
          var obj = response.data[i];
            $('#goods-ul').html($('#goods-ul').html() + '<li><a href="detail.html?goods_id=' + obj.goods_id +'"><img src=' + obj.goods_thumb + '><p>' + obj.goods_name + '</p><p>￥：'+ obj.price +'</p></a></li>');
         }
    },
  "error": function(message) {
    console.log(message);
  }
})








