var APP_ID = 'z2TQRf1lO3Srw8mYIu6p6o1b-gzGzoHsz';
var APP_KEY = 'poOu8gUO21wmekebk5UuoGID';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
$(".start").css("opacity", 0)
var test = window.location.search
var id = test.replace("?id=", '')
var query = new AV.Query('Song')
var audio = new Audio()
var lyricObj = {}
query.get(id).then(function (song) {
    var url = song.attributes.url
    var img = song.attributes.img
    audio.src = url
    audio.autoplay = true
    $(".lightImg").attr("src", img)
    $(".context").css("background", "url('" + img + "')")

    $(".start").on("click", function (e) {
        if ($(".start").css('opacity') === "0") {
            $(".start").css("opacity", "1")
            audio.pause()
            $(".playing").css("animation-play-state", "paused")
            $(".start").css("animation-play-state", "paused")

        } else {
            $(".start").css("opacity", "0")
            audio.play()
            $(".playing").css("animation-play-state", "running")
            $(".start").css("animation-play-state", "running")
        }

    })


    var lyricName = `
    <h3 class="songName"><span class="light">${song.attributes.name}</span>&nbsp<span class="singer">- ${song.attributes.singer}</span></h3>
    `
    $(".lyricInfo").prepend(lyricName)
    var songLyric = song.attributes.lyric
    var lyric = songLyric.split("\n")
    lyric.forEach(function (line) {
        var times = line.match(/\d{2}:\d{2}/g)
        var str = line.replace(/\[.+?\]/g, '')
        if (Array.isArray(times)) {
            times.forEach(function (time) {
                lyricObj[time] = str
            })
        }
    })
})

setInterval(function () {
    var times = this.audio.currentTime
    var minutes = Math.floor(times / 60) + ''
    var seconds = Math.floor(times % 60) + ''
    minutes = minutes.length === 1 ? '0' + minutes : minutes
    seconds = seconds.length === 2 ? seconds : '0' + seconds
    var songTime = minutes + ':' + seconds
    Object.keys(lyricObj).forEach(function(key, i, v){
        if(songTime === v[i]){
            $(".lyric .light").text(lyricObj[songTime])
            $(".lyric .black").text(lyricObj[v[i+1]])
        }
    })
}, 200)



