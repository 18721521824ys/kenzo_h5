
var page = 0//loading 0 
var ball_click = 0;
var radio = 0;
$(document).ready(function () {
  //点击活动规则
  $('.click').on('click', function () {
    $(".bomb").removeClass('forout')
    $(".bomb").addClass('forin')

  });
  $('.close').on('click', function () {
    $(".bomb").removeClass('forin')
    $(".bomb").addClass('forout')

  });
  //点击btn跳转
  $('.two_button').on('click', function () {

    if (status == 0) {
    $(".three_game").show();
    $(".index").hide();
    } else if (status == 1) {
    $(".qrcode2").show();
    } else if (status == 2) {
      $(".qrcode3").show();
    }
  });

  //点击填写联系方式
  $('.three_btn').on('click', function () {
    $(".four_result").show();
    $(".three_game").hide();

  });
  //点击勾选协议
  $('.radioOne').on('click', function () {
    radio = 1;
    console.log(radio)
    $(".radioTwo").show();
    $(".radioOne").hide();

  });
  $('.radioTwo').on('click', function () {
    radio = 0;
    console.log(radio)
    $(".radioOne").show();
    $(".radioTwo").hide();
  });
  //点击隐私保护
  $('.pr').on('click', function () {
    $(".privacy").removeClass('forout')
    $(".privacy").addClass('forin')
  });
  $('.privacy-cl').on('click', function () {
    $(".privacy").removeClass('forin')
    $(".privacy").addClass('forout')
  });
  // 点击第一个球
  $('.ball1').on('click', function () {

    var canvas = document.getElementById('canvas3')
    canvas_play3(result_img[1],canvas,0)
    $(this).hide();
    $(".ball-img").hide();
    ball_click++;

  })
  //点击第二个球
  $('.ball2').on('click', function () {

    var canvas  = document.getElementById('canvas4')
    canvas_play3(result_img[1],canvas,1)
    $(this).hide();
    ball_click++;
  })
  //点击第三个球
  $('.ball3').on('click', function () {

    var canvas = document.getElementById('canvas5')
    canvas_play3(result_img[1],canvas,2)
    $(this).hide();
    ball_click++;

  })
  
  var fromGo = false;
  //表单提交
  $('.form_submit').on('click', function () {
    // var fromStatus = 0
    if ($('.name').val() == '') {
      $(".form_al").show();
      // alert('请发送验证码')
      return false
    }
    // else if ($('.password').val() == '') {
    //   $(".form_al1").show();
    //   return false
    // }
    else if (
      !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
        $('.mobile').val()
      )
    ) {
      // alert('请正确填写手机号')
      $(".form_al").show();
      return false
    }
    else if ($('.pasword').val() == "") {
      $(".form_al1").show();
      // alert('请输入验证码')
      return false
    } 
    else if ($('.address').val() == '') {
      $(".form_al").show();
      // alert('请输入验证码')
      return false
    }
    else if (radio == 0) {
      console.log(radio)
      $(".form_al2").show();
      return false
    }

    else if (fromGo) {
      return false
    } else {
      fromGo = true
      $.ajax({
        url: 'http://kenzo-ginger.max-digital.cn/wechat/index/putFormInfo',
        data: {
          name: $('.name').val(),
          mobile: $('.mobile').val(),
          code: $('.password').val(),
          address: $('.address').val(),
        },
        type: 'post',
        dataType: "json",
        success: function (result) {
          if (result.errorCode === 0) {

            $(".qrcode").show();

            // $(".box").hide();

          } else if (result.errorCode === 1) {
            $(".qrcode2").show();

          } else if (result.errorCode == -2) {
            fromGo = false
            $(".form_al1").show();
            return false
          } else {
            alert(result.errorMsg)
          }

        },
        error: function () {
          alert('网络异常,请从新提交或刷新再试')
        }
      })
    }

  })
  //点击获取验证码
  // var code = '';
  var codeSwitch = false;
  $('.codeBtn').on('click', function () {
    if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test($('.mobile').val())) {
      // alert('请正确填写手机号')
      $(".form_al").show();
      return false
    }
    if (codeSwitch) {
      return false
    } codeSwitch = true
    var That = this
    var codeI = 60
    var codeMax = 1
    var codeSetI = setInterval(function () {
      $(That).html(codeI+'s')
      codeI--
      if (codeMax > codeI) {
        $(That).html('重新获取')
        codeSwitch = false
        clearInterval(codeSetI)
      }
    }, 1000)
    $.ajax({
      url: 'http://kenzo-ginger.max-digital.cn/wechat/index/sendsms',
      type: 'post',
      data: {
        mobile: $('.mobile').val(),
      },
      success: function (result) {
        if (result.errorCode !== 0) {
          alert(result.errorMsg)
          $(That).html('重新获取')
          codeSwitch = false
          clearInterval(codeSetI)
          return false
        } else {
          code = result.code;

        }
      },
      error: function () {
        alert('网络异常,请从新提交或刷新再试')
      }
    })

  })


})
//蒙层
function index_ant() {
  setTimeout(() => {
    page_show(0)
    $('.mask').hide()
  }, 500);


}

