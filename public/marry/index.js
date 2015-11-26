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
            var e = ["http://zhbosdoctor.com/data_upload/resource/home/upload_b45a06232fd284f2a6db42245dc4e637.jpg","http://zhbosdoctor.com/data_upload/resource/home/upload_91ebc46ac8ac22879ff56b464a9e79d4.jpg"],
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
                            //$(".heart").addClass('happy');
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


})
