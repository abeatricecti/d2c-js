(function() {

  var sendImpressions = function(host, impressions) {
    var xhr = new XMLHttpRequest();
    var url = host + '/t/';
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(impressions));
  }

  var getParams = function(pub, search) {
    var params = [
      "pubid="+pub,
    ];
    return "/pub/i?" + params.join('&');
  }

  var uniqueAnchors = function() {
    var anchors = document.querySelectorAll('a[href*="products.gobankingrates.com"]');
    var obj = {};
    for (let i = 0; i < anchors.length; i++) {
      var url = new URL(anchors[i].href);
      var pub = url.pathname.replace('/pub/', '').split('/')[0];
      var key = pub + url.search;
      obj[key] = {
        "pub": pub,
        "search": url.search
      };
    }
    return obj;
  }

  var fn = function() {
    var anchors = uniqueAnchors();
    var impressions = [];
    for (let i = 0; i < Object.keys(anchors).length; i++) {
      var anchor = anchors[Object.keys(anchors)[i]];
      console.log(anchor);
      impressions.push(getParams(anchor.pub, anchor.search));
    }
    sendImpressions(url.origin, impressions);
  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
})();
