
$(function(){

    slider();
    huDongNav();
   a();





   b();
   function b(){
       var xhr = new XMLHttpRequest();
       //发起一个HTTP请求
       xhr.open("get","http://172.17.3.12:8080/api/benc");
       xhr.send(null);
       xhr.onreadystatechange = function(){
           if(xhr.readyState==4&&xhr.status==200){

               var js = JSON.parse(xhr.responseText);

               var result = js.bodStyle;
               console.log(js)
               var html = template("chel",{che:result});
             var chelei= document.getElementById("chelei");
               chelei.innerHTML=html;
           }
       };
   }
    //滑动导航菜单
    $('#myAffix').affix({
        offset: {
            top: 100,
            bottom: function () {
                return (this.bottom = $('.footer').outerHeight(true))
            }
        }
    })
    function huDongNav(){
        var parent = $(".wjs_product_tabs_parent")[0];
        var $ul = $(".wjs_product_tabs");
        var $lis = $ul.children();
        var sum = 0;
        $lis.each(function(index,item){
            sum+=$(item).innerWidth();
        });
        $ul.width(sum);
        wjs.iScroll({
            swipeDom:parent,
            swipeType:"x",
            swipeDistance:20
        })
    }

    function a() {
       var ig=$("#ig")[0];
       var tu=$("#tu")[0].children
        console.log(tu[0].children)

        var wi = $(window).width();
        if(wi<780){
            ig.src="images/hy/three2.png";
            tu[0].children[0].src="./images/hy/aa1.jpg";
            tu[1].children[0].children[0].src="./images/hy/bb1.jpg";
            tu[1].children[1].children[0].src="./images/hy/bb4.jpg";
            tu[2].children[0].src="./images/hy/cc1.jpg";
            tu[3].children[0].src="./images/hy/dd1.jpg";
        }else{
            ig.src="images/hy/thiree1.jpg";
            tu[0].children[0].src="./images/hy/aa2.jpg";
            tu[1].children[0].children[0].src="./images/hy/bb2.jpg";
            tu[1].children[1].children[0].src="./images/hy/bb4.jpg";
            tu[2].children[0].src="./images/hy/cc2.jpg";
            tu[3].children[0].src="./images/hy/dd2.jpg";
        };

        $(window).on("resize",function () {

            var width = $(window).width();
            if(width<780){
                ig.src="images/hy/three2.png";
                tu[0].children[0].src="./images/hy/aa1.jpg";
                tu[1].children[0].children[0].src="./images/hy/bb1.jpg";
                tu[1].children[1].children[0].src="./images/hy/bb4.jpg";
                tu[2].children[0].src="./images/hy/cc1.jpg";
                tu[3].children[0].src="./images/hy/dd1.jpg";
            }else{
                ig.src="images/hy/thiree1.jpg";
                tu[0].children[0].src="./images/hy/aa2.jpg";
                tu[1].children[0].children[0].src="./images/hy/bb2.jpg";
                tu[1].children[1].children[0].src="./images/hy/bb4.jpg";
                tu[2].children[0].src="./images/hy/cc2.jpg";
                tu[3].children[0].src="./images/hy/dd2.jpg";
            };
        })
    }
    //轮播图
    function slider(){
        $(window).on('resize',function(){
            var width = $(window).width();
            if(width<768){

                var isMobile = true;
            }else{
                var isMobile = false;
            };
            var json = [
                {
                    bac:"url(./images/hy/lba1.jpg)",
                    img:"./images/hy/lba2.jpg"
                },
                {
                    bac:"url(./images/hy/lbb2.jpg)",
                    img:"./images/hy/lbb1.jpg"
            },
            {
                bac:"url(./images/hy/lbc1.jpg)",
                img:"./images/hy/lbc2.jpg"
            },
            {
                bac:"url(./images/hy/lbd1.jpg)",
                img:"./images/hy/lbd2.jpg"
            }
            ];
            var html = template('slider',{json:json,isMobile:isMobile});
            $('.carousel-inner').html(html);

            //滑动轮播
            var isMove = false;
            var startX = 0;
            var moveX = 0;
            $('#inner').on('touchstart',function(e){
                startX = e.originalEvent.touches[0].clientX;
            });
            $('#inner').on('touchmove',function(e){
                isMove = true;
                moveX = e.originalEvent.touches[0].clientX;
            });
            $('#inner').on('touchend',function(e){
                if(isMove){
                    if(moveX - startX>0){
                        //前一张
                        $('#carousel-example-generic').carousel("prev");
                    }else if(moveX - startX<0){
                        //后一张
                        $('#carousel-example-generic').carousel("next");
                    }
                }
                isMove = false;
                startX = 0;
                moveX = 0;
            })


        }).trigger("resize");
    }

})