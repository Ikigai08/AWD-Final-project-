$(function(){
  zoom = $('.feature').css('background-size')
  zoom = parseFloat(zoom)/100
  size = zoom * $('.feature').width();
  $(window).on('scroll', function(){
    fromTop = $(window).scrollTop();
    newSize = size - (fromTop/3);
    if (newSize > $('.feature').width()) {
        $('.feature').css({
            '-webkit-background-size': newSize,
            '-moz-background-size': newSize,
            '-o-background-size': newSize,
            'background-size': newSize,
            '-webkit-filter':'blur('+ 0 + (fromTop/100) + 'px)',
            'opacity': 1 - ((fromTop / $('html').height()) * 1.3)
        });
    }
  });
});

$('.make-coffee').click( function() {
	$('.machine').addClass('active');
	
	setTimeout(function () { 
		$('.machine').removeClass('active');
	}, 5300);  
});

$("#products>article").on("click", function(){
  $("#products>article").removeClass("active");
  $(this).addClass("active");
  animate();
});

function getActiveArticle(){ 
  var x = 0;
  $("#products>article").each(function(e){
    if($("#products>article").eq(e).hasClass("active")){
      x = e;
      return false;      
    }
  });
  return x;
}

function gofwd(){
  var activeIndex = getActiveArticle();
  var minArticles = 0;
  var maxArticles = $("#products>article").length - 1;
  if(activeIndex >= maxArticles){
    activeIndex = minArticles-1;
  }
  
  $("#products>article").removeClass("active");
  $("#products>article").eq(activeIndex+1).addClass("active");
  
  animate();
}

function gobwd(){
  var activeIndex = getActiveArticle();
  var minArticles = 1;
  var maxArticles = $("#products>article").length;
  
  $("#products>article").removeClass("active");
  $("#products>article").eq(activeIndex-1).addClass("active");
  
  animate();
}

$(document).ready(function(){
  animate();
});

function animate(){
  
  var articleIndex = getActiveArticle();
  var totalMargin = 25 * (articleIndex+1) - (25*(articleIndex));
  
  var articlePosition = Math.floor($("#products>article").eq(articleIndex).offset().left - $("#products").offset().left) - totalMargin;
  var productsHalfWidth = $("#products").width()/2;
  if(articleIndex == 0){
    var halfWidth = 150;
  }else{
    var halfWidth = 100;
  }
  var finalPosition = productsHalfWidth - articlePosition - halfWidth;
  $("#products").animate({
    "left": finalPosition,
  }, {
    duration: 500,
    easing: 'easeOutBack',
  });
  
}

$(window).on("resize", function(){
  animate();
});

var autoPlay = setInterval(function(){
  gofwd();
}, 3500);

$("#slider").on("mouseenter", function(){
  clearInterval(autoPlay);
});
$("#slider").on("mouseleave", function(){
  autoPlay = setInterval(function(){
    gofwd();
  }, 3500);
});
