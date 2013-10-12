AU.init({background: false}, function() {
  storage = AU.storage(function() {
    var supportEnabled = "off";
    if (!AU.support.enabled()) {
      supportEnabled = "on";
    }

    $('#1').iphoneSwitch(supportEnabled,
    function() {
      AU.support.toggle()
    },
    function() {
      AU.support.toggle()
    }, {
      switch_on_container_path: '/assets/img/iphone_switch_container_off.png'
    });

    /**
     * Convert rages from hash to array
     */
    var rages_arr = [];
    for (var i in rages) {
      rages_arr.push({
        name: i,
        picture: rages[i]
      });
    }

    /**
     * Generate letters of alphabet for navigation
     */
    var abc = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
    for (var i = 0; i < abc.length; i++) {
      $("#alphabet").append("<span>" + abc[i] + "</span>&nbsp; ");
    }

    /**
     * Lists all emoticons starting with a given letter
     */
    function list_by_letter(c) {
      $("#rages").html("");
      for (var i = 0; i < rages_arr.length; i++) {
        if (rages_arr[i].name.charAt(1) == c.toLowerCase()) {
          var html = get_item_html(rages_arr[i].name, rages_arr[i].picture);
          $("#rages").append(html);
        }
      }
    }

    /**
     * Generates the html of a simple emoticon list item
     */
    function get_item_html(name, picture) {
      return '<div class="item">' + '<button class="add" title="add">+</button>' + '<div class="img-container pointer">' + '<div style="padding-top:25px">' + picture + '</div></div>' + '<div class="text">' + name + '</div>' + '</div>';
    }

    /**
     * Generates the html of a bookmark
     */
    function get_bookmark_html(name, id) {
      return '<div class="item">' + '<button class="remove" title="remove" data-id="' + id + '">x</button>' + '<div class="img-container">' + '<div style="padding-top:25px">' +rages[name] + '</div></div>' + '<div class="text">' + name + '</div>' + '</div>';
    }

    /**
     * Adds bookmark to storage and to the list on the page
     */
    function add_bookmark(name) {
      if (!rages[name]) return;
      bookmarks.push(name);
      storage.set('bookmarks', bookmarks.join(','));
      var html = get_bookmark_html(name, bookmarks.length - 1);
      $("#favourites").append($(html).hide().fadeIn(400));
    }

    /**
     * List all current bookmarks
     */
    if (storage.get('bookmarks')) {
      var bookmarks = storage.get('bookmarks').split(',');
      for (var i = 0; i < bookmarks.length; i++) {
        var html = get_bookmark_html(bookmarks[i], i);
        $("#favourites").append(html);
      }
    } else {
      bookmarks = [];
    }

    /**
     * Bookmark remove button event handler
     */
    $("#favourites").delegate('.remove', 'click', function(e) {
      bookmarks.splice($(this).attr("data-id"), 1);
      storage.set('bookmarks', bookmarks.join(','));
      $(this).parent().fadeOut(400, function() {
        $(this).remove();
      })
    });

    /**
     * Bookmark add by name event handler
     */
    $("#bookmark-add").click(function(e) {
      add_bookmark(':' + $("#bookmark-input").val() + ':');
    });

    /**
     * Bookmark add by click event handler
     */
    $("#rages").delegate(".item", "click", function(e) {
      add_bookmark($(this).find(".text").text());
    });

    /**
     * Alphabet click event handler
     */
    $("#alphabet").delegate("span", "click", function(e) {
      list_by_letter(this.innerHTML);
    });

  });
});
