// JavaScript Document
function $(id) {
        return document.getElementById(id);
}
	
chrome.extension.onRequest.addListener(function(tab) {chrome.tabs.executeScript(tab.id,{file:"Chrome-YouTube-Downloader.js"});});
if ((localStorage["firstrun"]!="false") && (localStorage["firstrun"]!=false)){
  chrome.tabs.create({url: "html/options.html", selected:true})
  localStorage["firstrun"] = false;
}

chrome.extension.getVersion = function() { 
      if (!chrome.extension.version_) { 
        var xhr = new XMLHttpRequest(); 
        xhr.open("GET", chrome.extension.getURL('manifest.json'), false); 
        xhr.onreadystatechange = function() { 
          if (this.readyState == 4) { 
            var manifest = JSON.parse(this.responseText); 
            chrome.extension.version_ = manifest.version; 
          } 
        }; 
        xhr.send(); 
      } 
      return chrome.extension.version_; 
    };

if (localStorage["version"] != chrome.extension.getVersion()){
	localStorage["update"] = "true";
	} else {
	localStorage["update"] = "false";
	}

localStorage["version"] = chrome.extension.getVersion();
if (localStorage["installed"]!= "false"){    
    localStorage["installed"] = "true";
}
//uloží do localStorage základní nastavení 
  if(!localStorage['nstyle'] && !localStorage['cstyle'] && !localStorage['2k'] && !localStorage['1080p'] && !localStorage['720p'] && !localStorage['480p'] && !localStorage['360p'] && !localStorage['240p'] && !localStorage['ytmp3'] && !localStorage['v2mp3'] && !localStorage['ud2k'] && !localStorage['ud1080p'] && !localStorage['ud720p'] && !localStorage['ud480p'] && !localStorage['ud360p'] && !localStorage['ud240p'] && !localStorage['username'] && !localStorage['quality'] && !localStorage['webm']) 
    {	localStorage['nstyle'] = 'true';
 	    localStorage['cstyle'] = 'false';
 	    localStorage['2k'] = 'true';
      localStorage['1080p'] = 'true';
      localStorage['720p'] = 'true';
      localStorage['480p'] = 'true';
      localStorage['360p'] = 'true';
      localStorage['240p'] = 'true';
      localStorage['ytmp3'] = 'true';
      localStorage['v2mp3'] = 'true';
      localStorage['ud2k'] = 'true';
      localStorage['ud1080p'] = 'true';
      localStorage['ud720p'] = 'true';
      localStorage['ud480p'] = 'true';
      localStorage['ud360p'] = 'true';
      localStorage['ud240p'] = 'true';
      localStorage['username'] = 'false';
      localStorage['quality'] = 'false';
      localStorage['webm'] = 'false';    
    } 
// Přijme dotaz od hlavního scriptu a odešle odpověď 
chrome.extension.onRequest.addListener( 
  function request(request, sender, sendResponse) { 
    if (request.method == "completerequest") { sendResponse({nstyle: localStorage['nstyle'], cstyle: localStorage['cstyle'], uhd: localStorage['2k'], fhd: localStorage['1080p'], hd: localStorage['720p'], hq: localStorage['480p'], mq: localStorage['360p'], lq: localStorage['240p'], ytmp3: localStorage['ytmp3'], v2mp3: localStorage['v2mp3'], uduhd: localStorage['ud2k'], udfhd: localStorage['ud1080p'], udhd: localStorage['ud720p'], udhq: localStorage['ud480p'], udmq: localStorage['ud360p'], udlq: localStorage['ud240p'], version: localStorage['version'], username: localStorage['username'], quality: localStorage['quality'], webm: localStorage['webm']}); 
    } 
    else { 
      sendResponse({}); 
    } 
  });
// Analytics

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-27600919-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

