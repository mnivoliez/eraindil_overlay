function $(e) {
    return document.getElementById(e)
}

function save_options() {
    if ($("nstyle").checked) localStorage["nstyle"] = "true";
    else localStorage["nstyle"] = "false";
    if ($("cstyle").checked) localStorage["cstyle"] = "true";
    else localStorage["cstyle"] = "false";
    if ($("v2k").checked) localStorage["2k"] = "true";
    else localStorage["2k"] = "false";
    if ($("v1080p").checked) localStorage["1080p"] = "true";
    else localStorage["1080p"] = "false";
    if ($("v720p").checked) localStorage["720p"] = "true";
    else localStorage["720p"] = "false";
    if ($("v480p").checked) localStorage["480p"] = "true";
    else localStorage["480p"] = "false";
    if ($("v360p").checked) localStorage["360p"] = "true";
    else localStorage["360p"] = "false";
    if ($("v240p").checked) localStorage["240p"] = "true";
    else localStorage["240p"] = "false";
    if ($("ytmp3").checked) localStorage["ytmp3"] = "true";
    else localStorage["ytmp3"] = "false";
    if ($("v2mp3").checked) localStorage["v2mp3"] = "true";
    else localStorage["v2mp3"] = "false";
    if ($("username").checked) localStorage["username"] = "true";
    else localStorage["username"] = "false";
    if ($("quality").checked) localStorage["quality"] = "true";
    else localStorage["quality"] = "false";
    if ($("disflv").checked) {
        localStorage["disflv"] = "true";
        localStorage["240p"] = "false";
        localStorage["480p"] = "false"
    } else {
        localStorage["disflv"] = "false"
    }
    if ($("webm").checked) {
        localStorage["webm"] = "true"
    } else {
        localStorage["webm"] = "false"
    }
    if ($("ud2k").selected && $("disflv").checked) {
        localStorage["ud2k"] = "true";
        localStorage["ud1080p"] = "true";
        localStorage["ud720p"] = "true";
        localStorage["ud480p"] = "false";
        localStorage["ud360p"] = "true";
        localStorage["ud240p"] = "false"
    } else if ($("ud2k").selected) {
        localStorage["ud2k"] = "true";
        localStorage["ud1080p"] = "true";
        localStorage["ud720p"] = "true";
        localStorage["ud480p"] = "true";
        localStorage["ud360p"] = "true";
        localStorage["ud240p"] = "true"
    }
    if ($("ud1080p").selected && $("disflv").checked) {
        localStorage["ud2k"] = "false";
        localStorage["ud1080p"] = "true";
        localStorage["ud720p"] = "true";
        localStorage["ud480p"] = "false";
        localStorage["ud360p"] = "true";
        localStorage["ud240p"] = "false"
    } else if ($("ud1080p").selected) {
        localStorage["ud2k"] = "false";
        localStorage["ud1080p"] = "true";
        localStorage["ud720p"] = "true";
        localStorage["ud480p"] = "true";
        localStorage["ud360p"] = "true";
        localStorage["ud240p"] = "true"
    }
    if ($("ud720p").selected && $("disflv").checked) {
        localStorage["ud2k"] = "false";
        localStorage["ud1080p"] = "false";
        localStorage["ud720p"] = "true";
        localStorage["ud480p"] = "false";
        localStorage["ud360p"] = "true";
        localStorage["ud240p"] = "false"
    } else if ($("ud720p").selected) {
        localStorage["ud2k"] = "false";
        localStorage["ud1080p"] = "false";
        localStorage["ud720p"] = "true";
        localStorage["ud480p"] = "true";
        localStorage["ud360p"] = "true";
        localStorage["ud240p"] = "true"
    }
    if ($("ud480p").selected && $("disflv").checked) {
        localStorage["ud2k"] = "false";
        localStorage["ud1080p"] = "false";
        localStorage["ud720p"] = "false";
        localStorage["ud480p"] = "false";
        localStorage["ud360p"] = "true";
        localStorage["ud240p"] = "false"
    } else if ($("ud480p").selected) {
        localStorage["ud2k"] = "false";
        localStorage["ud1080p"] = "false";
        localStorage["ud720p"] = "false";
        localStorage["ud480p"] = "true";
        localStorage["ud360p"] = "true";
        localStorage["ud240p"] = "true"
    }
    if ($("ud360p").selected && $("disflv").checked) {
        localStorage["ud2k"] = "false";
        localStorage["ud1080p"] = "false";
        localStorage["ud720p"] = "false";
        localStorage["ud480p"] = "false";
        localStorage["ud360p"] = "true";
        localStorage["ud240p"] = "false"
    } else if ($("ud360p").selected) {
        localStorage["ud2k"] = "false";
        localStorage["ud1080p"] = "false";
        localStorage["ud720p"] = "false";
        localStorage["ud480p"] = "false";
        localStorage["ud360p"] = "true";
        localStorage["ud240p"] = "true"
    }
    if ($("ud240p").selected) {
        localStorage["ud2k"] = "false";
        localStorage["ud1080p"] = "false";
        localStorage["ud720p"] = "false";
        localStorage["ud480p"] = "false";
        localStorage["ud360p"] = "false";
        localStorage["ud240p"] = "true"
    }
    var e = $("status");
    e.innerHTML = chrome.i18n.getMessage("saved");
    setTimeout(function () {
        e.innerHTML = ""
    }, 1800)
}
function test() {
    $("version").textContent = "ver. " + localStorage["version"];
    if (localStorage["installed"] == "true") {
		localStorage["installed"] = "false";
		$("update").style.display = "none";
	}
    else if (localStorage["installed"] == "false") {
		$("greenmsg").style.display = "none";
	}
	if (localStorage["update"] == "true") localStorage["update"] = "false";
	else if (localStorage["update"] == "false") $("update").style.display = "none";
    if (localStorage["nstyle"] == "true") {
        $("down1").style.display = "inline";
        $("down2").style.display = "none";
        $("udr").disabled = false
    }
    if (localStorage["cstyle"] == "true") {
        $("down1").style.display = "none";
        $("down2").style.display = "inline";
        $("udr").disabled = true
    }
    if (localStorage["2k"] == "true") {
        $("b2k").style.display = "block"
    } else {
        $("b2k").style.display = "none"
    }
    if (localStorage["1080p"] == "true") {
        $("b1080").style.display = "block"
    } else {
        $("b1080").style.display = "none"
    }
    if (localStorage["720p"] == "true") {
        $("b720").style.display = "block"
    } else {
        $("b720").style.display = "none"
    }
    if (localStorage["480p"] == "true") {
        $("b480").style.display = "block";
        $("v480p").checked = true
    } else {
        $("b480").style.display = "none";
        $("v480p").checked = false
    }
    if (localStorage["360p"] == "true") {
        $("b360").style.display = "block"
    } else {
        $("b360").style.display = "none"
    }
    if (localStorage["240p"] == "true") {
        $("b240").style.display = "block";
        $("v240p").checked = true
    } else {
        $("b240").style.display = "none";
        $("v240p").checked = false
    }
    if (localStorage["ytmp3"] == "true") {
        $("bmp31").style.display = "block"
    } else {
        $("bmp31").style.display = "none"
    }
    if (localStorage["v2mp3"] == "true") {
        $("bmp32").style.display = "block"
    } else {
        $("bmp32").style.display = "none"
    }
    if (localStorage["disflv"] == "true") {
        $("ud480p").style.display = "none";
        $("ud240p").style.display = "none";
        $("v480p").disabled = true;
        $("v240p").disabled = true;
        $("b480").style.display = "none";
        $("b240").style.display = "none"
    } else {
        $("ud480p").style.display = "block";
        $("ud240p").style.display = "block";
        $("v480p").disabled = false;
        $("v240p").disabled = false
    }
    if (localStorage["webm"] == "true") {
        $("webm").checked = true;
        $("bwebm720").style.display = "block";
        $("bwebm480").style.display = "block";
        $("bwebm360").style.display = "block"
    } else {
        $("webm").checked = false;
        $("bwebm720").style.display = "none";
        $("bwebm480").style.display = "none";
        $("bwebm360").style.display = "none"
    }
}
function load_options() {
    function e(e, t) {
        document.getElementById(e).innerText = t;
    }
    if (localStorage["nstyle"] == "true") $("nstyle").checked = true;
    if (localStorage["cstyle"] == "true") $("cstyle").checked = true;
    if (localStorage["disflv"] == "true") {
        $("disflv").checked = true;
        $("ud480p").style.display = "none";
        $("ud240p").style.display = "none";
        $("v480p").disabled = true;
        $("v240p").disabled = true;
        $("b480").style.display = "none";
        $("b240").style.display = "none"
    }
    if (localStorage["2k"] == "true") $("v2k").checked = true;
    if (localStorage["1080p"] == "true") $("v1080p").checked = true;
    if (localStorage["720p"] == "true") $("v720p").checked = true;
    if (localStorage["480p"] == "true") $("v480p").checked = true;
    if (localStorage["360p"] == "true") $("v360p").checked = true;
    if (localStorage["240p"] == "true") $("v240p").checked = true;
    if (localStorage["ytmp3"] == "true") $("ytmp3").checked = true;
    if (localStorage["v2mp3"] == "true") $("v2mp3").checked = true;
    if (localStorage["username"] == "true") $("username").checked = true;
    if (localStorage["quality"] == "true") $("quality").checked = true;
    if (localStorage["webm"] == "true") $("webm").checked = true;
    if (localStorage["ud2k"] == "true") {
        $("ud2k").selected = true;
        $("ud1080p").selected = false;
        $("ud720p").selected = false;
        $("ud480p").selected = false;
        $("ud360p").selected = false;
        $("ud240p").selected = false
    } else if (localStorage["ud1080p"] == "true") {
        $("ud2k").selected = false;
        $("ud1080p").selected = true;
        $("ud720p").selected = false;
        $("ud480p").selected = false;
        $("ud360p").selected = false;
        $("ud240p").selected = false
    } else if (localStorage["ud720p"] == "true") {
        $("ud2k").selected = false;
        $("ud1080p").selected = false;
        $("ud720p").selected = true;
        $("ud480p").selected = false;
        $("ud360p").selected = false;
        $("ud240p").selected = false
    } else if (localStorage["ud480p"] == "true") {
        $("ud2k").selected = false;
        $("ud1080p").selected = false;
        $("ud720p").selected = false;
        $("ud480p").selected = true;
        $("ud360p").selected = false;
        $("ud240p").selected = false
    } else if (localStorage["ud360p"] == "true") {
        $("ud2k").selected = false;
        $("ud1080p").selected = false;
        $("ud720p").selected = false;
        $("ud480p").selected = false;
        $("ud360p").selected = true;
        $("ud240p").selected = false
    } else if (localStorage["ud240p"] == "true") {
        $("ud2k").selected = false;
        $("ud1080p").selected = false;
        $("ud720p").selected = false;
        $("ud480p").selected = false;
        $("ud360p").selected = false;
        $("ud240p").selected = true
    }
    document.title = chrome.i18n.getMessage("settingspagetitle");
    e("description", chrome.i18n.getMessage("description"));
    e("buttonstyle", chrome.i18n.getMessage("buttonstyle"));
    e("oneclickdownload", chrome.i18n.getMessage("oneclickdownload"));
    e("oneclicktext", chrome.i18n.getMessage("oneclicktext"));
    e("clasicdownload", chrome.i18n.getMessage("clasicdownload"));
    e("videoformats", chrome.i18n.getMessage("videoformats"));
    e("disableflv", chrome.i18n.getMessage("disableflv"));
    e("availablewebm", chrome.i18n.getMessage("availablewebm"));
    e("available2k", chrome.i18n.getMessage("available2k"));
    e("available1080", chrome.i18n.getMessage("available1080"));
    e("available720", chrome.i18n.getMessage("available720"));
    e("available480", chrome.i18n.getMessage("available480"));
    e("available360", chrome.i18n.getMessage("available360"));
    e("available240", chrome.i18n.getMessage("available240"));
    e("availableytmp3", chrome.i18n.getMessage("availablemp3"));
    e("availablev2mp3", chrome.i18n.getMessage("availablemp3"));
    e("videotitle", chrome.i18n.getMessage("videotitle"));
    e("includenick", chrome.i18n.getMessage("includenick"));
    e("includequality", chrome.i18n.getMessage("includequality"));
    e("nickname", chrome.i18n.getMessage("nickname"));
	e("translated", chrome.i18n.getMessage("translated"));
	e("loadtext", chrome.i18n.getMessage("loadingsettings"));
	e("greenmsg", chrome.i18n.getMessage("installmessage"));
	e("update", chrome.i18n.getMessage("updatemessage"));
	
	if(chrome.i18n.getMessage("language") == "none"){
	$("description").dir="rtl";
	$("buttonstyle").dir="rtl";
	$("oneclickdownload").dir="rtl";
	$("clasicdownload").dir="rtl";
	$("clasicdownload").dir="rtl";
	$("videoformats").dir="rtl";
	$("disableflv").dir="rtl";
	$("availablewebm").dir="rtl";
	$("available2k").dir="rtl";
	$("available1080").dir="rtl";
	$("available720").dir="rtl";
	$("available480").dir="rtl";
	$("available360").dir="rtl";
	$("available240").dir="rtl";
	$("availableytmp3").dir="rtl";
	$("availablev2mp3").dir="rtl";
	$("videotitle").dir="rtl";
	$("includenick").dir="rtl";
	$("includequality").dir="rtl";
	$("nickname").dir="rtl";
	$("translated").dir="rtl";
	$("greenmsg").dir="rtl";
	$("update").dir="rtl";
	$("status").dir="rtl";
	$("dir").dir="rtl";
	}
	
}
document.addEventListener("DOMContentLoaded", function () {
    load_options();
    test();
    $("loading").setAttribute("class", "jsloading");
    $("loaded").setAttribute("class", "jsloaded");
    setTimeout(function () {
        $("loading").style.display = "none"
    }, 2350);
	
    var e = document.querySelectorAll("input");
    for (var t = 0; t < e.length; t++) {
        e[t].addEventListener("change", function () {
            save_options();
            test()
        })
    }
    $("udr").addEventListener("change", function () {
        save_options();
        test()
    })
})