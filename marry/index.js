/**
 * Created by huahua on 2015-11-26.
 */
$(function() {
    /******************************************************/
    // 页面加载进度条
    //var e = $("#wx_dj_wrap"),
    //    x = $("#loading"),
    var    T = $("#loading_text"),
     n = new Date(),
        d = n.getTime(),
        N = function () {
            var e = ["imgs/img1.jpg","imgs/img2.jpg","imgs/wedding.png","imgs/married.png?v=1","imgs/lefticon.png"],
                t = e.length,
                n = 0,
                r = function (e) {
                    var r = new Image,
                        D = new Date().getTime();

                    r.onload = function () {
                        ++n,
                            T.html(parseInt(n / t * 100) + "%");
                        console.log(parseInt(n / t * 100) + "%");
                        if(parseInt(n / t * 100) == 100 || D-d > 10000){
                            console.log("加载完毕");
                            var lo=$(".loading");
                                lo.addClass("loadinghide");
                            $(".heart").addClass('happy');
                          var timeo=  setTimeout(function(){
                              lo.remove();
                                $(".wedding").addClass("weddingplay");
                              clearTimeout(timeo);
                            },5000)
                            //loading.addEventListener("webkitAnimationEnd", function() {  $(loading).remove();}, false);
                            //$(heart).addClass('happy');




                           // $(".heart").addClass('happy');
                            //setTimeout(function(){
                            //    $(".loading").remove();
                            //},1000)

                            //x.fadeOut();
                            //
                            //var data_url = $(".item_1").attr("data-url");
                            //$("#wx_dj_wrap").fadeIn();
                            //$(".item_1 .page").load(data_url , function(){
                            //    //
                            //    $("#pages .next").on("click", function() {
                            //        carousel.next();
                            //    });
                            //});
                        }

                    },
                        r.src = e;
                };
            for (var i = 0; i < t; ++i) r(e[i]);
        }();

    $("#loading_text").click(function(){
        alert();
    })

})
