(function() {

  var sendImpressions = function(host, impressions) {
    var xhr = new XMLHttpRequest();
    var url = host + '/t/';
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(impressions));
  }

  var getParams = function(path, search) {
    console.log(path)
    var params = [
      "pubid="
    ];
    return "/pub/i?" + params.join('&');
  }

  var fn = function() {
    var anchors = document.querySelectorAll('a[href*="products.gobankingrates.com"]');
    var impressions = [];
    for (let i = 0; i < anchors.length; i++) {
      //TODO filter to get distinct pubp + query params
      var anchor = anchors[i];
      var url = new URL(anchor.href);
      console.log(url);
      impressions.push(getParams(url.pathname, url.search));
    }
    sendImpressions(url.origin, impressions);
  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
})();
