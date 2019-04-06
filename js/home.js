$(".sec").eq(0).siblings().css("display", "none")
$(".navigation").on("click", '.underline', function (e) {
    let $content = $(e.currentTarget)
    $content.addClass("active").parent().siblings().children().removeClass("active")

    $(".sec").eq($(this).parent().index()).css("display", "block").siblings().css("display", "none")
})


$(".searchBox").find("input").focus(function () {
    $(this).attr("value", '')
}).blur(function () {
    $(this).attr("value", '搜索歌曲、歌手、专辑')
})

var APP_ID = 'z2TQRf1lO3Srw8mYIu6p6o1b-gzGzoHsz';
var APP_KEY = 'poOu8gUO21wmekebk5UuoGID';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

/**var SongObject = AV.Object.extend('Song');
var songObject = new SongObject();
songObject.save({
    name: '普通朋友',
    singer: '陶喆',
    url:'https://qdct01.baidupcs.com/file/214ffa5ad62a9bff0cd28a6493242dd8?bkt=p3-1400214ffa5ad62a9bff0cd28a6493242dd860a636de0000003f2ee7&fid=2738177445-250528-917049223815205&time=1554387120&sign=FDTAXGERLQBHSKfW-DCb740ccc5511e5e8fedcff06b081203-1N8pV1YCkiW9Nzkb2ZdoCx5N%2B1Y%3D&to=90&size=4140775&sta_dx=4140775&sta_cs=1&sta_ft=mp3&sta_ct=0&sta_mt=0&fm2=MH%2CYangquan%2CAnywhere%2C%2Cshanghai%2Cct&ctime=1554385976&mtime=1554385976&resv0=cdnback&resv1=0&vuk=2738177445&iv=0&htype=&newver=1&newfm=1&secfm=1&flow_ver=3&pkey=1400214ffa5ad62a9bff0cd28a6493242dd860a636de0000003f2ee7&sl=76480590&expires=8h&rt=pr&r=733858352&mlogid=2178384670495104638&vbdid=441357041&fin=%E6%99%AE%E9%80%9A%E6%9C%8B%E5%8F%8B+-+%E9%99%B6%E5%96%86.mp3'
}).then(function(){
    console.log("保存成功")
})**/

var query1 = new AV.Query('TestObject')
query1.find().then(function (results) {
    for (var i = 0; i < results.length; i++) {
        let sheet = results[i].attributes
        let $sheet = `
        <a href="./playList.html?id=${results[i].id}">
        <img class="sheetImg" src="${sheet.imgSrc}" alt="#">
        <p class="sheetTxt">${sheet.words}</p>
        </a>
        `
        $(".sheet").eq(i).append($sheet)
    }
})

var query = new AV.Query('Song')
var $ol = $("ol.newSong")
var $hotOl = $("ol.musicSheet")
var hotSong = []
query.find().then(function (results) {
    $(".loading").remove()
    for (var i = 0; i < results.length; i++) {
        var song = results[i].attributes
        var $li = `
        <li>
        <a href="./song.html?id=${results[i].id}">
          <div class="musicInfo">
            <div class="musicName">${song.name}<span></span></div>
            <i class="quality"></i>
            <div class="author">${song.singer}</div>
          </div>
          <i class="begin"></i>
        </a>
      </li>
        `
        $ol.append($li)
        if (results[i].attributes.Hot === true) {
            hotSong.push(results[i])
        }
    }
    for (var i = 0; i < hotSong.length; i++) {
        let hotMusic = hotSong[i].attributes
        let $hotLi = `
        <li>
        <a href="./song.html?id=${hotSong[i].id}">
          <div class="musicNum">${i+1}</div>
          <div class="musicInfo">
        <div class="musicName">${hotMusic.name}<span></span></div>
            <i class="quality"></i>
            <div class="author">${hotMusic.singer} - ${hotMusic.name}</div>
          </div>
          <i class="begin"></i>
        </a>
      </li>
        `
        $hotOl.append($hotLi)
    }
}, function () {
    alert('获取歌曲失败！')
})

let timer = null
$("input#searchBox").on("input", function (e) {
    if (timer) { window.clearTimeout(timer) }

    timer = setTimeout(function () {
        time = null
        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        if (value === '') {
            $(".clearTag").css("display", "block")
            $(".results").css("display", 'none')
            return
        }
        var query1 = new AV.Query('Song')
        var query2 = new AV.Query('Song')

        query1.contains('name', value)
        query2.contains('singer', value)
        var query = AV.Query.or(query1, query2)
        query.find().then(function (result) {
            $(".results").css("display", 'block')
            if (result.length === 0) {
                $(".clearTag").css("display", "none")
                $(".results").text("没有结果")
            } else {
                $(".results").text("")
                for (var i = 0; i < result.length; i++) {
                    let song = result[i].attributes
                    let li = `
                  <li class="resultSong" data-id="${result[i].id}">
                    <i class="resultSvg"></i> 
                    <a href="./song.html?id=${result[i].id}">${song.name} - ${song.singer}</a>
                  </li>
                `
                    $(".results").append(li)
                    $(".clearTag").css("display", "none")
                }
            }
        })
    }, 400)

})