var init = function() {
  // MutationObserver is still prefixed in Chrome.
  window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  // Simple debug logging function
  var DEBUG = false;
  var log = function() {
    if (DEBUG)
      console.log.apply(console.log, arguments);
  }

  // Replaces emoticons inside text nodes with images.
  var replaceTextNode = (function() {
    // Cache our temp document and regex
    var temp = document.createElement('div'),
        re = /(:+[a-z0-9]+:)/gi;

    return function(textNode) {
      var html = textNode.data,
          matches = {},
          matchesFound = 0,
          emoticon,
          img;

      // Find emoticon placeholders.
      while (match = re.exec(html)) {
        if ((emoticon = match[1]) == null)
          continue;

        // Lookup img, invalid if img is not for given emoticon.
        if ((img = rages[emoticon]) == null)
          continue;

        // Store match for replacement.
        matches[emoticon] = img;
        matchesFound += 1;
      }

      // Bail out if no matches found.
      if (matchesFound === 0) return;

      log('matches found with following selectors:', textNode.parentNode.className);

      // Replace each match
      for (var k in matches) {
        log(k, 'match');
        html = html.replace(new RegExp(k, 'gi'), matches[k]);
      }

      // Use temporary element to convert to html nodes.
      temp.innerHTML = html;

      // Set onclick for span to copy emoticon to clipboard
      temp.children[0].addEventListener('click', function() {
        chrome.extension.sendMessage({
          _messageType: 'copy-to-clipboard',
          data: this.getAttribute('data-emoticon')
        });
      });

      // Insert new nodes.
      while (temp.firstChild != null) {
        textNode.parentNode.insertBefore(temp.firstChild, textNode);
      }

      // Remove original text node.
      textNode.parentNode.removeChild(textNode);
    }
  }());

  // Injects emoticons into descendent text nodes
  var injectEmoticons = function(root) {
        // var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode: filterNode}, false),
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false),
            nodes = [],
            node;

    log('walking', root)

    while (node = walker.nextNode()) {
      // ignore script tags
      if (node.parentNode.nodeName === 'SCRIPT') continue
      nodes.push(node);
    }

    log(nodes.length, 'descendent nodes traversed');

    for (var i=0; i<nodes.length; i++) {
      replaceTextNode(nodes[i]);
    }

  }

  // Use Mutation Observer to watch for changes.
  var watcher = function(el) {
    var observer = new MutationObserver(function(mutations) {
      var mutationsLength = mutations.length;
      for (var i=0; i<mutationsLength; i++) {
        injectEmoticons(mutations[i].target);
      }
    });

    observer.observe(el, {childList: true, subtree: true});
  };

  var lookupDomain = function(domain) {
    var domains = {};

    // Example of domain customization options:
    // var domains = {
    //   'facebook.com': {
    //
    //     // Selectors that will be used instead of document.body
    //     selectors: ['some', 'selectors'],
    //
    //     // Customized watching code.
    //     watcher: function(el) {
    //     }
    //   }
    // };

    // Strip subdomains from domain
    var parseDomain = function(hostname) {
      var match = /\w+\.\w+$/.exec(hostname);
      if (match != null) return match[0];
    }

    // Look up selectors/customizations needed for current domain
    return domains[parseDomain(domain)] || {};
  }

  // Look up any site-specific customizations.
  var domain = lookupDomain(window.location.hostname);

  var showPageAction = function() {
    // trigger pageAction.show in background.
    chrome.extension.sendMessage({
      _messageType: 'show-page-action'
    });
  }

  showPageAction();

  // Initial replacement
  window.addEventListener('DOMContentLoaded', function() {
    // Use custom selectors if possible
    if (domain.selectors != null) {
      for (var i=0; i<domain.selectors.length; i++) {
        var elements = document.querySelectorAll(domain.selectors[i]);
        for (var j=0; j<elements.length; j++) {
          // Initial injection.
          injectEmoticons(elements[i]);

          // Watch for changes
          if (domain.watcher != null)
            domain.watcher(elements[i]);
          else
            watcher(elements[i]);
        }
      }
    } else {
      // Use document.body to do initial injection and watch document.body for changes
      injectEmoticons(document.body);

      // Watch for changes
      if (domain.watcher != null)
        domain.watcher(document.body);
      else
        watcher(document.body);
    }

    // Monkey patch history.pushState to fire custom __pushstate event whenever it's called.
    var script = document.createElement('script');
    script.innerHTML = "(function() {" +
                       "  var __pushState = window.history.pushState;" +
                       "  window.history.pushState = function(state, title, url) {" +
                       "    var event = new CustomEvent('__pushstate', {state: state, title: title, url: url});" +
                       "    window.dispatchEvent(event);" +
                       "    __pushState.apply(window.history, arguments);" +
                       "  };" +
                       "}())";

    // Inject script into tab context so we can detect history changes and call show page action again.
    document.head.appendChild(script);

    // Listen for __pushstate event and showPageAction again on url changes.
    window.addEventListener('__pushstate', function() {
     showPageAction();
    });

  });
};

// Sometimes chrome preloads pages, we want to avoid running on those pages.
if (document.webkitVisibilityState !== 'prerender') init();