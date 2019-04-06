var APP_ID = 'z2TQRf1lO3Srw8mYIu6p6o1b-gzGzoHsz';
var APP_KEY = 'poOu8gUO21wmekebk5UuoGID';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var id = window.location.search.replace("?id=", '')
console.log(id)


var query1 = new AV.Query('TestObject')
query1.get(id).then(function(lists){
    console.log(lists)
    let list = lists.attributes
    $(".imgCover").attr("src", list.imgSrc) 
    let tag = `
    <span>${list.tag}</span><span>${list.tag2}</span><span>${list.tag3}</span>
    `
    $(".tag").append(tag)
    $('.header').append(`<style>.header::before{background: url(${list.imgSrc}</style>`);
}, function(){
    console.log("获取失败！")
})


let musicList = []
var query2 = new AV.Query('Song')
query2.find().then(function(songs){
    for(var i = 0;i<songs.length;i++){
        if(songs[i].attributes.New === true){
            musicList.push(songs[i])
        }
    }
    for(var i = 0;i<musicList.length;i++){
        let song = musicList[i].attributes
        let $li = `
        <li>
        <a href="./song.html?id=${musicList[i].id}">
          <div class="musicNum">${i+1}</div>
          <div class="musicInfo">
    <div class="musicName">${song.name}<span></span></div>
            <i class="quality"></i>
            <div class="author">${song.singer} - ${song.name}</div>
          </div>
          <i class="begin"></i>
        </a>
      </li>
        `
        $(".musicList").append($li)
    } 
}, function(){
    console.log("获取歌曲失败！")
})

