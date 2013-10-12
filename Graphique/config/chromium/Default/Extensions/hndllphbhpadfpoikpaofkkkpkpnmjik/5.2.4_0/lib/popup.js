function getJSON(url, callback) {
  var script = document.createElement('script');
  $return = undefined;
  script.onload = function() {
    callback && callback($return);
  };
  script.src = url;
  document.head.appendChild(script);
}
var $return;
var cookies = {};
var base = "http://97.107.128.210:3000/";
var img_base = base + "images/emoticons/";

/**
 * Callback for voting
 */
// TODO: only add pointer if he hasn't voted before
function trollback(data) {
  $("#content article").html('');
  for (var i = 0; i < data.length; i++) {
    //var link = link_base + "?name=" + data[i].votes;
    var pointer = cookies.voted ? '' : 'pointer';
    var html = '<div class="item ' + pointer + '">' + '<div class="votes">' + data[i].votes + '</div>' + '<img src="' + (img_base + data[i].picture) + '"/>' + '<div class="text">:' + data[i].name + ':</div>' + '</div>';
    var article = Math.floor(i / 3);
    $("#content article:eq(" + article + ")").append(html);
  }
}

/**
 * Vote menu item click
 */
function menu_vote_click(e) {
  article_default();
  search_default();
  $("#overlay").delay(100).fadeIn(300, function() {
    $("#spinner").show();
  });
  getJSON(base + "json?callback=?", function() {
    $("#spinner").hide();
    $("#overlay").stop().hide();
  });
}

/**
 * Vote item click in list
 */
function vote_item_click(e) {
  var $target = $(this);
  var name = $target.find(".text").html().replace(/:/g, '');
  getJSON(base + "vote?name=" + name, function(success) {
    if (success) {
      var $votes = $target.find('.votes');
      $votes.html(+$votes.html() + 1);
    } else {
      notification("You've already voted.");
    }
  });
}

/**
 * Displays a notification with the given text
 */
function notification(html) {
  $("#notification").html(html).fadeIn(300).delay(2000).fadeOut(300);
}

/**
 * Simple item click for copying to clipboard
 */
function copy_click(e) {
  var $target = $(this);
  console.log($target);
  chrome.extension.sendMessage({
    _messageType: 'copy-to-clipboard',
    data: $target.find('span').attr('data-emoticon')
  });
  // var name = $target.find(".text").html();
  // $("#copy").val(name).show().select();
  // document.execCommand('copy');
  // $("#copy").hide();
  // $target.find()
  var $img = $("<img id='thumb' class='thumb' src='/assets/img/thumb.png'>").appendTo(this);
  $img.hide().fadeIn(300).delay(800).fadeOut(200);
  setTimeout(function() {
    $(".thumb").remove()
  }, 1500);
}

function menu_news_click() {
  search_default();
  var src = "http://jsbin.com/eceyuw/latest";
  var src = "http://97.107.128.210:3000/news.html";
  var $news_frame = $("<iframe id='news-frame' src='about:blank'><\/iframe>");

  $news_frame.hide().load(function() {
    $news_frame.fadeIn(100);
  });

  $news_frame.attr("src", src);
  $("#content").html($news_frame);
}


/**
 * Settings menu item click
 */

/**
 * Bookmarks menu item click
 */
function menu_bookmarks_click() {
  article_default()
  search_default();
  chrome.extension.connect({
    name: "troll_bookmarks"
  }).
  onMessage.addListener(function(bookmarks) {
    bookmarks_page(bookmarks);
  });
}

/**
 * Display bookmarks page
 */
function bookmarks_page(bookmarks) {
  $("#content").html('<article />');
  $("#content article").html('');
  var len = bookmarks.length;
  for (var i = 0; i < len; i++) {
    var html = '<div class="item">' + ragessearch[bookmarks[i]] + '</div>';
    var article = Math.floor(i / 4);
    $("#content article:eq(0)").append(html);
    $("#content article:eq(" + article + ")").append(html);
  }
}

/**
 * Search default text
 */
function search_default() {
  $("#search").css("color", "#680B14");
  $("#search").val("Type command here");
}

function article_default() {
  $("#content").html("<article /><article /><article />");
}

function article_newemotes() {
  $("#content").html("<article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' /><article class='notactive' />");
}

/**
 * Document ready event
 */
