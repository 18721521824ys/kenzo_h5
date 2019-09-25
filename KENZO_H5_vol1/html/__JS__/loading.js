var url = imgSrc+'/';
// var url = "http://maxpr.oss-cn-shanghai.aliyuncs.com/H5/kenzoki/ginger/__IMG__/"
var result_img = []
var loading_canvas = {
  id: "canvas1",
  name: "sy",
  count: 58,
  type: 'jpg'
}
var lt = 1;
var can1_img = [];
var can1_count = 0;
var mycanvas = document.getElementById('canvas')
var ctx = mycanvas.getContext('2d')
var AllLoad = false;
function can1_load() {
  let img_url = url + loading_canvas.name + '/' + loading_canvas.name + '(' + lt + ').' + loading_canvas.type;
  // let img_url = url + loading_canvas.id + '/' + loading_canvas.id + '(' + lt + ').' + loading_canvas.type;
  let image = new Image();
  image.src = img_url;
  image.onload = function () {
    if (lt < loading_canvas.count) {

      lt++

      can1_load()

    } else {

      // console.log('loading play')
      game.init();
      can1_play();
   
      loading_play()


    }
    can1_img.push(image)
  }
}

function can1_play() {
  var image = can1_img[can1_count];
  setTimeout(function () {
    if (can1_count < can1_img.length) {
      //清除之前的图片墨迹
      ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
      // 裁剪图片
      ctx.drawImage(image, 0, 0, mycanvas.width, mycanvas.height);

      can1_count++
      can1_play()

    } else {
      //播放一次loading、
      if (AllLoad == true && loading_num>=100) {
        //开始显示主页
        $('.loading').fadeOut(500)
        $('.index').fadeIn(500,function(){
          index_ant()
        })
   
      } else {
        can1_play()
        // can1_count = 1
        // can1_play()

      }
    }

  }, 65);
}
var loading_num = 0
function loading_play() {
  setTimeout(function () {
    loading_num = loading_num + 1
    $('#jd').html(loading_num + '%');
    if (loading_num >= 100) {

    } else {
       loading_play()
    }
  }, 37)

}
$(window).load(function () {

  can1_load()

});




var game = {

  init: function () {
    assets.init();

  },
  start: function () {
    // $('.loading').hide()
    AllLoad = true
   
  },

}


var assets = {
  contents: {},
  imgSrcArr: [

    {
      id: "canvas2",
      name: "sa",
      count: 33,
      type: 'jpg'
    },
    {
      id: "canvas3",
      name: "ball",
      count: 4,
      type: 'png'
    }

  ],
  reday_img: [],
  data: [





  ],
  init: function () {
    // assets.load();
    //计算图片总数 待修改
    for (var j = 0; j < assets.imgSrcArr.length; j++) {
      let data = assets.imgSrcArr[j];
      loader.totalCount = loader.totalCount + data.count
    }
    assets.loadCanvas();

  },


  loadCanvas: function () {

    for (var j = 0; j < assets.imgSrcArr.length; j++) {
      let data = assets.imgSrcArr[j];
      let obj = {
        name: data.name,
        arr: [],
        count: 0
      }

      for (var i = data.count; i > 0; i--) {

        let img_url = url + data.name + '/' + data.name + '(' + i + ').' + data.type;
        var x = loader.loadImage(img_url);



        obj.arr.unshift(x)

      }
      result_img.push(obj)
    }
    console.log(result_img)
    //assets.load_once(asset)
    if (loader.loaded) {

      game.start()
    } else {

      loader.onload = game.start;
    }

  },


}

var loader = {
  loaded: true,
  loadedCount: 0, // Assets that have been loaded so far
  totalCount: 0, // Total number of assets that need to be loaded

  loadImage: function (url) {

    this.loaded = false;
    //$('#loadingscreen').show();
    var image = new Image();
    image.src = url;
    image.onload = loader.itemLoaded();

    return image;
  },

  itemLoaded: function () {

    loader.loadedCount++;
    p = parseInt((loader.loadedCount / loader.totalCount) * 100);

    //$('#jd').html(p + '%');
    // console.log(p)
    if (loader.loadedCount == loader.totalCount) {

      // Loader has loaded completely..
      loader.loaded = true;

      //and call the loader.onload method if it exists
      if (loader.onload) {
        loader.onload();//=game.start
        loader.onload = undefined;
      }
    }

  },

}





