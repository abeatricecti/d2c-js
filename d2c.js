(function() {

  var sendImpressions = function(url, impressions) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(impressions));
  }

  var uniqueAnchors = function() {
    var anchors = document.querySelectorAll('a[href*="products.gobankingrates.com/pub/"]');
    var obj = {};
    for (var i = 0; i < anchors.length; i++) {
      var url = new URL(anchors[i].href);
      var pub = url.pathname.replace('/pub/', '').split('/')[0];
      var key = pub + url.search;
      obj[key] = {
        "pub": pub,
        "url": url,
        "search": url.search
      };
    }
    return obj;
  }

  var fn = function() {
    var anchors = uniqueAnchors();
    if (anchors.length < 1) return;
    var impressions = [];
    for (var i = 0; i < Object.keys(anchors).length; i++) {
      var anchor = anchors[Object.keys(anchors)[i]];
      var impression = "/pub/i?pubid=" + anchor.pub + anchor.search.replace('?', '&');
      impressions.push(impression);
    }
    var url = anchors[Object.keys(anchors)[0]].url.origin + '/t/';
    sendImpressions(url, impressions);
  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
})();
