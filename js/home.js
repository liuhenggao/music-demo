$(".sec").eq(0).siblings().css("display", "none")
$(".navigation").on("click", '.underline', function(e){
    let $content = $(e.currentTarget)
    $content.addClass("active").parent().siblings().children().removeClass("active")

    $(".sec").eq($(this).parent().index()).css("display", "block").siblings().css("display", "none")
})


$(".searchBox").find("input").focus(function(){
    $(this).attr("value", '')
}).blur(function(){
    $(this).attr("value", '搜索歌曲、歌手、专辑')
})
