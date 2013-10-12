document.addEventListener('DOMContentLoaded', function() {
  var optionLinks = document.getElementsByClassName('options-link'),
      reviewLinks = document.getElementsByClassName('review-link'),
      feedbackLinks = document.getElementsByClassName('feedback-link'),
      extensionId = chrome.i18n.getMessage('@@extension_id'),
      i;

  for (i=0; i<optionLinks.length; i++) {
    optionLinks[i].href = chrome.extension.getURL('pages/options.html');
  }

  for (i=0; i<reviewLinks.length; i++) {
    reviewLinks[i].href = 'https://chrome.google.com/webstore/detail/' + extensionId + '/reviews';
  }

  for (i=0; i<feedbackLinks.length; i++) {
    feedbackLinks[i].href = 'https://chrome.google.com/webstore/support/' + extensionId;
  }

  document.getElementById('disable-support').addEventListener('click', function(event) {
    chrome.extension.sendMessage({_messageType: 'disable-support'});
    document.getElementById('disable-plea').innerHTML = 'Ads disabled, please consider donating!';
  });
});