$(document).ready(function() {

  search_default();

  /**
   * Cookies for voting
   */
  if (document.cookies) {
    document.cookies.split(';').forEach(function(cookie) {
      var parts = cookie.split('=');
      cookies[parts[0].trim()] = (parts[1] || '').trim();
    });
  }

  /**
   * Event handlers
   */
  $('footer ul li:eq(0)').click(menu_vote_click);
  $('#content').delegate('.pointer', 'click', vote_item_click);
  $('#content').delegate('.item:not(.pointer)', 'click', copy_click);
  /**
   * Footer animation
   */
  $("footer").hover(function() {
    $(this).find("span.dropdown").stop().animate({
      top: "-40",
      opacity: 1
    }, "slow").css("display", "block")
  }, function() {
    $(this).find("span.dropdown").stop().animate({
      top: "0",
      opacity: 0
    }, "slow").css("display", "none")
  });

  /**
   * Homepage
   */

  if (document.location.pathname === '/pages/bookmarks.html') {
    AU.storage(function(storage) {
      if (!storage.get('bookmarks')) {
        $("#content").html('<center><font size="+1" style="padding-top:20px;"><br>You should add some bookmarks!<br><br> Click the "Gear" icon and add some!</font></center>');
      } else {
        var bookmarks = storage.get('bookmarks').split(',');
        $("#content").html('<article />');
        $("#content article").html('');
        var len = bookmarks.length;
        for (var i = 0; i < len; i++) {
          var html = '<div class="item">' + ragessearch[bookmarks[i]] + '</div>';
          var article = Math.floor(i / 4);
          $("#content article:eq(0)").append(html);
		  $("img.lazy").lazyload({ });
        }
      }
    });
  } 
  else if (document.location.pathname === '/pages/newemotes.html') {
	  var i = 0;
	  for (name in ragesnew) {
      var html = '<div class="item">' + ragessearch[name] + '</div>';
      var article = Math.floor(i / 4);
      $("#content article:eq(" + article + ")").append(html);
	  $("img.lazy").lazyload({ });
      i++;
    } 
	}
  else {
    var i = 0;
    for (name in ragesdemo) {
      var html = '<div class="item">' + ragessearch[name] + '</div>';
      var article = Math.floor(i / 4);
      $("#content article:eq(" + article + ")").append(html);
	 $("img.lazy").lazyload({ });
      i++;
    }
	$("img.lazy").lazyload({ });
  }

  /**
  * Scrollbar Stuff
  *
  $('#content').jScrollPane({
  	horizontalGutter:5,
  	verticalGutter:5,
  	'showArrows': false
  });
  $('.jspDrag').hide();
  $('.jspScrollable').mouseenter(function(){
  	$(this).find('.jspDrag').stop(true, true).fadeIn('slow');
  });
  $('.jspScrollable').mouseleave(function(){
  	$(this).find('.jspDrag').stop(true, true).fadeOut('slow');
  });
  */
  /**
   * Homepage search
   */
   
   

  $("#search").keyup(function(e) { //search function
    article_default();
    var term = this.value.replace(/[^a-zA-Z0-9]/g, '');
    if (term == "" && document.location.pathname === '/pages/popup.html') { //activates only if the search bar is empty on popup.html
      var i = 0;
      for (name in ragesdemo) { //show demo rage faces
        var html = '<div class="item">' + ragessearch[name] + '</div>';
        var article = Math.floor(i / 4);
        $("#content article:eq(" + article + ")").append(html);
        $("#content article:eq(" + article + ")").removeClass("notactive").addClass("active");
        i++;
      $("#content").css("display", "block");
      }
	  oldheight = parseInt($("#content").css('height'), 10);
	  if (i==0) { i=0; $("#container").height('300'); }
	  fixedheight = 332;
	  fixedmargin = fixedheight * -1;
	  $("#content").height(fixedheight);
	  $(".boxtop").height(fixedheight);
	  $("#wrapper").css({'margin-top':  fixedmargin + 'px'});
	  $("footer").css({'margin-top': '-25px'});
	  $("img.lazy").lazyload({ });
	  $('html, body').animate({ scrollLeft: 10 }, 'fast');
	  $('html, body').animate({ scrollLeft: 0 }, 'fast');
      $("#content").stop().fadeIn(300);
    } 
	else if (term == "" && document.location.pathname === '/pages/newemotes.html') { //activates only if the search bar is empty on newemotes
	article_newemotes()
      $("#content").show().fadeOut(300);
      $("#content article").html("");
      var i = 0;
      for (name in ragesnew) {
        if (name.indexOf(':' + term) === 0) {
          var html = '<div class="item">' + ragessearch[name] + '</div>';
          var article = Math.floor(i / 4);
          $("#content article:eq(" + article + ")").append(html);
          $("#content article:eq(" + article + ")").removeClass("notactive").addClass("active");
          if (i++ > 100) break;
      }
	  }
	  oldheight = parseInt($("#content").css('height'), 10);
	  if (i==0) { i=1; $("#container").height('300'); }
	  fixedheight = Math.ceil(i / 12) * 332;
	  fixedmargin = fixedheight * -1;
	  $("#content").height(fixedheight);
	  $(".boxtop").height(fixedheight);
	  $("#wrapper").css({'margin-top':  fixedmargin + 'px'});
	  $("footer").css({'margin-top': '-25px'});
	  $("img.lazy").lazyload({ });
	  $('html, body').animate({ scrollLeft: 10 }, 'fast');
	  $('html, body').animate({ scrollLeft: 0 }, 'fast');
      $("#content").stop().fadeIn(300);
	} 
	else if (term.length > 1 && document.location.pathname === '/pages/newemotes.html') {
	article_newemotes()
      $("#content").show().fadeOut(300);
      $("#content article").html("");
      var i = 0;
      for (name in ragesnew) {
        if (name.indexOf(':' + term) === 0) {
          var html = '<div class="item">' + ragessearch[name] + '</div>';
          var article = Math.floor(i / 4);
          $("#content article:eq(" + article + ")").append(html);
          $("#content article:eq(" + article + ")").removeClass("notactive").addClass("active");
	      $("img.lazy").lazyload({ });
          if (i++ > 100) break;
        }
      }
	  oldheight = parseInt($("#content").css('height'), 10);
	  if (i==0) { i=1; $("#container").height('300'); }
	  fixedheight = Math.ceil(i / 12) * 332;
	  fixedmargin = fixedheight * -1;
	  $("#content").height(fixedheight);
	  $(".boxtop").height(fixedheight);
	  $("#wrapper").css({'margin-top':  fixedmargin + 'px'});
	  $("footer").css({'margin-top': '-25px'});
	  $("img.lazy").lazyload({ });
	  $('html, body').animate({ scrollLeft: 10 }, 'fast');
	  $('html, body').animate({ scrollLeft: 0 }, 'fast');
      $("#content").stop().fadeIn(300);
	}
	else if (term.length > 1 && document.location.pathname === '/pages/popup.html') {
	article_newemotes()
      $("#content").show().fadeOut(300);
      $("#content article").html("");
      var i = 0;
      for (name in rages) {
        if (name.indexOf(':' + term) === 0) {
          var html = '<div class="item">' + ragessearch[name] + '</div>';
          var article = Math.floor(i / 4);
          $("#content article:eq(" + article + ")").append(html);
          $("#content article:eq(" + article + ")").removeClass("notactive").addClass("active");
          if (i++ > 36) break;
        }
      }
	  if (i==0) { i=1; $("#container").height('300'); }
	  oldheight = parseInt($("#content").css('height'), 10);
	  fixedheight = Math.ceil(i / 12) * 332;
	  fixedmargin = fixedheight * -1;
	  $("#content").height(fixedheight);
	  $(".boxtop").height(fixedheight);
	  $("#wrapper").css({'margin-top':  fixedmargin + 'px'});
	  $("footer").css({'margin-top': '-25px'});
	  $("img.lazy").lazyload({ });
	  $('html, body').animate({ scrollLeft: 10 }, 'fast');
	  $('html, body').animate({ scrollLeft: 0 }, 'fast');
      $("#content").stop().fadeIn(300);
    }
	$("img.lazy").lazyload({  });
  });

  /**
   * Search default text
   */
  $("#search").focus(function(e) {
    if (this.value == "Type command here") {
      this.value = "";
      $("#search").css("color", "#680B14");
    }
  });


});

/*
document.addEventListener("load", function(e){
  if (/img/i.test(e.target.nodeName)
  && e.target.parentNode.className.indexOf("pointer") > -1) {
    $(e.target).css("opacity", 1);
  }
}, true);
*/
