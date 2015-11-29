/**
 * Created by huahua on 2015-11-26.
 */
$(function() {
    var    T = $("#loading_text"),
     n = new Date(),
        d = n.getTime(),
        N = function () {
            var e = ["imgs/img1.jpg","imgs/img2.jpg","imgs/wedding.png","imgs/married.png?v=2","imgs/lefticon.png"],
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
