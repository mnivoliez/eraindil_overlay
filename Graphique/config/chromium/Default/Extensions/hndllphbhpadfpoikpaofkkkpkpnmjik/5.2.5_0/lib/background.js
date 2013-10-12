var clipboard = {
  _createTextArea: function() {
    var textArea = document.createElement("textarea");
    textArea.style.position = "absolute";
    textArea.style.left = "-100%";
    return textArea;
  },

  copy: function(data) {
    var textArea = this._createTextArea();
    textArea.value = data;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  },

  paste: function(data) {
    // Find focused element.
    var focused = document.querySelector(':focus');

    // To find cursor position get empty selection range.
    var selection = focused.selection.createRange();

    // Move selection start to 0 position.
    selection.moveStart('character', -focused.value.length);

    // caret position is selection length.
    var offset = selection.text.length;

    // Splice in new emoticon.
    var start = focused.value.slice(0, offset),
        end = focused.value.slice(offset);

    // Update value of field.
    focused.value = start + data + end;
  }
};

AU.init({
  donationUrl: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=P87A8E8EHU2H8',
  updateUrl: 'http://u.yieldsquare.com/trollemoticons.json',
  postInstallUrl: 'http://www.trollemoticons.com/thanks/',
  googleAnalytics: {
    accountId: 'UA-28892173-1'
  }
});

AU.message.on('show-page-action', function(message, sender) {
  setTimeout(function(){chrome.pageAction.show(sender.tab.id)},1500);
});

AU.message.on('copy-to-clipboard', function(message) {
  clipboard.copy(message.data);
});