//首页文字淡入
function page_show(index) {
  $('.ant1').hide()
  $('.ant2').hide()
  $('.box_' + (index + 1)).find('.ant1').fadeIn(1000)
  $('.box_' + (index + 1)).find('.ant2').fadeIn(1000)
}

var swiper = new Swiper('.index-box', {
  direction: 'vertical',
  allowSlidePrev: false,
  // allowSlideNext: true,
  on: {
    touchStart: function (event) {
    },
    slideChangeTransitionEnd: function () {
      var _this = this;
      // page_show(_this.activeIndex)
      
      if (this.activeIndex === 0) {
        this.allowSlidePrev = false;
        this.allowSlideNext = true;
        page_show(_this.activeIndex)
      }
      else if (this.activeIndex === 1) {
        count2 = 0;
        var canvas = document.getElementById('canvas2')
        canvas_play2(result_img[0], canvas)
        setTimeout(() => {
          page_show(_this.activeIndex)
        }, 1000)
        setTimeout(() => {
          $(".two_button").fadeIn();
          $(".two_pict").fadeIn();
        }, 3000)
        this.allowSlideNext = false;
        this.allowSlidePrev = true;
      }

    },

  }
});


//产品页

function canvas_play2(img_arr,canvas) {
  var ctx2 = canvas.getContext('2d')
  setTimeout(function () {
    if (count2 < img_arr.arr.length) {

      var image = img_arr.arr[count2];

      //清除之前的图片墨迹
      ctx2.clearRect(0, 0, canvas.width, canvas.height);
      // 裁剪图片
      ctx2.drawImage(image, 0, 0, canvas.width, canvas.height);
      count2++
      canvas_play2(img_arr,canvas)
      console.log(img_arr)


    } else {
      //视频2播放完成
    
      
    }

  }, 80);
}

var count_arr=[0,0,0]
function canvas_play3(img_arr, canvas,num) {
  var ctx2 = canvas.getContext('2d')
  setTimeout(function () {
    if (count_arr[num] < img_arr.arr.length) {

      var image = img_arr.arr[count_arr[num]];

      //清除之前的图片墨迹
      ctx2.clearRect(0, 0, canvas.width, canvas.height);
      // 裁剪图片
      ctx2.drawImage(image, 0, 0, canvas.width, canvas.height);
      count_arr[num] = count_arr[num]+1
      
      canvas_play3(img_arr, canvas, num)


    } else {
      //视频2播放完成
      ctx2.clearRect(0, 0, canvas.width, canvas.height);
      baozha();
     
    }

  }, 40);
}
//input手机下拉框
var is_noUp = true;
$('input,select').on("blur", function (e) {
  var t, l;
  if (document.documentElement && document.documentElement.scrollTop) {
    t = document.documentElement.scrollTop;
    l = document.documentElement.scrollLeft;
  } else if (document.body) {
    t = document.body.scrollTop;
    l = document.body.scrollLeft;
  }
  is_noUp = true;
  setTimeout(function () {
    if (is_noUp) {
      window.scrollTo(t, l);
    }
  }, 200)
});


$('input,select').focus(function () {
  var t, l;
  if (document.documentElement && document.documentElement.scrollTop) {
    t = document.documentElement.scrollTop;
    l = document.documentElement.scrollLeft;
  } else if (document.body) {
    t = document.body.scrollTop;
    l = document.body.scrollLeft;
  }
  if (t != 0) {
    //alert(t); 
  }
  is_noUp = false;
})

function baozha(params) {

  if (ball_click >= 3) {
    $.ajax({
      url: 'http://kenzo-ginger.max-digital.cn/wechat/index/getLuckDraw',
      data: {
        token: tokenID
      },
      type: 'post',
      dataType: "json",
      success: function (result) {
        console.log(result)
        if (result.errorCode == 0) {
          $(".index_max").show();
          $(".ball").hide();
        } else if (result.errorCode == 1) {
          $(".qrcode1").show();
        }else{
          $(".qrcode2").show();
        }
      },
      error: function () {
        alert('网络异常,请从新提交或刷新再试')
      }
    })
  }

}
$(".form_al").click(function(){
  $(this).hide();
})
$(".form_al1").click(function () {
  $(this).hide();
})
$(".form_al2").click(function () {
  $(this).hide();
})